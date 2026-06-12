// run.js — Generate 16 website templates
'use strict';
const fs = require('fs');
const path = require('path');
const { templates } = require('./configs.js');
const html = require('./engine.js');
const css = require('./engine-css.js');

const ROOT = path.join(__dirname, 'templates');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

function generateTemplate(t) {
  const dir = path.join(ROOT, `template-${t.num}-${t.slug}`);
  ensureDir(dir);
  ensureDir(path.join(dir, 'assets', 'css'));
  ensureDir(path.join(dir, 'assets', 'js'));
  ensureDir(path.join(dir, 'assets', 'img'));

  const files = {
    'index.html': html.genIndex(t),
    'about.html': html.genAbout(t),
    'services.html': html.genServices(t),
    'service-detail.html': html.genServiceDetail(t),
    'portfolio.html': html.genPortfolio(t),
    'reviews.html': html.genReviews(t),
    'faq.html': html.genFaq(t),
    'booking.html': html.genBooking(t),
    'process.html': html.genProcess(t),
    'blog.html': html.genBlog(t),
    'blog-detail.html': html.genBlogDetail(t),
    'contact.html': html.genContact(t),
    [path.join('assets', 'css', 'style.css')]: css.genStyleCSS(t),
    [path.join('assets', 'css', 'responsive.css')]: css.genResponsiveCSS(t),
    [path.join('assets', 'js', 'main.js')]: css.genMainJS(t),
    'template.json': css.genTemplateJSON(t),
    'tags.json': css.genTagsJSON(t),
    'prompt.md': css.genPromptMD(t),
    'README.md': css.genReadmeMD(t),
    [path.join('assets', 'img', 'image-sources.md')]: css.genImageSourcesMD(t),
  };

  let count = 0;
  for (const [relPath, content] of Object.entries(files)) {
    writeFile(path.join(dir, relPath), content);
    count++;
  }
  return count;
}

// Main execution
console.log('=== Template Generator ===');
console.log(`Generating ${templates.length} templates...\n`);

let totalFiles = 0;
const startTime = Date.now();

templates.forEach((t, idx) => {
  process.stdout.write(`[${String(idx + 1).padStart(2)}] ${t.id} ${t.name} (${t.slug})... `);
  try {
    const count = generateTemplate(t);
    totalFiles += count;
    console.log(`OK (${count} files)`);
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
    console.error(err.stack);
  }
});

const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
console.log(`\n=== Done ===`);
console.log(`Templates: ${templates.length}`);
console.log(`Total files: ${totalFiles}`);
console.log(`Time: ${elapsed}s`);
console.log(`Output: ${ROOT}`);
