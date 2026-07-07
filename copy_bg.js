import fs from 'fs';

const sourceBg = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\7fb186b5-f067-44ca-832a-5c420cfc34c1\\media__1783394198371.jpg';
const destBg = 'd:\\HOTEL SRI MANGALAM\\public\\images\\pic1.jpg';

const sourceMap = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\7fb186b5-f067-44ca-832a-5c420cfc34c1\\media__1783394881092.png';
const destMap = 'd:\\HOTEL SRI MANGALAM\\public\\images\\map_screenshot.png';

try {
  fs.copyFileSync(sourceBg, destBg);
  console.log('Successfully copied background image!');
} catch (err) {
  console.error('Error copying background file:', err);
}

try {
  fs.copyFileSync(sourceMap, destMap);
  console.log('Successfully copied map screenshot image!');
} catch (err) {
  console.error('Error copying map screenshot file:', err);
}
