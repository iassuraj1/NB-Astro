const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.match(/\.(js|jsx|ts|tsx)$/)) {
        results.push(file);
      }
    }
  });
  return results;
}

const srcFiles = walk(path.join(__dirname, '../src'));
const pagesFiles = walk(path.join(__dirname, '../pages'));
const apiLogicFiles = walk(path.join(__dirname, '../api_logic')); // also replace inside backend logic if needed
const files = [...srcFiles, ...pagesFiles, ...apiLogicFiles];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  content = content.replace(/http:\/\/localhost:5000\/api/g, '/api');
  content = content.replace(/http:\/\/localhost:5000/g, '');
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
