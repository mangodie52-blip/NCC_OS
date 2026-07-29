<?php

namespace App\AI;


class AAMemory
{


    protected array $memory = [];



    public function remember(
        string $key,
        mixed $value
    )
    {

        $this->memory[$key] = $value;

    }



    public function recall(
        string $key
    )
    {

        return $this->memory[$key] ?? null;

    }



    public function clear()
    {

        $this->memory = [];

    }



}