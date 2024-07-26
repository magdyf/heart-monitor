export default function sitemap() {
    return [
      {
        url: 'https://onlineheartlistener.com',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
      },
      {
        url: 'https://onlineheartlistener.com/about',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.8,
      },
      {
        url: 'https://onlineheartlistener.com/faq',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      },
      {
        url: 'https://onlineheartlistener.com/privacy',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.2,
      },
    ]
  }