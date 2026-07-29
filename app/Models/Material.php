<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Material extends Model
{
  protected $fillable = [
    'kode',
    'nama',
    'kategori',
    'satuan',
    'isi_kemasan',
    'stok',
    'keterangan',
];
    public function boms()
    {
        return $this->hasMany(Bom::class);
    }
}
