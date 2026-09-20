// Run with: node tests/theme-watcher.cjs
const assert = require('node:assert/strict');
let onChange;
global.document = { documentElement: { dataset: { theme: 'light' } } };
global.window = {
    matchMedia(query) {
        assert.equal(query, '(prefers-color-scheme: dark)');
        return { addEventListener(event, callback) {
            assert.equal(event, 'change');
            onChange = callback;
        } };
    }
};
require('../static/js/theme-watcher.js');
onChange({ matches: true });
assert.equal(document.documentElement.dataset.theme, 'dark');
onChange({ matches: false });
assert.equal(document.documentElement.dataset.theme, 'light');
