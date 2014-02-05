<?php

/**
 * Project Docs Controller conroller
 */
class Experts_ExpertsController extends Xend_Controller_Action
{

    public function init()
    {
        $this->_model = new Experts_Experts_Model();
        $this->_expertsDocsModel = new Experts_ExpertsDocs_Model();
        $this->_expertsJobTypesModel = new Experts_ExpertsJobTypes_Model();
        $this->_experts2JTModel = new Experts_Experts2JobTypes_Model();
        $this->_equipRef = new Experts_Ref('equipment');
        $this->_statusRef = new Experts_Ref('statuses');
        $this->_jobTypesRef = new Experts_Ref('job_types');
        $this->_ratingRef = new Experts_Ref('rating');

        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->experts->moderation);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-list');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'activate');

        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-expert-docs');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete-expert-doc');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'upload-expert-doc');

        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-expert-job-types');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add-expert-job-type');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete-expert-job-type');

        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'filter-equipment');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'filter-status');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'filter-rating');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'filter-job-types');

        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-filters-tree');

        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->experts);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-active-list');
    }

    public function getListAction()
    {
        $response = $this->_model->getAll(null, $this->_getAllParams());
        if ($response->isSuccess()) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getActiveListAction()
    {
        $response = $this->_model->getAll(array('e.active = ?',1));
        if ($response->isSuccess()) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getAction()
    {
        $response = $this->_model->get($this->_getParam('id'));
        $fromCurrent = $this->_getParam('fromCurrent');
        if ($response->isSuccess()) {
            $row = $response->getRow();
            $this->view->success = true;
            $this->view->data = $row;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function activateAction()
    {
        $data = array();
        $data['id'] = $this->_getParam('id');
        $data['active'] = $this->_getParam('active');

        $response = $this->_model->activate($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
        $this->view->success = true;
    }


    public function updateAction()
    {
        $response = $this->_model->update($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
        $this->view->success = true;
    }

    public function addAction()
    {
        $data= $this->_getAllParams();

        $modResponse = $this->_model->add($data);

        if ($modResponse->hasNotSuccess()) {
            $this->_collectErrors($modResponse);
            return;
        } else {
            $this->view->success = true;
            $this->view->id = $modResponse->id;
        }

    }

    public function deleteAction()
    {
        $id = intval($this->_getParam('id'));

        $deleteResponse = $this->_model->delete($id);
        if ($deleteResponse->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($deleteResponse);
        }
    }


    public function uploadExpertDocAction()
    {
        $expert_id = intval($this->_getParam('expert_id'));

        $data['expert_id'] = $expert_id;

        if ($expert_id == 0) {
            $response = new Xend_Response();
            $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, 'expert_id'));
            $this->_collectErrors($response);
            return;
        }

//        $data['name'] = $_GET['X-File-Name'];

        $modResponse = $this->_expertsDocsModel->add($data);

        if ($modResponse->hasNotSuccess()) {
            $this->_collectErrors($modResponse);
            return;
        } else {
            $this->view->success = true;
        }

    }

    public function deleteExpertDocAction()
    {
        $data = $this->_getAllParams();

        $deleteResponse = $this->_expertsDocsModel->delete($data);
        if ($deleteResponse->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($deleteResponse);
        }
    }

    public function getExpertDocsAction()
    {
        $expert_id = intval($this->_getParam('expert_id'));

        if ($expert_id == 0) {
            $response = new Xend_Response();
            $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, 'expert_id'));
            $this->_collectErrors($response);
            return;
        }

        $response = $this->_expertsDocsModel->getByExpert($expert_id);

        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
            $this->view->total = $response->totalCount;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getExpertJobTypesAction()
    {
        $expert_id = intval($this->_getParam('expert_id'));

        if ($expert_id == 0) {
            $response = new Xend_Response();
            $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, 'expert_id'));
            $this->_collectErrors($response);
            return;
        }

        $response = $this->_expertsJobTypesModel->getByExpertId($expert_id);

        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
            $this->view->total = $response->totalCount;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function addExpertJobTypeAction()
    {
        $data = $this->_getAllParams();

        $modResponse = $this->_experts2JTModel->add($data);

        if ($modResponse->hasNotSuccess()) {
            $this->_collectErrors($modResponse);
            return;
        } else {
            $this->view->success = true;
            $this->view->id = $modResponse->id;
        }

    }

    public function deleteExpertJobTypeAction()
    {
        $data = $this->_getAllParams();

        $deleteResponse = $this->_experts2JTModel->delete($data);
        if ($deleteResponse->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($deleteResponse);
        }
    }

//    ФИЛЬТРЫ
    //TODO проверить могут ли обычные юзеры на главной фильтровать
    public function filterEquipmentAction()
    {
        $equip_id = $this->_getParam('id');

        $where = array('e.equip_id = ?', $equip_id);

        $response = $this->_model->getAll($where);
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
            $this->_collectErrors($response);
        }
    }

    public function filterStatusAction()
    {
        $id = $this->_getParam('id');

        $where = array('e.status_id = ?', $id);

        $response = $this->_model->getAll($where);
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
            $this->_collectErrors($response);
        }
    }

    public function filterRatingAction()
    {
        $id = $this->_getParam('id');
        $map = array(
            1 => array('e.equip_id = ?', 1),
            2 => array('e.rating = ?', 2),
            3 => array(new Zend_Db_Expr('e.rating > 2 AND e.rating <= 4'), null),
            4 => array('e.rating = ?', 5),
            5 => array('e.rating > 5', 5),
            6 => array('e.rating > ?', 6),
        );

        $response = $this->_model->getAll($map[$id]);
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
            $this->_collectErrors($response);
        }
    }

    public function filterJobTypesAction()
    {
        $id = $this->_getParam('id');

        $customJoin = array(
            array('e2j' => 'experts2job_types'),
            'e.id=e2j.expert_id',
            null
        );

        $where = array('e2j.job_type_id = ?', $id);

        $response = $this->_model->getAll($where, $customJoin);
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getFiltersTreeAction()
    {

        $tree = [];

        $euqipNode =  array(
            'text' => 'Cпециалисты по типам инженерного оборудования',
            'type' => 'equipment',
            'children' => []
        );

        $jobTypesNode =  array(
            'text' => 'Cпециалисты по типам деятельности',
            'type' => 'job_types',
            'children' => []
        );

        $statusNode =  array(
            'text' => 'Cпециалисты по типам статусу',
            'type' => 'statuses',
            'children' => []
        );

        $ratingNode =  array(
            'text' => 'Cпециалисты по рейтингам',
            'type' => 'rating',
            'children' => []
        );

        $expNode =  array(
            'text' => 'Cпециалисты по опыту',
            'type' => 'experience',
            'children' => []
        );

        $cityNode =  array(
            'text' => 'Cпециалисты по регионам',
            'type' => 'cities',
            'children' => []
        );

        $equipResponse = $this->_equipRef->getAll();
        $statusResponse = $this->_statusRef->getAll();
        $jobTypesResponse = $this->_jobTypesRef->getAll();
        $ratingResponse = $this->_ratingRef->getAll();
        $cityResponse = $this->_model->getCities();

        $euqipNode['children'] = $equipResponse->getRowset();
        $jobTypesNode['children'] = $jobTypesResponse->getRowset();
        $statusNode['children'] = $statusResponse->getRowset();
        $ratingNode['children'] = $ratingResponse->getRowset();
        $cityNode['children'] = $cityResponse->getRowset();

        array_push($tree, $euqipNode, $jobTypesNode, $statusNode, $ratingNode, $expNode, $cityNode);

        for($j = 0; $j < count($tree); $j++ ) {
            for($i = 0; $i < count($tree[$j]['children']); $i++ ) {
                $tree[$j]['children'][$i]['text'] = $tree[$j]['children'][$i]['name'];
                $tree[$j]['children'][$i]['filId'] = $tree[$j]['children'][$i]['id'];
                $tree[$j]['children'][$i]['leaf'] = true;
                $tree[$j]['children'][$i]['checked'] = false;
                unset($tree[$j]['children'][$i]['name']);
                unset($tree[$j]['children'][$i]['id']);
            }
        }

        $this->view->success = true;
        $this->view->data = $tree;

    }

//    public function filterExperienceAction()
//    {
//        $id = $this->_getParam('id');
//
//        $customJoin = array(
//            array('e2j' => 'experts2job_types'),
//            'e.id=e2j.expert_id',
//            null
//        );
//
//        $where = array('e2j.job_type_id = ?', $id);
//
//        $response = $this->_model->getAll($where, $customJoin);
//        if ($response->isSuccess()) {
//            $this->view->success = true;
//            $this->view->data = $response->getRowset();
//        } else {
//            $this->_collectErrors($response);
//        }
//    }



}