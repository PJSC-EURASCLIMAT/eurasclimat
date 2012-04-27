DROP TABLE `languages`;
DROP TABLE `notes`;
DROP TABLE `storage_assets_categories`;
DROP TABLE `storage_categories`;
DROP TABLE `storage_history`;
DROP TABLE `storage_requests`;
DROP TABLE `storage_assets`;
DROP TABLE `storage_measures`;
DROP TABLE `notice_dst`;
DROP TABLE `notice`;
DROP TABLE `fixed_assets_files`;
DROP TABLE `fixed_assets`;
DROP TABLE `files`;
DROP TABLE `orders`;
DROP TABLE `staff_vacations`;
DROP TABLE `staff_payments`;
DROP TABLE `staff_hr`;
DROP TABLE `staff`;
DROP TABLE `staff_categories`;
DROP TABLE `customers`;

TRUNCATE TABLE `acl_resources`;
INSERT INTO `acl_resources` (`name`, `title`, `parent_id`)
VALUES ('admin', 'Администрирование', NULL), ('catalog', 'Каталог', NULL);

INSERT INTO `acl_permissions` (`role_id`, `resource_id`, `privilege_id`) 
VALUES ('1', '1', '1'), ('1', '1', '3'), ('1', '2', '1'), ('1', '2', '3');


CREATE TABLE IF NOT EXISTS `catalog_conditioners` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `sku` varchar(255) default NULL,
  `group_id` int(10) unsigned default NULL,
  `name_id` int(10) unsigned default NULL,
  `mark_id` int(10) unsigned default NULL,
  `marking` varchar(255) default NULL,
  `product_type_id` int(10) unsigned default NULL,
  `implementation_type_id` int(10) unsigned default NULL,
  `country` varchar(2) default NULL,
  `condition` enum('NEW','SHOWCASE','ILLIQUID','USED') default NULL,
  `purpose` enum('COMMON','SEMI-INDUSTRIAL','INDUSTRIAL') default NULL,
  `square` double default NULL,
  `volume` double default NULL,
  `input_cooling` double default NULL,
  `input_heating` double default NULL,
  `output_cooling` double default NULL,
  `output_heating` double default NULL,
  `warranty` double default NULL,
  `storage` tinyint(1) default NULL,
  `reserve` tinyint(1) default NULL,
  `order` tinyint(1) default NULL,
  `measure` varchar(255) default NULL,
  `price` double(10,2) default NULL,
  PRIMARY KEY  (`id`),
  KEY `mark_id` (`mark_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `group_id` (`group_id`),
  KEY `name_id` (`name_id`),
  KEY `implementation_type_id` (`implementation_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT AUTO_INCREMENT=3 ;

CREATE TABLE IF NOT EXISTS `catalog_groups` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;


INSERT INTO `catalog_groups` (`id`, `name`) VALUES
(1, 'Внутренние блоки настенного типа');

CREATE TABLE IF NOT EXISTS `catalog_implementation_types` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

INSERT INTO `catalog_implementation_types` (`id`, `name`) VALUES
(1, 'Настенный'),
(2, 'Универсальный'),
(3, 'Медная'),
(4, 'Полиэтилен');


CREATE TABLE IF NOT EXISTS `catalog_marks` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;


INSERT INTO `catalog_marks` (`id`, `name`) VALUES
(1, 'Mitsubishi'),
(2, 'Daikin');

CREATE TABLE IF NOT EXISTS `catalog_names` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

INSERT INTO `catalog_names` (`id`, `name`) VALUES
(1, 'Кондиционер'),
(2, 'Труба'),
(3, 'Кронштейн');

CREATE TABLE IF NOT EXISTS `catalog_product_types` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

INSERT INTO `catalog_product_types` (`id`, `name`) VALUES
(1, 'Внутренний блок'),
(2, 'Наружный блок'),
(3, 'Газовая'),
(4, 'Водяная'),
(5, 'Дренажная');

ALTER TABLE `catalog_conditioners`
  ADD CONSTRAINT `catalog_conditioners_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_groups` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `catalog_conditioners_ibfk_2` FOREIGN KEY (`name_id`) REFERENCES `catalog_names` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `catalog_conditioners_ibfk_3` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `catalog_conditioners_ibfk_4` FOREIGN KEY (`product_type_id`) REFERENCES `catalog_product_types` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `catalog_conditioners_ibfk_5` FOREIGN KEY (`implementation_type_id`) REFERENCES `catalog_implementation_types` (`id`) ON DELETE SET NULL;
