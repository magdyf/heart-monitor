import HeartRateMonitor from '../components/HeartRateMonitor'

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Welcome to Heart Listener</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Track your heart rate in real-time with our easy-to-use, accurate monitoring tool.
        </p>
      </section>

      <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden card-hover">
        <HeartRateMonitor />
      </section>
      <section className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 rounded-full p-4 inline-block mb-4">
              <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Place Device</h3>
            <p className="text-gray-600 dark:text-gray-400">Position your device's microphone on your chest or wrist.</p>
          </div>
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 rounded-full p-4 inline-block mb-4">
              <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Start Monitoring</h3>
            <p className="text-gray-600 dark:text-gray-400">Click the 'Start Monitoring' button to begin tracking.</p>
          </div>
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 rounded-full p-4 inline-block mb-4">
              <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">3. View Results</h3>
            <p className="text-gray-600 dark:text-gray-400">See your heart rate displayed in real-time on the screen.</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
          <p className="text-gray-600 dark:text-gray-400">Simply place your device's microphone on your chest or wrist to start monitoring your heart rate.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Accurate Results</h3>
          <p className="text-gray-600 dark:text-gray-400">Our advanced algorithm ensures precise heart rate measurements in real-time.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Accessible Anywhere</h3>
          <p className="text-gray-600 dark:text-gray-400">Use Heart Listener on any device with a microphone, no additional hardware required.</p>
        </div>
      </section>

    </div>
  )
}