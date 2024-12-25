<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MovieDetailsResource extends JsonResource
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
            'belongs_to_collection' => $this->resource['belongs_to_collection'] ? [
                'id' => $this->resource['belongs_to_collection']['id'] ?? null,
                'name' => $this->resource['belongs_to_collection']['name'] ?? null,
                'poster_path' => $this->resource['belongs_to_collection']['poster_path'] ?? null,
                'backdrop_path' => $this->resource['belongs_to_collection']['backdrop_path'] ?? null,
            ] : null,
            'budget' => $this->resource['budget'] ?? 0,
            'genres' => ! empty($this->resource['genres']) ? array_map(function ($genre) {
                return [
                    'id' => $genre['id'] ?? null,
                    'name' => $genre['name'] ?? null,
                ];
            }, $this->resource['genres']) : [],
            'homepage' => $this->resource['homepage'] ?? null,
            'imdb_id' => $this->resource['imdb_id'] ?? null,
            'origin_country' => $this->resource['origin_country'] ?? [],
            'production_companies' => ! empty($this->resource['production_companies']) ? array_map(function ($company) {
                return [
                    'id' => $company['id'] ?? null,
                    'logo_path' => $company['logo_path'] ?? null,
                    'name' => $company['name'] ?? null,
                    'origin_country' => $company['origin_country'] ?? null,
                ];
            }, $this->resource['production_companies']) : [],
            'production_countries' => ! empty($this->resource['production_countries']) ? array_map(function ($country) {
                return [
                    'iso_3166_1' => $country['iso_3166_1'] ?? null,
                    'name' => $country['name'] ?? null,
                ];
            }, $this->resource['production_countries']) : [],
            'revenue' => $this->resource['revenue'] ?? 0,
            'runtime' => $this->resource['runtime'] ?? null,
            'spoken_languages' => ! empty($this->resource['spoken_languages']) ? array_map(function ($language) {
                return [
                    'english_name' => $language['english_name'] ?? null,
                    'iso_639_1' => $language['iso_639_1'] ?? null,
                    'name' => $language['name'] ?? null,
                ];
            }, $this->resource['spoken_languages']) : [],
            'status' => $this->resource['status'] ?? null,
            'tagline' => $this->resource['tagline'] ?? null,
        ];
    }
}
