<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Favorite extends Model
{
    /** @use HasFactory<\Database\Factories\FavoriteFactory> */
    use HasFactory;

    /** @var list<string> */
    protected $fillable = ['user_id', 'movie_id'];

    /**
     * @return BelongsTo<User, Favorite>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
