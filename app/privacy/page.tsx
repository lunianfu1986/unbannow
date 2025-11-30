import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Travel with Samantha',
  description: 'How we collect, use, and protect your information',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </Link>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Privacy Policy
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>1. Introduction</h2>
        <p>
          Welcome to our Privacy Policy. Your privacy is critically important to us. This Privacy Policy document contains types of information that is collected and recorded by our website and how we use it.
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
        </p>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, and other contact details when you subscribe to our newsletter or contact us</li>
          <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited, time spent, and links clicked</li>
          <li><strong>Device Information:</strong> Browser type, IP address, operating system, and device identifiers</li>
          <li><strong>Cookies:</strong> Small data files stored on your device to improve your browsing experience</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect in various ways, including to:</p>
        <ul>
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Communicate with you, either directly or through one of our partners</li>
          <li>Send you emails and newsletters (with your consent)</li>
          <li>Find and prevent fraud</li>
        </ul>

        <h2>4. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
        </p>
        <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.</p>

        <h2>5. Third-Party Services</h2>
        <p>
          We may employ third-party companies and individuals to facilitate our website, provide services on our behalf, perform website-related services, or assist us in analyzing how our website is used.
        </p>
        <p>These third parties may have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>

        <h2>6. Data Security</h2>
        <p>
          The security of your personal information is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
        </p>

        <h2>7. Children's Privacy</h2>
        <p>
          Our website does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
        </p>

        <h2>8. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Request correction of your personal information</li>
          <li>Request deletion of your personal information</li>
          <li>Object to processing of your personal information</li>
          <li>Request restriction of processing your personal information</li>
          <li>Request transfer of your personal information</li>
          <li>Withdraw consent at any time</li>
        </ul>

        <h2>9. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us through our contact page.
        </p>
      </div>
    </div>
  )
}
