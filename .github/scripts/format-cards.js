const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '..', 'profile-summary-card-output', 'tokyonight');
const profileDetailsPath = path.join(dir, '0-profile-details.svg');
const streakStatsPath = path.join(dir, 'streak-stats.svg');

async function getLiveContributions(username) {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    try {
      const query = `
        query($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
      `;
      const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'NodeJS'
        },
        body: JSON.stringify({ query, variables: { login: username } })
      });
      const data = await res.json();
      const count = data?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions;
      if (count !== undefined && count !== null) return count;
    } catch (e) {
      console.warn('GraphQL fetch error:', e.message);
    }
  }

  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`);
    const html = await res.text();
    const matches = [...html.matchAll(/([0-9,]+)\s+contributions\s+in\s+([^\n<]+)/gi)];
    for (const m of matches) {
      const yearOrPeriod = m[2].trim();
      if (/2026|last\s+year/i.test(yearOrPeriod)) {
        return parseInt(m[1].replace(/,/g, ''), 10);
      }
    }
    if (matches.length > 0) {
      return parseInt(matches[0][1].replace(/,/g, ''), 10);
    }
  } catch (e) {
    console.warn('HTML scrape error:', e.message);
  }
  return null;
}

async function processCards() {
  const username = process.env.USERNAME || 'arnnnnaaavvvvv';

  // 1. Process 0-profile-details.svg
  if (fs.existsSync(profileDetailsPath)) {
    let svg = fs.readFileSync(profileDetailsPath, 'utf8');

    if (svg.includes('<<<<<<<') || !svg.trim().endsWith('</svg>')) {
      console.log('Restoring 0-profile-details.svg from git...');
      try {
        svg = execSync('git show HEAD:profile-summary-card-output/tokyonight/0-profile-details.svg', { encoding: 'utf8' });
      } catch (e) {}
    }

    svg = svg.replace(/<text x="30" y="40"[^>]*>.*?<\/text>/, '<text x="30" y="40" class="gpsc-item" style="--gpsc-i: 0; font-size: 20px; font-weight: 600; fill: #70a5fd;">Arnav Singh &#8226; Contribution Activity</text>');

    if (svg.trim().endsWith('</svg>')) {
      fs.writeFileSync(profileDetailsPath, svg.trim(), 'utf8');
      console.log('Successfully formatted 0-profile-details.svg');
    }
  }

  // 2. Fetch, verify and synchronize streak-stats.svg with exact GitHub contributions
  try {
    const streakUrl = `https://streak-stats.demolab.com/?user=${username}&theme=tokyonight&hide_border=true`;
    const response = await fetch(streakUrl);
    if (response.ok) {
      let streakSvg = await response.text();
      if (streakSvg.includes('<svg') && streakSvg.trim().endsWith('</svg>')) {
        const liveCount = await getLiveContributions(username);
        if (liveCount) {
          console.log(`Live GitHub contributions verified: ${liveCount}`);
          // Replace Total Contributions number with exact live GitHub count
          streakSvg = streakSvg.replace(
            /(<!-- Total Contributions big number -->\s*<g transform='translate\([^)]+\)'>\s*<text [^>]*>)\s*([0-9,]+)\s*(<\/text>)/,
            `$1\n                        ${liveCount}\n                    $3`
          );
        }
        fs.writeFileSync(streakStatsPath, streakSvg.trim(), 'utf8');
        console.log('Successfully saved synchronized streak-stats.svg');
      }
    }
  } catch (err) {
    console.warn('Could not sync streak stats:', err.message);
  }
}

processCards();
