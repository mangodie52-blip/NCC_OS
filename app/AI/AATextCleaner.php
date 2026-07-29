<?php

namespace App\AI;


class AATextCleaner
{

    public function clean($text)
    {

        $text = strtolower($text);


        // hapus tanda baca
        $text = preg_replace(
            '/[^\p{L}\p{N}\s]/u',
            '',
            $text
        );


        // hapus spasi berlebih
        $text = preg_replace(
            '/\s+/',
            ' ',
            $text
        );


        return trim($text);

    }

}