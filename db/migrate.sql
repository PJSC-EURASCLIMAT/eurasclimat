SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `crm_projects_services`;

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

ALTER TABLE `crm_projects_equipment_services`
  ADD CONSTRAINT `crm_projects_equipment_services_ibfk_2` 
    FOREIGN KEY (`eq_id`) REFERENCES `crm_projects_equipment` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `crm_projects_equipment_services_ibfk_1` 
    FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`);

SET FOREIGN_KEY_CHECKS=1;