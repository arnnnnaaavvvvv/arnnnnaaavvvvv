const fs = require("fs");
const path = require("path");

const assetFiles = [
  path.join(__dirname, "../../assets/github-contribution-grid-snake-dark.svg"),
  path.join(__dirname, "../../assets/github-contribution-grid-snake.svg"),
];

for (const filepath of assetFiles) {
  if (!fs.existsSync(filepath)) continue;

  let content = fs.readFileSync(filepath, "utf-8");

  // 1. Initial resting state inside row 0 (0px) instead of off-grid (-16px)
  content = content.replace(
    /\.s\.s0\{transform:translate\(0px,-?16px\);animation-name:s0\}/g,
    ".s.s0{transform:translate(0px,0px);animation-name:s0}"
  );
  content = content.replace(
    /\.s\.s1\{transform:translate\(16px,-?16px\);animation-name:s1\}/g,
    ".s.s1{transform:translate(16px,0px);animation-name:s1}"
  );
  content = content.replace(
    /\.s\.s2\{transform:translate\(32px,-?16px\);animation-name:s2\}/g,
    ".s.s2{transform:translate(32px,0px);animation-name:s2}"
  );
  content = content.replace(
    /\.s\.s3\{transform:translate\(48px,-?16px\);animation-name:s3\}/g,
    ".s.s3{transform:translate(48px,0px);animation-name:s3}"
  );

  // 2. Clamp ALL translation coordinates strictly inside the 53 columns (0 to 832px) and 7 rows (0 to 96px)
  // Max Y is 96px (row 6, since 6 * 16 = 96px). Anything > 96px (like 112px) is outside the grid!
  // Min Y is 0px (row 0). Anything < 0px (like -16px) is outside the grid!
  content = content.replace(
    /translate\((-?\d+(?:\.\d+)?)px,(-?\d+(?:\.\d+)?)px\)/g,
    (match, xStr, yStr) => {
      const x = parseFloat(xStr);
      const y = parseFloat(yStr);
      const clampedX = Math.max(0, Math.min(832, x));
      const clampedY = Math.max(0, Math.min(96, y));
      return `translate(${clampedX}px,${clampedY}px)`;
    }
  );

  // 3. Perfect Alignment: Snake segments match grid box dimensions (12x12 at offset 2,2)
  // Grid cells are width="12" height="12" rx="2" ry="2" located at (2, 2)
  // This keeps the snake strictly inside the box boundaries without spilling or bulging
  content = content.replace(
    /<rect class="s s0"[^>]*\/>/,
    '<rect class="s s0" x="2" y="2" width="12" height="12" rx="2.5" ry="2.5"/>'
  );
  content = content.replace(
    /<rect class="s s1"[^>]*\/>/,
    '<rect class="s s1" x="2" y="2" width="12" height="12" rx="2" ry="2"/>'
  );
  content = content.replace(
    /<rect class="s s2"[^>]*\/>/,
    '<rect class="s s2" x="2" y="2" width="12" height="12" rx="2" ry="2"/>'
  );
  content = content.replace(
    /<rect class="s s3"[^>]*\/>/,
    '<rect class="s s3" x="2" y="2" width="12" height="12" rx="2" ry="2"/>'
  );

  // 4. Set tight viewBox around the box
  content = content.replace(/viewBox="[^"]+"/, 'viewBox="-2 -2 852 165"');
  content = content.replace(
    /width="880"\s+height="192"/,
    'width="852" height="165"'
  );

  fs.writeFileSync(filepath, content, "utf-8");
  console.log(`Clamped bounds and perfected alignment for ${filepath}`);
}

