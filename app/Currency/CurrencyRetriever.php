<?php
namespace App\Currency;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

use DateTime;
use DateInterval;

class CurrencyRetriever
{
    // Hold the class instance.
    private static $instance = null;
    private static $dateofSingleton=null;
    private $arrayofCurrencies=Array();

    // The constructor is private
    // to prevent initiation with outer code.
    private function __construct()
    {
        // The expensive process (e.g.,db connection) goes here.
    }

    // The object is created from within the class itself
    // only if the class has no instance.
    public static function getInstance()
    {
        $checkdate=(new DateTime());
        if (self::$instance == null || ($checkdate>=self::$dateofSingleton))
        {
            self::$instance = new CurrencyRetriever();
            self::$dateofSingleton=(new DateTime())->add(new DateInterval("P1D"));
        }

        return self::$instance;
    }

    public static function getCurrency($currency) {
        $checkConvertion=$currency.'_EUR'; //because in our database we will hold only dollars
        $instance=self::getInstance();
        if (isset($instance->arrayofCurrencies) && (count($instance->arrayofCurrencies)>0) &&
            (isset($instance->arrayofCurrencies[$checkConvertion]) && !empty($instance->arrayofCurrencies[$checkConvertion])) ) {
            return $instance->arrayofCurrencies[$checkConvertion];
        }
        else {
            $client = new Client(); //GuzzleHttp\Client
            $response = $client->get('http://free.currencyconverterapi.com/api/v5/convert',
                [
                    'query' => ['q' => $checkConvertion, 'compact' =>'y']
                ]);
            $result = $response->getBody();
            $code = $response->getStatusCode();
            $json = json_decode($result, true);
            $instance->arrayofCurrencies[$checkConvertion]=$json[$checkConvertion]['val'];
            return $instance->arrayofCurrencies[$checkConvertion];
        }
    }

}