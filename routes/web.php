<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BomController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductionOrderController;
use App\Http\Controllers\GudangController;
use App\Http\Controllers\MaterialRequestController;
use App\Http\Controllers\OperationCenterController;
use App\Http\Controllers\MaterialIssueController;
use App\Http\Controllers\ProductionProgressController;
use App\Http\Controllers\NCCController;



/*
|--------------------------------------------------------------------------
| NCC CONTROL CENTER
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {


    Route::get('/ncc', [
        NCCController::class,
        'index'
    ])
    ->name('ncc');


    // NCC LIVE ACTIVITY STREAM
    Route::get(
        '/ncc/activity',
        [NCCController::class, 'activity']
    )
    ->name('ncc.activity');



});





/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

Route::get('/', function () {

    return redirect('/login');

});






/*
|--------------------------------------------------------------------------
| Authenticated Application
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {



    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/dashboard',
        [DashboardController::class, 'index']
    )
    ->name('dashboard');





    /*
    |--------------------------------------------------------------------------
    | Master Material
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'material',
        MaterialController::class
    );





    /*
    |--------------------------------------------------------------------------
    | Master BOM
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'boms',
        BomController::class
    );


    Route::post(
        '/boms/calculate',
        [BomController::class, 'calculate']
    )
    ->name('boms.calculate');


    Route::get(
        '/boms/{product}/generate',
        [BomController::class, 'generate']
    )
    ->name('boms.generate');






    /*
    |--------------------------------------------------------------------------
    | Master Product
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'products',
        ProductController::class
    );







    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/profile',
        [ProfileController::class, 'edit']
    )
    ->name('profile.edit');


    Route::patch(
        '/profile',
        [ProfileController::class, 'update']
    )
    ->name('profile.update');


    Route::delete(
        '/profile',
        [ProfileController::class, 'destroy']
    )
    ->name('profile.destroy');







    /*
    |--------------------------------------------------------------------------
    | Production Order
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'production-orders',
        ProductionOrderController::class
    );


    Route::get(
        '/production-orders/{id}/calculate-bom',
        [ProductionOrderController::class, 'calculateBom']
    )
    ->name('production-orders.calculate-bom');







    /*
    |--------------------------------------------------------------------------
    | Operation Center
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/operation-center',
        [OperationCenterController::class, 'index']
    )
    ->name('operation.center');







    /*
    |--------------------------------------------------------------------------
    | Gudang
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'gudang',
        GudangController::class
    );







    /*
    |--------------------------------------------------------------------------
    | Material Request
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'material-requests',
        MaterialRequestController::class
    );



    Route::get(
        'material-requests/{materialRequest}/print',
        [MaterialRequestController::class, 'print']
    )
    ->name('material-requests.print');



    Route::post(
        '/material-requests/{materialRequest}/approve',
        [MaterialRequestController::class, 'approve']
    )
    ->name('material-requests.approve');



    Route::post(
        '/material-requests/{materialRequest}/reject',
        [MaterialRequestController::class, 'reject']
    )
    ->name('material-requests.reject');



    Route::get(
        '/material-requests/{materialRequest}',
        [MaterialRequestController::class, 'show']
    )
    ->name('material-requests.show');



    Route::post(
        '/material-requests/{materialRequest}/cancel',
        [MaterialRequestController::class, 'cancel']
    )
    ->name('material-requests.cancel');



    Route::post(
        '/material-requests/{materialRequest}/issue',
        [MaterialIssueController::class, 'store']
    )
    ->name('material-issues.store');







    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    */

    Route::post(
        '/logout',
        function () {

            Auth::logout();

            request()
                ->session()
                ->invalidate();


            request()
                ->session()
                ->regenerateToken();


            return redirect('/login');

        }
    )
    ->name('logout');



});








/*
|--------------------------------------------------------------------------
| Production Progress
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {


    Route::get(
        '/production-progresses',
        [ProductionProgressController::class, 'index']
    )
    ->name('production-progresses.index');



    Route::post(
        '/production-progresses',
        [ProductionProgressController::class, 'store']
    )
    ->name('production-progresses.store');



    Route::get(
        '/production-progresses/export-csv',
        [ProductionProgressController::class, 'exportCsv']
    )
    ->name('production-progresses.export-csv');


});






require __DIR__ . '/auth.php';