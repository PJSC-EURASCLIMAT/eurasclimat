<?php

/**
 * Storage table for permitions
 */
class Xend_Acl_Table_RolesAccounts extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'acl_roles_accounts';

    public function getRole($accountId)
    {
        $select = $this->_db->select()
            ->from($this->getTableName(), 'role_id')
            ->where('account_id = ?', $accountId)
            ->limit(1);

        return (int) $select->query()->fetchColumn(0);
    }

    public function getRoles($accountId)
    {
        $select = $this->_db->select()
            ->from(array('ra' => $this->getTableName()), array())
            ->join(array('r' => 'acl_roles'), 'ra.role_id=r.id', array('id', 'name'))
            ->where('ra.account_id = ?', $accountId);

        return $select->query()->fetchAll();
    }
}