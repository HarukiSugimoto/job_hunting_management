<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deadline extends Model
{
    protected $fillable = [
        'date',
        'type',
        'status',
        'result',
    ];

    public function myPage()
    {
        return $this->belongsTo(MyPage::class);
    }

}
