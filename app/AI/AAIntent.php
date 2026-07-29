<?php

namespace App\AI;


class AAIntent
{


public function detect($message)
{


$message = strtolower($message);



if(
str_contains($message,'stok')
||
str_contains($message,'stock')
)
{

return "CHECK_STOCK";

}



if(
    str_contains($message,'stok')
    ||
    str_contains($message,'stock')
    ||
    str_contains($message,'berapa')
    ||
    str_contains($message,'jumlah')
    ||
    str_contains($message,'ada')
    ||
    preg_match('/\d+/', $message)
)
{

    return "CHECK_STOCK";

}
{

return "GREETING";

}



return "GENERAL_CHAT";


}



}