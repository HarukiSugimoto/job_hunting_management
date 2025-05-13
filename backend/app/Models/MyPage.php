<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MyPage extends Model
{
    protected $fillable = [
        'link',
        'login_id',
        'status',
        'pritority',
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
