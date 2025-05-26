<?php

use App\Http\Controllers\Api\MeController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\DeadlineController;
use App\Http\Controllers\Api\MyPageController;
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
            Route::get('/{company}', [CompanyController::class, 'show'])->name('show');
            Route::put('/{company}', [CompanyController::class, 'update'])->name('update');
            Route::delete('/{company}', [CompanyController::class, 'destroy'])->name('destroy');
        }
    );
    Route::group([
        'prefix' => '/deadline',
        'as' => 'deadline.'], function () {
            Route::get('/', [DeadlineController::class, 'index'])->name('index');
            Route::post('/', [DeadlineController::class, 'store'])->name('store');
            Route::get('/{deadline}', [DeadlineController::class, 'show'])->name('show');
            Route::put('/{deadline}', [DeadlineController::class, 'update'])->name('update');
            Route::delete('/{deadline}', [DeadlineController::class, 'destroy'])->name('destroy');
        }
    );
    Route::group([
        'prefix' => '/mypage',
        'as' => 'mypage.'], function () {
            Route::get('/', [MyPageController::class, 'index'])->name('index');
            Route::get('/create', [MyPageController::class, 'create'])->name('create');
            Route::post('/', [MyPageController::class, 'store'])->name('store');
            Route::get('/{mypage}', [MyPageController::class, 'show'])->name('show');
            Route::put('/{mypage}', [MyPageController::class, 'update'])->name('update');
            Route::delete('/{mypage}', [MyPageController::class, 'destroy'])->name('destroy');
        }
    );
});
