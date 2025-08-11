
export default function robots() {
  // In a real scenario, you might get the site URL from an environment variable
  const siteUrl = 'https://xxxc.online';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Add disallow rules for sensitive paths if needed
      // disallow: '/private/', 
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
