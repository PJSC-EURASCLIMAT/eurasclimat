<?php

/**
 * Storage table for permitions
 */
class Xend_Acl_Table_Permission extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'acl_permissions';

    /**
     * Fetch permissions
     *
     * @todo implement response object
     *
     * @param int $roleId           The role id
     * @param int $resourceId       The resource id
     * @return array|false
     */
    public function fetchPermissions($roleId, $resourceId)
    {
        $cols = array();
        foreach (Xend_Acl_Privilege::fetchAll() as $name => $value) {
            $name = strtolower($name);
            $cols[$name] = new Zend_Db_Expr("SUM(IF(`permissions`.`privilege_id` = '$value', 1, 0))");
        }

        $select = $this->_db->select()
            ->from(array('resources' => Xend_Db_Table_Abstract::getDefaultPrefix() . 'acl_resources'))
            ->joinLeft(
                array('permissions' => $this->getTableName()),
                $this->_db->quoteInto(
                    '`resources`.`id` = `permissions`.`resource_id` '
                    . 'AND `permissions`.`role_id` = ?', $roleId, 'int'
                ),
                $cols
            )
            ->group('resources.id');

        if ($resourceId > 0) {
            $select->where('`resources`.`parent_id` = ?', $resourceId);
        } else {
            $select->where(new Zend_Db_Expr('`resources`.`parent_id` IS NULL'));
        }

        try {
            $rows = $select->query()->fetchAll();
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return array();
        }

        foreach($rows as &$row) {
            $row['roleId'] = $roleId;
            $row['expanded'] = true;
            $row['children'] = $this->fetchPermissions($roleId, $row['id']);
        }
        return $rows;
    }
}