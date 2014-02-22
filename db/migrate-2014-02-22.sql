SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `messages` ADD `type` INT(2) UNSIGNED NULL DEFAULT NULL ;
ALTER TABLE `messages` ADD `subject` VARCHAR(255) NULL DEFAULT NULL ;
ALTER TABLE `messages` ADD `deleted` INT(1) UNSIGNED NOT NULL DEFAULT '0';

ALTER TABLE `messages` ADD `owner_id` INT(10) UNSIGNED NOT NULL, ADD INDEX (`owner_id`);

ALTER TABLE `messages` 
    ADD `sender_name` VARCHAR(255) NULL DEFAULT NULL,
    ADD `receiver_name` VARCHAR(255) NULL DEFAULT NULL;

ALTER TABLE `messages` ADD FOREIGN KEY (`receiver_id`) 
    REFERENCES `accounts` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT;
ALTER TABLE `messages` ADD FOREIGN KEY (`owner_id`) 
    REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;


DROP TABLE IF EXISTS `calcpd_obj_class`;
CREATE TABLE IF NOT EXISTS `calcpd_obj_class` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `calcpd_obj_type`;
CREATE TABLE IF NOT EXISTS `calcpd_obj_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `calcpd_serv`;
CREATE TABLE IF NOT EXISTS `calcpd_serv` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `calcpd_price`;
CREATE TABLE IF NOT EXISTS `calcpd_price` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `serv_id` int(10) unsigned NOT NULL,
  `obj_type_id` int(10) unsigned NOT NULL,
  `obj_class_id` int(10) unsigned NOT NULL,
  `price` double(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `serv_id` (`serv_id`),
  KEY `obj_type_id` (`obj_type_id`),
  KEY `obj_class_id` (`obj_class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `calcpd_price`
  ADD CONSTRAINT `calcpd_price_ibfk_1` FOREIGN KEY (`serv_id`) REFERENCES `calcpd_serv` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `calcpd_price_ibfk_2` FOREIGN KEY (`obj_type_id`) REFERENCES `calcpd_obj_type` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `calcpd_price_ibfk_3` FOREIGN KEY (`obj_class_id`) REFERENCES `calcpd_obj_class` (`id`) ON DELETE CASCADE;

SET FOREIGN_KEY_CHECKS=1;