<?php

namespace App\Http\Controllers;

use App\Repositories\MovieRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request, MovieRepository $movieRepository): Response
    {
        $query = $request->input('query', '');
        $page = (int) $request->input('page', 1);

        /** @var array $movies */
        $movies = $query
            ? $movieRepository->search($query, $page)
            : $movieRepository->discover($page);

        return Inertia::render('Dashboard', [
            'initialSearch' => Inertia::always($query),
            ...$movies,
        ]);
    }

    public function show(int $id, MovieRepository $movieRepository): Response
    {
        $movie = $movieRepository->getMovieDetails($id);

        return Inertia::render('MovieDetail', [
            'movie' => fn () => $movie,
            'isFavorited' => Auth::user()->favorites()->where('movie_id', $id)->exists(),
        ]);
    }
}
