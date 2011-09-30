-- phpMyAdmin SQL Dump
-- version 3.0.1.1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Сен 30 2011 г., 20:50
-- Версия сервера: 5.0.51
-- Версия PHP: 5.2.5

SET FOREIGN_KEY_CHECKS=0;

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `eurasclimat`
--

-- --------------------------------------------------------

--
-- Структура таблицы `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `login` varchar(100) NOT NULL,
  `password` varchar(32) character set utf8 collate utf8_bin NOT NULL,
  `role_id` int(11) unsigned NOT NULL,
  `name` varchar(255) default NULL,
  `email` varchar(255) default NULL,
  `phone` varchar(20) default NULL,
  `state` text COMMENT 'store user interface state',
  `active` tinyint(1) NOT NULL default '1',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `login` (`login`),
  KEY `fk_role_id` (`role_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `accounts`
--

INSERT INTO `accounts` (`id`, `login`, `password`, `role_id`, `name`, `email`, `phone`, `state`, `active`) VALUES
(1, 'admin', '518b4519d949106d599ffeca5f215b3c', 1, 'Администратор', 'admin@e-head.ru', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `acl_permissions`
--

DROP TABLE IF EXISTS `acl_permissions`;
CREATE TABLE IF NOT EXISTS `acl_permissions` (
  `id` int(11) NOT NULL auto_increment,
  `role_id` int(11) unsigned NOT NULL,
  `resource_id` int(11) unsigned NOT NULL,
  `privilege_id` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `role_permissions` (`role_id`,`resource_id`,`privilege_id`),
  KEY `fk_role_id` (`role_id`),
  KEY `fk_resource_id` (`resource_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `acl_permissions`
--

INSERT INTO `acl_permissions` (`id`, `role_id`, `resource_id`, `privilege_id`) VALUES
(1, 1, 1, 1),
(2, 1, 1, 3),
(5, 1, 2, 1),
(4, 1, 2, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `acl_resources`
--

DROP TABLE IF EXISTS `acl_resources`;
CREATE TABLE IF NOT EXISTS `acl_resources` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `name` varchar(100) character set utf8 NOT NULL,
  `title` varchar(100) collate utf8_unicode_ci default NULL,
  `parent_id` int(11) unsigned default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `name` (`name`,`parent_id`),
  KEY `fk_parent_id` (`parent_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `acl_resources`
--

INSERT INTO `acl_resources` (`id`, `name`, `title`, `parent_id`) VALUES
(1, 'admin', 'Администрирование', NULL),
(2, 'catalog', 'Каталог', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `acl_roles`
--

DROP TABLE IF EXISTS `acl_roles`;
CREATE TABLE IF NOT EXISTS `acl_roles` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `name` varchar(50) character set utf8 NOT NULL,
  `alias` varchar(40) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `alias` (`alias`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `acl_roles`
--

INSERT INTO `acl_roles` (`id`, `name`, `alias`) VALUES
(1, 'Администратор', 'admin');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_availabilities`
--

DROP TABLE IF EXISTS `catalog_availabilities`;
CREATE TABLE IF NOT EXISTS `catalog_availabilities` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `catalog_availabilities`
--

INSERT INTO `catalog_availabilities` (`id`, `name`) VALUES
(1, 'Складское наличие'),
(2, 'Резерв на складе'),
(3, 'Логистика в пути'),
(4, 'Производство заказ');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_conditions`
--

DROP TABLE IF EXISTS `catalog_conditions`;
CREATE TABLE IF NOT EXISTS `catalog_conditions` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `catalog_conditions`
--

INSERT INTO `catalog_conditions` (`id`, `name`) VALUES
(1, 'Новая'),
(2, 'С витрины'),
(3, 'Неликвид'),
(4, 'Бывшее в употреблении');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_construction_types`
--

DROP TABLE IF EXISTS `catalog_construction_types`;
CREATE TABLE IF NOT EXISTS `catalog_construction_types` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `catalog_construction_types`
--

INSERT INTO `catalog_construction_types` (`id`, `name`) VALUES
(1, 'Настенный'),
(2, 'Универсальный'),
(3, 'Медная'),
(4, 'Полиэтилен');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_items`
--

DROP TABLE IF EXISTS `catalog_items`;
CREATE TABLE IF NOT EXISTS `catalog_items` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `sku` varchar(255) NOT NULL,
  `title_id` int(10) unsigned NOT NULL,
  `mark_id` int(10) unsigned default NULL,
  `model` varchar(255) NOT NULL,
  `product_type_id` int(10) unsigned default NULL,
  `construction_type_id` int(10) unsigned default NULL,
  `territoriality_id` int(10) unsigned default NULL,
  `condition_id` int(10) unsigned default NULL,
  `purpose_id` int(10) unsigned default NULL,
  `availability_id` int(10) unsigned default NULL,
  `system_type_id` int(10) unsigned default NULL,
  `served_square` varchar(255) default NULL,
  `served_capacity` varchar(255) default NULL,
  `cooling_power` varchar(255) default NULL,
  `heating_power` varchar(255) default NULL,
  `drying_intensity` varchar(255) default NULL,
  `air_flow_rate` varchar(255) default NULL,
  `power_consumption_in_cooling_mode` varchar(255) default NULL,
  `power_consumption_in_heating_mode` varchar(255) default NULL,
  `cooling_energy_efficiency` varchar(255) default NULL,
  `heating_energy_efficiency` varchar(255) default NULL,
  `power_supply` varchar(255) default NULL,
  `refrigerant` varchar(255) default NULL,
  `interblock_communications_length` varchar(255) default NULL,
  `differential_interconnects_heights` varchar(255) default NULL,
  `drainage_pump` varchar(255) default NULL,
  `winter_set` varchar(255) default NULL,
  `noise_level` varchar(255) default NULL,
  `manufacturer_warranty` varchar(255) default NULL,
  `stock` varchar(255) default NULL,
  `reserve` varchar(255) default NULL,
  `order` varchar(255) default NULL,
  `measure` varchar(255) default NULL,
  `price` varchar(255) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `sku` (`sku`),
  KEY `title_id` (`title_id`,`mark_id`,`product_type_id`,`construction_type_id`,`territoriality_id`,`condition_id`,`purpose_id`,`availability_id`,`system_type_id`),
  KEY `mark_id` (`mark_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `construction_type_id` (`construction_type_id`),
  KEY `territoriality_id` (`territoriality_id`),
  KEY `condition_id` (`condition_id`),
  KEY `purpose_id` (`purpose_id`),
  KEY `availability_id` (`availability_id`),
  KEY `system_type_id` (`system_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_items`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_marks`
--

DROP TABLE IF EXISTS `catalog_marks`;
CREATE TABLE IF NOT EXISTS `catalog_marks` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `catalog_marks`
--

INSERT INTO `catalog_marks` (`id`, `name`) VALUES
(1, 'Mitsubishi'),
(2, 'Daikin');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_product_types`
--

DROP TABLE IF EXISTS `catalog_product_types`;
CREATE TABLE IF NOT EXISTS `catalog_product_types` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `catalog_product_types`
--

INSERT INTO `catalog_product_types` (`id`, `name`) VALUES
(1, 'Внутренний блок'),
(2, 'Наружный блок'),
(3, 'Газовая'),
(4, 'Водяная'),
(5, 'Дренажная');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_purposes`
--

DROP TABLE IF EXISTS `catalog_purposes`;
CREATE TABLE IF NOT EXISTS `catalog_purposes` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `catalog_purposes`
--

INSERT INTO `catalog_purposes` (`id`, `name`) VALUES
(1, 'Бытовое'),
(2, 'Полупромышленное'),
(3, 'Промышленное');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_system_types`
--

DROP TABLE IF EXISTS `catalog_system_types`;
CREATE TABLE IF NOT EXISTS `catalog_system_types` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `catalog_system_types`
--

INSERT INTO `catalog_system_types` (`id`, `name`) VALUES
(1, 'Моноблок'),
(2, 'Сплит система'),
(3, 'Мультисистема');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_territorialities`
--

DROP TABLE IF EXISTS `catalog_territorialities`;
CREATE TABLE IF NOT EXISTS `catalog_territorialities` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `catalog_territorialities`
--

INSERT INTO `catalog_territorialities` (`id`, `name`) VALUES
(1, 'Импортное'),
(2, 'Отечественное'),
(3, 'Совместное производство');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_titles`
--

DROP TABLE IF EXISTS `catalog_titles`;
CREATE TABLE IF NOT EXISTS `catalog_titles` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `catalog_titles`
--

INSERT INTO `catalog_titles` (`id`, `name`) VALUES
(1, 'Кондиционер'),
(2, 'Труба'),
(3, 'Кронштейн');

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `acl_roles` (`id`);

--
-- Ограничения внешнего ключа таблицы `acl_permissions`
--
ALTER TABLE `acl_permissions`
  ADD CONSTRAINT `acl_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `acl_roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `acl_permissions_ibfk_2` FOREIGN KEY (`resource_id`) REFERENCES `acl_resources` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `acl_resources`
--
ALTER TABLE `acl_resources`
  ADD CONSTRAINT `acl_resources_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `acl_resources` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `catalog_items`
--
ALTER TABLE `catalog_items`
  ADD CONSTRAINT `catalog_items_ibfk_1` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `catalog_items_ibfk_2` FOREIGN KEY (`product_type_id`) REFERENCES `catalog_product_types` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `catalog_items_ibfk_3` FOREIGN KEY (`construction_type_id`) REFERENCES `catalog_construction_types` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `catalog_items_ibfk_4` FOREIGN KEY (`territoriality_id`) REFERENCES `catalog_territorialities` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `catalog_items_ibfk_5` FOREIGN KEY (`condition_id`) REFERENCES `catalog_conditions` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `catalog_items_ibfk_6` FOREIGN KEY (`purpose_id`) REFERENCES `catalog_purposes` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `catalog_items_ibfk_7` FOREIGN KEY (`availability_id`) REFERENCES `catalog_availabilities` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `catalog_items_ibfk_8` FOREIGN KEY (`system_type_id`) REFERENCES `catalog_system_types` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `catalog_items_ibfk_9` FOREIGN KEY (`title_id`) REFERENCES `catalog_titles` (`id`);

SET FOREIGN_KEY_CHECKS=1;
