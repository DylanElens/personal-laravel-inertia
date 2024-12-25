<?php

namespace App\Services;

use App\Http\Resources\MovieDetailsResource;
use App\Http\Resources\MovieResource;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class MovieService
{
    private string $baseUrl;

    private string $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('app.tmd_base_url');
        $this->apiKey = config('app.tmd_api_key');
    }

    public function discover(int $page = 1): array
    {
        $response = $this->makeRequest('discover/movie', ['page' => $page]);
        $data = $response->json();

        return MovieResource::paginate($data);
    }

    public function search(string $query, int $page = 1): array
    {
        $response = $this->makeRequest('search/movie', [
            'query' => $query,
            'page' => $page,
        ]);
        $data = $response->json();

        return MovieResource::paginate($data);
    }

    public function getMovieDetails(int $id): MovieDetailsResource
    {
        $response = $this->makeRequest("movie/{$id}");
        $data = $response->json();

        return MovieDetailsResource::make(collect($data));
    }

    private function makeRequest(string $endpoint, array $params = []): Response
    {
        return Http::withHeaders($this->headers())
            ->get("{$this->baseUrl}{$endpoint}", $params);
    }

    private function headers(): array
    {
        return [
            'Authorization' => 'Bearer '.$this->apiKey,
        ];
    }
}
