import { useState, useEffect, ChangeEvent } from "react";
import { Head, router } from "@inertiajs/react";
import { Movie, Paginated } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { MovieCard } from "@/components/ui/movie-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageProps } from "@/types/index";

type Props = PageProps<{
  movies: Paginated<Movie>;
  searchTerm: string;
  page: number;
}>;

export default function Dashboard({
  movies: { results, total_results, total_pages },
  searchTerm: initialSearchTerm,
  page: initialPage,
}: Props) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || "");
  const [currentPage, setCurrentPage] = useState(initialPage || 1);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.get(
        route("dashboard"),
        { query: searchTerm, page: currentPage },
        {
          only: ["movies"],
          replace: true,
          preserveState: true,
        },
      );
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Movie Dashboard
        </h2>
      }
    >
      <Head title="Movie Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-6">
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handleSearchTermChange}
                className="flex-grow"
              />
            </form>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {results.length} of {total_results} results
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === total_pages}
                variant="outline"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
