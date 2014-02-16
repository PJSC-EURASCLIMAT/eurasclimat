SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `calcpd_obj_type`;
CREATE TABLE IF NOT EXISTS `calcpd_obj_type` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `calcpd_obj_class`;
CREATE TABLE IF NOT EXISTS `calcpd_obj_class` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `calcpd_serv`;
CREATE TABLE IF NOT EXISTS `calcpd_serv` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS=1;