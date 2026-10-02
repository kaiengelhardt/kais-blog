# Kai's website

A static Astro website. See the [implementation plans](docs/plans/README.md)
for the agreed scope and milestone progress.

## Local development

Use Node 24 and npm. With nvm installed:

```sh
nvm install
nvm use
npm ci
npm run dev
```

Open the local URL printed by Astro. To check and build the site:

```sh
npm run build
npm run preview
```

The build checks Astro and TypeScript before generating static files in `dist/`.
Preview serves that output locally; it does not deploy it.

In a normal terminal, stop the server with Ctrl+C. If it was started in
background mode (for example, by an agent), use the matching stop command:

```sh
npm run dev -- stop
npm run preview -- stop
```

## Formatting and linting

`npm ci` also installs the pre-commit hook through Husky. Keep npm lifecycle
scripts enabled; after installing with `--ignore-scripts`, run `npm run prepare`.
Node and npm must be available to your Git client, including GUI clients.

On commit, lint-staged formats staged files with Prettier, then checks relevant
files with ESLint (JavaScript, TypeScript, Astro, and accessibility) and Stylelint
(CSS, including Astro style blocks). Formatting is included in the commit;
remaining lint errors block it. Unstaged edits in partially staged files are
temporarily hidden and restored afterward. Formatting applies to the whole
staged file, not just its changed lines.

Article Markdown in `src/content/` retains its authored formatting. Generated
files and the npm lockfile are also excluded from formatting.

| Command              | Purpose                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| `npm run format`     | Format the project.                                                                                    |
| `npm run check`      | Check formatting, lint rules, and types without modifying files.                                       |
| `npm run test:hooks` | Exercise real commits in a temporary repository, including partial staging and failed-commit recovery. |

The hook checks staged files; run `npm run check` for project-wide checks.
`npm run build` still checks types and builds the static site.
