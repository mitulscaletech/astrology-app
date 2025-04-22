import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { reviews } from "@/lib/data";
import IconStar from "@/shared/icons/star";

export default function ReviewStats() {
  // Calculate review statistics
  const totalReviews = reviews.length;
  const ratingCounts: { [key: number]: number } = {
    1: reviews.filter((r) => r.rating === 1).length,
    2: reviews.filter((r) => r.rating === 2).length,
    3: reviews.filter((r) => r.rating === 3).length,
    4: reviews.filter((r) => r.rating === 4).length,
    5: reviews.filter((r) => r.rating === 5).length
  };

  // Calculate average rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / totalReviews || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
          <div className="flex justify-center mt-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`h-4 w-4 ${i < Math.round(averageRating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
              >
                <IconStar />
              </span>
            ))}
          </div>
          <div className="text-sm text-muted-foreground mt-1">Based on {totalReviews} reviews</div>
        </div>

        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <div className="flex items-center w-12">
                <span>{rating}</span>
                <span className="h-4 w-4 ml-1 fill-amber-400 text-amber-400">
                  <IconStar />
                </span>
              </div>
              <Progress value={(ratingCounts[rating] / totalReviews) * 100} className="h-2 flex-1" />
              <div className="w-10 text-end text-sm text-muted-foreground">{ratingCounts[rating]}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
