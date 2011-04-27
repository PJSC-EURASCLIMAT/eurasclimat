<?php

class CountriesController extends OSDN_Controller_Action
{
    public function indexAction()
    {
        $callback = $this->_getParam('callback');
        $output = array();
        $countries = Zend_Locale::getTranslationList('territory', OSDN_Language::getDefaultLocale(), 2);
        if (is_array($countries)) {
            asort($countries);
            foreach ($countries as $k => $v) {
                array_push($output, array(
                    'name' => $v,
                    'abbr' => $k
                ));
            }
        }
        if ($callback) {
            $this->disableRender(true);
            echo $callback . '(' . Zend_Json::encode($output) . ')';
        } else {
            $this->view->countries = $output;
            $this->view->success = true;
        }
    }
}