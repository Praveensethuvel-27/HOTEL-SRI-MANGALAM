import fs from 'fs';
import path from 'path';

const searchTerms = ['Sri Mangalam', 'Hotel Sri Mangalam', 'Hotel Mangalam', 'executive', 'family', 'unsplash'];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        results = results.concat(walk(fullPath));
      }
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.css')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = walk('d:\\HOTEL SRI MANGALAM');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    searchTerms.forEach(term => {
      if (line.toLowerCase().includes(term.toLowerCase())) {
        console.log(`${file}:${index + 1} (${term}) -> ${line.trim().substring(0, 100)}`);
      }
    });
  });
});
