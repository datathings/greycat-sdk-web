export interface RobotsOptions {
  /** Extra directives appended after the default policy, e.g. `['Disallow: /admin']`. */
  rules?: string[];
}

export function buildRobots(
  hostname: string,
  sitemap: boolean,
  { rules = [] }: RobotsOptions = {},
): string {
  const base = hostname.replace(/\/+$/, '');
  const lines = ['User-agent: *', 'Allow: /', ...rules];
  if (sitemap) {
    lines.push(`Sitemap: ${base}/sitemap.xml`);
  }
  return lines.join('\n') + '\n';
}
