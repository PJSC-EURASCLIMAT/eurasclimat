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


DROP TABLE IF EXISTS `doc_types`;
CREATE TABLE `doc_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;


DROP TABLE IF EXISTS `main_sysdev_project_docs`;
CREATE TABLE `main_sysdev_project_docs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(11) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `type_id` (`type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=100 ;

ALTER TABLE `main_sysdev_project_docs`
  ADD CONSTRAINT `main_sysdev_project_docs_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `main_sysdev_projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `main_sysdev_project_docs_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `doc_types` (`id`);


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