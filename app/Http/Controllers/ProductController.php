<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function index()
    {

        $products = Product::latest()->get();


        return Inertia::render(
            'Master/Products/Index',
            [
                'products'=>$products
            ]
        );

    }





    public function store(Request $request)
    {


        $validated = $request->validate([

            'kode'=>'required|string|max:100',

            'nama'=>'required|string|max:255',

            'customer'=>'nullable|string|max:255',

            'warna'=>'nullable|string|max:100',

            'ukuran'=>'nullable|string|max:100',

            'kategori'=>'nullable|string|max:100',

            'keterangan'=>'nullable|string',

        ]);



        Product::create($validated);



        return redirect()
            ->back()
            ->with(
                'success',
                'Product berhasil ditambahkan'
            );

    }







    public function update(
        Request $request,
        Product $product
    )
    {


        $validated = $request->validate([

            'kode'=>'required|string|max:100',

            'nama'=>'required|string|max:255',

            'customer'=>'nullable|string|max:255',

            'warna'=>'nullable|string|max:100',

            'ukuran'=>'nullable|string|max:100',

            'kategori'=>'nullable|string|max:100',

            'keterangan'=>'nullable|string',

        ]);




        $product->update($validated);




        return redirect()
            ->back()
            ->with(
                'success',
                'Product berhasil diperbarui'
            );

    }







    public function destroy(Product $product)
    {


        $product->delete();



        return redirect()
            ->back()
            ->with(
                'success',
                'Product berhasil dihapus'
            );


    }


}