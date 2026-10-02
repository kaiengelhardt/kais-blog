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

console.log('Passed build checks: homepage document, sharing metadata, page content, and sitemap.');
