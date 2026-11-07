// Menulis ulang blok warna di src/styles/tokens.css dari src/lib/palette.js
import { readFileSync, writeFileSync } from 'node:fs';
import { tokensCss } from '../src/lib/palette.js';
const file = new URL('../src/styles/tokens.css', import.meta.url);
const css = readFileSync(file, 'utf8');
const out = css.replace(/(\/\* palette:start \*\/\n)[\s\S]*?(\n\s*\/\* palette:end \*\/)/, `$1${tokensCss()}$2`);
writeFileSync(file, out);
console.log('tokens.css diperbarui');
