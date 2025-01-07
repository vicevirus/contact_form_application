<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactFormController;
use App\Http\Middleware\ContentSecurityPolicy;

// Let's not make this application too complicated.
Route::middleware([ContentSecurityPolicy::class])->group(function () {

    Route::get('/', function () {
        return redirect()->route('login');
    });

    Route::middleware([
        'auth:sanctum',
        config('jetstream.auth_session'),
        'verified',
    ])->group(function () {
        // Dashboard Route
        Route::get('/dashboard', function () {
            return view('dashboard');
        })->name('dashboard');

        // User Routes
        Route::middleware(['role:user'])->group(function () {
            Route::get('/contact-form', [ContactFormController::class, 'create'])
                ->name('contact-form');
            Route::post('/contact-form', [ContactFormController::class, 'store'])
                ->name('contact-form.store');
        });

        // Admin-Only Routes
        Route::middleware(['role:admin'])->prefix('admin')->group(function () {
            Route::get('/view-contact', [ContactFormController::class, 'view'])
                ->name('admin.view-contact');
        });
    });
});
