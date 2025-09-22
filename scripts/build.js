const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

const css = fs.readFileSync(path.join(distDir, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(distDir, 'script.js'), 'utf8');

const html = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');

let htmlContent = html
    .replace(/<link\s+[^>]*href=["'][^"']*styles\.css["'][^>]*>/i, `<style>${css}</style>`)
    .replace(/<script\s+src=["'][^"']+["'][^>]*>\s*<\/script>/i, `<script>${js}</script>`);

// Minify HTML
minify(htmlContent, {
    collapseWhitespace: true,
    removeComments: true,
    minifyJS: true,
    minifyCSS: true,
}).then(minifiedHtml => {
    fs.writeFileSync(path.join(distDir, 'index.html'), minifiedHtml);
});