<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Inertia\Inertia;


class MaterialController extends Controller
{

    public function index()
    {
        return Inertia::render('Master/Material/Index', [

            'materials' => Material::latest()->get(),

        ]);
    }



    public function store(Request $request)
    {

        $validated = $request->validate([

            'kode' => 'required|unique:materials,kode',

            'nama' => 'required|string|max:255',

            'kategori' => 'required|string|max:100',

            'satuan' => 'required|string|max:50',

            'isi_kemasan' => 'required|numeric|min:1',

            'stok_awal' => 'required|numeric|min:0',

            'keterangan' => 'nullable|string',

        ]);



        Material::create([

            'kode' => $validated['kode'],

            'nama' => $validated['nama'],

            'kategori' => $validated['kategori'],

            'satuan' => $validated['satuan'],

            'isi_kemasan' => $validated['isi_kemasan'],

            'stok' => $validated['stok_awal'],

            'keterangan' => $validated['keterangan'],

        ]);



        return redirect()

            ->route('material.index')

            ->with('success','Material berhasil ditambahkan.');

    }





    public function update(Request $request, Material $material)
    {

        $validated = $request->validate([

            'kode' => 'required|unique:materials,kode,' . $material->id,

            'nama' => 'required|string|max:255',

            'kategori' => 'required|string|max:100',

            'satuan' => 'required|string|max:50',

            'isi_kemasan' => 'required|numeric|min:1',

            'stok_awal' => 'required|numeric|min:0',

            'keterangan' => 'nullable|string',

        ]);




        $material->update([

            'kode' => $validated['kode'],

            'nama' => $validated['nama'],

            'kategori' => $validated['kategori'],

            'satuan' => $validated['satuan'],

            'isi_kemasan' => $validated['isi_kemasan'],

            'stok' => $validated['stok_awal'],

            'keterangan' => $validated['keterangan'],

        ]);




        return redirect()

            ->route('material.index')

            ->with('success','Material berhasil diperbarui.');

    }





    public function destroy(Material $material)
    {

        $material->delete();


        return redirect()

            ->route('material.index')

            ->with('success','Material berhasil dihapus.');

    }

}