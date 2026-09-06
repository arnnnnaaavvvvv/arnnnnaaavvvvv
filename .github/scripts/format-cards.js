const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '..', 'profile-summary-card-output', 'tokyonight');
const streakStatsPath = path.join(dir, 'streak-stats.svg');
const statsCardPath = path.join(dir, '3-stats.svg');

function createThreeColumnStreakSvg(totalContributions = '171', totalRange = 'Apr 2, 2022 - Present', currentStreak = '6', currentRange = 'Aug 25 - Aug 30', longestStreak = '6', longestRange = 'Aug 25 - Aug 30') {
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

async function fetchGraphQLContributions(username, token) {
  if (!token) return null;
  try {
    const currentYear = new Date().getFullYear();
    let total = 0;
    for (let year = 2022; year <= currentYear; year++) {
      const from = `${year}-01-01T00:00:00Z`;
      const to = `${year}-12-31T23:59:59Z`;
      const query = `
        query($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
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
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'node-fetch'
        },
        body: JSON.stringify({ query, variables: { login: username, from, to } })
      });
      if (res.ok) {
        const data = await res.json();
        const yearCount = data?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0;
        total += yearCount;
      }
    }
    return total > 0 ? String(total) : null;
  } catch (e) {
    return null;
  }
}

async function processCards() {
  const username = process.env.GH_USERNAME || (process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[0] : 'arnnnnaaavvvvv');
  const token = process.env.GITHUB_TOKEN || '';

  // 1. Fetch live streak & contributions metrics
  let currentStreak = '6';
  let currentRange = 'Aug 25 - Aug 30';
  let longestStreak = '6';
  let longestRange = 'Aug 25 - Aug 30';
  let totalContributions = '171';
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
      if (totalMatch && Number(totalMatch[1]) >= Number(totalContributions)) {
        totalContributions = totalMatch[1];
      }

      const totalRangeMatch = rawSvg.match(/<!-- Total Contributions range -->[\s\S]*?<text[^>]*>\s*([^\n<]+)\s*<\/text>/i);
      if (totalRangeMatch) totalRange = totalRangeMatch[1].trim();
    }
  } catch (err) {
    console.warn('Using fallback streak values:', err.message);
  }

  // 2. Query GitHub GraphQL directly if token available
  const gqlTotal = await fetchGraphQLContributions(username, token);
  if (gqlTotal && Number(gqlTotal) >= Number(totalContributions)) {
    totalContributions = gqlTotal;
  }

  // 3. Fetch live commits across all repos (public + private)
  let calculatedCommits = 310;
  try {
    const headers = {
      'User-Agent': 'node-fetch',
      'Accept': 'application/vnd.github+json'
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    let repos = [];
    let rPage = 1;
    while (true) {
      const reposUrl = token
        ? `https://api.github.com/user/repos?per_page=100&affiliation=owner,collaborator&page=${rPage}`
        : `https://api.github.com/users/${username}/repos?per_page=100&page=${rPage}`;
      const reposRes = await fetch(reposUrl, { headers });
      if (!reposRes.ok) break;
      const list = await reposRes.json();
      if (!Array.isArray(list) || list.length === 0) break;
      repos = repos.concat(list);
      if (list.length < 100) break;
      rPage++;
    }

    if (repos.length > 0) {
      let commitSum = 0;
      for (const repo of repos) {
        let page = 1;
        while (true) {
          const owner = repo.owner?.login || username;
          const cRes = await fetch(`https://api.github.com/repos/${owner}/${repo.name}/commits?per_page=100&page=${page}`, { headers });
          if (!cRes.ok) break;
          const cList = await cRes.json();
          if (!Array.isArray(cList) || cList.length === 0) break;
          for (const c of cList) {
            const aLogin = c.author?.login?.toLowerCase();
            const cLogin = c.committer?.login?.toLowerCase();
            const aEmail = c.commit?.author?.email?.toLowerCase();
            const aName = c.commit?.author?.name?.toLowerCase();
            if (
              aLogin === username.toLowerCase() ||
              cLogin === username.toLowerCase() ||
              (aEmail && (aEmail.includes('arnav') || aEmail.includes('arnnnnaaavvvvv'))) ||
              (aName && aName.includes('arnav'))
            ) {
              commitSum++;
            }
          }
          if (cList.length < 100) break;
          page++;
        }
      }
      if (commitSum > 0) calculatedCommits = commitSum;
    }
  } catch (err) {
    console.warn('Using fallback commits count:', err.message);
  }

function createStatsCardSvg(stars = '40', commits = '310', prs = '28', issues = '1', contributed = '8') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="340" height="200" viewBox="0 0 340 200"><style>* {
          font-family: 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif
        }</style><g class="gpsc-root"><rect x="1" y="1" rx="5" ry="5" height="99%" width="99.41176470588235%" stroke="#1a1b27" stroke-width="1" fill="#1a1b27" stroke-opacity="1"></rect><text x="30" y="40" class="gpsc-item" style="--gpsc-i: 0; font-size: 22px; fill: #70a5fd;">Stats</text><g transform="translate(0,40)"><g transform="translate(30,20)"><g class="gpsc-item" style="--gpsc-i: 0;"><g transform="translate(0,0)" width="14" height="14" fill="#bf91f3"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></g></g><g class="gpsc-item" style="--gpsc-i: 1;"><g transform="translate(0,25.2)" width="14" height="14" fill="#bf91f3"><path fill-rule="evenodd" d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z"></path></g></g><g class="gpsc-item" style="--gpsc-i: 2;"><g transform="translate(0,50.4)" width="14" height="14" fill="#bf91f3"><path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"></path></g></g><g class="gpsc-item" style="--gpsc-i: 3;"><g transform="translate(0,75.60000000000001)" width="14" height="14" fill="#bf91f3"><path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"></path></g></g><g class="gpsc-item" style="--gpsc-i: 4;"><g transform="translate(0,100.8)" width="14" height="14" fill="#bf91f3"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></g></g><text x="21" y="14" class="gpsc-item" style="--gpsc-i: 0; fill: #38bdae; font-size: 14px;">Total Stars:</text><text x="21" y="39.2" class="gpsc-item" style="--gpsc-i: 1; fill: #38bdae; font-size: 14px;">Total Commits:</text><text x="21" y="64.4" class="gpsc-item" style="--gpsc-i: 2; fill: #38bdae; font-size: 14px;">Total PRs:</text><text x="21" y="89.60000000000001" class="gpsc-item" style="--gpsc-i: 3; fill: #38bdae; font-size: 14px;">Total Issues:</text><text x="21" y="114.8" class="gpsc-item" style="--gpsc-i: 4; fill: #38bdae; font-size: 14px;">Contributed to:</text><text x="130" y="14" class="gpsc-item" style="--gpsc-i: 0; fill: #38bdae; font-size: 14px;">${stars}</text><text x="130" y="39.2" class="gpsc-item" style="--gpsc-i: 1; fill: #38bdae; font-size: 14px;">${commits}</text><text x="130" y="64.4" class="gpsc-item" style="--gpsc-i: 2; fill: #38bdae; font-size: 14px;">${prs}</text><text x="130" y="89.60000000000001" class="gpsc-item" style="--gpsc-i: 3; fill: #38bdae; font-size: 14px;">${issues}</text><text x="130" y="114.8" class="gpsc-item" style="--gpsc-i: 4; fill: #38bdae; font-size: 14px;">${contributed}</text></g><g transform="translate(220,20)"><g transform="scale(6)" style="fill: #bf91f3;"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></g></g></g></g></svg>`;
}

  // 4. Process 3-stats.svg
  if (fs.existsSync(statsCardPath)) {
    let statsSvg = fs.readFileSync(statsCardPath, 'utf8');
    statsSvg = statsSvg.replace(/(<text x="130" y="39\.2" class="gpsc-item"[^>]*>)[0-9]+(<\/text>)/, `$1${calculatedCommits}$2`);
    fs.writeFileSync(statsCardPath, statsSvg.trim(), 'utf8');
  } else {
    const statsSvg = createStatsCardSvg('40', String(calculatedCommits), '28', '1', '8');
    fs.writeFileSync(statsCardPath, statsSvg.trim(), 'utf8');
  }
  console.log(`Successfully updated 3-stats.svg (Total Commits: ${calculatedCommits})`);

  // 5. Generate clean 3-column Streak & Total Contributions Card
  const cleanStreakSvg = createThreeColumnStreakSvg(totalContributions, totalRange, currentStreak, currentRange, longestStreak, longestRange);
  fs.writeFileSync(streakStatsPath, cleanStreakSvg.trim(), 'utf8');
  console.log(`Successfully generated 3-column streak & total contributions card (Total: ${totalContributions}, Current: ${currentStreak}, Longest: ${longestStreak})`);
}

processCards();
