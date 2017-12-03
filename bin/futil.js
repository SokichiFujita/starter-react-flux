const fs = require('fs');
const util = require('util');
const path = require('path');

module.exports.puts = (error, stdout, stderr) => { 
  util.puts(stdout);
  util.puts(stderr);
  util.puts(error);
}

module.exports.getFileNames = (dir) => {
  if (fs.existsSync(dir)) { 
    return fs.readdirSync(dir);
  } else {
    console.error('Error: Can not get filename.');
    process.exit(1);
  }
  return [];
}

module.exports.createDirectories = (dirs) => {
  dirs.map(function(dir) {
    if (!fs.existsSync(dir)) { 
      fs.mkdirSync(dir); 
      console.log('Create:', dir);
    } else {
      console.error('Error: Cannot create the directories');
      process.exit(1);
    }
  })
}

module.exports.readFile = (file) => {
  const fname = path.join(__dirname, file);
  if (fs.existsSync(fname)) { 
    const content = fs.readFileSync(fname);
    console.log('Read:', fname);
    return content; 
  } else {
    console.error('Error: The file does not exist', fname);
    process.exit(1);
  }
}

module.exports.createFile = (file, content) => {
  if (!fs.existsSync(file)) { 
    fs.writeFileSync(file, content);
    console.log('Create:', file);
  } else {
    console.error('Error: Cannot create the file', file, content);
    process.exit(1);
  }
}

module.exports.createJSON = (file, json) => {
  if (!fs.existsSync(file)) { 
    fs.writeFileSync(file, JSON.stringify(json, null, "  "));
    console.log('Create:', file);
  } else {
    console.log('Error: Cannot create the file', file, json);
    process.exit(1);
  }
}

module.exports.fixJSON = (file, key, value) => {
  try {
    var json = JSON.parse(fs.readFileSync(file));
    json[key] = value;
    fs.writeFileSync(file, JSON.stringify(json, null, "  "));
    console.log('Fix:', file, 'Key:', key);
  } catch (e) {
    console.log('Error: Cannot fix the JSON', file, key, value);
  }
}


