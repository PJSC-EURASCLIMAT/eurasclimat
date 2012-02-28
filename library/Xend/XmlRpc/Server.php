<?php

class Xend_XmlRpc_Server extends Zend_XmlRpc_Server
{
	/**
     * Class to use for responses; defaults to {@link Xend_XmlRpc_Response_Http}
     * @var string
     */
    protected $_responseClass = 'Xend_XmlRpc_Response_Http';
}