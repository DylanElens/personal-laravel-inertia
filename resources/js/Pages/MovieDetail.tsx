import { Head } from "@inertiajs/react";
import { MovieDetails } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageProps } from "@/types/index";
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  Globe,
  Star,
} from "lucide-react";
import { FavoriteDetailButton } from "@/components/ui/favorite-detail-button";

type Props = PageProps<{
  movie: { data: MovieDetails };
  isFavorited: boolean;
}>;

export default function MovieDetail({
  movie: { data: movie },
  isFavorited,
}: Props) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatRuntime = (minutes: number | null) => {
    if (minutes === null) return "N/A";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Movie Details
        </h2>
      }
    >
      <Head title={`${movie.title} - Movie Details`} />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
                <div className="mt-6 lg:mt-0 lg:ml-6 lg:w-2/3">
                  <CardTitle className="text-3xl font-bold">
                    {movie.title}
                  </CardTitle>
                  {movie.tagline && (
                    <CardDescription className="mt-2 text-lg italic">
                      {`"${movie.tagline}"`}
                    </CardDescription>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <Badge key={genre.id} variant="secondary">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    <Badge className="bg-yellow-400 text-yellow-900">
                      {movie.vote_average.toFixed(1)}
                      <Star className="w-4 h-4 ml-1 fill-current" />
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {movie.vote_count} votes
                    </span>
                    <span className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                    <span className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatRuntime(movie.runtime)}
                    </span>
                  </div>
                  <p className="mt-4 text-gray-700">{movie.overview}</p>
                  <div className="mt-4">
                    <FavoriteDetailButton
                      movieId={movie.id}
                      isFavorited={isFavorited}
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <Tabs defaultValue="details" className="w-full">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="production">Production</TabsTrigger>
                  <TabsTrigger value="financial">Financial</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <Card>
                    <CardHeader>
                      <CardTitle>Movie Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <dt className="font-medium text-gray-500">
                            Original Title
                          </dt>
                          <dd>{movie.original_title}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">
                            Original Language
                          </dt>
                          <dd>{movie.original_language.toUpperCase()}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Status</dt>
                          <dd>{movie.status}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">
                            Popularity
                          </dt>
                          <dd>{movie.popularity.toFixed(2)}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">
                            Adult Content
                          </dt>
                          <dd>{movie.adult ? "Yes" : "No"}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">
                            Video Available
                          </dt>
                          <dd>{movie.video ? "Yes" : "No"}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="production">
                  <Card>
                    <CardHeader>
                      <CardTitle>Production Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h3 className="text-lg font-semibold mb-2">
                        Production Companies
                      </h3>
                      <ul className="space-y-2 mb-4">
                        {movie.production_companies.map((company) => (
                          <li key={company.id} className="flex items-center">
                            {company.logo_path && (
                              <img
                                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                alt={company.name}
                                className="w-8 h-8 object-contain mr-2"
                              />
                            )}
                            <span>
                              {company.name} ({company.origin_country})
                            </span>
                          </li>
                        ))}
                      </ul>
                      <h3 className="text-lg font-semibold mb-2">
                        Production Countries
                      </h3>
                      <ul className="space-y-1 mb-4">
                        {movie.production_countries.map((country) => (
                          <li key={country.iso_3166_1}>
                            {country.name} ({country.iso_3166_1})
                          </li>
                        ))}
                      </ul>
                      <h3 className="text-lg font-semibold mb-2">
                        Spoken Languages
                      </h3>
                      <ul className="space-y-1">
                        {movie.spoken_languages.map((language) => (
                          <li key={language.iso_639_1}>
                            {language.english_name} ({language.iso_639_1})
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="financial">
                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <dt className="font-medium text-gray-500">Budget</dt>
                          <dd className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {formatCurrency(movie.budget)}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Revenue</dt>
                          <dd className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {formatCurrency(movie.revenue)}
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {movie.belongs_to_collection && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Part of a Collection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.belongs_to_collection.poster_path}`}
                        alt={movie.belongs_to_collection.name}
                        className="w-16 h-24 object-cover rounded-md mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {movie.belongs_to_collection.name}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {movie.homepage && (
                <div className="mt-6 flex justify-center">
                  <Button asChild>
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Visit Official Website
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
