import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 gradient-text">Privacy Policy</h1>
      <div className="space-y-6 text-gray-600 dark:text-gray-400">
        <p>
          Last updated: July 25, 2024
        </p>
        <p>
          Heart Listener ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Heart Listener application.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, such as when you create an account or use our heart rate monitoring features. This may include:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Personal information (e.g., name, email address)</li>
          <li>Heart rate data</li>
          <li>Usage data (e.g., how you interact with our application)</li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Provide, maintain, and improve our services</li>
          <li>Personalize your experience</li>
          <li>Communicate with you about our services</li>
          <li>Monitor and analyze trends and usage</li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at magdyfares.studios@gmail.com.
        </p>
      </div>
    </div>
  );
}