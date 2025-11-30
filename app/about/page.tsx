import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About | Travel with Samantha',
  description: 'Learn more about our travel blog and adventures',
}

export default function AboutPage() {
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
          About Us
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Welcome to our corner of the internet where we share our adventures, stories, and experiences from around the world.
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>Our Story</h2>
        <p>
          Welcome to our blog! We're passionate about exploring new places, trying different cuisines, 
          and immersing ourselves in diverse cultures. What started as a personal travel journal has 
          evolved into a platform where we share our experiences and insights with fellow travelers 
          and adventure seekers.
        </p>

        <h2>What We Write About</h2>
        <p>
          Our blog covers a wide range of topics including:
        </p>
        <ul>
          <li><strong>Travel Guides:</strong> Detailed guides to destinations around the world</li>
          <li><strong>Food & Culture:</strong> Culinary adventures and cultural experiences</li>
          <li><strong>Photography:</strong> Tips and stories behind our favorite shots</li>
          <li><strong>Lifestyle:</strong> Insights on sustainable travel and local living</li>
        </ul>

        <h2>Our Mission</h2>
        <p>
          We believe that travel is more than just visiting new places—it's about connecting with 
          people, understanding different perspectives, and growing as individuals. Through our blog, 
          we aim to inspire others to step out of their comfort zones and explore the world with 
          curiosity and respect.
        </p>

        <h2>Get in Touch</h2>
        <p>
          We love hearing from our readers! Whether you have questions about a destination, want to 
          share your own travel stories, or just want to say hello, feel free to reach out.
        </p>
        <p>
          Follow us on social media to stay updated with our latest adventures and travel tips.
        </p>
      </div>

      {/* Call to Action */}
      <div className="mt-12 p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white">
        <h3 className="text-2xl font-bold mb-4">Join Our Journey</h3>
        <p className="mb-6 text-white/90">
          Subscribe to our newsletter to get the latest travel stories, tips, and inspiration 
          delivered straight to your inbox.
        </p>
        <form className="flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}
