<?php

use App\Http\Controllers\AirDuctController;
use App\Http\Controllers\DryerVentController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\UserAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix'=>'v1'],function (){
    Route::post('/login', [UserAuthController::class, 'login'])->name('user.login');
    Route::group(['middleware' => 'auth:api'],function (){
        Route::get('/user', [UserAuthController::class, 'user'])->name('user.profile');
        Route::apiResource('air-duct',AirDuctController::class);
        Route::apiResource('dryer-vent',DryerVentController::class);

    });
    Route::get('quote',[QuoteController::class,'getQuote'])->name('get-quote');
});
