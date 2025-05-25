const fs = require("fs");
const path = require("path");

const targetDir = "./app"; // change if needed

function processFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  const updated = content.replace(/>[^<]*'[^<]*</g, (match) =>
    match.replace(/'/g, "&apos;"),
  );

  if (content !== updated) {
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`✅ Updated: ${filePath}`);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith(".tsx")) {
      processFile(fullPath);
    }
  });
}

walk(targetDir);
