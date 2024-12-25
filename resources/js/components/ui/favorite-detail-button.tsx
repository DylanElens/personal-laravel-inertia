import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";

interface FavoriteButtonProps {
  movieId: number;
  isFavorited: boolean;
}

export function FavoriteDetailButton({
  movieId,
  isFavorited: initialIsFavorited,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const { post } = useForm();

  const handleFavorite = () => {
    post(route("favorite.store"), {
      preserveState: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      preserveScroll: true,
      data: { movie_id: movieId },
      onSuccess: () => {
        setIsFavorited(!isFavorited);
      },
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={`flex items-center ${isFavorited ? "bg-red-100 text-red-600" : "bg-white text-gray-600"}`}
      onClick={handleFavorite}
    >
      <Heart
        className={`h-4 w-4 mr-2 ${isFavorited ? "fill-red-500" : "fill-none"}`}
      />
      {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  );
}
