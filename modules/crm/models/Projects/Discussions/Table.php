<?php

/**
 * Storage table for discussions
 */
class Crm_Projects_Discussions_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'crm_projects_discussions';

    protected $_nullableFields = array(
        'content',
        'account_id',
        'project_id'
    );
}