<?php

/**
 * Storage table for roles
 */
class Experts_ExpertsDocs_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'experts_docs';

    protected $_nullableFields = array(
        'name',
        'desc',
        'doc_type_id',
        'expert_id',
        'date_create',
        'date_update',
        'author_id',
        'file_id'
    );
}