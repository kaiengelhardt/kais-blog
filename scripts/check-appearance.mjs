import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../src/scripts/appearance.js', import.meta.url), 'utf8');
for (const page of ['index', '404']) {
  const html = readFileSync(new URL(`../dist/${page}.html`, import.meta.url), 'utf8');
  const head = html.slice(0, html.indexOf('</head>'));
  assert.ok(head.includes(`<script>${source}</script>`), 'Restore must be inline in the head.');
  assert.match(html, /id="appearance-control" hidden/);
  assert.match(html, /<label[^>]*for="appearance"/);
}

function loadPage(saved = null, { blockRead = false, blockWrite = false } = {}) {
  const document = new EventTarget();
  document.documentElement = { dataset: {} };
  const control = { hidden: true };
  const select = new EventTarget();
  select.value = 'system';
  document.getElementById = (id) => {
    assert.ok(['appearance-control', 'appearance'].includes(id));
    return id === 'appearance' ? select : control;
  };
  const storage = new Map(saved === null ? [] : [['kai-appearance', saved]]);
  const localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => {
      if (blockWrite) throw new Error('Storage write blocked');
      storage.set(key, value);
    },
    removeItem: (key) => {
      if (blockWrite) throw new Error('Storage write blocked');
      storage.delete(key);
    },
  };
  const context = {
    document,
    get localStorage() {
      if (blockRead) throw new Error('Storage unavailable');
      return localStorage;
    },
  };
  runInNewContext(source, context);
  const expected = !blockRead && ['light', 'dark'].includes(saved) ? saved : undefined;
  assert.equal(document.documentElement.dataset.appearance, expected, 'Restore before DOM ready.');
  assert.equal(control.hidden, true);
  document.dispatchEvent(new Event('DOMContentLoaded'));
  assert.equal(select.value, expected ?? 'system');
  assert.equal(control.hidden, false);
  return {
    storage,
    choose(value) {
      select.value = value;
      select.dispatchEvent(new Event('change'));
      assert.equal(
        document.documentElement.dataset.appearance,
        value === 'system' ? undefined : value,
      );
    },
  };
}

for (const saved of [null, 'light', 'dark', 'invalid']) loadPage(saved);
const page = loadPage();
for (const value of ['dark', 'light']) {
  page.choose(value);
  assert.equal(page.storage.get('kai-appearance'), value);
  loadPage(page.storage.get('kai-appearance'));
}
page.choose('system');
assert.equal(page.storage.has('kai-appearance'), false);
loadPage(page.storage.get('kai-appearance'));
for (const blocked of [{ blockRead: true }, { blockWrite: true }]) {
  const restricted = loadPage('dark', blocked);
  restricted.choose('light');
  restricted.choose('system');
}

console.log(
  'Passed appearance checks: early restore, selection, persistence, and unavailable storage.',
);
