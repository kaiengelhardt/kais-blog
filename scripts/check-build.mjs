import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');

assert.match(html, /^<!doctype html>/i);
assert.match(html, /<html lang="en">/);
assert.match(html, /<meta charset="UTF-8">/);
assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1">/);
assert.match(html, /<title>Kai Engelhardt<\/title>/);
assert.match(html, /<meta name="description" content="[^"]+">/);
assert.match(html, /<link rel="canonical" href="https:\/\/kaiengelhardt\.com\/">/);
assert.match(html, /<main\b[^>]*>\s*<h1\b[^>]*>Kai Engelhardt<\/h1>/);

assert.match(html, /<meta property="og:type" content="website">/);
assert.match(html, /<meta property="og:title" content="Kai Engelhardt">/);
assert.match(html, /<meta property="og:url" content="https:\/\/kaiengelhardt\.com\/">/);
assert.match(html, /<meta name="twitter:card" content="summary">/);
assert.match(html, /<meta name="twitter:title" content="Kai Engelhardt">/);
const description = html.match(/<meta name="description" content="([^"]+)">/)[1];
assert.ok(html.includes(`<meta property="og:description" content="${description}">`));
assert.ok(html.includes(`<meta name="twitter:description" content="${description}">`));
assert.match(html, /<link rel="sitemap" href="\/sitemap-index.xml">/);

const sitemapIndex = readFileSync(new URL('../dist/sitemap-index.xml', import.meta.url), 'utf8');
assert.match(sitemapIndex, /<loc>https:\/\/kaiengelhardt\.com\/sitemap-0\.xml<\/loc>/);
const sitemap = readFileSync(new URL('../dist/sitemap-0.xml', import.meta.url), 'utf8');
assert.deepEqual(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
  ['https://kaiengelhardt.com/'],
);

const notFound = readFileSync(new URL('../dist/404.html', import.meta.url), 'utf8');
assert.match(notFound, /<title>Page not found \| Kai Engelhardt<\/title>/);
assert.match(notFound, /<main\b[^>]*>\s*<h1\b[^>]*>404 — Page not found<\/h1>/);
assert.match(notFound, /<a href="\/">Go to the homepage<\/a>/);
assert.match(notFound, /<meta name="robots" content="noindex">/);
assert.doesNotMatch(html, /<meta name="robots" content="noindex">/);

for (const page of [html, notFound]) {
  assert.match(page, /<a\b[^>]*href="#main-content"[^>]*>Skip to content<\/a>/);
  assert.match(page, /<main\b[^>]*id="main-content"[^>]*tabindex="-1"/);
  const header = page.match(/<header\b[^>]*>[\s\S]*?<\/header>/)?.[0];
  const footer = page.match(/<footer\b[^>]*>[\s\S]*?<\/footer>/)?.[0];
  assert.ok(header && footer, 'Every page has the shared header and footer.');
  assert.match(header, /<nav aria-label="Primary"/);
  assert.match(header, /<a href="\/"[^>]*>Home<\/a>/);
  assert.equal(header.includes('aria-current="page"'), page === html);
  assert.doesNotMatch(header, /About|Blog|Resume|Apps/);
  assert.doesNotMatch(footer, /Impressum|Datenschutz/);
  assert.match(footer, /href="https:\/\/mastodon.social\/@kaiengelhardt" rel="me"/);
  assert.match(footer, /href="https:\/\/github.com\/kaiengelhardt"/);
  assert.match(footer, /href="https:\/\/www.linkedin.com\/in\/kaiengelhardt\/"/);
  assert.match(footer, /<select\b[^>]*aria-label="Appearance"/);
}

console.log('Passed build checks: homepage, metadata, sitemap, 404, and shared navigation.');
