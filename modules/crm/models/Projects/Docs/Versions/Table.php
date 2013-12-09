<?php

class Crm_Projects_Docs_Versions_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'crm_projects_docs_versions';

    protected $_nullableFields = array(
        'doc_id',
        'file_id',
        'version'
    );
}