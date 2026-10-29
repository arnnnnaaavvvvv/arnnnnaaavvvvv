const fs = require('fs');
const path = require('path');

const PACKAGES = [
  'arnav-audit',
  '@arnavvv/deppulse',
  '@arnavvv/traceguard'
];

async function fetchPackageDownloads(pkg) {
  // Try shields.io first (fast and consistent with badge counts)
  try {
    const res = await fetch(`https://img.shields.io/npm/dt/${pkg}.json`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NPMStatsUpdater/1.0)' },
      signal: AbortSignal.timeout(5000)
    });
    if (res.ok) {
      const data = await res.json();
      const val = parseInt(data.value || data.message, 10);
      if (!isNaN(val)) return val;
    }
  } catch (err) {
    console.warn(`Shields fetch failed for ${pkg}: ${err.message}, trying npm API...`);
  }

  // Fallback to official npm downloads range API
  try {
    const today = new Date().toISOString().slice(0, 10);
    const res = await fetch(`https://api.npmjs.org/downloads/range/2020-01-01:${today}/${pkg}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(8000)
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.downloads)) {
        return data.downloads.reduce((acc, curr) => acc + (curr.downloads || 0), 0);
      }
    }
  } catch (err) {
    console.error(`npm API range fetch failed for ${pkg}: ${err.message}`);
  }

  return 0;
}

function format500Milestone(total) {
  // Step every 500 downloads: e.g. 1000 -> 1k+, 1500 -> 1.5k+, 2000 -> 2k+, 2500 -> 2.5k+, etc.
  const milestone = Math.floor(total / 500) * 500;
  if (milestone >= 1000) {
    const k = milestone / 1000;
    return `${Number.isInteger(k) ? k : k.toFixed(1)}k+`;
  }
  return `${milestone}+`;
}

async function updateReadme() {
  const readmePath = path.join(__dirname, '..', '..', 'README.md');
  if (!fs.existsSync(readmePath)) {
    console.error(`README not found at: ${readmePath}`);
    return;
  }

  console.log(`Querying live download metrics for ${PACKAGES.length} packages...`);
  const results = {};
  let totalDownloads = 0;

  for (const pkg of PACKAGES) {
    const count = await fetchPackageDownloads(pkg);
    results[pkg] = count;
    totalDownloads += count;
    console.log(`  - ${pkg}: ${count} total downloads`);
  }

  console.log(`Total live downloads across all packages: ${totalDownloads}`);

  const milestoneStr = format500Milestone(totalDownloads);
  const milestoneBadgeVal = milestoneStr.replace('+', '%2B');
  console.log(`Milestone tier (updated every 500 downloads): ${milestoneStr} (badge value: ${milestoneBadgeVal})`);

  let content = fs.readFileSync(readmePath, 'utf8');

  // 1. Update Total NPM Downloads badge
  const totalDownloadsRegex = /Total%20NPM%20Downloads-[^&"'\s-]+-CB3837/gi;
  const newTotalBadge = `Total%20NPM%20Downloads-${milestoneBadgeVal}-CB3837`;
  if (totalDownloadsRegex.test(content)) {
    content = content.replace(totalDownloadsRegex, newTotalBadge);
    console.log(`Updated Total NPM Downloads badge to: ${newTotalBadge}`);
  }

  // 2. Update Packages Published badge
  const publishedRegex = /Packages%20Published-\d+-0284c7/gi;
  const newPublishedBadge = `Packages%20Published-${PACKAGES.length}-0284c7`;
  if (publishedRegex.test(content)) {
    content = content.replace(publishedRegex, newPublishedBadge);
    console.log(`Updated Packages Published badge to: ${newPublishedBadge}`);
  }

  // 3. Ensure @arnavvv/traceguard is in the table if not present
  if (!content.includes('@arnavvv/traceguard')) {
    const traceguardRow = `| [**\`@arnavvv/traceguard\`**](https://www.npmjs.com/package/@arnavvv/traceguard) | Deterministic API contract testing & breaking OpenAPI change detection engine | [![version](https://img.shields.io/npm/v/@arnavvv/traceguard?color=2563eb&style=flat-square&logo=npm)](https://www.npmjs.com/package/@arnavvv/traceguard) | [![downloads](https://img.shields.io/npm/dt/@arnavvv/traceguard?color=10b981&style=flat-square&logo=npm&label=downloads)](https://www.npmjs.com/package/@arnavvv/traceguard) |`;
    
    // Insert after deppulse row
    if (content.includes('@arnavvv/deppulse')) {
      content = content.replace(
        /(\| \[\*\*\`@arnavvv\/deppulse\`\*\*\][^\n]+\n)/,
        `$1${traceguardRow}\n`
      );
      console.log('Added @arnavvv/traceguard row to Published NPM Packages table.');
    }
  }

  fs.writeFileSync(readmePath, content, 'utf8');
  console.log('README.md successfully updated and synchronized.');
}

updateReadme().catch(err => {
  console.error('Fatal error updating npm stats:', err);
  process.exit(1);
});
