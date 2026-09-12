const fs = require("fs");
const path = require("path");

const assetFiles = [
  path.join(__dirname, "../../assets/github-contribution-grid-snake-dark.svg"),
  path.join(__dirname, "../../assets/github-contribution-grid-snake.svg"),
];

for (const filepath of assetFiles) {
  if (!fs.existsSync(filepath)) continue;

  let content = fs.readFileSync(filepath, "utf-8");

  // 1. Initial resting state inside row 0 instead of -16px
  content = content.replace(
    /\.s\.s0\{transform:translate\(0px,-16px\);animation-name:s0\}/g,
    ".s.s0{transform:translate(0px,0px);animation-name:s0}"
  );
  content = content.replace(
    /\.s\.s1\{transform:translate\(16px,-16px\);animation-name:s1\}/g,
    ".s.s1{transform:translate(16px,0px);animation-name:s1}"
  );
  content = content.replace(
    /\.s\.s2\{transform:translate\(32px,-16px\);animation-name:s2\}/g,
    ".s.s2{transform:translate(32px,0px);animation-name:s2}"
  );
  content = content.replace(
    /\.s\.s3\{transform:translate\(48px,-16px\);animation-name:s3\}/g,
    ".s.s3{transform:translate(48px,0px);animation-name:s3}"
  );

  // 2. Clamp any negative y coordinates to 0px
  content = content.replace(
    /translate\(([^,]+)px,-16(?:\.0)?px\)/g,
    "translate($1px,0px)"
  );

  // 3. Clamp right edge x coordinates to inside column 52 (832px)
  content = content.replace(
    /translate\(848(?:\.0)?px,([^)]+)px\)/g,
    "translate(832px,$1px)"
  );

  // 4. Set tight viewBox around the box without huge negative padding
  content = content.replace(/viewBox="[^"]+"/, 'viewBox="-2 -2 852 165"');
  content = content.replace(
    /width="880"\s+height="192"/,
    'width="852" height="165"'
  );

  fs.writeFileSync(filepath, content, "utf-8");
  console.log(`Clamped bounds for ${filepath}`);
}
