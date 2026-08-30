const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '..', 'profile-summary-card-output', 'tokyonight');
const profileDetailsPath = path.join(dir, '0-profile-details.svg');
const streakStatsPath = path.join(dir, 'streak-stats.svg');
const statsCardPath = path.join(dir, '3-stats.svg');

function createThreeColumnStreakSvg(totalContributions = '166', totalRange = 'Apr 2, 2022 - Present', currentStreak = '6', currentRange = 'Aug 25 - Aug 30', longestStreak = '6', longestRange = 'Aug 25 - Aug 30') {
  return `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'
        style='isolation: isolate' viewBox='0 0 495 195' width='495px' height='195px' direction='ltr'>
    <style>
        @keyframes currstreak {
            0% { font-size: 3px; opacity: 0.2; }
            80% { font-size: 34px; opacity: 1; }
            100% { font-size: 28px; opacity: 1; }
        }
        @keyframes fadein {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
    </style>
    <defs>
        <clipPath id='outer_rectangle'>
            <rect width='495' height='195' rx='4.5'/>
        </clipPath>
        <mask id='mask_out_ring_behind_fire'>
            <rect width='495' height='195' fill='white'/>
            <ellipse id='mask-ellipse' cx='247.5' cy='32' rx='13' ry='18' fill='black'/>
        </mask>
    </defs>
    <g clip-path='url(#outer_rectangle)'>
        <g style='isolation: isolate'>
            <rect stroke='#000000' stroke-opacity='0' fill='#1A1B27' rx='4.5' x='0.5' y='0.5' width='494' height='194'/>
        </g>
        <g style='isolation: isolate'>
            <line x1='165' y1='28' x2='165' y2='170' vector-effect='non-scaling-stroke' stroke-width='1' stroke='#2A2B3D' stroke-linejoin='miter' stroke-linecap='square' stroke-miterlimit='3'/>
            <line x1='330' y1='28' x2='330' y2='170' vector-effect='non-scaling-stroke' stroke-width='1' stroke='#2A2B3D' stroke-linejoin='miter' stroke-linecap='square' stroke-miterlimit='3'/>
        </g>
        <!-- Column 1: Total Contributions -->
        <g style='isolation: isolate'>
            <g transform='translate(82.5, 48)'>
                <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#70A5FD' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='28px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 0.6s'>
                    ${totalContributions}
                </text>
            </g>
            <g transform='translate(82.5, 84)'>
                <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#70A5FD' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='14px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 0.7s'>
                    Total Contributions
                </text>
            </g>
            <g transform='translate(82.5, 114)'>
                <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#38BDAE' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='12px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 0.8s'>
                    ${totalRange}
                </text>
            </g>
        </g>
        <!-- Column 2: Current Streak -->
        <g style='isolation: isolate'>
            <g transform='translate(247.5, 108)'>
                <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#BF91F3' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='14px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 0.9s'>
                    Current Streak
                </text>
            </g>
            <g transform='translate(247.5, 145)'>
                <text x='0' y='21' stroke-width='0' text-anchor='middle' fill='#38BDAE' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='12px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 0.9s'>
                    ${currentRange}
                </text>
            </g>
            <g mask='url(#mask_out_ring_behind_fire)'>
                <circle cx='247.5' cy='71' r='40' fill='none' stroke='#70A5FD' stroke-width='5' style='opacity: 0; animation: fadein 0.5s linear forwards 0.4s'></circle>
            </g>
            <g transform='translate(247.5, 19.5)' stroke-opacity='0' style='opacity: 0; animation: fadein 0.5s linear forwards 0.6s'>
                <path d='M -12 -0.5 L 15 -0.5 L 15 23.5 L -12 23.5 L -12 -0.5 Z' fill='none'/>
                <path d='M 1.5 0.67 C 1.5 0.67 2.24 3.32 2.24 5.47 C 2.24 7.53 0.89 9.2 -1.17 9.2 C -3.23 9.2 -4.79 7.53 -4.79 5.47 L -4.76 5.11 C -6.78 7.51 -8 10.62 -8 13.99 C -8 18.41 -4.42 22 0 22 C 4.42 22 8 18.41 8 13.99 C 8 8.6 5.41 3.79 1.5 0.67 Z M -0.29 19 C -2.07 19 -3.51 17.6 -3.51 15.86 C -3.51 14.24 -2.46 13.1 -0.7 12.74 C 1.07 12.38 2.9 11.53 3.92 10.16 C 4.31 11.45 4.51 12.81 4.51 14.2 C 4.51 16.85 2.36 19 -0.29 19 Z' fill='#70A5FD' stroke-opacity='0'/>
            </g>
            <g transform='translate(247.5, 48)'>
                <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#BF91F3' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='28px' font-style='normal' style='animation: currstreak 0.6s linear forwards'>
                    ${currentStreak}
                </text>
            </g>
        </g>
        <!-- Column 3: Longest Streak -->
        <g style='isolation: isolate'>
            <g transform='translate(412.5, 48)'>
                <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#70A5FD' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='28px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 1.2s'>
                    ${longestStreak}
                </text>
            </g>
            <g transform='translate(412.5, 84)'>
                <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#70A5FD' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='14px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 1.3s'>
                    Longest Streak
                </text>
            </g>
            <g transform='translate(412.5, 114)'>
                <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#38BDAE' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='12px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 1.4s'>
                    ${longestRange}
                </text>
            </g>
        </g>
    </g>
</svg>`;
}

