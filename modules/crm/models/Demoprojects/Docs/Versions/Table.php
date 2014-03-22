<?php

class Crm_Demoprojects_Docs_Versions_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'crm_demoprojects_docs_versions';

    protected $_nullableFields = array(
        'doc_id',
        'file_id',
        'version'
    );
}