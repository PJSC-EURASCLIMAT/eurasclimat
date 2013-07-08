SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `catalog_conditioners_services`;
CREATE TABLE IF NOT EXISTS `catalog_conditioners_services` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `item_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `item_id` (`item_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_airing_services`;
CREATE TABLE IF NOT EXISTS `catalog_airing_services` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `item_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `item_id` (`item_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_automation_services`;
CREATE TABLE IF NOT EXISTS `catalog_automation_services` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `item_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `item_id` (`item_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_dustextraction_services`;
CREATE TABLE IF NOT EXISTS `catalog_dustextraction_services` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `item_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `item_id` (`item_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_electricity_services`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_services` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `item_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `item_id` (`item_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
  
DROP TABLE IF EXISTS `catalog_heating_services`;
CREATE TABLE IF NOT EXISTS `catalog_heating_services` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `item_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `item_id` (`item_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_watersupply_services`;
CREATE TABLE IF NOT EXISTS `catalog_watersupply_services` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `item_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `item_id` (`item_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `catalog_conditioners_services`
  ADD CONSTRAINT `catalog_conditioners_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`),
  ADD CONSTRAINT `catalog_conditioners_services_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `catalog_conditioners` (`id`);

ALTER TABLE `catalog_airing_services`
  ADD CONSTRAINT `catalog_airing_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`),
  ADD CONSTRAINT `catalog_airing_services_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `catalog_airing` (`id`);

ALTER TABLE `catalog_automation_services`
  ADD CONSTRAINT `catalog_automation_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`),
  ADD CONSTRAINT `catalog_automation_services_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `catalog_automation` (`id`);

ALTER TABLE `catalog_dustextraction_services`
  ADD CONSTRAINT `catalog_dustextraction_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`),
  ADD CONSTRAINT `catalog_dustextraction_services_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `catalog_dustextraction` (`id`);

ALTER TABLE `catalog_electricity_services`
  ADD CONSTRAINT `catalog_electricity_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`),
  ADD CONSTRAINT `catalog_electricity_services_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `catalog_electricity` (`id`);

ALTER TABLE `catalog_heating_services`
  ADD CONSTRAINT `catalog_heating_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`),
  ADD CONSTRAINT `catalog_heating_services_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `catalog_heating` (`id`);
  
ALTER TABLE `catalog_watersupply_services`
  ADD CONSTRAINT `catalog_watersupply_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`),
  ADD CONSTRAINT `catalog_watersupply_services_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `catalog_watersupply` (`id`);
  
SET FOREIGN_KEY_CHECKS=1;