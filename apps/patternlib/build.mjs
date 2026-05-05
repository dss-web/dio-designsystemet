import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRenderer, patternlibContext } from './handlebars-setup.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compile = createRenderer();
const html = compile(patternlibContext);
const outDir = path.join(__dirname, 'dist');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), html);
