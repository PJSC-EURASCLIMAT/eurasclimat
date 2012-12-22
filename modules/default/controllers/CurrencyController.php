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
        foreach ($arr as $a) {
            $in = (array)$a;
            $res = array();
            $res['ID']          = $in['@attributes']['ID'];
            $res['NumCode']     = $in['NumCode'];
            $res['CharCode']    = $in['CharCode'];
            $res['Nominal']     = $in['Nominal'];
            $res['Name']        = $in['Name'];
            $res['Value']       = $in['Value'];
            $out[] = $res;
        }
        echo Zend_Json::encode($out);
    }

}