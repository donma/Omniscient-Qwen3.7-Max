const fs = require('fs');
const path = require('path');
const d = path.join(__dirname, 'templates');
const dirs = fs.readdirSync(d).filter(f => fs.statSync(path.join(d, f)).isDirectory()).sort();
console.log(`Total templates: ${dirs.length}\n`);
let issues = [];
dirs.forEach(t => {
  const dir = path.join(d, t);
  const files = [];
  function countFiles(dp) {
    fs.readdirSync(dp).forEach(f => {
      const fp = path.join(dp, f);
      if (fs.statSync(fp).isDirectory()) countFiles(fp);
      else files.push(fp);
    });
  }
  countFiles(dir);
  const css = fs.readFileSync(path.join(dir, 'assets', 'css', 'style.css'), 'utf8');
  const idx = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  const accent = css.match(/--accent:\s*(#[0-9a-fA-F]+)/);
  const font = css.match(/--font-heading:\s*([^;\n]+)/);
  const idxLines = idx.split('\n').length;
  const cssLines = css.split('\n').length;
  const hasLang = idx.includes('lang="zh-Hant"');
  const hasOG = idx.includes('og:title');
  const hasSchema = idx.includes('schema.org');
  const hasBS = idx.includes('bootstrap@5.3.3');
  const hasBI = idx.includes('bootstrap-icons@1.11.3');
  if (files.length !== 20) issues.push(`${t}: ${files.length} files (expected 20)`);
  if (idxLines < 100) issues.push(`${t}: index.html only ${idxLines} lines`);
  if (cssLines < 500) issues.push(`${t}: style.css only ${cssLines} lines`);
  if (!hasLang) issues.push(`${t}: missing lang="zh-Hant"`);
  if (!hasOG) issues.push(`${t}: missing OG tags`);
  if (!hasSchema) issues.push(`${t}: missing Schema.org`);
  console.log(`${t.padEnd(38)} files:${files.length} idx:${String(idxLines).padStart(4)} css:${String(cssLines).padStart(4)} accent:${(accent?accent[1]:'?').padEnd(10)} font:${(font?font[1].trim().slice(0,28):'?')}`);
});
console.log(`\nIssues: ${issues.length}`);
issues.forEach(i => console.log('  - ' + i));
