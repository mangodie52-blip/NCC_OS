<?php

namespace App\AI;

use App\AI\Queries\MaterialQuery;


class AAEngine
{


public function respond($message)
{

    $message = app(AATextCleaner::class)
        ->clean($message);


$intent = app(AAIntent::class)
->detect($message);



switch($intent)
{


case "GREETING":


return
"Halo 👋\n".
"Saya AA, Neats Assistant.\n".
"Siap membantu operasional NCC OS.";




case "CHECK_STOCK":


return $this->checkMaterial(
$message
);



default:


return
"AA siap membantu operasional NCC OS.";



}



}




private function checkMaterial($message)
{


$query = new MaterialQuery();



$words = explode(
' ',
strtolower($message)
);



$keyword = end($words);



$material =
$query->findStock(
$keyword
);



if(!$material)
{

return
"AA belum menemukan material tersebut 🧵";

}




return

"Sebentar... AA cek gudang dulu 🧵\n\n".

"Material ditemukan:\n".

$material->nama."\n\n".

"Stok:\n".

$material->stok." ".
$material->satuan."\n\n".

"Status:\n".

(
$material->stok > $material->stok_minimum

?

"Aman ✅"

:

"Perlu Restock ⚠️"

);



}



}