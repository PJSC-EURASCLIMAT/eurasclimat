<?php

/**
 * Storage table for roles
 */
class Sysdev_ProjectDocs_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'main_sysdev_project_docs';

    protected $_nullableFields = array(
        'account_id',
        'name'
    );
}