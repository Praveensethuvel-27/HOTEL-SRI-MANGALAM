const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\7fb186b5-f067-44ca-832a-5c420cfc34c1';
const destDir = 'd:\\HOTEL SRI MANGALAM\\src\\assets';

const files = [
  { src: 'media__1782491295958.jpg', dest: 'room_deluxe_1.jpg' },
  { src: 'media__1782491305303.jpg', dest: 'room_executive_1.jpg' },
  { src: 'media__1782491305310.jpg', dest: 'room_executive_2.jpg' },
  { src: 'media__1782491305318.jpg', dest: 'room_twin_1.jpg' },
  { src: 'media__1782491305326.jpg', dest: 'room_family_1.jpg' }
];

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

files.forEach(file => {
  const srcPath = path.join(srcDir, file.src);
  const destPath = path.join(destDir, file.dest);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file.src} to ${file.dest}`);
  } else {
    console.error(`Source file not found: ${srcPath}`);
  }
});
