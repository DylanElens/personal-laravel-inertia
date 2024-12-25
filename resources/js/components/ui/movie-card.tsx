import { Movie } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Link } from "@inertiajs/react";
import { FavoriteButton } from "@/components/ui/favorite-button";

interface MovieCardProps {
  movie: Movie;
  isFavorited?: boolean;
}

export function MovieCard({ movie, isFavorited }: MovieCardProps) {
  return (
    <Link href={route("dashboard.show", { id: movie.id })} className="block">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="aspect-[2/3] relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="object-cover w-full h-full"
            />
            <Badge className="absolute top-2 right-2 bg-black/50">
              {movie.vote_average.toFixed(1)}
              <Star className="w-3 h-3 ml-1 fill-current" />
            </Badge>
            <FavoriteButton
              movieId={movie.id}
              isFavorited={isFavorited ?? false}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg line-clamp-1">{movie.title}</CardTitle>
          <p className="text-sm text-gray-500">
            {new Date(movie.release_date).getFullYear()}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-sm line-clamp-2">{movie.overview}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
