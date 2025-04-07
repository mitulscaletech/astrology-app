import Image from "next/image";
import PublicLayout from "@/components/layouts/public-layout";

export default function Home() {
  return (
    <PublicLayout>
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
            alt="Hero background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 py-32 text-center text-accent-white">
          <h1 className="text-5xl font-bold mb-6">
            Discover Your Path Through the Stars
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with experienced astrologers for personalized guidance and insights into your life&apos;s journey.
          </p>
          <button className="text-lg px-8">
            Get Started
          </button>
        </div>
      </section>

      <section className="py-20 bg-accent-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Astrologers",
                description: "Verified professionals with years of experience",
              },
              {
                title: "Trusted Community",
                description: "Join thousands of satisfied clients",
              },
              {
                title: "24/7 Availability",
                description: "Get guidance whenever you need it",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg border border-secondary-200"
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-secondary-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}