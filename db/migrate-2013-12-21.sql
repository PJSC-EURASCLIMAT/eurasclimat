SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `accounts` DROP `country`,  DROP `city`;

ALTER TABLE `accounts` 
ADD `country_id` INT UNSIGNED NULL DEFAULT NULL, 
ADD `city_id` INT UNSIGNED NULL DEFAULT NULL;

ALTER TABLE `accounts` ADD INDEX (`country_id`);
ALTER TABLE `accounts` ADD INDEX (`city_id`);

ALTER TABLE `accounts` ADD FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE `accounts` ADD FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;


DROP TABLE IF EXISTS `crm_projects_discussions`;
CREATE TABLE IF NOT EXISTS `crm_projects_discussions` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `content` text,
  `date_create` datetime NOT NULL,
  `account_id` int(11) unsigned default NULL,
  `project_id` int(11) unsigned default NULL,
  PRIMARY KEY  (`id`),
  KEY `sysdev_project_discussions_ibfk_1` (`account_id`),
  KEY `sysdev_project_discussions_ibfk_2` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `crm_projects_discussions`
  ADD CONSTRAINT `crm_projects_discussions_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `crm_projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `crm_projects_discussions_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

SET FOREIGN_KEY_CHECKS=1;