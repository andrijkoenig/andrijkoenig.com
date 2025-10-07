import { unlinkSync, readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { minify } from 'html-minifier-terser';
import { minify as minifyJS } from "terser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = join(__dirname, '../src');
const publicDir = join(__dirname, '../public');
const distDir = join(__dirname, '../dist');

const css = ReadFile(distDir, 'styles.css');
const js = ReadFile(distDir, 'script.js');
const html = ReadFile(srcDir, 'index.html');

// minify JS
var options = {
    mangle: {
        toplevel: true,
    },
    nameCache: {}
};
let minifiedJs = await minifyJS(js, options);
console.log("before: " + js.length, "After:" +minifiedJs.code.length);

let htmlContent = html
    .replace(/<link\s+[^>]*href=["'][^"']*styles\.css["'][^>]*>/i, `<style>${css}</style>`)
    .replace(/<script\s+src=["'][^"']+["'][^>]*>\s*<\/script>/i, `<script>${minifiedJs.code}</script>`);

// Minify HTML
minify(htmlContent, {
    collapseWhitespace: true,
    removeComments: true,
    minifyJS: true,
    minifyCSS: false,
}).then(minifiedHtml => {
    WriteFile(distDir, 'index.html', minifiedHtml);
});
// Copy public dir
CopyDir(publicDir,distDir);

// Cleanup
// DeleteFile(distDir, 'script.js');
// DeleteFile(distDir, 'styles.css');


// Helpers
function DeleteFile(folder, file) {
    unlinkSync(join(folder, file));
}
function ReadFile(folder, file) {
    return readFileSync(join(folder, file), 'utf8');
}
function WriteFile(folder, file, data) {
    writeFileSync(join(folder, file), data, 'utf8');
}
function CopyFile(srcFolder, srcFile, destFolder, destFile) {
    copyFileSync(
        join(srcFolder, srcFile),
        join(destFolder, destFile)
    );
}
function CopyDir(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  const entries = readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      CopyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

