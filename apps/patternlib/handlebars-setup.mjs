import Handlebars from 'handlebars';
import layouts from 'handlebars-layouts';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export const patternlibContext = {
  site: {
    title: 'Pattern library',
    description: 'Pattern library for regjeringen.no',
    author: ''
  }
};

export function createRenderer(rootDir = __dirname) {
  const prev = process.cwd();
  process.chdir(rootDir);
  try {
    layouts.register(Handlebars);

    const partialsDir = path.join(rootDir, '_partials');
    for (const file of fs.readdirSync(partialsDir)) {
      if (!file.endsWith('.hbs'))
        continue;
      const name = path.basename(file, '.hbs');
      Handlebars.registerPartial(name, fs.readFileSync(path.join(partialsDir, file), 'utf8'));
    }

    const helpersDir = path.join(rootDir, '_helpers');
    for (const file of fs.readdirSync(helpersDir)) {
      if (!file.endsWith('.js') || file === 'handlebars-layouts.js')
        continue;
      const mod = require(path.join(helpersDir, file));
      if (typeof mod.register === 'function')
        mod.register(Handlebars);
    }

    const templateSrc = fs.readFileSync(path.join(rootDir, 'templates', 'index.hbs'), 'utf8');
    return Handlebars.compile(templateSrc);
  }
  finally {
    process.chdir(prev);
  }
}
