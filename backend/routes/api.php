<?php

use App\Http\Controllers\Api\MeController;
use App\Http\Controllers\Api\CompanyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Welcome to the API!']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/me', [MeController::class, 'index'])->name('me');
    Route::group([
        'prefix' => '/company',
        'as' => 'company.'], function () {
            Route::get('/', [CompanyController::class, 'index'])->name('index');
            Route::post('/', [CompanyController::class, 'store'])->name('store');
            Route::put('/{company}', [CompanyController::class, 'update'])->name('update');
            Route::delete('/{company}', [CompanyController::class, 'destroy'])->name('destroy');
        }
    );
    // Route::apiResource('companies', 'App\Http\Controllers\Api\CompanyController');
    // Route::apiResource('my_pages', 'App\Http\Controllers\Api\MyPageController');
    // Route::apiResource('deadlines', 'App\Http\Controllers\Api\DeadlineController');
});
