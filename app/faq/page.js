import React from 'react';

const FAQItem = ({ question, answer }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2">{question}</h3>
    <p className="text-gray-600 dark:text-gray-400">{answer}</p>
  </div>
);

export default function FAQPage() {
  const faqs = [
    {
      question: "How accurate is Heart Listener?",
      answer: "Our Heart Listener is designed to provide a close approximation of your heart rate. While it's not a medical-grade device, it offers a reliable estimate for general fitness and wellness purposes."
    },
    {
      question: "Can I use Heart Listener during exercise?",
      answer: "Yes, you can use Heart Listener during light to moderate exercise. However, excessive movement may affect the accuracy of the readings."
    },
    {
      question: "Is my data secure?",
      answer: "We take data privacy very seriously. All your heart rate data is stored locally on your device and is not transmitted to our servers."
    },
    {
      question: "How often should I measure my heart rate?",
      answer: "The frequency of heart rate measurements depends on your personal health goals. For general wellness, measuring once or twice a day (morning and evening) is often sufficient. Always consult with a healthcare professional for personalized advice."
    },
    {
      question: "Can Heart Listener detect heart problems?",
      answer: "Heart Listener is not designed to diagnose or detect heart problems. It's a tool for general wellness. If you have concerns about your heart health, please consult a medical professional."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 gradient-text">Frequently Asked Questions</h1>
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}