ALTER TABLE `catalog_items` CHANGE `price` `price` DOUBLE(10,2) NULL; 
ALTER TABLE `catalog_items` CHANGE `type_id` `type_id` INT(10) UNSIGNED NULL;
ALTER TABLE `catalog_items` CHANGE `chapter_id` `chapter_id` INT(10) UNSIGNED NULL;  
ALTER TABLE `catalog_items` ADD `cold` INT NULL, ADD `warm` INT NULL, ADD `power` DOUBLE(10,3) NULL; 