const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

const srcDir = path.join(__dirname, '../src');
const publicDir = path.join(__dirname, '../public');
const distDir = path.join(__dirname, '../dist');

const css = ReadFile(distDir, 'styles.css');
const js = ReadFile(distDir, 'script.js');
const html = ReadFile(srcDir, 'index.html');

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
    WriteFile(distDir, 'index.html', minifiedHtml);
});
// Copy public dir
CopyDir(publicDir,distDir);

// Cleanup
DeleteFile(distDir, 'script.js');
DeleteFile(distDir, 'styles.css');


// Helpers
function DeleteFile(folder, file) {
    fs.unlinkSync(path.join(folder, file));
}
function ReadFile(folder, file) {
    return fs.readFileSync(path.join(folder, file), 'utf8');
}
function WriteFile(folder, file, data) {
    fs.writeFileSync(path.join(folder, file), data, 'utf8');
}
function CopyFile(srcFolder, srcFile, destFolder, destFile) {
    fs.copyFileSync(
        path.join(srcFolder, srcFile),
        path.join(destFolder, destFile)
    );
}
function CopyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      CopyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

