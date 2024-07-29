import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import ThemeProvider from '../components/ThemeProvider'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })
const ThemeSwitcher = dynamic(() => import('../components/ThemeSwitcher'), { ssr: false })

export const metadata = {
  metadataBase: new URL('https://www.onlineheartlistener.com'),
  title: 'Heart Listener - Real-time Heart Rate Tracking',
  description: 'Monitor your heart rate in real-time with Heart Listener. Accurate, easy-to-use, and accessible from any device.',
  keywords: 'heart rate monitor, pulse tracker, health app, fitness tracking, real-time monitoring, heart bpm using microphone, heart bpm, heart rate counter, bpm counter',
  openGraph: {
    title: 'Heart Listener - Real-time Heart Rate Tracking',
    description: 'Monitor your heart rate in real-time with Heart Listener. Accurate, easy-to-use, and accessible from any device.',
    type: 'website',
    url: 'https://www.onlineheartlistener.com',
    siteName: 'Heart Listener',
    images: [
      {
        url: '/apple-icon.png',
        width: 1200,
        height: 630,
        alt: 'Heart Listener OG Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heart Listener - Real-time Heart Rate Tracking',
    description: 'Monitor your heart rate in real-time with Heart Listener. Accurate, easy-to-use, and accessible from any device.',
    images: ['/apple-icon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/heart-listener-icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-md relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center ">
                  {/* Logo */}
                  <a href="/" className="flex items-center">
                    <Image src="/heart-listener-icon.svg" alt="Heart Listener Logo" width={40} height={40} priority />
                    <span className="ml-2 text-2xl font-bold gradient-text">Heart Listener</span>
                  </a>
                  {/* Navigation and Theme Switcher */}
                  <div className="flex items-center">
                    <nav className="hidden md:flex items-center space-x-6 mr-6">
                      <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition duration-300">Home</a>
                      <a href="/about" className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition duration-300">About</a>
                      <a href="mailto:magdyfares.studios@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition duration-300">Contact</a>
                      <a href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition duration-300">Privacy</a>
                    </nav>
                    <div className="flex items-center space-x-4">
                      <ThemeSwitcher />
                      {/* Mobile Menu Button */}
                      <button
                        id="menuButton"
                        className="md:hidden flex items-center px-3 py-2 border rounded text-gray-600 dark:text-gray-300 border-gray-600 dark:border-gray-300 hover:text-red-500 dark:hover:text-red-400 transition duration-300"
                      >
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
                          <title>Menu</title>
                          <path d="M0 3h20v2H0zM0 7h20v2H0zM0 11h20v2H0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Mobile Menu */}
              <div id="mobileMenu" className="hidden md:hidden absolute top-full right-0 bg-white dark:bg-gray-800 shadow-md">
                <div className="py-2">
                  <a href="/" className="block text-right text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition duration-300 px-6 py-2 z-20">Home</a>
                  <a href="/about" className="block text-right text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition duration-300 px-6 py-2">About</a>
                  <a href="mailto:magdyfares.studios@gmail.com" className="block text-right text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition duration-300 px-6 py-2">Contact</a>
                  <a href="/privacy" className="block text-right text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition duration-300 px-6 py-2">Privacy</a>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {children}
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">About Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">Heart Listener is dedicated to providing accurate and easy-to-use heart rate monitoring solutions.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                      <li><a href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">FAQ</a></li>
                      <li><a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">About Us</a></li>
                      <li><a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">Privacy Policy</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-red-500 transition duration-300">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-red-500 transition duration-300">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-red-500 transition duration-300">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    © 2024 Heart Listener. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
        <Script
          src="mobileMenu.js"
          strategy="afterInteractive"
        />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Heart Listener",
              "url": "https://www.onlineheartlistener.com",
              "description": "Monitor your heart rate in real-time with Heart Listener. Accurate, easy-to-use, and accessible from any device.",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </body>
    </html>
  )
}
