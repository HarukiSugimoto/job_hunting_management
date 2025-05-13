<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('companies', 'App\Http\Controllers\CompanyController');
    Route::apiResource('my_pages', 'App\Http\Controllers\MyPageController');
    Route::apiResource('deadlines', 'App\Http\Controllers\DeadlineController');
});
