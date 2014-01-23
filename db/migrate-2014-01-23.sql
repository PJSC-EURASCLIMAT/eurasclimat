SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `crm_projects_services`;
DROP TABLE IF EXISTS `crm_projects_expendables`;

ALTER TABLE `catalog_expendables` CHANGE `price` `price` DOUBLE(10,2) NULL;
ALTER TABLE `catalog_special_services` CHANGE `price` `price` DOUBLE(10,2) NULL;

DROP TABLE IF EXISTS `crm_projects_special_services`;
CREATE TABLE IF NOT EXISTS `crm_projects_special_services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  `number` int(10) unsigned DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  `term` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `crm_projects_equipment` CHANGE `number` `number` INT(10) UNSIGNED NULL;
ALTER TABLE `crm_projects_equipment` ADD `price` DOUBLE( 10, 2 ) NULL;

DROP TABLE IF EXISTS `crm_projects_special_services_expendables`;
CREATE TABLE IF NOT EXISTS `crm_projects_special_services_expendables` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ss_id` int(10) unsigned NOT NULL,
  `expendable_id` int(10) unsigned NOT NULL,
  `measure` varchar(255) DEFAULT NULL,
  `number` DOUBLE(10,3) DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `expendable_id` (`expendable_id`),
  KEY `ss_id` (`ss_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `crm_projects_equipment_services`;
CREATE TABLE IF NOT EXISTS `crm_projects_equipment_services` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `eq_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  `term` varchar(255) default NULL,
  `price` double(10,2) default NULL,
  PRIMARY KEY  (`id`),
  KEY `service_id` (`service_id`),
  KEY `eq_id` (`eq_id`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `catalog_special_services_expendables`;
CREATE TABLE IF NOT EXISTS `catalog_special_services_expendables` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `service_id` int(10) unsigned NOT NULL,
  `expendable_id` int(10) unsigned NOT NULL,
  `number` double(10,3) DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`),
  KEY `expendable_id` (`expendable_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

ALTER TABLE `crm_projects_equipment_services`
  ADD CONSTRAINT `crm_projects_equipment_services_ibfk_2` 
    FOREIGN KEY (`eq_id`) REFERENCES `crm_projects_equipment` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `crm_projects_equipment_services_ibfk_1` 
    FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`);

ALTER TABLE `experts` ADD `experience` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL;
ALTER TABLE `experts` ADD `rating` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL;

ALTER TABLE `experts_docs` ADD  `file_id` INT(10) UNSIGNED NULL;
ALTER TABLE `experts_docs` ADD INDEX (`file_id`);

ALTER TABLE `experts_docs` ADD FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

ALTER TABLE `crm_projects_special_services_expendables`
  ADD CONSTRAINT `crm_projects_special_services_expendables_ibfk_2` FOREIGN KEY (`ss_id`) REFERENCES `crm_projects_special_services` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `crm_projects_special_services_expendables_ibfk_1` FOREIGN KEY (`expendable_id`) REFERENCES `catalog_expendables` (`id`);

ALTER TABLE `crm_projects_special_services`
  ADD CONSTRAINT `crm_projects_special_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_special_services` (`id`),
  ADD CONSTRAINT `crm_projects_special_services_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `crm_projects` (`id`) ON DELETE CASCADE;

ALTER TABLE `catalog_special_services_expendables`
  ADD CONSTRAINT `catalog_special_services_expendables_ibfk_2` FOREIGN KEY (`expendable_id`) REFERENCES `catalog_expendables` (`id`),
  ADD CONSTRAINT `catalog_special_services_expendables_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `catalog_special_services` (`id`) ON DELETE CASCADE;

SET FOREIGN_KEY_CHECKS=1;
