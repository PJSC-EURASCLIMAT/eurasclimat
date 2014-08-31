SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `catalog_airing`;
CREATE TABLE IF NOT EXISTS `catalog_airing` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
  `group_id` int(10) unsigned DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `marking` text,
  `name` text,
  `product_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `recuperator_id` int(10) unsigned DEFAULT NULL,
  `operate_temp_range_cooling_id` int(10) unsigned DEFAULT NULL,
  `operate_temp_range_heating_id` int(10) unsigned DEFAULT NULL,
  `country` text,
  `power_consumption` text,
  `air_consumption_min` text,
  `air_consumption_max` text,
  `heat_utilization_efficiency_min` text,
  `heat_utilization_efficiency_max` text,
  `static_pressure` text,
  `noise_level_min` text,
  `noise_level_max` text,
  `weight` text,
  `dimensions` text,
  `power_voltage` text,
  `power_phases` text,
  `power_freq` text,
  `price` text,
  `dealer_price` text,
  `currency_id` int(10) unsigned DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `mark_id` (`mark_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `implementation_type_id` (`implementation_type_id`),
  KEY `control_type_id` (`recuperator_id`),
  KEY `connection_type_id` (`operate_temp_range_cooling_id`),
  KEY `protection_type_id` (`operate_temp_range_heating_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

ALTER TABLE `catalog_airing` ADD FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`) ON DELETE SET NULL;

SET FOREIGN_KEY_CHECKS=1;