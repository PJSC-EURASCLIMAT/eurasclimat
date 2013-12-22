SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(100) NOT NULL,
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `city_id` int(10) unsigned DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `lang` varchar(2) NOT NULL,
  `tz` varchar(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`),
  KEY `city_id` (`city_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=83 ;


DROP TABLE IF EXISTS `crm_projects`;
CREATE TABLE `crm_projects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creator_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_id` (`creator_id`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;


DROP TABLE IF EXISTS `experts`;
CREATE TABLE `experts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(10) unsigned DEFAULT NULL,
  `desc` text,
  `status_id` int(10) unsigned DEFAULT NULL,
  `equip_id` int(10) unsigned DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  `author_id` int(11) unsigned DEFAULT NULL,
  `active` int(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `status_id` (`status_id`),
  KEY `equip_id` (`equip_id`),
  KEY `author_id` (`author_id`),
  KEY `account_id` (`account_id`) 
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=45 ;

DROP TRIGGER IF EXISTS `experts_date_create`;
DELIMITER //
CREATE TRIGGER `experts_date_create` BEFORE INSERT ON `experts`
 FOR EACH ROW BEGIN
set NEW.date_create = NOW();
set NEW.date_update = NOW();
END
//
DELIMITER ;
DROP TRIGGER IF EXISTS `experts_date_udpate`;
DELIMITER //
CREATE TRIGGER `experts_date_udpate` BEFORE UPDATE ON `experts`
 FOR EACH ROW SET NEW.date_update = NOW()
//
DELIMITER ;

DROP TABLE IF EXISTS `sysdev_description`;
CREATE TABLE `sysdev_description` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `theme_id` int(11) unsigned NOT NULL,
  `account_id` int(11) unsigned DEFAULT NULL,
  `date` datetime NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  KEY `theme_id` (`theme_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=52 ;


ALTER TABLE `crm_projects`
  ADD CONSTRAINT `crm_projects_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `crm_projects_groups` (`id`),
  ADD CONSTRAINT `crm_projects_ibfk_3` FOREIGN KEY (`creator_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;


ALTER TABLE `experts`
  ADD CONSTRAINT `experts_ibfk_1` FOREIGN KEY (`equip_id`) REFERENCES `experts_equipment` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `experts_statuses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_5` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

ALTER TABLE `sysdev_description`
  ADD CONSTRAINT `sysdev_description_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `sysdev_description_ibfk_2` FOREIGN KEY (`theme_id`) REFERENCES `sysdev_themes` (`id`);


SET FOREIGN_KEY_CHECKS=1;