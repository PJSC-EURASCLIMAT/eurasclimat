SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE  `catalog_projects` RENAME  `crm_projects` ;
ALTER TABLE  `catalog_projects_equipment` RENAME  `crm_projects_equipment` ;
ALTER TABLE  `catalog_projects_expendables` RENAME  `crm_projects_expendables` ;
ALTER TABLE  `catalog_projects_services` RENAME  `crm_projects_services` ;
ALTER TABLE  `catalog_projects_special_services` RENAME  `crm_projects_special_services` ;

ALTER TABLE `crm_projects` ADD `group_id` INT UNSIGNED NOT NULL AFTER `id`, 
ADD INDEX (`group_id`);

ALTER TABLE `crm_projects` CHANGE `creator_id` `creator_id` INT( 10 ) UNSIGNED NULL;

DROP TABLE IF EXISTS `crm_projects_groups`;
CREATE TABLE IF NOT EXISTS `crm_projects_groups` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `crm_projects_groups` (`name`) VALUES ('Общие');

UPDATE `crm_projects` SET `group_id`=1;

ALTER TABLE `crm_projects` ADD FOREIGN KEY (`group_id`) 
REFERENCES `crm_projects_groups` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE `crm_projects` ADD FOREIGN KEY (`creator_id`) 
REFERENCES `accounts` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT ;

SET FOREIGN_KEY_CHECKS=1;