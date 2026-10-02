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

Astro starts these servers in the background. Stop them when finished:

```sh
npm run dev -- stop
npm run preview -- stop
```
