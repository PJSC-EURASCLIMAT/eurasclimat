<?php
class Xend_Common {
	static public function convertEntity($entity) {
		$entityArray = explode('.', $entity);
		foreach ($entityArray as &$item) {
            $item = ucfirst($item);
		}
        return(implode('_', $entityArray));
	}
}
?>