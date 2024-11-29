<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $apiKey = config('app.tmd_api_key');
        //TODO: form validation
        $query = $request->input('query', '');
        $page = $request->input('page', 1);

        $cacheKey = $query.$page;

        $jsonResponse = Cache::get($cacheKey, function () use ($query, $apiKey, $page) {
            $response = $query ? Http::withHeaders([
                'Authorization' => 'Bearer '.$apiKey,
            ])->get('https://api.themoviedb.org/3/search/movie', [
                'query' => $query,
                'page' => $page,
            ]) : Http::withHeaders([
                'Authorization' => 'Bearer '.$apiKey,
            ])->get('https://api.themoviedb.org/3/discover/movie', [
                'page' => $page,
            ]);
            Cache::set($query.$page, $response->json(), 600);

            return $response->json();

        });

        return Inertia::render('Dashboard', [
            'movies' => fn () => $jsonResponse,
            'searchTerm' => Inertia::always($query),
            'page' => Inertia::always($page),
        ]);
    }

    public function show(int $id): Response
    {
        $apiKey = config('app.tmd_api_key');
        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$apiKey,
        ])->get('https://api.themoviedb.org/3/movie/'.$id);

        return Inertia::render('MovieDetail', [
            'movie' => fn () => $response->json(),
        ]);
    }
}
