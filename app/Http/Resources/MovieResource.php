<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MovieResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'adult' => $this->resource['adult'] ?? null,
            'backdrop_path' => $this->resource['backdrop_path'] ?? null,
            'genre_ids' => $this->resource['genre_ids'] ?? [],
            'id' => $this->resource['id'] ?? null,
            'original_language' => $this->resource['original_language'] ?? null,
            'original_title' => $this->resource['original_title'] ?? null,
            'overview' => $this->resource['overview'] ?? null,
            'popularity' => $this->resource['popularity'] ?? null,
            'poster_path' => $this->resource['poster_path'] ?? null,
            'release_date' => $this->resource['release_date'] ?? null,
            'title' => $this->resource['title'] ?? null,
            'video' => $this->resource['video'] ?? null,
            'vote_average' => $this->resource['vote_average'] ?? null,
            'vote_count' => $this->resource['vote_count'] ?? null,
        ];
    }

    /**
     * Handle paginated responses.
     */
    public static function paginate(array $paginatedData): array
    {
        return [
            'results' => self::collection(collect($paginatedData['results'])),
            'page' => (int) ($paginatedData['page'] ?? 1),
            'total_pages' => (int) ($paginatedData['total_pages'] ?? 1),
            'total_results' => (int) ($paginatedData['total_results'] ?? 0),
        ];
    }
}
