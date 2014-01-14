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


ALTER TABLE  `experts`
  ADD  `experience` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL
ALTER TABLE  `experts`
  ADD  `rating` VARCHAR( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL

ALTER TABLE  `experts_docs`
  ADD  `file_id` INT( 10 ) UNSIGNED NULL
ALTER TABLE  `experts_docs`
  ADD INDEX (  `file_id` )
ALTER TABLE  `experts_docs`
  ADD FOREIGN KEY (  `file_id` ) REFERENCES  `e-head_ec`.`files` (`id`)
  ON DELETE SET NULL ON UPDATE RESTRICT ;
SET FOREIGN_KEY_CHECKS=1;