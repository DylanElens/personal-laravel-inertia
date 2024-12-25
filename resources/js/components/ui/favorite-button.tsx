import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";

interface FavoriteButtonProps {
  movieId: number;
  isFavorited: boolean;
}

export function FavoriteButton({
  movieId,
  isFavorited: initialIsFavorited,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const { post } = useForm();

  const handleFavorite = () => {
    post(route("favorite.store"), {
      preserveState: true,
      preserveScroll: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: { movie_id: movieId },
      onSuccess: () => {
        setIsFavorited(!isFavorited);
      },
      onError: () => {
        alert("error");
      },
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 left-2 bg-black/50 hover:bg-black/70"
      onClick={(e) => {
        e.preventDefault();
        handleFavorite();
      }}
    >
      <Heart
        className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-white"}`}
      />
      <span className="sr-only">
        {isFavorited ? "Remove from favorites" : "Add to favorites"}
      </span>
    </Button>
  );
}
