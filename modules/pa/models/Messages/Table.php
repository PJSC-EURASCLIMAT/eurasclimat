<?php

class PA_Messages_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'messages';

    protected $_nullableFields = array(
        'sender_id',
        'receiver_id',
        'message',
        'date',
        'read'
    );
}