SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `catalog_projects`;
CREATE TABLE IF NOT EXISTS `catalog_projects` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL default CURRENT_TIMESTAMP,
  `creator_id` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `creator_id` (`creator_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `catalog_projects`
  ADD CONSTRAINT `catalog_projects_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `accounts` (`id`);


DROP TABLE IF EXISTS `catalog_projects_equipment`;
CREATE TABLE IF NOT EXISTS `catalog_projects_equipment` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `project_id` int(10) unsigned NOT NULL,
  `entity` varchar(255) NOT NULL,
  `entity_id` int(10) unsigned NOT NULL,
  `number` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `catalog_projects_equipment`
  ADD CONSTRAINT `catalog_projects_equipment_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `catalog_projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

  
DROP TABLE IF EXISTS `catalog_projects_services`;
CREATE TABLE IF NOT EXISTS `catalog_projects_services` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `project_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  `number` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `project_id` (`project_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `catalog_projects_services`
  ADD CONSTRAINT `catalog_projects_services_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `catalog_projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `catalog_projects_services`
  ADD CONSTRAINT `catalog_projects_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`);

SET FOREIGN_KEY_CHECKS=1;