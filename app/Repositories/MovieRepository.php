<?php

namespace App\Repositories;

use App\Services\MovieService;
use Illuminate\Support\Facades\Cache;

class MovieRepository
{
    public function __construct(private MovieService $movieService) {}

    public function discover(int $page = 1)
    {
        $cacheKey = "discover_movies_page_{$page}";

        return Cache::remember($cacheKey, 600, function () use ($page) {
            return $this->movieService->discover($page);
        });
    }

    public function search(string $query, int $page = 1)
    {
        $cacheKey = "search_movies_{$query}_page_{$page}";

        return Cache::remember($cacheKey, 600, function () use ($query, $page) {
            return $this->movieService->search($query, $page);
        });
    }

    public function getMovieDetails(int $id)
    {
        $cacheKey = "movie_details_{$id}";

        return Cache::remember($cacheKey, 600, function () use ($id) {
            return $this->movieService->getMovieDetails($id);
        });
    }
}
