<?php
/**
 * Древовидная структура для манипуляции Ext.tree.Panel
 */
class Xend_Tree {
    
    private $row;

    private $children;

    public function __construct(array &$rows, $myRow = null) {

        // корневой узел
        
        if (is_null($myRow)) {
            
            $this->row = array('id' => null);

            foreach ($rows as $index => $row) {
                
                if (is_null($row['parent_id'])) {

                    $this->children[] = new self($rows, $row);
                
                }
                
            }
            
            return;
            
        }

        // прочие узлы
        
        $this->row = $myRow;

        $positions = array();
        
        foreach ($rows as $index => $row) {

            if ($row['parent_id'] == $myRow['id']) {

                $positions[] = $row['position'];
                $this->children[] = new self($rows, $row);

            }

        }
        
        if (is_array($this->children)) {
            
            array_multisort($positions, SORT_NUMERIC, $this->children);
            $this->orderChildren(); // на случай, если в нумерации есть пропуски
            
        }

    }
    
    public function toArray() {
        
        $array = $this->row;

        $array['loaded'] = true;

        if (is_array($this->children) && !empty($this->children)) {

            $array['children'] = array();
            
            $positions = array();
            
            foreach ($this->children as $child) {

                $array['children'][] = $child->toArray();
                
            }
            
        }

        return $array;
        
    }
    
    public function toFlatArray() {

        $flatArray = $this->isRootNode() ? array() : array($this->row);
        
        if (is_array($this->children)) {

            foreach ($this->children as $child) {
                
                $flatArray = array_merge($flatArray, $child->toFlatArray());
                
            }

        }

        return $flatArray;
        
    }

    public function findNodeById($id = null) {

        if (empty($id) && $this->isRootNode()) {
            return $this;
        }
        
        if (!$this->isRootNode() && $id == $this->row['id']) {

            return $this;
            
        }

        if (is_array($this->children)) {
            
            foreach ($this->children as $child) {

                $foundNode = $child->findNodeById($id);

                if ($foundNode instanceof self) {

                    return $foundNode;

                }

            }
            
        }
        
        return null;
        
    }
    
    public function getDepth(Xend_Tree $node, $depth = null) {

        if ($this === $node) {

            return $depth;
            
        }

        if (is_array($this->children)) {

            foreach ($this->children as $index => $child) {
                
                $childDepth = $child->getDepth($node, $depth + 1);

                if (!is_null($childDepth)) {
                    return $childDepth;
                }
                
            }

        }
        
        
        return null;
        
    }
    
    public function hasChildren() {
        
        return is_array($this->children) && !empty($this->children);
        
    }
    
    public function updateNode(array $data) {
        
        if (is_null($data['id'])) {
            throw new Doctor_Service_TreeMaker_Exception('Обновляемый узел не имеет идентификатора.');
        }
        
        if ($data['id'] == $this->row['id']) {
            
            foreach ($data as $key => $value) {
                
                // пропускаем поля, определяющие структуру дерева
                if ($key == 'parent_id' || $key == 'id' || $key == 'position') {
                    continue;
                }
                
                $this->row[$key] = $value;
                
            }
            
            return true;
            
        }
        
        if (is_array($this->children)) {

            foreach ($this->children as $index => $child) {
                
                $done = $child->updateNode($data);
                
                if ($done) {
                    
                    return true;
                    
                }
                
            }
            
        }
        
    }
    
    public function removeNode(Xend_Tree $node) {
        
        if ($this->isRootNode() && $node === $this) {
            
            throw new Doctor_Service_TreeMaker_Exception('Невозможно удалить корневой узел');
            
        }
        
        $removedNodeIds = array();

        if ($node === $this) { // находимся в удаляемом узле

            $this->row['parent_id'] = -1;
            
            $removedNodeIds = array();
            $rows = $this->toFlatArray();
            foreach ($rows as $row) {
                $removedNodeIds[] = $row['id'];
            }
            
            return $removedNodeIds;
            
        }

        if (is_array($this->children)) {

            foreach ($this->children as $index => $child) {
                
                $removedNodeIds = $child->removeNode($node);
                
                if (!empty($removedNodeIds)) {
                    
                    if ($node === $child) { // находимся в родительском узле удаляемого узла
                        array_splice($this->children, $index, 1);
                        $this->orderChildren();
                    }
                    
                    return $removedNodeIds;
                }
                
            }
            
        }

        return $removedNodeIds;
        
    }
    
    public function append(Xend_Tree $targetNode, array $nodes) {
        
        if ($targetNode === $this) {

            foreach ($nodes as $node) {
                
                $this->checkType($node);
                
                $this->children[] = $node;

            }

            $this->orderChildren();

            return true;
            
        } 
        
        if (is_array($this->children)) {
            
            foreach ($this->children as $child) {
                
                $done = $child->append($targetNode, $nodes);
                
                if ($done) {
                    return true;
                }
                
            }
            
        }
        
        return false;
        
        
    }
    
    public function insertBefore(Xend_Tree $targetNode, array $nodes) {

        if (is_array($this->children)) {
            
            foreach ($this->children as $index => $child) {

                if ($targetNode === $child) { // находимся в родительском узле

                    foreach ($nodes as $node) {
                        $this->checkType($node);
                    }

                    array_splice($this->children, $index, 0, $nodes);

                    $this->orderChildren();
                    
                    return true;
                    
                } else {
                    
                    $done = $child->insertBefore($targetNode, $nodes);
                    
                    if ($done) {
                        return true;
                    }
                    
                }
                
            }
            
        }
        
        return false;
        
    }
    
    public function insertAfter(Xend_Tree $targetNode, array $nodes) {

        if (is_array($this->children)) {
            
            foreach ($this->children as $index => $child) {

                if ($targetNode === $child) {
                    
                    foreach ($nodes as $node) {
                        $this->checkType($node);
                    }
                    
                    array_splice($this->children, $index+1, 0, $nodes);
                    
                    $this->orderChildren();
                    
                    return true;
                    
                } else {
                    
                    $done = $child->insertAfter($targetNode, $nodes);
                    
                    if ($done) {
                        return true;
                    }
                    
                }
                
            }
            
        }
        
        return false;
        
    }

    private function checkType(Xend_Tree $node) {}
    
    private function isRootNode() {
        
        return is_null($this->row['id']); // корневой узел имеет вспомогательное значение и не хранится в базе данных
        
    }
    
    private function orderChildren() {
        
        if (is_array($this->children)) {
            
            foreach ($this->children as $index => $child) {
                $child->joinParent($this->row['id'], $index+1);
            }
            
        }
        
    }
    
    private function joinParent($parentId, $orderNumber) {

        $this->row['parent_id'] = $parentId;
        $this->row['position'] = $orderNumber;
        
    }

}
