import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const directory = mkdtempSync(join(tmpdir(), 'kai-hooks-'));
const run = (command, args) =>
  execFileSync(command, args, {
    cwd: directory,
    encoding: 'utf8',
    stdio: 'pipe',
    env: { ...process.env, HUSKY: '1' },
  });
const git = (...args) => run('git', args);
const write = (file, content) => writeFileSync(join(directory, file), content);

try {
  mkdirSync(join(directory, '.husky'));
  mkdirSync(join(directory, 'src/content'), { recursive: true });
  for (const file of [
    'package.json',
    '.lintstagedrc.json',
    '.prettierrc.json',
    '.prettierignore',
    'eslint.config.js',
    'stylelint.config.js',
    '.husky/pre-commit',
  ]) {
    copyFileSync(join(root, file), join(directory, file));
  }
  symlinkSync(join(root, 'node_modules'), join(directory, 'node_modules'), 'dir');
  write('.gitignore', 'node_modules/\n');
  const baseline =
    'export const committed = 0;\n' +
    '// Separate staged and unstaged edits.\n'.repeat(10) +
    'export const draft = 0;\n';
  write('src/partial file.js', baseline);
  git('init', '--quiet');
  git('config', 'user.name', 'Hook Check');
  git('config', 'user.email', 'hook-check@example.invalid');
  git('config', 'commit.gpgsign', 'false');
  // Isolate the fixture from any globally configured hooks until Husky is installed.
  git('config', 'core.hooksPath', '.husky/_');
  git('add', '.');
  git('commit', '--quiet', '-m', 'Fixture baseline');
  run(process.execPath, [join(root, 'node_modules/husky/bin.js')]);

  write('src/partial file.js', baseline.replace('committed = 0', 'committed=1'));
  write('src/probe.css', '.probe{color:red;}\n');
  write('src/Probe.astro', '<p>Hello</p>\n<style>.probe{color:blue;}</style>\n');
  write('src/browser.ts', 'export const title:string=document.title;\n');
  const editorial = '#   Preserve editorial formatting\n';
  write('src/content/probe.md', editorial);
  git('add', 'src');
  write(
    'src/partial file.js',
    readFileSync(join(directory, 'src/partial file.js'), 'utf8').replace(
      'draft = 0',
      'draft = missingValue',
    ),
  );
  git('commit', '--quiet', '-m', 'Format staged files');
  assert.equal(
    git('show', 'HEAD:src/partial file.js'),
    baseline.replace('committed = 0', 'committed = 1'),
  );
  assert(
    readFileSync(join(directory, 'src/partial file.js'), 'utf8').includes('draft = missingValue'),
  );
  assert(git('show', 'HEAD:src/probe.css').includes('color: red;'));
  assert(git('show', 'HEAD:src/Probe.astro').includes('color: blue;'));
  assert.equal(
    git('show', 'HEAD:src/browser.ts'),
    'export const title: string = document.title;\n',
  );
  assert.equal(git('show', 'HEAD:src/content/probe.md'), editorial);

  for (const [file, content, rule] of [
    ['src/probe.css', '.probe{colr:red;}\n', 'property-no-unknown'],
    ['src/Probe.astro', '<p>Hello</p>\n<style>.probe{colr:red;}</style>\n', 'property-no-unknown'],
    ['src/broken.js', 'missingValue();\n', 'no-undef'],
    ['src/broken.ts', 'const unused: number = 1;\n', '@typescript-eslint/no-unused-vars'],
    ['src/NoAlt.astro', '<img src="/photo.jpg" />\n', 'alt-text'],
  ]) {
    const head = git('rev-parse', 'HEAD');
    write(file, content);
    git('add', file);
    assert.throws(
      () => git('commit', '--quiet', '-m', 'Must fail'),
      (error) => {
        assert(`${error.stdout}\n${error.stderr}`.includes(rule));
        return true;
      },
    );
    assert.equal(git('rev-parse', 'HEAD'), head);
    assert.equal(git('show', `:${file}`), content, 'Failed checks must restore staged content');
    assert(
      readFileSync(join(directory, 'src/partial file.js'), 'utf8').includes('draft = missingValue'),
    );
    git('restore', '--staged', file);
  }
  console.log(
    'Passed hook checks: formatting, partial staging, editorial exclusions, and lint failure rollback.',
  );
} finally {
  rmSync(directory, { recursive: true, force: true });
}
