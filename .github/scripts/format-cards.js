const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '..', 'profile-summary-card-output', 'tokyonight');
const profileDetailsPath = path.join(dir, '0-profile-details.svg');
const streakStatsPath = path.join(dir, 'streak-stats.svg');

async function processCards() {
  // 1. Process 0-profile-details.svg
  if (fs.existsSync(profileDetailsPath)) {
    let svg = fs.readFileSync(profileDetailsPath, 'utf8');

    // If svg got truncated or corrupted with conflict markers, restore from git HEAD commit
    if (svg.includes('<<<<<<<') || !svg.trim().endsWith('</svg>')) {
      console.log('Restoring 0-profile-details.svg from git...');
      try {
        svg = execSync('git show HEAD:profile-summary-card-output/tokyonight/0-profile-details.svg', { encoding: 'utf8' });
      } catch (e) {
        // fallback
      }
    }

    // Replace the header cleanly using valid XML numeric entity &#8226;
    svg = svg.replace(/<text x="30" y="40"[^>]*>.*?<\/text>/, '<text x="30" y="40" class="gpsc-item" style="--gpsc-i: 0; font-size: 20px; font-weight: 600; fill: #70a5fd;">Arnav Singh &#8226; Contribution Activity</text>');

    if (!svg.trim().endsWith('</svg>')) {
      console.error('Warning: SVG does not end with </svg>');
    } else {
      fs.writeFileSync(profileDetailsPath, svg.trim(), 'utf8');
      console.log('Successfully formatted 0-profile-details.svg (' + svg.length + ' bytes)');
    }
  }

  // 2. Fetch and save streak-stats.svg
  try {
    const streakUrl = 'https://streak-stats.demolab.com/?user=arnnnnaaavvvvv&theme=tokyonight&hide_border=true';
    const response = await fetch(streakUrl);
    if (response.ok) {
      const streakSvg = await response.text();
      if (streakSvg.includes('<svg') && streakSvg.trim().endsWith('</svg>')) {
        fs.writeFileSync(streakStatsPath, streakSvg.trim(), 'utf8');
        console.log('Successfully downloaded and cached streak-stats.svg (' + streakSvg.length + ' bytes)');
      }
    }
  } catch (err) {
    console.warn('Could not fetch streak stats live:', err.message);
  }
}

processCards();
