<?php

/**
 * Storage table for roles
 */
class Sysdev_ProjectDocsVersions_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'main_sysdev_project_docs_versions';

    protected $_nullableFields = array(
        'doc_id',
        'file_id',
        'version'
    );
}