<?php

/**
 * Storage table for roles
 */
class Sysdev_ProjectDiscussions_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'main_sysdev_project_discussions';

    protected $_nullableFields = array(
        'content',
        'account_id',
        'project_id'
    );
}