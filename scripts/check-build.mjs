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
assert.match(html, /<main>\s*<h1>Kai Engelhardt<\/h1>/);

console.log('Passed build checks: homepage document, metadata, canonical URL, and page content.');
