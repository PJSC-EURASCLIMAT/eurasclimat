<?php

/**
 * Storage table for votes
 */
class Sysdev_ProjectVotes_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'main_sysdev_project_votes';

    protected $_nullableFields = array(
        'project_id',
        'account_id'
    );
}