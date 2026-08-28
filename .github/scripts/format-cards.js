const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '..', 'profile-summary-card-output', 'tokyonight');
const profileDetailsPath = path.join(dir, '0-profile-details.svg');
const streakStatsPath = path.join(dir, 'streak-stats.svg');

async function processCards() {
  // 1. Process 0-profile-details.svg
  if (fs.existsSync(profileDetailsPath)) {
    let svg = fs.readFileSync(profileDetailsPath, 'utf8');

    // Remove any merge conflict markers if present
    if (svg.includes('<<<<<<<')) {
      const parts = svg.split('=======');
      if (parts.length > 1) {
        svg = parts[parts.length - 1].replace(/>>>>>>>[^\n]*\n?/g, '');
        if (!svg.startsWith('<svg')) {
          svg = '<svg xmlns="http://www.w3.org/2000/svg" width="700" height="200" viewBox="0 0 700 200"><style>* {\n          font-family: \'Segoe UI\', Ubuntu, "Helvetica Neue", Sans-Serif\n' + svg;
        }
      }
    }

    // Replace the truncated arnnnnnaaavvvvv (Arna...) title with a clean professional header
    svg = svg.replace(/<text x="30" y="40"[^>]*>.*?<\/text>/, '<text x="30" y="40" class="gpsc-item" style="--gpsc-i: 0; font-size: 20px; font-weight: 600; fill: #70a5fd;">Arnav Singh &bull; Contribution Activity</text>');
    
    fs.writeFileSync(profileDetailsPath, svg.trim(), 'utf8');
    console.log('Successfully formatted 0-profile-details.svg');
  }

  // 2. Fetch and save streak-stats.svg
  try {
    const streakUrl = 'https://streak-stats.demolab.com?user=arnnnnaaavvvvv&theme=tokyonight&hide_border=true';
    const response = await fetch(streakUrl);
    if (response.ok) {
      const streakSvg = await response.text();
      if (streakSvg.includes('<svg')) {
        fs.writeFileSync(streakStatsPath, streakSvg.trim(), 'utf8');
        console.log('Successfully downloaded and cached streak-stats.svg');
      }
    }
  } catch (err) {
    console.warn('Could not fetch streak stats live:', err.message);
  }
}

processCards();
