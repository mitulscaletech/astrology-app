import Image from "next/image";
import PublicLayout from "@/components/layouts/public-layout";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <PublicLayout>
      <section className='relative'>
        <div className='absolute inset-0'>
          <Image
            src='https://images.unsplash.com/photo-1519681393784-d120267933ba'
            alt='Hero background'
            fill
            className='object-cover brightness-50'
            priority
          />
        </div>
        <div className='relative container mx-auto px-4 py-32 text-center text-accent-white'>
          <h1 className='text-5xl font-bold mb-6'>Discover Your Path Through the Stars</h1>
          <p className='text-xl mb-8 max-w-2xl mx-auto'>
            Connect with experienced astrologers for personalized guidance and insights into your life&apos;s journey.
          </p>
          <button className='text-lg px-8'>Get Started</button>
        </div>
      </section>

      <section className='py-20 bg-accent-white'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-12'>Why Choose Us</h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                title: "Expert Astrologers",
                description: "Verified professionals with years of experience"
              },
              {
                title: "Trusted Community",
                description: "Join thousands of satisfied clients"
              },
              {
                title: "24/7 Availability",
                description: "Get guidance whenever you need it"
              }
            ].map((feature, index) => (
              <div key={index} className='text-center p-6 rounded-lg border border-secondary-200'>
                <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
                <p className='text-secondary-300'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-primary-100">
        <h2 className="text-5xl font-extrabold mb-6 text-primary-700 leading-tight max-w-4xl">
          Awaken Your Inner Light Through the Wisdom of the Ancients
        </h2>
        <p className="max-w-2xl text-xl mb-8 text-primary-900">
          At WeWake, we blend astrology, rituals, and spiritual teachings to guide you toward clarity, peace, and purpose. Join thousands on a transformative journey grounded in Sanatana Dharma.
        </p>
        <Button>Start Your Journey</Button>
      </section>

      <section id="services" className="py-20 px-6 text-secondary-900">
        <h3 className="text-4xl font-bold text-center mb-16">What We Offer</h3>
        <div className="grid gap-12 md:grid-cols-3 max-w-7xl mx-auto">
          <div className="p-8 bg-white shadow-lg rounded-2xl hover:shadow-xl transition">
            <h4 className="text-2xl font-bold mb-4">Astrology Consultations</h4>
            <p className="text-lg mb-4">Receive personalized Vedic astrology readings that offer deep insights into your life path, relationships, career, and spiritual well-being.</p>
            <Button>Book Now</Button>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-2xl hover:shadow-xl transition">
            <h4 className="text-2xl font-bold mb-4">Pooja & Ritual Services</h4>
            <p className="text-lg mb-4">Participate in powerful poojas performed by learned priests to bring peace, abundance, and spiritual harmony to your life and home.</p>
            <Button>Explore Rituals</Button>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-2xl hover:shadow-xl transition">
            <h4 className="text-2xl font-bold mb-4">Courses & Webinars</h4>
            <p className="text-lg mb-4">Enroll in expert-led sessions on Sanatana Dharma, yoga, meditation, and ancient scriptures to deepen your spiritual knowledge.</p>
            <Button>View Schedule</Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-primary-100 text-primary-900">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-8">Our Mission</h3>
          <p className="text-xl mb-6">
            WeWake is more than a service its a movement. Rooted in the timeless teachings of Sanatana Dharma, we provide spiritual tools and guidance to help individuals live with intention and truth.
          </p>
          <p className="text-lg">
            Through our team of seasoned astrologers, spiritual mentors, and Vedic scholars, we offer resources to elevate your consciousness and reconnect with your highest self. Our platform is designed to be a sanctuary for seekers from all walks of life.
          </p>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-6 bg-white text-accent-black">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12">Voices of Transformation</h3>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="p-6 bg-accent-white border border-primary-100 rounded-xl shadow-md">
              <p className="text-lg italic">“My astrology reading was incredibly accurate and enlightening. I feel more confident in my path forward.”</p>
              <p className="mt-4 font-semibold">— Aarti M.</p>
            </div>
            <div className="p-6 bg-accent-white border border-primary-100 rounded-xl shadow-md">
              <p className="text-lg italic">“The pooja ceremony brought a sense of peace to my home that I hadnt felt in years. Highly recommend!”</p>
              <p className="mt-4 font-semibold">— Ramesh I.</p>
            </div>
            <div className="p-6 bg-accent-white border border-primary-100 rounded-xl shadow-md">
              <p className="text-lg italic">“Their webinars helped me finally understand the deeper meaning behind the Bhagavad Gita. Life-changing.”</p>
              <p className="mt-4 font-semibold">— Sneha K.</p>
            </div>
            <div className="p-6 bg-accent-white border border-primary-100 rounded-xl shadow-md">
              <p className="text-lg italic">“I’ve gained clarity and spiritual strength through WeWake’s guidance. It’s been a blessing.”</p>
              <p className="mt-4 font-semibold">— Vikram D.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-primary-100 text-secondary-900">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-8">Connect With Us</h3>
          <p className="text-lg mb-6">
            Have questions, ideas, or ready to begin your spiritual journey? Our team is here to guide you. Reach out anytime.
          </p>
          <Button>Get in Touch</Button>
        </div>
      </section>
    </PublicLayout>
  );
}