async function processCards() {
  const username = process.env.GH_USERNAME || (process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[0] : 'arnnnnaaavvvvv');

  // 1. Fetch live streak & contributions metrics
  let currentStreak = '6';
  let currentRange = 'Aug 25 - Aug 30';
  let longestStreak = '6';
  let longestRange = 'Aug 25 - Aug 30';
  let totalContributions = '166';
  let totalRange = 'Apr 2, 2022 - Present';

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const streakUrl = `https://streak-stats.demolab.com/?user=${username}&theme=tokyonight&hide_border=true`;
    const response = await fetch(streakUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (response.ok) {
      const rawSvg = await response.text();
      const currMatch = rawSvg.match(/<!-- Current Streak big number -->[\s\S]*?<text[^>]*>\s*([0-9]+)\s*<\/text>/i);
      if (currMatch) currentStreak = currMatch[1];

      const currRangeMatch = rawSvg.match(/<!-- Current Streak range -->[\s\S]*?<text[^>]*>\s*([^\n<]+)\s*<\/text>/i);
      if (currRangeMatch) currentRange = currRangeMatch[1].trim();

      const longMatch = rawSvg.match(/<!-- Longest Streak big number -->[\s\S]*?<text[^>]*>\s*([0-9]+)\s*<\/text>/i);
      if (longMatch) longestStreak = longMatch[1];

      const longRangeMatch = rawSvg.match(/<!-- Longest Streak range -->[\s\S]*?<text[^>]*>\s*([^\n<]+)\s*<\/text>/i);
      if (longRangeMatch) longestRange = longRangeMatch[1].trim();

      const totalMatch = rawSvg.match(/<!-- Total Contributions big number -->[\s\S]*?<text[^>]*>\s*([0-9]+)\s*<\/text>/i);
      if (totalMatch) totalContributions = totalMatch[1];

      const totalRangeMatch = rawSvg.match(/<!-- Total Contributions range -->[\s\S]*?<text[^>]*>\s*([^\n<]+)\s*<\/text>/i);
      if (totalRangeMatch) totalRange = totalRangeMatch[1].trim();
    }
  } catch (err) {
    console.warn('Using fallback streak values:', err.message);
  }

  // 2. Fetch live commits across repos
  let calculatedCommits = 215;
  try {
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos)) {
        let commitSum = 0;
        for (const repo of repos) {
          let page = 1;
          while (true) {
            const cRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100&page=${page}`);
            if (!cRes.ok) break;
            const cList = await cRes.json();
            if (!Array.isArray(cList) || cList.length === 0) break;
            commitSum += cList.length;
            if (cList.length < 100) break;
            page++;
          }
        }
        if (commitSum > 0) calculatedCommits = commitSum;
      }
    }
  } catch (err) {
    console.warn('Using cached commits count:', err.message);
  }

  // 3. Process 3-stats.svg
  if (fs.existsSync(statsCardPath)) {
    let statsSvg = fs.readFileSync(statsCardPath, 'utf8');
    statsSvg = statsSvg.replace(/(<text x="130" y="39\.2" class="gpsc-item"[^>]*>)[0-9]+(<\/text>)/, `$1${calculatedCommits}$2`);
    fs.writeFileSync(statsCardPath, statsSvg.trim(), 'utf8');
    console.log(`Successfully updated 3-stats.svg (Total Commits: ${calculatedCommits})`);
  }

  // 4. Generate clean 3-column Streak & Total Contributions Card
  const cleanStreakSvg = createThreeColumnStreakSvg(totalContributions, totalRange, currentStreak, currentRange, longestStreak, longestRange);
  fs.writeFileSync(streakStatsPath, cleanStreakSvg.trim(), 'utf8');
  console.log(`Successfully generated 3-column streak & total contributions card (Total: ${totalContributions}, Current: ${currentStreak}, Longest: ${longestStreak})`);
}

processCards();
