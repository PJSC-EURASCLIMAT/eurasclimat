<?php

class Catalog_Items
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Catalog_Items_Table();
    }

    public function getList($params)
    {
        $response = new OSDN_Response();

        $select = $this->_table->getAdapter()->select();
        $select->from($this->_table->getTableName());

        if (isset($params['categoryId']) && intval($params['categoryId']) > 0) {
            $select->where('category_id = ?', intval($params['categoryId']));
        }

        $plugin = new OSDN_Db_Plugin_Select($this->_table, $select);
        $plugin->parse($params);
        try {
            $rows = $select->query()->fetchAll();
            $response->setRowset($rows);
            $response->totalCount = $plugin->getTotalCount();
            $status = OSDN_Status::OK;
        } catch (Exception $e) {
            if (OSDN_DEBUG) {
                throw $e;
            }
            $status = OSDN_Status::DATABASE_ERROR;
        }
        return $response->addStatus(new OSDN_Status($status));
    }

    public function get($id)
    {
        $id = intval($id);
        $response = new OSDN_Response();
        if ($id == 0) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }
        $select = $this->_table->getAdapter()->select();
        $select->from(array('s' => $this->_table->getTableName()));
//        $select->join(array('c' => 'staff_categories'), 's.category_id=c.id',
//                      array('category_name' => 'c.name'));
        $select->where('s.id = ?', $id);

        $row = $select->query()->fetchAll();
        if (!$row) {
            return $response->addStatus(new OSDN_Status(OSDN_Status::DATABASE_ERROR));
        }
        $response->setRow($row[0]);
        return $response->addStatus(new OSDN_Status(OSDN_Status::OK));
    }

    public function add(array $params)
    {
        $f = new OSDN_Filter_Input(array(
            'category_id'   => 'Int',
            '*'             => 'StringTrim'
        ), array(
            'category_id'   => array('Id', 'presence' => 'required'),
            'marking'       => array(array('StringLength', 0, 250))
        ), $params);

        $response = new OSDN_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

//        $file = $_FILES['cv_file'];
//
//        if ($file['error'] != UPLOAD_ERR_NO_FILE) {
//
//            if ($file['error'] > 0) {
//                $response->addStatus(new OSDN_Status(
//                    OSDN_Status::INPUT_PARAMS_INCORRECT, 'file'));
//                return $response;
//            }
//
//            $filenameArray = split('\.', $file['name']);
//            $ext = array_pop($filenameArray);
//            $filename = uniqid() . '.' . $ext;
//            $filepath = FILES_DIR . DIRECTORY_SEPARATOR . $filename;
//
//            if (move_uploaded_file($file['tmp_name'], $filepath)) {
//                $data = $f->getData();
//                $data['cv_file'] = $filename;
//                $f->setData($data);
//            } else {
//                return $response->addStatus(new OSDN_Status(OSDN_Status::FAILURE));
//            }
//        }

        $id = $this->_table->insert($f->getData());
        if (!$id) {
//            if (isset($filepath) && is_file($filepath)) {
//                unlink($filepath);
//            }
            return $response->addStatus(new OSDN_Status(OSDN_Status::DATABASE_ERROR));
        }

        $response->id = $id;
        return $response->addStatus(new OSDN_Status(OSDN_Status::OK));
    }

    public function update(array $params)
    {
        unset($params['category_id']);

        $f = new OSDN_Filter_Input(array(
            'id'            => 'Int',
            'category_id'   => 'Int',
            '*'             => 'StringTrim'
        ), array(
            'id'            => array('Id', 'presence' => 'required'),
            'category_id'   => array('Id', 'presence' => 'required'),
            'marking'      => array(array('StringLength', 0, 250))
        ), $params);

        $response = new OSDN_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

//        $file = $_FILES['cv_file'];
//
//        if ($file['error'] != UPLOAD_ERR_NO_FILE) {
//
//            if ($file['error'] > 0) {
//                $response->addStatus(new OSDN_Status(
//                    OSDN_Status::INPUT_PARAMS_INCORRECT, 'file'));
//                return $response;
//            }
//
//            $resp = $this->get($f->id);
//            if ($resp->hasNotSuccess()) {
//                return $response->importStatuses($resp->getStatusCollection());
//            }
//            $row = $resp->getRow();
//
//            $filenameArray = split('\.', $file['name']);
//            $ext = array_pop($filenameArray);
//            $filename = uniqid() . '.' . $ext;
//            $filepath = FILES_DIR . DIRECTORY_SEPARATOR . $filename;
//
//            if (move_uploaded_file($file['tmp_name'], $filepath)) {
//                $data = $f->getData();
//                $data['cv_file'] = $filename;
//                $f->setData($data);
//                if (!empty($row['cv_file'])
//                && is_file(FILES_DIR . DIRECTORY_SEPARATOR . $row['cv_file'])) {
//                    unlink(FILES_DIR . DIRECTORY_SEPARATOR . $row['cv_file']);
//                }
//            } else {
//                return $response->addStatus(new OSDN_Status(OSDN_Status::FAILURE));
//            }
//        }
        $rows = $this->_table->updateByPk($f->getData(), $f->id);
        $status = OSDN_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new OSDN_Status($status));
    }

    public function delete($id)
    {
        $id = intval($id);
        $response = new OSDN_Response();
        if ($id == 0) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $resp = $this->get($id);
        if ($resp->hasNotSuccess()) {
            return $response->importStatuses($resp->getStatusCollection());
        }
        $row = $resp->getRow();

        $res = $this->_table->deleteByPk($id);
        if (false === $res) {
            return $response->addStatus(new OSDN_Status(OSDN_Status::DATABASE_ERROR));
        }

//        if (!empty($row['cv_file'])
//        && is_file(FILES_DIR . DIRECTORY_SEPARATOR . $row['cv_file'])) {
//            unlink(FILES_DIR . DIRECTORY_SEPARATOR . $row['cv_file']);
//        }
        return $response->addStatus(new OSDN_Status(OSDN_Status::OK));
    }
}