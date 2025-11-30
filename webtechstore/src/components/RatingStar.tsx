import React, { useState } from "react";
import { Star } from "phosphor-react";

interface RatingStarProps {
  onRatingChange?: (rating: number) => void;
  initialRating?: number;
}

export default function RatingStar({
  onRatingChange,
  initialRating = 5,
}: RatingStarProps) {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  React.useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleClick = (index: number) => {
    setRating(index);
    onRatingChange?.(index);
  };

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hoverRating || rating);
        return (
          <Star
            key={star}
            size={40}
            weight={filled ? "fill" : "regular"}
            className={`cursor-pointer transition-colors ${
              filled
                ? "text-yellow-500 hover:text-yellow-600"
                : "text-gray-300 dark:text-gray-600 hover:text-yellow-400"
            }`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            role="button"
            aria-label={`Avaliar ${star} estrela${star > 1 ? "s" : ""}`}
          />
        );
      })}
    </div>
  );
}
