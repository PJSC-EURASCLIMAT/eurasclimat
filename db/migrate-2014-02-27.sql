SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `calcpd`;
CREATE TABLE IF NOT EXISTS `calcpd` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `obj_type_id` int(10) unsigned NOT NULL,
  `account_id` int(10) unsigned DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `obj_type_id` (`obj_type_id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `calcpd_content`;
CREATE TABLE IF NOT EXISTS `calcpd_content` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `serv_id` int(10) unsigned NOT NULL,
  `obj_type_id` int(10) unsigned NOT NULL,
  `obj_class_id` int(10) unsigned NOT NULL,
  `square` double(10,3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `obj_type_id` (`obj_type_id`),
  KEY `obj_class_id` (`obj_class_id`),
  KEY `serv_id` (`serv_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `calcpd`
  ADD CONSTRAINT `calcpd_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `calcpd_ibfk_1` FOREIGN KEY (`obj_type_id`) REFERENCES `calcpd_obj_type` (`id`);

ALTER TABLE `calcpd_content`
  ADD CONSTRAINT `calcpd_content_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `calcpd` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `calcpd_content_ibfk_2` FOREIGN KEY (`serv_id`) REFERENCES `calcpd_serv` (`id`),
  ADD CONSTRAINT `calcpd_content_ibfk_3` FOREIGN KEY (`obj_type_id`) REFERENCES `calcpd_obj_type` (`id`),
  ADD CONSTRAINT `calcpd_content_ibfk_4` FOREIGN KEY (`obj_class_id`) REFERENCES `calcpd_obj_class` (`id`);

SET FOREIGN_KEY_CHECKS=1;