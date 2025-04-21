import ReviewList from "@/components/astrologer/rating/rating-list";
import ReviewStats from "@/components/astrologer/rating/rating-stats";

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Client Reviews</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ReviewStats />
        </div>
        <div className="lg:col-span-3">
          <ReviewList />
        </div>
      </div>
    </main>
  );
}
