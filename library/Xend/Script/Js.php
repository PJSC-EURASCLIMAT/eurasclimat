<?php

class Xend_Script_Js extends Xend_Script_Abstract
{
    public function get($params = array())
    {
        return $this->_concatFilesToOne($params, 'script');
    }

    public function generateHtml($params = array(), $basePath = null)
    {
    	if(!is_null($basePath)){
    		$this->setBasePath($basePath);
    	}
        return $this->_generateHtml($params, 'script');
    }
}