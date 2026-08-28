const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', '..', 'profile-summary-card-output', 'tokyonight', '0-profile-details.svg');

if (fs.existsSync(filePath)) {
  let svg = fs.readFileSync(filePath, 'utf8');
  // Replace the truncated arnnnnnaaavvvvv (Arna...) title with a clean professional header
  svg = svg.replace(/<text x="30" y="40"[^>]*>.*?<\/text>/, '<text x="30" y="40" class="gpsc-item" style="--gpsc-i: 0; font-size: 20px; font-weight: 600; fill: #70a5fd;">Arnav Singh &bull; Contribution Activity</text>');
  fs.writeFileSync(filePath, svg, 'utf8');
  console.log('Successfully formatted 0-profile-details.svg header.');
} else {
  console.warn('File not found:', filePath);
}
