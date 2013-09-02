SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE `catalog_special_services` (
`id` INT( 10 ) UNSIGNED NOT NULL AUTO_INCREMENT ,
 `group_id` INT( 10 ) UNSIGNED NOT NULL ,
 `code` VARCHAR( 255 ) DEFAULT NULL ,
 `name` TEXT NOT NULL ,
 `price` DOUBLE( 10, 2 ) NOT NULL ,
 `measure` VARCHAR( 255 ) DEFAULT NULL ,
 `term` VARCHAR( 255 ) DEFAULT NULL ,
PRIMARY KEY (`id`) ,
KEY  `group_id` (`group_id`)
) ENGINE = INNODB DEFAULT CHARSET = utf8;

CREATE TABLE `catalog_special_services_groups` (
`id` INT( 10 ) UNSIGNED NOT NULL AUTO_INCREMENT ,
 `name` VARCHAR( 255 ) NOT NULL ,
PRIMARY KEY (`id`)
) ENGINE = INNODB DEFAULT CHARSET = utf8;

ALTER TABLE `catalog_special_services` ADD FOREIGN KEY (`group_id`) 
REFERENCES `catalog_special_services_groups` (`id`) 
ON DELETE RESTRICT ON UPDATE RESTRICT ;

DROP TABLE IF EXISTS `catalog_expendables`;
CREATE TABLE IF NOT EXISTS `catalog_expendables` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `group_id` int(10) unsigned NOT NULL,
  `code` varchar(255) default NULL,
  `name` text NOT NULL,
  `price` double(10,2) NOT NULL,
  `measure` varchar(255) default NULL,
  PRIMARY KEY  (`id`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_expendables_groups`;
CREATE TABLE IF NOT EXISTS `catalog_expendables_groups` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_special_services_expendables`;
CREATE TABLE IF NOT EXISTS `catalog_special_services_expendables` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `service_id` int(10) unsigned NOT NULL,
  `expendable_id` int(10) unsigned NOT NULL,
  `number` double(10,3) default NULL,
  PRIMARY KEY  (`id`),
  KEY `service_id` (`service_id`),
  KEY `expendable_id` (`expendable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `catalog_expendables`
  ADD CONSTRAINT `catalog_expendables_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_expendables_groups` (`id`);

ALTER TABLE `catalog_special_services_expendables`
  ADD CONSTRAINT `catalog_special_services_expendables_ibfk_3` FOREIGN KEY (`expendable_id`) REFERENCES `catalog_expendables` (`id`),
  ADD CONSTRAINT `catalog_special_services_expendables_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `catalog_special_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

DROP TABLE IF EXISTS `keys`;
CREATE TABLE IF NOT EXISTS `keys` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;


SET FOREIGN_KEY_CHECKS=1;