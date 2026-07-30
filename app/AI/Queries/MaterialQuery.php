<?php

namespace App\AI\Queries;

use App\Models\Material;


class MaterialQuery
{


    public function findStock($message)
    {

        $message = strtolower($message);


        $ignore = [
            'berapa',
            'stok',
            'stock',
            'kain',
            'material',
            'bahan',
            'cek',
            'lihat',
            'ada',
                        
        ];



        $words = explode(
            ' ',
            $message
        );



        $keywords = collect($words)
            ->filter(function($word) use ($ignore){

                return !in_array(
                    $word,
                    $ignore
                );

            })
            ->values();



        if($keywords->isEmpty())
        {

            return null;

        }



        $search = $keywords->implode(' ');



        return Material::where(
            'nama',
            'like',
            '%' . strtoupper($search) . '%'
        )
        ->first();


    }


}