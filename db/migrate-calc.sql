SET FOREIGN_KEY_CHECKS=0;

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