<?php

/**
 * Default application conroller
 */
class CurrencyController extends Xend_Controller_Action
{
    public function indexAction()
    {
        $this->disableRender(true);
        $data = file('http://www.cbr.ru/scripts/XML_daily.asp');
        $xml = new SimpleXMLIterator(join('', $data));
        $arr = $xml->xpath('Valute');
        $out = array();
        $index = 10;
        foreach ($arr as $a) {
            $in = (array)$a;
            if (960 == $in['NumCode']) continue;
            $res = array();
            $res['ID']          = $in['@attributes']['ID'];
            $res['NumCode']     = $in['NumCode'];
            $res['CharCode']    = $in['CharCode'];
            $res['Nominal']     = $in['Nominal'];
            $res['Name']        = $in['Name'];
            $res['Value']       = $in['Value'];

            switch ($in['CharCode']) {
                case 'USD': $out[0] = $res; break;
                case 'EUR': $out[1] = $res; break;
                case 'BYR': $out[2] = $res; break;
                case 'UAH': $out[3] = $res; break;
                default: $out[$index] = $res; $index++; break;
            }
        }
        ksort($out);
        echo Zend_Json::encode(array_values($out));
    }

}