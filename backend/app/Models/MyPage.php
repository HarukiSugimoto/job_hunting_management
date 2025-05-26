<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enum\Priority;

class MyPage extends Model
{
    protected $fillable = [
        'link',
        'login_id',
        'pritority',
        'type'
    ];

    protected $casts = [
        'pritority' => Priority::class,
    ];
    public function company()
    {
        return $this->belongsTo(Company::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
