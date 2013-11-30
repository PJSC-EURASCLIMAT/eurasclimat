SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `catalog_conditioners` DROP `control_type_id`;
DROP TABLE `catalog_conditioners_control_types`;

ALTER TABLE `catalog_conditioners` DROP `connection_type_id`;
DROP TABLE `catalog_conditioners_connection_types`;

ALTER TABLE `catalog_conditioners` DROP `protection_type_id`;
DROP TABLE `catalog_conditioners_protection_types`;

ALTER TABLE `catalog_conditioners` DROP `material_id`;
DROP TABLE `catalog_conditioners_materials`;

ALTER TABLE `catalog_conditioners` ADD `heatingcooling_id` INT UNSIGNED NULL AFTER `implementation_type_id`;
ALTER TABLE `catalog_conditioners` ADD `currency_id` INT UNSIGNED NOT NULL AFTER `price`;
ALTER TABLE `catalog_conditioners` ADD `name` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL AFTER `marking`;

SET FOREIGN_KEY_CHECKS=1;