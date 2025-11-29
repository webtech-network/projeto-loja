import React, { useState } from 'react';

interface RatingStarProps {
    onRatingChange?: (rating: number) => void;
    initialRating?: number;
}

export default function RatingStar({ onRatingChange, initialRating = 0 }:RatingStarProps){
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
        <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => {
                const filled = star <= (hoverRating || rating);
                const src = filled ? '/images/star.png' : '/images/star_cinza.png';
                return (
                    <img
                        key={star}
                        src={src}
                        alt={filled ? `Estrela preenchida ${star}` : `Estrela vazia ${star}`}
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                        className="w-10 h-10 cursor-pointer transition-opacity"
                        role="button"
                        aria-label={`Avaliar ${star} estrela${star > 1 ? 's' : ''}`}
                    />
                );
            })}
        </div>
    );
}