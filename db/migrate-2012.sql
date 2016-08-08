SET FOREIGN_KEY_CHECKS=0;

-- 2012-04-28 --

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

-- 2012-06-05 --

ALTER TABLE `catalog_conditioners` DROP FOREIGN KEY `catalog_conditioners_ibfk_2` ;
DROP TABLE `catalog_names` ;
ALTER TABLE `catalog_conditioners` DROP `name_id` ;

-- 2012-06-08 --

ALTER TABLE `acl_roles` DROP `alias` ;
ALTER TABLE `acl_roles` ADD `parent_id` INT UNSIGNED NULL DEFAULT NULL , ADD INDEX ( parent_id ) ;
ALTER TABLE `acl_roles` ADD FOREIGN KEY ( `parent_id` ) REFERENCES `acl_roles` (`id`) ON DELETE RESTRICT ;
ALTER TABLE `acl_roles` DROP INDEX `name`, ADD INDEX `name` ( `name` ) ;

-- 2012-06-24 --

ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_ibfk_1` ;
ALTER TABLE `accounts` DROP `role_id` ;
ALTER TABLE `accounts` DROP `phone` ; 
ALTER TABLE `accounts` DROP `state` ;

CREATE TABLE IF NOT EXISTS `acl_roles_accounts` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `account_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `role_account` (`account_id`,`role_id`),
  KEY `account_id` (`account_id`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

ALTER TABLE `acl_roles_accounts`
  ADD CONSTRAINT `acl_roles_accounts_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `acl_roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `acl_roles_accounts_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE ;
  
INSERT INTO `acl_roles_accounts` (`account_id`, `role_id`) VALUES ('1', '1') ;

-- 2012-07-01 --

RENAME TABLE `catalog_groups` TO `catalog_conditioners_groups` ;
RENAME TABLE `catalog_implementation_types` TO `catalog_conditioners_implementation_types` ;
RENAME TABLE `catalog_marks` TO `catalog_conditioners_marks` ;
RENAME TABLE `catalog_product_types` TO `catalog_conditioners_product_types` ;

-- 2012-07-07 --

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
  
-- 2012-12-24 --
  
CREATE TABLE IF NOT EXISTS `news_main` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `date` date NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `account_id` int(10) unsigned default NULL,
  `title` varchar(255) NOT NULL,
  `short_text` text NOT NULL,
  `long_text` text NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `category_id` (`category_id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

INSERT INTO `news_main` (`id`, `date`, `category_id`, `account_id`, `title`, `short_text`, `long_text`) VALUES
(1, '2012-12-14', 1, 1, 'Заголовок новости 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla. Aliquam nisi ipsum, hendrerit a egestas a, tincidunt vulputate justo. Donec a ipsum ac metus accumsan lobortis. Vivamus nec nulla at augue facilisis varius. Morbi a velit eros, non ornare magna. Nam dui erat, suscipit ut vehicula non, interdum vitae eros. Aliquam eu rhoncus libero. Curabitur aliquet ultricies est. Morbi feugiat iaculis posuere. Suspendisse sit amet dui in sapien egestas semper. Nullam nec justo id lacus suscipit tincidunt eu sit amet neque. Vivamus vel leo metus. Proin adipiscing mattis est in gravida. Fusce nec purus nisi, id ullamcorper erat. Donec metus justo, auctor et fermentum ultricies, viverra ac velit. Proin blandit euismod lacinia. Fusce sit amet mollis turpis. Vestibulum sed odio massa. Proin interdum elit nec velit commodo pretium. Curabitur eget justo vitae nisi sodales suscipit. Morbi elit nisi, porta sit amet suscipit at, porttitor ac tellus. Curabitur gravida placerat condimentum. Suspendisse in laoreet diam. Duis iaculis, justo vitae euismod eleifend, neque nisi auctor arcu, sed posuere erat justo a nunc. Ut varius est non quam blandit placerat lobortis arcu pellentesque. Sed consequat dapibus suscipit. Donec odio felis, pharetra in lobortis ac, venenatis in lacus.\r\nVivamus vulputate, sem id pharetra porta, turpis nunc elementum ipsum, quis varius elit felis id nisl. Quisque interdum purus ut eros sodales egestas. Suspendisse suscipit urna rutrum est sagittis quis tempor metus consequat. Donec dapibus, justo eu iaculis gravida, purus neque posuere enim, vel vestibulum ante velit vitae dui. Ut sit amet nibh elit, sed commodo ipsum. Suspendisse eu mi justo, ut hendrerit lectus. Nam ullamcorper, mi vel imperdiet luctus, augue purus mattis eros, nec vulputate nulla dolor et sapien. Nullam placerat molestie consectetur. Nulla pretium lorem in arcu fringilla sed malesuada nisl lacinia. In hac habitasse platea dictumst. Morbi egestas, turpis at tristique consequat, arcu orci faucibus eros, a auctor massa nunc a mauris. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin eget massa ante. Cras volutpat, tortor sed egestas aliquet, est nibh tristique enim, sit amet ornare ante arcu vel leo.\r\nNullam mi lectus, laoreet eget fermentum quis, adipiscing et purus. Suspendisse nec condimentum leo. Ut ultrices malesuada eros, vel imperdiet nunc elementum vel. Donec vitae orci arcu. Etiam at turpis a ipsum pellentesque placerat. Nam malesuada, urna id pharetra malesuada, arcu arcu elementum tortor, sed venenatis felis nunc eu sem. Praesent ullamcorper, turpis vitae feugiat porta, arcu eros porta mi, quis ultrices tellus sapien sed quam. Quisque accumsan malesuada leo, at pellentesque felis bibendum at. Integer commodo sollicitudin felis et mollis. Mauris risus eros, auctor vitae bibendum eget, hendrerit quis turpis.\r\nEtiam adipiscing metus nec diam bibendum elementum. In at est rhoncus nibh laoreet congue id at tellus. Vestibulum et elit ligula, vel commodo nisl. Fusce vitae porta lectus. Vivamus suscipit dictum massa, ac porta sapien consectetur id. In hac habitasse platea dictumst. Aliquam id neque at sem sollicitudin pharetra. Aenean imperdiet tellus id nisl malesuada vitae bibendum odio convallis. Pellentesque dictum porta erat, at pretium augue egestas ut. Nam tempus mauris est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam gravida sodales dignissim. Sed facilisis nunc eget enim lobortis faucibus. In ac purus sit amet lectus venenatis interdum.'),
(2, '2012-12-12', 1, 1, 'Заголовок новости 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla. Aliquam nisi ipsum, hendrerit a egestas a, tincidunt vulputate justo. Donec a ipsum ac metus accumsan lobortis. Vivamus nec nulla at augue facilisis varius. Morbi a velit eros, non ornare magna. Nam dui erat, suscipit ut vehicula non, interdum vitae eros. Aliquam eu rhoncus libero. Curabitur aliquet ultricies est. Morbi feugiat iaculis posuere. Suspendisse sit amet dui in sapien egestas semper. Nullam nec justo id lacus suscipit tincidunt eu sit amet neque. Vivamus vel leo metus. Proin adipiscing mattis est in gravida. Fusce nec purus nisi, id ullamcorper erat. Donec metus justo, auctor et fermentum ultricies, viverra ac velit. Proin blandit euismod lacinia. Fusce sit amet mollis turpis. Vestibulum sed odio massa. Proin interdum elit nec velit commodo pretium. Curabitur eget justo vitae nisi sodales suscipit. Morbi elit nisi, porta sit amet suscipit at, porttitor ac tellus. Curabitur gravida placerat condimentum. Suspendisse in laoreet diam. Duis iaculis, justo vitae euismod eleifend, neque nisi auctor arcu, sed posuere erat justo a nunc. Ut varius est non quam blandit placerat lobortis arcu pellentesque. Sed consequat dapibus suscipit. Donec odio felis, pharetra in lobortis ac, venenatis in lacus.\r\nVivamus vulputate, sem id pharetra porta, turpis nunc elementum ipsum, quis varius elit felis id nisl. Quisque interdum purus ut eros sodales egestas. Suspendisse suscipit urna rutrum est sagittis quis tempor metus consequat. Donec dapibus, justo eu iaculis gravida, purus neque posuere enim, vel vestibulum ante velit vitae dui. Ut sit amet nibh elit, sed commodo ipsum. Suspendisse eu mi justo, ut hendrerit lectus. Nam ullamcorper, mi vel imperdiet luctus, augue purus mattis eros, nec vulputate nulla dolor et sapien. Nullam placerat molestie consectetur. Nulla pretium lorem in arcu fringilla sed malesuada nisl lacinia. In hac habitasse platea dictumst. Morbi egestas, turpis at tristique consequat, arcu orci faucibus eros, a auctor massa nunc a mauris. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin eget massa ante. Cras volutpat, tortor sed egestas aliquet, est nibh tristique enim, sit amet ornare ante arcu vel leo.\r\nNullam mi lectus, laoreet eget fermentum quis, adipiscing et purus. Suspendisse nec condimentum leo. Ut ultrices malesuada eros, vel imperdiet nunc elementum vel. Donec vitae orci arcu. Etiam at turpis a ipsum pellentesque placerat. Nam malesuada, urna id pharetra malesuada, arcu arcu elementum tortor, sed venenatis felis nunc eu sem. Praesent ullamcorper, turpis vitae feugiat porta, arcu eros porta mi, quis ultrices tellus sapien sed quam. Quisque accumsan malesuada leo, at pellentesque felis bibendum at. Integer commodo sollicitudin felis et mollis. Mauris risus eros, auctor vitae bibendum eget, hendrerit quis turpis.\r\nEtiam adipiscing metus nec diam bibendum elementum. In at est rhoncus nibh laoreet congue id at tellus. Vestibulum et elit ligula, vel commodo nisl. Fusce vitae porta lectus. Vivamus suscipit dictum massa, ac porta sapien consectetur id. In hac habitasse platea dictumst. Aliquam id neque at sem sollicitudin pharetra. Aenean imperdiet tellus id nisl malesuada vitae bibendum odio convallis. Pellentesque dictum porta erat, at pretium augue egestas ut. Nam tempus mauris est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam gravida sodales dignissim. Sed facilisis nunc eget enim lobortis faucibus. In ac purus sit amet lectus venenatis interdum.'),
(3, '2012-12-14', 1, 1, 'Заголовок новости 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla. Aliquam nisi ipsum, hendrerit a egestas a, tincidunt vulputate justo. Donec a ipsum ac metus accumsan lobortis. Vivamus nec nulla at augue facilisis varius. Morbi a velit eros, non ornare magna. Nam dui erat, suscipit ut vehicula non, interdum vitae eros. Aliquam eu rhoncus libero. Curabitur aliquet ultricies est. Morbi feugiat iaculis posuere. Suspendisse sit amet dui in sapien egestas semper. Nullam nec justo id lacus suscipit tincidunt eu sit amet neque. Vivamus vel leo metus. Proin adipiscing mattis est in gravida. Fusce nec purus nisi, id ullamcorper erat. Donec metus justo, auctor et fermentum ultricies, viverra ac velit. Proin blandit euismod lacinia. Fusce sit amet mollis turpis. Vestibulum sed odio massa. Proin interdum elit nec velit commodo pretium. Curabitur eget justo vitae nisi sodales suscipit. Morbi elit nisi, porta sit amet suscipit at, porttitor ac tellus. Curabitur gravida placerat condimentum. Suspendisse in laoreet diam. Duis iaculis, justo vitae euismod eleifend, neque nisi auctor arcu, sed posuere erat justo a nunc. Ut varius est non quam blandit placerat lobortis arcu pellentesque. Sed consequat dapibus suscipit. Donec odio felis, pharetra in lobortis ac, venenatis in lacus.\r\nVivamus vulputate, sem id pharetra porta, turpis nunc elementum ipsum, quis varius elit felis id nisl. Quisque interdum purus ut eros sodales egestas. Suspendisse suscipit urna rutrum est sagittis quis tempor metus consequat. Donec dapibus, justo eu iaculis gravida, purus neque posuere enim, vel vestibulum ante velit vitae dui. Ut sit amet nibh elit, sed commodo ipsum. Suspendisse eu mi justo, ut hendrerit lectus. Nam ullamcorper, mi vel imperdiet luctus, augue purus mattis eros, nec vulputate nulla dolor et sapien. Nullam placerat molestie consectetur. Nulla pretium lorem in arcu fringilla sed malesuada nisl lacinia. In hac habitasse platea dictumst. Morbi egestas, turpis at tristique consequat, arcu orci faucibus eros, a auctor massa nunc a mauris. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin eget massa ante. Cras volutpat, tortor sed egestas aliquet, est nibh tristique enim, sit amet ornare ante arcu vel leo.\r\nNullam mi lectus, laoreet eget fermentum quis, adipiscing et purus. Suspendisse nec condimentum leo. Ut ultrices malesuada eros, vel imperdiet nunc elementum vel. Donec vitae orci arcu. Etiam at turpis a ipsum pellentesque placerat. Nam malesuada, urna id pharetra malesuada, arcu arcu elementum tortor, sed venenatis felis nunc eu sem. Praesent ullamcorper, turpis vitae feugiat porta, arcu eros porta mi, quis ultrices tellus sapien sed quam. Quisque accumsan malesuada leo, at pellentesque felis bibendum at. Integer commodo sollicitudin felis et mollis. Mauris risus eros, auctor vitae bibendum eget, hendrerit quis turpis.\r\nEtiam adipiscing metus nec diam bibendum elementum. In at est rhoncus nibh laoreet congue id at tellus. Vestibulum et elit ligula, vel commodo nisl. Fusce vitae porta lectus. Vivamus suscipit dictum massa, ac porta sapien consectetur id. In hac habitasse platea dictumst. Aliquam id neque at sem sollicitudin pharetra. Aenean imperdiet tellus id nisl malesuada vitae bibendum odio convallis. Pellentesque dictum porta erat, at pretium augue egestas ut. Nam tempus mauris est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam gravida sodales dignissim. Sed facilisis nunc eget enim lobortis faucibus. In ac purus sit amet lectus venenatis interdum.'),
(4, '2012-12-14', 1, 1, 'Заголовок новости 4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla. Aliquam nisi ipsum, hendrerit a egestas a, tincidunt vulputate justo. Donec a ipsum ac metus accumsan lobortis. Vivamus nec nulla at augue facilisis varius. Morbi a velit eros, non ornare magna. Nam dui erat, suscipit ut vehicula non, interdum vitae eros. Aliquam eu rhoncus libero. Curabitur aliquet ultricies est. Morbi feugiat iaculis posuere. Suspendisse sit amet dui in sapien egestas semper. Nullam nec justo id lacus suscipit tincidunt eu sit amet neque. Vivamus vel leo metus. Proin adipiscing mattis est in gravida. Fusce nec purus nisi, id ullamcorper erat. Donec metus justo, auctor et fermentum ultricies, viverra ac velit. Proin blandit euismod lacinia. Fusce sit amet mollis turpis. Vestibulum sed odio massa. Proin interdum elit nec velit commodo pretium. Curabitur eget justo vitae nisi sodales suscipit. Morbi elit nisi, porta sit amet suscipit at, porttitor ac tellus. Curabitur gravida placerat condimentum. Suspendisse in laoreet diam. Duis iaculis, justo vitae euismod eleifend, neque nisi auctor arcu, sed posuere erat justo a nunc. Ut varius est non quam blandit placerat lobortis arcu pellentesque. Sed consequat dapibus suscipit. Donec odio felis, pharetra in lobortis ac, venenatis in lacus.\r\nVivamus vulputate, sem id pharetra porta, turpis nunc elementum ipsum, quis varius elit felis id nisl. Quisque interdum purus ut eros sodales egestas. Suspendisse suscipit urna rutrum est sagittis quis tempor metus consequat. Donec dapibus, justo eu iaculis gravida, purus neque posuere enim, vel vestibulum ante velit vitae dui. Ut sit amet nibh elit, sed commodo ipsum. Suspendisse eu mi justo, ut hendrerit lectus. Nam ullamcorper, mi vel imperdiet luctus, augue purus mattis eros, nec vulputate nulla dolor et sapien. Nullam placerat molestie consectetur. Nulla pretium lorem in arcu fringilla sed malesuada nisl lacinia. In hac habitasse platea dictumst. Morbi egestas, turpis at tristique consequat, arcu orci faucibus eros, a auctor massa nunc a mauris. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin eget massa ante. Cras volutpat, tortor sed egestas aliquet, est nibh tristique enim, sit amet ornare ante arcu vel leo.\r\nNullam mi lectus, laoreet eget fermentum quis, adipiscing et purus. Suspendisse nec condimentum leo. Ut ultrices malesuada eros, vel imperdiet nunc elementum vel. Donec vitae orci arcu. Etiam at turpis a ipsum pellentesque placerat. Nam malesuada, urna id pharetra malesuada, arcu arcu elementum tortor, sed venenatis felis nunc eu sem. Praesent ullamcorper, turpis vitae feugiat porta, arcu eros porta mi, quis ultrices tellus sapien sed quam. Quisque accumsan malesuada leo, at pellentesque felis bibendum at. Integer commodo sollicitudin felis et mollis. Mauris risus eros, auctor vitae bibendum eget, hendrerit quis turpis.\r\nEtiam adipiscing metus nec diam bibendum elementum. In at est rhoncus nibh laoreet congue id at tellus. Vestibulum et elit ligula, vel commodo nisl. Fusce vitae porta lectus. Vivamus suscipit dictum massa, ac porta sapien consectetur id. In hac habitasse platea dictumst. Aliquam id neque at sem sollicitudin pharetra. Aenean imperdiet tellus id nisl malesuada vitae bibendum odio convallis. Pellentesque dictum porta erat, at pretium augue egestas ut. Nam tempus mauris est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam gravida sodales dignissim. Sed facilisis nunc eget enim lobortis faucibus. In ac purus sit amet lectus venenatis interdum.');

CREATE TABLE IF NOT EXISTS `news_main_category` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

INSERT INTO `news_main_category` (`id`, `name`) VALUES
(1, 'Общие новости');

ALTER TABLE `news_main`
  ADD CONSTRAINT `news_main_ibfk_3` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `news_main_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `news_main_category` (`id`);
  
SET FOREIGN_KEY_CHECKS=1;