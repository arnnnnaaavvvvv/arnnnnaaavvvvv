const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '..', 'profile-summary-card-output', 'tokyonight');
const profileDetailsPath = path.join(dir, '0-profile-details.svg');
const streakStatsPath = path.join(dir, 'streak-stats.svg');

function createTwoColumnStreakSvg(currentStreak = '4', currentRange = 'Aug 25 - Aug 28', longestStreak = '4', longestRange = 'Aug 18 - Aug 21') {
  return `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'
        style='isolation: isolate' viewBox='0 0 340 195' width='340px' height='195px' direction='ltr'>
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
            <rect width='340' height='195' rx='4.5'/>
        </clipPath>
        <mask id='mask_out_ring_behind_fire'>
            <rect width='340' height='195' fill='white'/>
            <ellipse id='mask-ellipse' cx='85' cy='32' rx='13' ry='18' fill='black'/>
        </mask>
    </defs>
    <g clip-path='url(#outer_rectangle)'>
        <g style='isolation: isolate'>
            <rect stroke='#000000' stroke-opacity='0' fill='#1A1B27' rx='4.5' x='0.5' y='0.5' width='339' height='194'/>
        </g>
        <g style='isolation: isolate'>
            <line x1='170' y1='28' x2='170' y2='170' vector-effect='non-scaling-stroke' stroke-width='1' stroke='#2A2B3D' stroke-linejoin='miter' stroke-linecap='square' stroke-miterlimit='3'/>
        </g>
        <!-- Column 1: Current Streak -->
        <g style='isolation: isolate'>
            <g transform='translate(85, 108)'>
                <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#BF91F3' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='14px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 0.9s'>
                    Current Streak
                </text>
            </g>
            <g transform='translate(85, 145)'>
                <text x='0' y='21' stroke-width='0' text-anchor='middle' fill='#38BDAE' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='12px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 0.9s'>
                    ${currentRange}
                </text>
            </g>
            <g mask='url(#mask_out_ring_behind_fire)'>
                <circle cx='85' cy='71' r='40' fill='none' stroke='#70A5FD' stroke-width='5' style='opacity: 0; animation: fadein 0.5s linear forwards 0.4s'></circle>
            </g>
            <g transform='translate(85, 19.5)' stroke-opacity='0' style='opacity: 0; animation: fadein 0.5s linear forwards 0.6s'>
                <path d='M -12 -0.5 L 15 -0.5 L 15 23.5 L -12 23.5 L -12 -0.5 Z' fill='none'/>
                <path d='M 1.5 0.67 C 1.5 0.67 2.24 3.32 2.24 5.47 C 2.24 7.53 0.89 9.2 -1.17 9.2 C -3.23 9.2 -4.79 7.53 -4.79 5.47 L -4.76 5.11 C -6.78 7.51 -8 10.62 -8 13.99 C -8 18.41 -4.42 22 0 22 C 4.42 22 8 18.41 8 13.99 C 8 8.6 5.41 3.79 1.5 0.67 Z M -0.29 19 C -2.07 19 -3.51 17.6 -3.51 15.86 C -3.51 14.24 -2.46 13.1 -0.7 12.74 C 1.07 12.38 2.9 11.53 3.92 10.16 C 4.31 11.45 4.51 12.81 4.51 14.2 C 4.51 16.85 2.36 19 -0.29 19 Z' fill='#70A5FD' stroke-opacity='0'/>
            </g>
            <g transform='translate(85, 48)'>
                <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#BF91F3' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='28px' font-style='normal' style='animation: currstreak 0.6s linear forwards'>
                    ${currentStreak}
                </text>
            </g>
        </g>
        <!-- Column 2: Longest Streak -->
        <g style='isolation: isolate'>
            <g transform='translate(255, 48)'>
                <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#70A5FD' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='28px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 1.2s'>
                    ${longestStreak}
                </text>
            </g>
            <g transform='translate(255, 84)'>
                <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#70A5FD' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='14px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 1.3s'>
                    Longest Streak
                </text>
            </g>
            <g transform='translate(255, 114)'>
                <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#38BDAE' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='12px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 1.4s'>
                    ${longestRange}
                </text>
            </g>
        </g>
    </g>
</svg>`;
}

async function processCards() {
  const username = process.env.USERNAME || 'arnnnnaaavvvvv';

  // 1. Process 0-profile-details.svg
  if (fs.existsSync(profileDetailsPath)) {
    let svg = fs.readFileSync(profileDetailsPath, 'utf8');

    if (svg.includes('<<<<<<<') || !svg.trim().endsWith('</svg>')) {
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

  // 2. Fetch live streak metrics and create clean 2-column Streak Card
  let currentStreak = '4';
  let currentRange = 'Aug 25 - Aug 28';
  let longestStreak = '4';
  let longestRange = 'Aug 18 - Aug 21';

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
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
    }
  } catch (err) {
    console.warn('Using default/cached streak values:', err.message);
  }

  const cleanStreakSvg = createTwoColumnStreakSvg(currentStreak, currentRange, longestStreak, longestRange);
  fs.writeFileSync(streakStatsPath, cleanStreakSvg.trim(), 'utf8');
  console.log(`Successfully generated clean 2-column streak card (Current: ${currentStreak}, Longest: ${longestStreak})`);
}

processCards();
