<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class MeController extends Controller
{
    /**
     * ユーザ認証
     * 
     */
    public function index()
    {
        return new UserResource(Auth::user());
    }
}
