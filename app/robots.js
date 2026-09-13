export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/careers-admin', '/api/admin/', '/api/ai/'],
      },
    ],
    sitemap: 'https://hisabdo.app/sitemap.xml',
    host: 'https://hisabdo.app',
  };
}
