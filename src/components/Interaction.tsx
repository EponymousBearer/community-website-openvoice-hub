'use client'
import { useState, useEffect } from 'react';
import { Heart, ThumbsDown, ThumbsUp } from 'lucide-react';

const Interaction = ({ product_id, user_id }: { product_id: string, user_id: string }) => {
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [hearted, setHearted] = useState(false);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await fetch('/api/count', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        product_id: product_id,
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    setLikesCount(data.likesCount);
                } else {
                    console.error("Failed to fetch likes count");
                }
            } catch (error) {
                console.error("Error fetching likes count:", error);
            }
        };

        fetchCount();
    }, [product_id]);

    const handleInteraction = async (type: string) => {
        try {
            const response = await fetch('/api/interact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user_id,
                    product_id: product_id,
                    interaction_type: type,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to interact');
            }

            const data = await response.json();
            console.log(data.message);
            setLikesCount(data.likesCount); // Update likes count in state
        } catch (error) {
            console.error('Error interacting:', error);
            // Handle error
        }
    };

    return (
        <div className='flex gap-x-3 my-8'>
            <button disabled={liked} onClick={() => handleInteraction('like')}>
                <ThumbsUp size={30} color="#a29696" strokeWidth={0.75} fillOpacity={0.3} fill='grey' absoluteStrokeWidth />
            </button>
            <button disabled={disliked} onClick={() => handleInteraction('dislike')}>
                <ThumbsDown size={30} color="#a29696" strokeWidth={0.75} fillOpacity={0.3} fill='grey' absoluteStrokeWidth />
            </button>
            <button disabled={hearted} onClick={() => handleInteraction('heart')}>
                <Heart size={30} color="#a29696" strokeWidth={0.75} fillOpacity={0.3} fill='grey' absoluteStrokeWidth />
            </button>
            <p className='text-lg'>{likesCount} Likes</p>
        </div>
    );
};

export default Interaction;
