<?php

/**
 * Default application conroller
 */
class LocationsController extends Xend_Controller_Action
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
        $countries = new Xend_Locations_Countries();
        $response = $countries->getList();
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getCitiesByCountryCodeAction()
    {
        $cities = new Xend_Locations_Cities();
        $response = $cities->getByCountry($this->_getParam('id'));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getCountryByCityCodeAction()
    {
        $cities = new Xend_Locations_Countries();
        $response = $cities->getByCity($this->_getParam('id'));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getCitiesAction()
    {
        $cities = new Xend_Locations_Cities();
        $response = $cities->getList();
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
            $this->_collectErrors($response);
        }
    }

}