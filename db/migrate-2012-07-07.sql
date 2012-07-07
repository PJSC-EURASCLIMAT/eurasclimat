SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

CREATE TABLE IF NOT EXISTS `catalog_conditioners_connection_types` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `catalog_conditioners_control_types` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `catalog_conditioners_protection_types` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `catalog_conditioners_materials` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `catalog_conditioners_power_sources` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_conditioners`;
CREATE TABLE IF NOT EXISTS `catalog_conditioners` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `group_id` int(10) unsigned default NULL,
  `mark_id` int(10) unsigned default NULL,
  `marking` text,
  `product_type_id` int(10) unsigned default NULL,
  `implementation_type_id` int(10) unsigned default NULL,
  `control_type_id` int(10) unsigned default NULL,
  `connection_type_id` int(10) unsigned default NULL,
  `protection_type_id` int(10) unsigned default NULL,
  `material_id` int(10) unsigned default NULL,
  `power_source_id` int(10) unsigned default NULL,
  `country` text,
  `cooling_capacity` text,
  `heating_capacity` text,
  `cooling_outdor_temp` text,
  `heating_outdor_temp` text,
  `power_supply` text,
  `cooling_power_consumption` text,
  `heating_power_consumption` text,
  `amperage` text,
  `air_consumption_min` text,
  `air_consumption_max` text,
  `sensor_inputs` text,
  `pressure` text,
  `noise_level_min` text,
  `noise_level_max` text,
  `eer` text,
  `weight` text,
  `dimensions` text,
  `cable_length` text,
  `pipe_diameter_liquid` text,
  `pipe_diameter_gas` text,
  `drain_diameter` text,
  `trunk_length` text,
  `elevation_difference` text,
  `square` text,
  `volume` text,
  `warranty` text,
  `storage` text,
  `reserve` text,
  `order` text,
  `url` text,
  `price` text,
  `mount_price` text,
  PRIMARY KEY  (`id`),
  KEY `group_id` (`group_id`),
  KEY `mark_id` (`mark_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `implementation_type_id` (`implementation_type_id`),
  KEY `control_type_id` (`control_type_id`),
  KEY `connection_type_id` (`connection_type_id`),
  KEY `protection_type_id` (`protection_type_id`),
  KEY `material_id` (`material_id`),
  KEY `power_source_id` (`power_source_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

TRUNCATE TABLE `catalog_conditioners_groups`;

INSERT INTO `catalog_conditioners_groups` (`id`, `name`) VALUES
(1, 'Внутренние блоки настенного типа'),
(2, 'Наружные блоки универсального типа'),
(3, 'Сплит системы  инверторные настенного типа'),
(4, 'Сплит системы  инверторные подпотолочного типа'),
(5, 'Сплит системы не инверторные только охлаждения настенного типа'),
(6, 'Сплит системы не инверторные только охлаждения канального типа'),
(7, 'Сплит системы не инверторные только охлаждения кассетного типа'),
(8, 'Сплит системы не инверторные только охлаждения напольного типа'),
(9, 'Сплит системы не инверторные только охлаждения подпотолочного типа'),
(10, 'Двойные мультисистемы не инверторные только холод настенного типа'),
(11, 'Тройные мультисистемы  не инверторные только холод комбинированного типа'),
(12, 'Трубы');

ALTER TABLE `catalog_conditioners`
  ADD CONSTRAINT `catalog_conditioners_ibfk_10` FOREIGN KEY (`group_id`) REFERENCES `catalog_conditioners_groups` (`id`),
  ADD CONSTRAINT `catalog_conditioners_ibfk_11` FOREIGN KEY (`mark_id`) REFERENCES `catalog_conditioners_marks` (`id`),
  ADD CONSTRAINT `catalog_conditioners_ibfk_12` FOREIGN KEY (`product_type_id`) REFERENCES `catalog_conditioners_product_types` (`id`),
  ADD CONSTRAINT `catalog_conditioners_ibfk_13` FOREIGN KEY (`implementation_type_id`) REFERENCES `catalog_conditioners_implementation_types` (`id`),
  ADD CONSTRAINT `catalog_conditioners_ibfk_14` FOREIGN KEY (`control_type_id`) REFERENCES `catalog_conditioners_control_types` (`id`),
  ADD CONSTRAINT `catalog_conditioners_ibfk_15` FOREIGN KEY (`connection_type_id`) REFERENCES `catalog_conditioners_connection_types` (`id`),
  ADD CONSTRAINT `catalog_conditioners_ibfk_16` FOREIGN KEY (`protection_type_id`) REFERENCES `catalog_conditioners_protection_types` (`id`),
  ADD CONSTRAINT `catalog_conditioners_ibfk_17` FOREIGN KEY (`material_id`) REFERENCES `catalog_conditioners_materials` (`id`),
  ADD CONSTRAINT `catalog_conditioners_ibfk_9` FOREIGN KEY (`power_source_id`) REFERENCES `catalog_conditioners_power_sources` (`id`);

SET FOREIGN_KEY_CHECKS=1;
