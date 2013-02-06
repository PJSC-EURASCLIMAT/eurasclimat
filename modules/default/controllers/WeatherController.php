<?php

/**
 * Default application conroller
 */
class WeatherController extends Xend_Controller_Action
{
    /*
    public function init()
    {
        $this->_model = new Weather_Main();
        parent::init();
    }
    */

    public function getCountriesAction()
    {
        $this->disableRender(true);
        $data = file('http://xml.weather.co.ua/1.2/country/');
        $xml = new SimpleXMLIterator(join('', $data));
        $arr = $xml->xpath('country');
        $out = array();
        foreach ($arr as $a) {
            $in = (array)$a;
            $res = array();
            $res['id']          = (string)$in['@attributes']['id'];
            $res['ISO2']        = (string)$in['ISO2'];
            $res['ISO3']        = (string)$in['ISO3'];
            $res['name']        = (string)$in['name'];
            $res['name_en']     = (string)$in['name_en'];

            $out[] = $res;
        }
        echo Zend_Json::encode(array_values($out));
    }

    public function getCitiesByCountryCodeAction()
    {
        $this->disableRender(true);
        $data = file('http://xml.weather.co.ua/1.2/city/?country=' . $this->_getParam('id'));
        $xml = new SimpleXMLIterator(join('', $data));
        $arr = $xml->xpath('city');
        $out = array();
        $banList = array('10977', '2413', '669', '9304', '795', '618', '9725', '1037', '928', '13261');
        foreach ($arr as $a) {
            $in = (array)$a;
            $res = array();
            $res['id']          = (string)$in['@attributes']['id'];
            $res['name']        = (string)$in['name'];
            $res['name_en']     = (string)$in['name_en'];
            $res['region']      = (string)$in['region'];
            $res['country_id']  = (string)$in['country_id'];
            $res['country']     = (string)$in['country'];

            if (in_array($res['id'], $banList)) {
                continue;
            }
            $out[] = $res;
        }
        echo Zend_Json::encode(array_values($out));
    }

    public function getForecastByCityCodeAction()
    {
        $this->disableRender(true);
        $data = file('http://xml.weather.co.ua/1.2/forecast/'
              . $this->_getParam('id') . '?dayf=5&userid=eurasclimat.ru');
        $xml = new SimpleXMLIterator(join('', $data));

        $arr = $xml->xpath('city');
        $cityData = (array)$arr[0];
        $countryData = (array)$cityData['country'][0];
        $location = array(
            'id'                => (string)$cityData['@attributes']['id'],
            'name'              => (string)$cityData['name'],
            'name_en'           => (string)$cityData['name_en'],
            'country_id'        => (string)$countryData['@attributes']['id'],
            'country_name'      => (string)$countryData['name'],
            'country_name_en'   => (string)$countryData['name_en']
        );

        $arr = $xml->xpath('forecast');
        $arr = (array)$arr[0];
        $arr = (array)$arr['day'];
        $todayDate = '';
        $days = array();
        $today = array();
        foreach ($arr as $a) {

            $in = (array)$a;
            $res = array();

            $res['date'] = (string)$in['@attributes']['date'];
            $res['data'] = array(
                'hour'        => (string)$in['@attributes']['hour'],
                'ppcp'        => (string)$in['ppcp'],
                'pict'        => (string)$in['pict'],
                't_min'       => (string)$in['t']->min,
                't_max'       => (string)$in['t']->max,
                'p_min'       => (string)$in['p']->min,
                'p_max'       => (string)$in['p']->max,
                'wind_min'    => (string)$in['wind']->min,
                'wind_max'    => (string)$in['wind']->max,
                'wind_rumb'   => (string)$in['wind']->rumb
            );

            $thisDate = new Zend_Date($res['date']);
            if ($thisDate->isToday()) {
                $todayDate = $res['date'];
                $today[] = $res['data'];
            } else {
                $days[$res['date']]['date'] = $res['date'];
                $days[$res['date']]['data'][] = $res['data'];
            }
        }

//        echo '<pre>'; var_dump($days); die;

        echo Zend_Json::encode(array(
            'location'  => $location,
            'today'     => array('date' => $todayDate, 'data' => $today),
            'forecast'  => array_values($days)
        ));
    }
}