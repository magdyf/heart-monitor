import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 gradient-text">Privacy Policy</h1>
      <div className="space-y-6 text-gray-600 dark:text-gray-400">
        <p>
          Last updated: July 26, 2024
        </p>
        <p>
          Heart Listener (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our Heart Listener application.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">Data Privacy</h2>
        <p>
          We want to be clear that Heart Listener does not collect, store, or process any personal data from our users. We do not:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Collect personal information (e.g., name, email address)</li>
          <li>Store heart rate data</li>
          <li>Track usage data</li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">How Our Application Works</h2>
        <p>
          Heart Listener is designed to provide real-time heart rate monitoring using your device&apos;s microphone. All processing of audio data to determine heart rate is done locally on your device. We do not transmit or store any of this data.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">Data Security</h2>
        <p>
          Since we do not collect or store any user data, there is no risk of your personal information being compromised through our application. However, we recommend following general security best practices for your device.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">Third-Party Services</h2>
        <p>
          Our application does not integrate with any third-party services that would collect data about you.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at magdyfares.studios@gmail.com.
        </p>
      </div>
    </div>
  );
}