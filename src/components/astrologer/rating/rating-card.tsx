"use client";

import { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "@/lib/utils";
import IconStar from "@/shared/icons/star";

export default function ReviewCard({ review }: { review: any }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState(review.astrologerReply || "");
  const [showReply, setShowReply] = useState(!!review.astrologerReply);

  const handleSubmitReply = () => {
    // In a real app, this would send the reply to an API
    console.log(`Submitting reply for review ${review.id}: ${replyText}`);
    setIsReplying(false);
    setShowReply(true);
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-4">
        {/* <Avatar className="h-10 w-10">
          <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
        </Avatar> */}

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{review.user.name}</h3>
              <p className="text-sm text-muted-foreground">{formatDistanceToNow(review.date)}</p>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                >
                  <IconStar />
                </span>
              ))}
            </div>
          </div>

          <p className="mt-2">{review.comment}</p>

          {showReply && (
            <div className="mt-4 pl-4 border-l-2 border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Astrologer Reply:</span>
                <span className="text-xs text-muted-foreground">
                  {review.replyDate ? formatDistanceToNow(review.replyDate) : "Just now"}
                </span>
              </div>
              <p className="mt-1 text-sm">{replyText}</p>
            </div>
          )}

          {!showReply && (
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setIsReplying(true)}>
                Reply as Astrologer
              </Button>
            </div>
          )}

          {isReplying && (
            <div className="mt-4 space-y-2">
              <Textarea
                placeholder="Write your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsReplying(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSubmitReply} disabled={!replyText.trim()}>
                  Submit Reply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
