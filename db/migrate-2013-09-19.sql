SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `catalog_projects_expendables`;
CREATE TABLE IF NOT EXISTS `catalog_projects_expendables` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `project_id` int(10) unsigned NOT NULL,
  `expendable_id` int(10) unsigned NOT NULL,
  `number` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `project_id` (`project_id`),
  KEY `expendable_id` (`expendable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_projects_special_services`;
CREATE TABLE IF NOT EXISTS `catalog_projects_special_services` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `project_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  `number` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `project_id` (`project_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `catalog_projects_expendables`
  ADD CONSTRAINT `catalog_projects_expendables_ibfk_2` FOREIGN KEY (`expendable_id`) REFERENCES `catalog_expendables` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `catalog_projects_expendables_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `catalog_projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `catalog_projects_special_services`
  ADD CONSTRAINT `catalog_projects_special_services_ibfk_4` FOREIGN KEY (`service_id`) REFERENCES `catalog_special_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `catalog_projects_special_services_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `catalog_projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

SET FOREIGN_KEY_CHECKS=1;