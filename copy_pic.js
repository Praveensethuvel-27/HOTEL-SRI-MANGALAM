import fs from 'fs';
import path from 'path';

const srcDir = 'd:\\HOTEL SRI MANGALAM\\PIC';
const destDir = 'd:\\HOTEL SRI MANGALAM\\public\\images';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'));

files.forEach((file, index) => {
  const srcPath = path.join(srcDir, file);
  const destName = `pic${index + 1}.jpg`;
  const destPath = path.join(destDir, destName);
  
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${file} to ${destName}`);
});
console.log('Finished copying all images!');
