<?php

class Xend_Accounts_Table_Keys extends Xend_Db_Table_Abstract
{
    protected $_name = 'keys';
    
    /**
     * return password for set account id
     *
     * @param  int $id
     * @return string
     */
    public function getUserIdByKey($hash)
    {

        $select = $this->_db->select()
            ->from($this->getTableName(), 'user_id')
            ->where("hash = ?", new Zend_Db_Expr("'".$hash."'"))
            ->limit(1);

        $user_id = $select->query()->fetchColumn(0);
        if(!$user_id || $user_id == null){
            return false;
        }

        return $user_id;
    }

    public function deleteByUserId($user_id)
    {
        $affectedRows = $this->delete('user_id = '.$user_id);
        return $affectedRows;
    }
    

}