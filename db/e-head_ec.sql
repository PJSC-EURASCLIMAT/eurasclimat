-- phpMyAdmin SQL Dump
-- version 3.3.7deb7
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Мар 19 2013 г., 21:45
-- Версия сервера: 5.1.49
-- Версия PHP: 5.3.3-7+squeeze3

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT=0;
START TRANSACTION;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `e-head_ec`
--

-- --------------------------------------------------------

--
-- Структура таблицы `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(100) NOT NULL,
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `country` varchar(2) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Дамп данных таблицы `accounts`
--

INSERT INTO `accounts` (`id`, `login`, `password`, `name`, `email`, `country`, `city`, `active`) VALUES
(1, 'admin', '518b4519d949106d599ffeca5f215b3c', 'Администратор', 'admin@eurasclimat.ru', 'RU', 'Москва', 1),
(2, 'guest', '40be4e59b9a2a2b5dffb918c0e86b3d7', 'Гость', 'guest@eurasclimat.ru', 'RU', 'Москва', 1),
(3, 'bvh', 'bd4d2ba0a0cc1d15992715406f754121', 'Ботезат Виталий Гариевич', 'bvh.box@gmail.com', 'UA', 'Черновцы', 1),
(6, 'OVG', 'cf38adc7c44048efd9b21973076bcdbe', 'Грищенко Олег Викторович', 'grishenko.oleg@mail.ru', 'RU', 'Москва', 1),
(8, 'kovshilov', 'cd4b8c5eb6b3b18091000a46bf965c54', 'Ковшилов Игорь Анатольевич', 'kovshilov@gmail.com', 'RU', 'Москва', 1),
(9, 'sergey.shubkin', '0ac58fd14a4345e3b5ebe08851339fe1', 'sergey.shubkin', 'sergey.shubkin@clearsystem.ru', 'RU', 'Москва', 1),
(12, 'geagkm', 'df5d2c5fdc8e9945c5e3fa59c685c973', 'geagkm', 'dmitry.lebedev@geagroup.com', 'RU', 'Москва', 1),
(13, 'anton', '5f4dcc3b5aa765d61d8327deb882cf99', 'Антон Тарасов', 'contact@antontarasov.com', 'RU', 'Москва', 1),
(14, 'nasibli', '2eef60eb3211de33710d9b9a5e46c167', 'Хасанов Умар Хусеевич', 'umarkhasanov@gmail.com', 'RU', 'Ставрополь', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `acl_permissions`
--

DROP TABLE IF EXISTS `acl_permissions`;
CREATE TABLE IF NOT EXISTS `acl_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) unsigned NOT NULL,
  `resource_id` int(11) unsigned NOT NULL,
  `privilege_id` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_id_2` (`role_id`,`resource_id`,`privilege_id`),
  KEY `fk_role_id` (`role_id`),
  KEY `fk_resource_id` (`resource_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1418 ;

--
-- Дамп данных таблицы `acl_permissions`
--

INSERT INTO `acl_permissions` (`id`, `role_id`, `resource_id`, `privilege_id`) VALUES
(1, 1, 1, 1),
(6, 1, 1, 2),
(2, 1, 2, 1),
(5, 1, 2, 2),
(3, 1, 3, 1),
(4, 1, 3, 2),
(7, 1, 4, 1),
(18, 1, 4, 2),
(8, 1, 5, 1),
(17, 1, 5, 2),
(9, 1, 6, 1),
(16, 1, 6, 2),
(10, 1, 7, 1),
(15, 1, 7, 2),
(11, 1, 8, 1),
(14, 1, 8, 2),
(12, 1, 10, 1),
(13, 1, 10, 2),
(1398, 1, 11, 1),
(1414, 1, 18, 1),
(1415, 1, 18, 2),
(1378, 2, 2, 1),
(1379, 2, 3, 1),
(1380, 2, 4, 1),
(1381, 2, 5, 1),
(1382, 2, 6, 1),
(1383, 2, 7, 1),
(1384, 2, 8, 1),
(1385, 2, 10, 1),
(1416, 2, 18, 1),
(1386, 3, 2, 1),
(1387, 3, 3, 1),
(1388, 3, 4, 1),
(1389, 3, 5, 1),
(1391, 3, 6, 1),
(1390, 3, 7, 1),
(1392, 3, 8, 1),
(1393, 3, 10, 1),
(1394, 3, 11, 1),
(1395, 3, 11, 2),
(1417, 3, 18, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `acl_resources`
--

DROP TABLE IF EXISTS `acl_resources`;
CREATE TABLE IF NOT EXISTS `acl_resources` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `parent_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`parent_id`),
  KEY `fk_parent_id` (`parent_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

--
-- Дамп данных таблицы `acl_resources`
--

INSERT INTO `acl_resources` (`id`, `name`, `title`, `parent_id`) VALUES
(1, 'admin', 'Администрирование', NULL),
(2, 'catalog', 'Каталог', NULL),
(3, 'conditioners', 'Кондиционирование', 2),
(4, 'watersupply', 'Водоснабжение', 2),
(5, 'airing', 'Вентиляция', 2),
(6, 'automation', 'Автоматика', 2),
(7, 'electricity', 'Электрика', 2),
(8, 'heating', 'Отопление', 2),
(9, 'marks', 'Включить ограничение по маркам', 3),
(10, 'dustextraction', 'Пылеудаление', 2),
(11, 'pa', 'Личный кабинет', NULL),
(12, 'marks', NULL, 4),
(13, 'marks', NULL, 5),
(14, 'marks', NULL, 6),
(15, 'marks', NULL, 7),
(16, 'marks', NULL, 8),
(17, 'marks', NULL, 10),
(18, 'sysdev', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `acl_roles`
--

DROP TABLE IF EXISTS `acl_roles`;
CREATE TABLE IF NOT EXISTS `acl_roles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Дамп данных таблицы `acl_roles`
--

INSERT INTO `acl_roles` (`id`, `name`, `parent_id`) VALUES
(1, 'Администратор', NULL),
(2, 'Гость', NULL),
(3, 'Пользователь', NULL),
(4, 'Резерв 1', NULL),
(5, 'Резерв 2', NULL),
(6, 'Резерв 3', NULL),
(7, 'Резерв 4', NULL),
(8, 'Резерв 5', NULL),
(9, 'Резерв 6', NULL),
(10, 'Резерв 7', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `acl_roles_accounts`
--

DROP TABLE IF EXISTS `acl_roles_accounts`;
CREATE TABLE IF NOT EXISTS `acl_roles_accounts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_account` (`account_id`,`role_id`),
  KEY `account_id` (`account_id`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Дамп данных таблицы `acl_roles_accounts`
--

INSERT INTO `acl_roles_accounts` (`id`, `account_id`, `role_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 1),
(4, 6, 1),
(5, 8, 1),
(8, 9, 3),
(7, 12, 3),
(6, 13, 1),
(9, 14, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_airing`
--

DROP TABLE IF EXISTS `catalog_airing`;
CREATE TABLE IF NOT EXISTS `catalog_airing` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `marking` text,
  `product_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `control_type_id` int(10) unsigned DEFAULT NULL,
  `connection_type_id` int(10) unsigned DEFAULT NULL,
  `protection_type_id` int(10) unsigned DEFAULT NULL,
  `material_id` int(10) unsigned DEFAULT NULL,
  `power_source_id` int(10) unsigned DEFAULT NULL,
  `isolation_class_id` int(10) unsigned DEFAULT NULL,
  `country` text,
  `temp` text,
  `power_supply` text,
  `heating_power_consumption` text,
  `amperage` text,
  `sensor_inputs` text,
  `pressure` text,
  `noise_level_min` text,
  `filters_performance` text,
  `performance` text,
  `pollution_size` text,
  `eer` text,
  `weight` text,
  `dimensions` text,
  `cable_length` text,
  `pipe_diameter` text,
  `delivery_height` text,
  `immersion_depth` text,
  `warranty` text,
  `storage` text,
  `reserve` text,
  `order` text,
  `url` text,
  `price` text,
  `mount_price` text,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `mark_id` (`mark_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `implementation_type_id` (`implementation_type_id`),
  KEY `control_type_id` (`control_type_id`),
  KEY `connection_type_id` (`connection_type_id`),
  KEY `protection_type_id` (`protection_type_id`),
  KEY `material_id` (`material_id`),
  KEY `power_source_id` (`power_source_id`),
  KEY `isolation_class_id` (`isolation_class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_airing`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_airing_connection_types`
--

DROP TABLE IF EXISTS `catalog_airing_connection_types`;
CREATE TABLE IF NOT EXISTS `catalog_airing_connection_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_airing_connection_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_airing_control_types`
--

DROP TABLE IF EXISTS `catalog_airing_control_types`;
CREATE TABLE IF NOT EXISTS `catalog_airing_control_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_airing_control_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_airing_groups`
--

DROP TABLE IF EXISTS `catalog_airing_groups`;
CREATE TABLE IF NOT EXISTS `catalog_airing_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- Дамп данных таблицы `catalog_airing_groups`
--

INSERT INTO `catalog_airing_groups` (`id`, `name`) VALUES
(1, 'Вентиляторы для круглых каналов'),
(2, 'Вентиляторы для прямоугольных каналов'),
(3, 'Крышные вентиляторы'),
(4, 'Осевые вентиляторы'),
(5, 'Центробежные вентиляторы'),
(6, 'Бытовые вентагрегаты'),
(7, 'Компактные вентагрегаты'),
(8, 'Струйные вентиляторы '),
(9, 'Пластиковые взрывозащищенные вентиляторы'),
(10, 'Вентиляторы для складов'),
(11, 'Воздухо-распределительные устройства'),
(12, 'Принадлежности для воздухо-распределительных устройств'),
(13, 'Воздушные клапаны'),
(14, 'Материалы для вкентагрегатов'),
(15, 'Воздухо-распределительные камеры'),
(16, 'Регуляторы расхода воздуха'),
(17, 'Принадлежности для вентиляторов'),
(18, 'Электрические принадлежности для вентиляторов'),
(19, 'Вентиляционные решетки');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_airing_implementation_types`
--

DROP TABLE IF EXISTS `catalog_airing_implementation_types`;
CREATE TABLE IF NOT EXISTS `catalog_airing_implementation_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_airing_implementation_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_airing_isolation_clases`
--

DROP TABLE IF EXISTS `catalog_airing_isolation_clases`;
CREATE TABLE IF NOT EXISTS `catalog_airing_isolation_clases` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_airing_isolation_clases`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_airing_marks`
--

DROP TABLE IF EXISTS `catalog_airing_marks`;
CREATE TABLE IF NOT EXISTS `catalog_airing_marks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=50 ;

--
-- Дамп данных таблицы `catalog_airing_marks`
--

INSERT INTO `catalog_airing_marks` (`id`, `name`) VALUES
(1, 'AERMEC'),
(2, 'AIR-O-SWISS '),
(3, 'Airwell'),
(4, 'CARRIER'),
(5, 'DANTHERM'),
(6, 'Frico'),
(7, 'General Climate'),
(8, 'KORF'),
(9, 'LESSAR'),
(10, 'McQuay'),
(11, 'OSTBERG'),
(12, 'ROSENBERG'),
(13, 'SWEGON'),
(14, 'Systemair'),
(15, 'Trane'),
(16, 'Wesper'),
(17, 'YORK'),
(18, 'Арктос'),
(19, 'Бризарт'),
(20, 'Лиссант'),
(21, 'Веза'),
(22, 'Крюковский вентиляционный завод'),
(23, 'МОВЕН'),
(24, 'NED'),
(25, 'Aerotek'),
(26, 'Diaflex'),
(27, 'Dospel Professional'),
(28, 'GEA Klimatechnik'),
(29, 'Halton'),
(30, 'IMP Klima'),
(31, 'Kampmann'),
(32, 'Lennox'),
(33, 'Polar Bear'),
(34, 'Remak'),
(35, 'Shuft'),
(36, 'Soler&Palau'),
(37, 'Trox'),
(38, 'VKT'),
(39, 'Благовест'),
(40, 'Венткомплект'),
(41, 'Вентпрофиль'),
(42, 'Вингс-М'),
(43, 'Воздухотехника'),
(44, 'Галвент'),
(45, 'Завод НЭПТ'),
(46, 'Климатвентмаш'),
(47, 'Климатехника'),
(48, 'Сигма-Вент'),
(49, 'Тепломаш');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_airing_materials`
--

DROP TABLE IF EXISTS `catalog_airing_materials`;
CREATE TABLE IF NOT EXISTS `catalog_airing_materials` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_airing_materials`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_airing_power_sources`
--

DROP TABLE IF EXISTS `catalog_airing_power_sources`;
CREATE TABLE IF NOT EXISTS `catalog_airing_power_sources` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_airing_power_sources`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_airing_product_types`
--

DROP TABLE IF EXISTS `catalog_airing_product_types`;
CREATE TABLE IF NOT EXISTS `catalog_airing_product_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_airing_product_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_airing_protection_types`
--

DROP TABLE IF EXISTS `catalog_airing_protection_types`;
CREATE TABLE IF NOT EXISTS `catalog_airing_protection_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_airing_protection_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_automation`
--

DROP TABLE IF EXISTS `catalog_automation`;
CREATE TABLE IF NOT EXISTS `catalog_automation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `marking` text,
  `product_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `control_type_id` int(10) unsigned DEFAULT NULL,
  `connection_type_id` int(10) unsigned DEFAULT NULL,
  `protection_type_id` int(10) unsigned DEFAULT NULL,
  `material_id` int(10) unsigned DEFAULT NULL,
  `power_source_id` int(10) unsigned DEFAULT NULL,
  `isolation_type_id` int(10) unsigned DEFAULT NULL,
  `country` text,
  `temp_adjustment_range` text,
  `temp_setting_range` text,
  `power_supply` text,
  `heating_power_consumption` text,
  `amperage` text,
  `sensor_inputs` text,
  `pressure` text,
  `noise_level_min` text,
  `eer` text,
  `weight` text,
  `dimensions` text,
  `cable_length` text,
  `spray_angle` text,
  `warranty` text,
  `storage` text,
  `reserve` text,
  `order` text,
  `url` text,
  `price` text,
  `mount_price` text,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `mark_id` (`mark_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `implementation_type_id` (`implementation_type_id`),
  KEY `control_type_id` (`control_type_id`),
  KEY `connection_type_id` (`connection_type_id`),
  KEY `protection_type_id` (`protection_type_id`),
  KEY `material_id` (`material_id`),
  KEY `power_source_id` (`power_source_id`),
  KEY `isolation_type_id` (`isolation_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_automation`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_automation_connection_types`
--

DROP TABLE IF EXISTS `catalog_automation_connection_types`;
CREATE TABLE IF NOT EXISTS `catalog_automation_connection_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_automation_connection_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_automation_control_types`
--

DROP TABLE IF EXISTS `catalog_automation_control_types`;
CREATE TABLE IF NOT EXISTS `catalog_automation_control_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_automation_control_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_automation_groups`
--

DROP TABLE IF EXISTS `catalog_automation_groups`;
CREATE TABLE IF NOT EXISTS `catalog_automation_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Дамп данных таблицы `catalog_automation_groups`
--

INSERT INTO `catalog_automation_groups` (`id`, `name`) VALUES
(1, 'Радиаторные терморегуляторы и клапаны'),
(2, 'Терморегуляторы для фэнкойлов'),
(3, 'Балансировочные клапаны'),
(4, 'Контроллеры и диспетчеризация'),
(5, 'Клапаны с электроприводами'),
(6, 'Электрические приводы '),
(7, 'Регуляторы расхода и давления'),
(8, 'Регуляторы температуры'),
(9, 'Теплообменники'),
(10, 'Комнатные термостаты'),
(11, 'Блочные тепловые пункты'),
(12, 'Компоненты горелок'),
(13, 'Трубопроводная арматура'),
(14, 'Автоматика и управление электрооборудованием'),
(15, 'Автоматика котлов отопления');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_automation_implementation_types`
--

DROP TABLE IF EXISTS `catalog_automation_implementation_types`;
CREATE TABLE IF NOT EXISTS `catalog_automation_implementation_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_automation_implementation_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_automation_isolation_types`
--

DROP TABLE IF EXISTS `catalog_automation_isolation_types`;
CREATE TABLE IF NOT EXISTS `catalog_automation_isolation_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_automation_isolation_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_automation_marks`
--

DROP TABLE IF EXISTS `catalog_automation_marks`;
CREATE TABLE IF NOT EXISTS `catalog_automation_marks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_automation_marks`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_automation_materials`
--

DROP TABLE IF EXISTS `catalog_automation_materials`;
CREATE TABLE IF NOT EXISTS `catalog_automation_materials` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_automation_materials`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_automation_power_sources`
--

DROP TABLE IF EXISTS `catalog_automation_power_sources`;
CREATE TABLE IF NOT EXISTS `catalog_automation_power_sources` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_automation_power_sources`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_automation_product_types`
--

DROP TABLE IF EXISTS `catalog_automation_product_types`;
CREATE TABLE IF NOT EXISTS `catalog_automation_product_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_automation_product_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_automation_protection_types`
--

DROP TABLE IF EXISTS `catalog_automation_protection_types`;
CREATE TABLE IF NOT EXISTS `catalog_automation_protection_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_automation_protection_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_conditioners`
--

DROP TABLE IF EXISTS `catalog_conditioners`;
CREATE TABLE IF NOT EXISTS `catalog_conditioners` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `marking` text,
  `product_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `control_type_id` int(10) unsigned DEFAULT NULL,
  `connection_type_id` int(10) unsigned DEFAULT NULL,
  `protection_type_id` int(10) unsigned DEFAULT NULL,
  `material_id` int(10) unsigned DEFAULT NULL,
  `power_source_id` int(10) unsigned DEFAULT NULL,
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
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `mark_id` (`mark_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `implementation_type_id` (`implementation_type_id`),
  KEY `control_type_id` (`control_type_id`),
  KEY `connection_type_id` (`connection_type_id`),
  KEY `protection_type_id` (`protection_type_id`),
  KEY `material_id` (`material_id`),
  KEY `power_source_id` (`power_source_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `catalog_conditioners`
--

INSERT INTO `catalog_conditioners` (`id`, `group_id`, `mark_id`, `marking`, `product_type_id`, `implementation_type_id`, `control_type_id`, `connection_type_id`, `protection_type_id`, `material_id`, `power_source_id`, `country`, `cooling_capacity`, `heating_capacity`, `cooling_outdor_temp`, `heating_outdor_temp`, `power_supply`, `cooling_power_consumption`, `heating_power_consumption`, `amperage`, `air_consumption_min`, `air_consumption_max`, `sensor_inputs`, `pressure`, `noise_level_min`, `noise_level_max`, `eer`, `weight`, `dimensions`, `cable_length`, `pipe_diameter_liquid`, `pipe_diameter_gas`, `drain_diameter`, `trunk_length`, `elevation_difference`, `square`, `volume`, `warranty`, `storage`, `reserve`, `order`, `url`, `price`, `mount_price`) VALUES
(1, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_conditioners_connection_types`
--

DROP TABLE IF EXISTS `catalog_conditioners_connection_types`;
CREATE TABLE IF NOT EXISTS `catalog_conditioners_connection_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_conditioners_connection_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_conditioners_control_types`
--

DROP TABLE IF EXISTS `catalog_conditioners_control_types`;
CREATE TABLE IF NOT EXISTS `catalog_conditioners_control_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_conditioners_control_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_conditioners_groups`
--

DROP TABLE IF EXISTS `catalog_conditioners_groups`;
CREATE TABLE IF NOT EXISTS `catalog_conditioners_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Дамп данных таблицы `catalog_conditioners_groups`
--

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

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_conditioners_implementation_types`
--

DROP TABLE IF EXISTS `catalog_conditioners_implementation_types`;
CREATE TABLE IF NOT EXISTS `catalog_conditioners_implementation_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_conditioners_implementation_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_conditioners_marks`
--

DROP TABLE IF EXISTS `catalog_conditioners_marks`;
CREATE TABLE IF NOT EXISTS `catalog_conditioners_marks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=37 ;

--
-- Дамп данных таблицы `catalog_conditioners_marks`
--

INSERT INTO `catalog_conditioners_marks` (`id`, `name`) VALUES
(1, 'Разное'),
(2, 'Airwell'),
(3, 'Bork'),
(4, 'Ballu'),
(5, 'Argo'),
(6, 'Carrier'),
(7, 'Chofu'),
(8, 'Daikin'),
(9, 'DeLonghi'),
(10, 'Electra'),
(11, 'Haier'),
(12, 'Hitachi'),
(13, 'Hyundai/Winia'),
(14, 'FujitsuGeneral'),
(15, 'Gree'),
(16, 'Golf'),
(17, 'Kelon'),
(18, 'LG'),
(19, 'McQuay/Acson'),
(20, 'Midea'),
(21, 'MitsubishiElectric'),
(22, 'MitsubishiHeavy'),
(23, 'Panasonic'),
(24, 'PolarBear'),
(25, 'Rolsen'),
(26, 'Samsung'),
(27, 'Sanyo'),
(28, 'Scarlett'),
(29, 'Sharp'),
(30, 'Shivaki'),
(31, 'Tadiran'),
(32, 'Toshiba'),
(33, 'York'),
(34, 'EVGO'),
(35, 'Элемаш'),
(36, 'Энергия');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_conditioners_materials`
--

DROP TABLE IF EXISTS `catalog_conditioners_materials`;
CREATE TABLE IF NOT EXISTS `catalog_conditioners_materials` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_conditioners_materials`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_conditioners_power_sources`
--

DROP TABLE IF EXISTS `catalog_conditioners_power_sources`;
CREATE TABLE IF NOT EXISTS `catalog_conditioners_power_sources` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_conditioners_power_sources`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_conditioners_product_types`
--

DROP TABLE IF EXISTS `catalog_conditioners_product_types`;
CREATE TABLE IF NOT EXISTS `catalog_conditioners_product_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_conditioners_product_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_conditioners_protection_types`
--

DROP TABLE IF EXISTS `catalog_conditioners_protection_types`;
CREATE TABLE IF NOT EXISTS `catalog_conditioners_protection_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_conditioners_protection_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_dustextraction`
--

DROP TABLE IF EXISTS `catalog_dustextraction`;
CREATE TABLE IF NOT EXISTS `catalog_dustextraction` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `marking` text,
  `filtration_id` int(10) unsigned DEFAULT NULL,
  `motor_id` int(10) unsigned DEFAULT NULL,
  `country` text,
  `power_consumption` text,
  `vacuum_power` text,
  `air_flow` text,
  `vacuum_pressure` text,
  `noise_level` text,
  `amperage` text,
  `dimensions` text,
  `max_remote_pneumo_valve` text,
  `max_riser_height` text,
  `max_cabling_length` text,
  `riser_diameter` text,
  `cabling_diameter` text,
  `dust_tank` text,
  `motor_resource` text,
  `max_users` text,
  `extra_case_valve` text,
  `soft_start` text,
  `clean_pipe` text,
  `vacuum_power_adj` text,
  `case_lcd` text,
  `regulating_valve` text,
  `downy_valve` text,
  `auto_clean` text,
  `warranty` text,
  `storage` text,
  `reserve` text,
  `order` text,
  `url` text,
  `price` text,
  `mount_price` text,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `mark_id` (`mark_id`),
  KEY `filtration_id` (`filtration_id`),
  KEY `motor_id` (`motor_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `catalog_dustextraction`
--

INSERT INTO `catalog_dustextraction` (`id`, `group_id`, `mark_id`, `marking`, `filtration_id`, `motor_id`, `country`, `power_consumption`, `vacuum_power`, `air_flow`, `vacuum_pressure`, `noise_level`, `amperage`, `dimensions`, `max_remote_pneumo_valve`, `max_riser_height`, `max_cabling_length`, `riser_diameter`, `cabling_diameter`, `dust_tank`, `motor_resource`, `max_users`, `extra_case_valve`, `soft_start`, `clean_pipe`, `vacuum_power_adj`, `case_lcd`, `regulating_valve`, `downy_valve`, `auto_clean`, `warranty`, `storage`, `reserve`, `order`, `url`, `price`, `mount_price`) VALUES
(1, 4, NULL, NULL, 2, NULL, 'FI', '1200', '610', '178', '28', '58', '10', NULL, '35', NULL, NULL, NULL, NULL, '8', '500', '1', 'нет', 'есть', 'нет', 'нет', 'нет', NULL, NULL, NULL, '5', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_dustextraction_filtrations`
--

DROP TABLE IF EXISTS `catalog_dustextraction_filtrations`;
CREATE TABLE IF NOT EXISTS `catalog_dustextraction_filtrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `catalog_dustextraction_filtrations`
--

INSERT INTO `catalog_dustextraction_filtrations` (`id`, `name`) VALUES
(1, 'циклон+HEPA'),
(2, 'мешок+полиэфир');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_dustextraction_groups`
--

DROP TABLE IF EXISTS `catalog_dustextraction_groups`;
CREATE TABLE IF NOT EXISTS `catalog_dustextraction_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Дамп данных таблицы `catalog_dustextraction_groups`
--

INSERT INTO `catalog_dustextraction_groups` (`id`, `name`) VALUES
(2, 'бытовое'),
(3, 'коммерческое'),
(4, 'Пылесосы'),
(5, 'Система удаления пыли мобильная'),
(6, 'Рукава пылеудаления'),
(7, 'Клапана быстроразъемного соединения'),
(8, 'Нипели, переходники, соединители'),
(9, 'Фильтры воздушные'),
(10, 'Фильтры для системы пылеудаления'),
(11, 'Мешки пылесборные'),
(12, 'Система удаления пыли централизованная'),
(13, 'Блоки предварительной фильтрации '),
(14, 'Профессиональная система пылеудаления для работ');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_dustextraction_marks`
--

DROP TABLE IF EXISTS `catalog_dustextraction_marks`;
CREATE TABLE IF NOT EXISTS `catalog_dustextraction_marks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_dustextraction_marks`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_dustextraction_motors`
--

DROP TABLE IF EXISTS `catalog_dustextraction_motors`;
CREATE TABLE IF NOT EXISTS `catalog_dustextraction_motors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `catalog_dustextraction_motors`
--

INSERT INTO `catalog_dustextraction_motors` (`id`, `name`) VALUES
(1, 'прямоточный'),
(2, 'обводной');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_electricity`
--

DROP TABLE IF EXISTS `catalog_electricity`;
CREATE TABLE IF NOT EXISTS `catalog_electricity` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `marking` text,
  `product_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `control_type_id` int(10) unsigned DEFAULT NULL,
  `connection_type_id` int(10) unsigned DEFAULT NULL,
  `protection_type_id` int(10) unsigned DEFAULT NULL,
  `material_id` int(10) unsigned DEFAULT NULL,
  `power_source_id` int(10) unsigned DEFAULT NULL,
  `isolation_type_id` int(10) unsigned DEFAULT NULL,
  `country` text,
  `temp` text,
  `power_supply` text,
  `power` text,
  `amperage` text,
  `sensor_inputs` text,
  `noise_level_min` text,
  `eer` text,
  `weight` text,
  `dimensions` text,
  `cable_length` text,
  `speed` text,
  `switching_time` text,
  `warranty` text,
  `storage` text,
  `reserve` text,
  `order` text,
  `url` text,
  `price` text,
  `mount_price` text,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `mark_id` (`mark_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `implementation_type_id` (`implementation_type_id`),
  KEY `control_type_id` (`control_type_id`),
  KEY `connection_type_id` (`connection_type_id`),
  KEY `protection_type_id` (`protection_type_id`),
  KEY `material_id` (`material_id`),
  KEY `power_source_id` (`power_source_id`),
  KEY `isolation_type_id` (`isolation_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_electricity`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_electricity_connection_types`
--

DROP TABLE IF EXISTS `catalog_electricity_connection_types`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_connection_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_electricity_connection_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_electricity_control_types`
--

DROP TABLE IF EXISTS `catalog_electricity_control_types`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_control_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_electricity_control_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_electricity_groups`
--

DROP TABLE IF EXISTS `catalog_electricity_groups`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- Дамп данных таблицы `catalog_electricity_groups`
--

INSERT INTO `catalog_electricity_groups` (`id`, `name`) VALUES
(1, 'Кабельная продукция'),
(2, 'Электротехнические трубы'),
(4, 'Светильники, прожекторы, лампы'),
(5, 'Контрольно-измерительные приборы'),
(6, 'Розетки и выключатели'),
(7, 'Клеммы, разъёмы, штекеры'),
(8, 'Силовые модули'),
(9, 'Электродвигатели'),
(10, 'Распределительные щиты, шкафы, коробки'),
(11, 'Мини-колонны'),
(12, 'Сервисные стойки'),
(13, 'Электрощитовое оборудование'),
(14, 'Защита от излучений'),
(15, 'Молниезащита и заземление'),
(16, 'Батарейки. Аккумуляторы. Зарядные устройства'),
(17, 'Стартеры. Конденсаторы. Трансформаторы '),
(18, 'Теплый пол'),
(19, 'Системы антиобледенения');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_electricity_implementation_types`
--

DROP TABLE IF EXISTS `catalog_electricity_implementation_types`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_implementation_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_electricity_implementation_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_electricity_isolation_types`
--

DROP TABLE IF EXISTS `catalog_electricity_isolation_types`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_isolation_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_electricity_isolation_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_electricity_marks`
--

DROP TABLE IF EXISTS `catalog_electricity_marks`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_marks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_electricity_marks`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_electricity_materials`
--

DROP TABLE IF EXISTS `catalog_electricity_materials`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_materials` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_electricity_materials`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_electricity_power_sources`
--

DROP TABLE IF EXISTS `catalog_electricity_power_sources`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_power_sources` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_electricity_power_sources`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_electricity_product_types`
--

DROP TABLE IF EXISTS `catalog_electricity_product_types`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_product_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_electricity_product_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_electricity_protection_types`
--

DROP TABLE IF EXISTS `catalog_electricity_protection_types`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_protection_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_electricity_protection_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_heating`
--

DROP TABLE IF EXISTS `catalog_heating`;
CREATE TABLE IF NOT EXISTS `catalog_heating` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `marking` text,
  `product_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `control_type_id` int(10) unsigned DEFAULT NULL,
  `connection_type_id` int(10) unsigned DEFAULT NULL,
  `protection_type_id` int(10) unsigned DEFAULT NULL,
  `material_id` int(10) unsigned DEFAULT NULL,
  `power_source_id` int(10) unsigned DEFAULT NULL,
  `country` text,
  `temp` text,
  `power_supply` text,
  `heating_power_consumption` text,
  `power` text,
  `productivity` text,
  `burner_power` text,
  `amperage` text,
  `sensor_inputs` text,
  `pressure` text,
  `noise_level_min` text,
  `back_pressure` text,
  `eer` text,
  `weight` text,
  `dimensions` text,
  `cable_length` text,
  `burner_tube_length` text,
  `burner_tube_hole` text,
  `chimney_diameter` text,
  `efficiency` text,
  `warranty` text,
  `storage` text,
  `reserve` text,
  `order` text,
  `url` text,
  `price` text,
  `mount_price` text,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `mark_id` (`mark_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `implementation_type_id` (`implementation_type_id`),
  KEY `control_type_id` (`control_type_id`),
  KEY `connection_type_id` (`connection_type_id`),
  KEY `protection_type_id` (`protection_type_id`),
  KEY `material_id` (`material_id`),
  KEY `power_source_id` (`power_source_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_heating`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_heating_connection_types`
--

DROP TABLE IF EXISTS `catalog_heating_connection_types`;
CREATE TABLE IF NOT EXISTS `catalog_heating_connection_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_heating_connection_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_heating_control_types`
--

DROP TABLE IF EXISTS `catalog_heating_control_types`;
CREATE TABLE IF NOT EXISTS `catalog_heating_control_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_heating_control_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_heating_groups`
--

DROP TABLE IF EXISTS `catalog_heating_groups`;
CREATE TABLE IF NOT EXISTS `catalog_heating_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Дамп данных таблицы `catalog_heating_groups`
--

INSERT INTO `catalog_heating_groups` (`id`, `name`) VALUES
(1, 'Водогрейные котлы '),
(2, 'Водонагреватели и бойлеры'),
(3, 'Конвекторы'),
(4, 'Паровые котлы'),
(5, 'Котлы на перегретой воде'),
(6, 'Котлы на диатермическом масле '),
(7, 'Горелки для котлов'),
(8, 'Деаэраторы и баки'),
(9, 'Тепловое оборудование'),
(10, 'Газовые воздухонагреватели'),
(11, 'Радиаторы отопления'),
(12, 'Полотенцесушители'),
(13, 'Камины'),
(14, 'Тепловые пункты'),
(15, 'Насосные группы'),
(16, 'Трубы и фитинги');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_heating_implementation_types`
--

DROP TABLE IF EXISTS `catalog_heating_implementation_types`;
CREATE TABLE IF NOT EXISTS `catalog_heating_implementation_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_heating_implementation_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_heating_marks`
--

DROP TABLE IF EXISTS `catalog_heating_marks`;
CREATE TABLE IF NOT EXISTS `catalog_heating_marks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=42 ;

--
-- Дамп данных таблицы `catalog_heating_marks`
--

INSERT INTO `catalog_heating_marks` (`id`, `name`) VALUES
(1, 'AEG'),
(2, 'ALFA-LAVAL'),
(3, 'ARBONIA'),
(4, 'BROEN'),
(5, 'Bantal Radiator'),
(6, 'BAXI'),
(7, 'Buderus'),
(8, 'DANFOSS'),
(9, 'De Dietrich'),
(10, 'DELONGI'),
(11, 'DEMRAD'),
(12, 'FERROLI '),
(13, 'NAVAL'),
(14, 'General Radiator'),
(15, 'GIERSCH'),
(16, 'HERZ'),
(17, 'HONEYWELL'),
(18, 'JAGA'),
(19, 'JUNKERS'),
(20, 'Kan-therm'),
(21, 'KERMI '),
(22, 'KONRAD'),
(23, 'Lamborghini'),
(24, 'MINIB'),
(25, 'NOIROT'),
(26, 'OVENTROP'),
(27, 'POLARIS'),
(28, 'Protherm'),
(29, 'PURMO'),
(30, 'PYROX'),
(31, 'REFLEX'),
(32, 'SIRA'),
(33, 'Uponor'),
(34, 'VAILLIANT'),
(35, 'VIESSMANN'),
(36, 'Vogel&Noot'),
(37, 'WILO'),
(38, 'ГАЛАН'),
(39, 'Теплолюкс'),
(40, 'Тепломаш'),
(41, 'Grundfos');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_heating_materials`
--

DROP TABLE IF EXISTS `catalog_heating_materials`;
CREATE TABLE IF NOT EXISTS `catalog_heating_materials` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_heating_materials`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_heating_power_sources`
--

DROP TABLE IF EXISTS `catalog_heating_power_sources`;
CREATE TABLE IF NOT EXISTS `catalog_heating_power_sources` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_heating_power_sources`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_heating_product_types`
--

DROP TABLE IF EXISTS `catalog_heating_product_types`;
CREATE TABLE IF NOT EXISTS `catalog_heating_product_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_heating_product_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_heating_protection_types`
--

DROP TABLE IF EXISTS `catalog_heating_protection_types`;
CREATE TABLE IF NOT EXISTS `catalog_heating_protection_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_heating_protection_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_images`
--

DROP TABLE IF EXISTS `catalog_images`;
CREATE TABLE IF NOT EXISTS `catalog_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET latin1 NOT NULL,
  `entity` varchar(255) CHARACTER SET latin1 NOT NULL,
  `entity_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_images`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_watersupply`
--

DROP TABLE IF EXISTS `catalog_watersupply`;
CREATE TABLE IF NOT EXISTS `catalog_watersupply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `marking` text,
  `product_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `control_type_id` int(10) unsigned DEFAULT NULL,
  `connection_type_id` int(10) unsigned DEFAULT NULL,
  `protection_type_id` int(10) unsigned DEFAULT NULL,
  `material_id` int(10) unsigned DEFAULT NULL,
  `power_source_id` int(10) unsigned DEFAULT NULL,
  `country` text,
  `temp` text,
  `power_supply` text,
  `heating_power_consumption` text,
  `amperage` text,
  `sensor_inputs` text,
  `pressure` text,
  `noise_level_min` text,
  `filters_performance` text,
  `performance` text,
  `pollution_size` text,
  `eer` text,
  `weight` text,
  `dimensions` text,
  `cable_length` text,
  `pipe_diameter` text,
  `delivery_height` text,
  `immersion_depth` text,
  `warranty` text,
  `storage` text,
  `reserve` text,
  `order` text,
  `url` text,
  `price` text,
  `mount_price` text,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `mark_id` (`mark_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `implementation_type_id` (`implementation_type_id`),
  KEY `control_type_id` (`control_type_id`),
  KEY `connection_type_id` (`connection_type_id`),
  KEY `protection_type_id` (`protection_type_id`),
  KEY `material_id` (`material_id`),
  KEY `power_source_id` (`power_source_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_watersupply`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_watersupply_connection_types`
--

DROP TABLE IF EXISTS `catalog_watersupply_connection_types`;
CREATE TABLE IF NOT EXISTS `catalog_watersupply_connection_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_watersupply_connection_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_watersupply_control_types`
--

DROP TABLE IF EXISTS `catalog_watersupply_control_types`;
CREATE TABLE IF NOT EXISTS `catalog_watersupply_control_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_watersupply_control_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_watersupply_groups`
--

DROP TABLE IF EXISTS `catalog_watersupply_groups`;
CREATE TABLE IF NOT EXISTS `catalog_watersupply_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- Дамп данных таблицы `catalog_watersupply_groups`
--

INSERT INTO `catalog_watersupply_groups` (`id`, `name`) VALUES
(1, 'Насосы для отопления дома'),
(2, 'Насосы для полива'),
(3, 'Насосы для систем жизнеобеспечения'),
(4, 'Насосы для отопления дома'),
(5, 'Насосы для систем пожаротушения'),
(6, 'Польдерные насосы '),
(7, 'Система распределения тепла'),
(8, 'Насосы для горячего водоснабжения '),
(9, 'Насосы для отвода стоков '),
(10, 'Арматура для отопительных приборов'),
(11, 'Aрматура для гидравлической увязки систем'),
(12, 'Запорная и прочая трубопроводная арматура'),
(13, 'Арматура для обвязки котлов бойлеров и насосов'),
(14, 'Система обвязки контуров солнечного отопления и твердотопливных котлов'),
(15, 'Центральное управление и регулирование инженерных систем зданий'),
(16, 'Арматура для жидкого топлива'),
(17, 'Арматура для систем водоснабжения'),
(18, 'Система панельного отопления/охлаждения Cofloor'),
(19, 'Система Combi');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_watersupply_implementation_types`
--

DROP TABLE IF EXISTS `catalog_watersupply_implementation_types`;
CREATE TABLE IF NOT EXISTS `catalog_watersupply_implementation_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_watersupply_implementation_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_watersupply_marks`
--

DROP TABLE IF EXISTS `catalog_watersupply_marks`;
CREATE TABLE IF NOT EXISTS `catalog_watersupply_marks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=42 ;

--
-- Дамп данных таблицы `catalog_watersupply_marks`
--

INSERT INTO `catalog_watersupply_marks` (`id`, `name`) VALUES
(1, 'AEG'),
(2, 'ALFA-LAVAL'),
(3, 'ARBONIA'),
(4, 'BROEN'),
(5, 'Bantal Radiator'),
(6, 'BAXI'),
(7, 'Buderus'),
(8, 'DANFOSS'),
(9, 'De Dietrich'),
(10, 'DELONGI'),
(11, 'DEMRAD'),
(12, 'FERROLI '),
(13, 'NAVAL'),
(14, 'General Radiator'),
(15, 'GIERSCH'),
(16, 'HERZ'),
(17, 'HONEYWELL'),
(18, 'JAGA'),
(19, 'JUNKERS'),
(20, 'Kan-therm'),
(21, 'KERMI '),
(22, 'KONRAD'),
(23, 'Lamborghini'),
(24, 'MINIB'),
(25, 'NOIROT'),
(26, 'OVENTROP'),
(27, 'POLARIS'),
(28, 'Protherm'),
(29, 'PURMO'),
(30, 'PYROX'),
(31, 'REFLEX'),
(32, 'SIRA'),
(33, 'Uponor'),
(34, 'VAILLIANT'),
(35, 'VIESSMANN'),
(36, 'Vogel&Noot'),
(37, 'WILO'),
(38, 'ГАЛАН'),
(39, 'Теплолюкс'),
(40, 'Тепломаш'),
(41, 'Grundfos');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_watersupply_materials`
--

DROP TABLE IF EXISTS `catalog_watersupply_materials`;
CREATE TABLE IF NOT EXISTS `catalog_watersupply_materials` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_watersupply_materials`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_watersupply_power_sources`
--

DROP TABLE IF EXISTS `catalog_watersupply_power_sources`;
CREATE TABLE IF NOT EXISTS `catalog_watersupply_power_sources` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_watersupply_power_sources`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_watersupply_product_types`
--

DROP TABLE IF EXISTS `catalog_watersupply_product_types`;
CREATE TABLE IF NOT EXISTS `catalog_watersupply_product_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_watersupply_product_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_watersupply_protection_types`
--

DROP TABLE IF EXISTS `catalog_watersupply_protection_types`;
CREATE TABLE IF NOT EXISTS `catalog_watersupply_protection_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_watersupply_protection_types`
--


-- --------------------------------------------------------

--
-- Структура таблицы `news_main`
--

DROP TABLE IF EXISTS `news_main`;
CREATE TABLE IF NOT EXISTS `news_main` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `account_id` int(10) unsigned DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `short_text` text NOT NULL,
  `long_text` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `news_main`
--

INSERT INTO `news_main` (`id`, `date`, `category_id`, `account_id`, `title`, `short_text`, `long_text`) VALUES
(1, '2012-12-14 00:00:00', 1, 8, 'Заголовок новости 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla. Aliquam nisi ipsum, hendrerit a egestas a, tincidunt vulputate justo. Donec a ipsum ac metus accumsan lobortis. Vivamus nec nulla at augue facilisis varius. Morbi a velit eros, non ornare magna. Nam dui erat, suscipit ut vehicula non, interdum vitae eros. Aliquam eu rhoncus libero. Curabitur aliquet ultricies est. Morbi feugiat iaculis posuere. Suspendisse sit amet dui in sapien egestas semper. Nullam nec justo id lacus suscipit tincidunt eu sit amet neque. Vivamus vel leo metus. Proin adipiscing mattis est in gravida. Fusce nec purus nisi, id ullamcorper erat. Donec metus justo, auctor et fermentum ultricies, viverra ac velit. Proin blandit euismod lacinia. Fusce sit amet mollis turpis. Vestibulum sed odio massa. Proin interdum elit nec velit commodo pretium. Curabitur eget justo vitae nisi sodales suscipit. Morbi elit nisi, porta sit amet suscipit at, porttitor ac tellus. Curabitur gravida placerat condimentum. Suspendisse in laoreet diam. Duis iaculis, justo vitae euismod eleifend, neque nisi auctor arcu, sed posuere erat justo a nunc. Ut varius est non quam blandit placerat lobortis arcu pellentesque. Sed consequat dapibus suscipit. Donec odio felis, pharetra in lobortis ac, venenatis in lacus.\r\nVivamus vulputate, sem id pharetra porta, turpis nunc elementum ipsum, quis varius elit felis id nisl. Quisque interdum purus ut eros sodales egestas. Suspendisse suscipit urna rutrum est sagittis quis tempor metus consequat. Donec dapibus, justo eu iaculis gravida, purus neque posuere enim, vel vestibulum ante velit vitae dui. Ut sit amet nibh elit, sed commodo ipsum. Suspendisse eu mi justo, ut hendrerit lectus. Nam ullamcorper, mi vel imperdiet luctus, augue purus mattis eros, nec vulputate nulla dolor et sapien. Nullam placerat molestie consectetur. Nulla pretium lorem in arcu fringilla sed malesuada nisl lacinia. In hac habitasse platea dictumst. Morbi egestas, turpis at tristique consequat, arcu orci faucibus eros, a auctor massa nunc a mauris. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin eget massa ante. Cras volutpat, tortor sed egestas aliquet, est nibh tristique enim, sit amet ornare ante arcu vel leo.\r\nNullam mi lectus, laoreet eget fermentum quis, adipiscing et purus. Suspendisse nec condimentum leo. Ut ultrices malesuada eros, vel imperdiet nunc elementum vel. Donec vitae orci arcu. Etiam at turpis a ipsum pellentesque placerat. Nam malesuada, urna id pharetra malesuada, arcu arcu elementum tortor, sed venenatis felis nunc eu sem. Praesent ullamcorper, turpis vitae feugiat porta, arcu eros porta mi, quis ultrices tellus sapien sed quam. Quisque accumsan malesuada leo, at pellentesque felis bibendum at. Integer commodo sollicitudin felis et mollis. Mauris risus eros, auctor vitae bibendum eget, hendrerit quis turpis.\r\nEtiam adipiscing metus nec diam bibendum elementum. In at est rhoncus nibh laoreet congue id at tellus. Vestibulum et elit ligula, vel commodo nisl. Fusce vitae porta lectus. Vivamus suscipit dictum massa, ac porta sapien consectetur id. In hac habitasse platea dictumst. Aliquam id neque at sem sollicitudin pharetra. Aenean imperdiet tellus id nisl malesuada vitae bibendum odio convallis. Pellentesque dictum porta erat, at pretium augue egestas ut. Nam tempus mauris est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam gravida sodales dignissim. Sed facilisis nunc eget enim lobortis faucibus. In ac purus sit amet lectus venenatis interdum.'),
(2, '2012-12-12 00:00:00', 1, 8, 'Заголовок новости 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla. Aliquam nisi ipsum, hendrerit a egestas a, tincidunt vulputate justo. Donec a ipsum ac metus accumsan lobortis. Vivamus nec nulla at augue facilisis varius. Morbi a velit eros, non ornare magna. Nam dui erat, suscipit ut vehicula non, interdum vitae eros. Aliquam eu rhoncus libero. Curabitur aliquet ultricies est. Morbi feugiat iaculis posuere. Suspendisse sit amet dui in sapien egestas semper. Nullam nec justo id lacus suscipit tincidunt eu sit amet neque. Vivamus vel leo metus. Proin adipiscing mattis est in gravida. Fusce nec purus nisi, id ullamcorper erat. Donec metus justo, auctor et fermentum ultricies, viverra ac velit. Proin blandit euismod lacinia. Fusce sit amet mollis turpis. Vestibulum sed odio massa. Proin interdum elit nec velit commodo pretium. Curabitur eget justo vitae nisi sodales suscipit. Morbi elit nisi, porta sit amet suscipit at, porttitor ac tellus. Curabitur gravida placerat condimentum. Suspendisse in laoreet diam. Duis iaculis, justo vitae euismod eleifend, neque nisi auctor arcu, sed posuere erat justo a nunc. Ut varius est non quam blandit placerat lobortis arcu pellentesque. Sed consequat dapibus suscipit. Donec odio felis, pharetra in lobortis ac, venenatis in lacus.\r\nVivamus vulputate, sem id pharetra porta, turpis nunc elementum ipsum, quis varius elit felis id nisl. Quisque interdum purus ut eros sodales egestas. Suspendisse suscipit urna rutrum est sagittis quis tempor metus consequat. Donec dapibus, justo eu iaculis gravida, purus neque posuere enim, vel vestibulum ante velit vitae dui. Ut sit amet nibh elit, sed commodo ipsum. Suspendisse eu mi justo, ut hendrerit lectus. Nam ullamcorper, mi vel imperdiet luctus, augue purus mattis eros, nec vulputate nulla dolor et sapien. Nullam placerat molestie consectetur. Nulla pretium lorem in arcu fringilla sed malesuada nisl lacinia. In hac habitasse platea dictumst. Morbi egestas, turpis at tristique consequat, arcu orci faucibus eros, a auctor massa nunc a mauris. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin eget massa ante. Cras volutpat, tortor sed egestas aliquet, est nibh tristique enim, sit amet ornare ante arcu vel leo.\r\nNullam mi lectus, laoreet eget fermentum quis, adipiscing et purus. Suspendisse nec condimentum leo. Ut ultrices malesuada eros, vel imperdiet nunc elementum vel. Donec vitae orci arcu. Etiam at turpis a ipsum pellentesque placerat. Nam malesuada, urna id pharetra malesuada, arcu arcu elementum tortor, sed venenatis felis nunc eu sem. Praesent ullamcorper, turpis vitae feugiat porta, arcu eros porta mi, quis ultrices tellus sapien sed quam. Quisque accumsan malesuada leo, at pellentesque felis bibendum at. Integer commodo sollicitudin felis et mollis. Mauris risus eros, auctor vitae bibendum eget, hendrerit quis turpis.\r\nEtiam adipiscing metus nec diam bibendum elementum. In at est rhoncus nibh laoreet congue id at tellus. Vestibulum et elit ligula, vel commodo nisl. Fusce vitae porta lectus. Vivamus suscipit dictum massa, ac porta sapien consectetur id. In hac habitasse platea dictumst. Aliquam id neque at sem sollicitudin pharetra. Aenean imperdiet tellus id nisl malesuada vitae bibendum odio convallis. Pellentesque dictum porta erat, at pretium augue egestas ut. Nam tempus mauris est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam gravida sodales dignissim. Sed facilisis nunc eget enim lobortis faucibus. In ac purus sit amet lectus venenatis interdum.'),
(3, '2012-12-14 00:00:00', 2, 8, 'Заголовок новости 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla. Aliquam nisi ipsum, hendrerit a egestas a, tincidunt vulputate justo. Donec a ipsum ac metus accumsan lobortis. Vivamus nec nulla at augue facilisis varius. Morbi a velit eros, non ornare magna. Nam dui erat, suscipit ut vehicula non, interdum vitae eros. Aliquam eu rhoncus libero. Curabitur aliquet ultricies est. Morbi feugiat iaculis posuere. Suspendisse sit amet dui in sapien egestas semper. Nullam nec justo id lacus suscipit tincidunt eu sit amet neque. Vivamus vel leo metus. Proin adipiscing mattis est in gravida. Fusce nec purus nisi, id ullamcorper erat. Donec metus justo, auctor et fermentum ultricies, viverra ac velit. Proin blandit euismod lacinia. Fusce sit amet mollis turpis. Vestibulum sed odio massa. Proin interdum elit nec velit commodo pretium. Curabitur eget justo vitae nisi sodales suscipit. Morbi elit nisi, porta sit amet suscipit at, porttitor ac tellus. Curabitur gravida placerat condimentum. Suspendisse in laoreet diam. Duis iaculis, justo vitae euismod eleifend, neque nisi auctor arcu, sed posuere erat justo a nunc. Ut varius est non quam blandit placerat lobortis arcu pellentesque. Sed consequat dapibus suscipit. Donec odio felis, pharetra in lobortis ac, venenatis in lacus.\r\nVivamus vulputate, sem id pharetra porta, turpis nunc elementum ipsum, quis varius elit felis id nisl. Quisque interdum purus ut eros sodales egestas. Suspendisse suscipit urna rutrum est sagittis quis tempor metus consequat. Donec dapibus, justo eu iaculis gravida, purus neque posuere enim, vel vestibulum ante velit vitae dui. Ut sit amet nibh elit, sed commodo ipsum. Suspendisse eu mi justo, ut hendrerit lectus. Nam ullamcorper, mi vel imperdiet luctus, augue purus mattis eros, nec vulputate nulla dolor et sapien. Nullam placerat molestie consectetur. Nulla pretium lorem in arcu fringilla sed malesuada nisl lacinia. In hac habitasse platea dictumst. Morbi egestas, turpis at tristique consequat, arcu orci faucibus eros, a auctor massa nunc a mauris. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin eget massa ante. Cras volutpat, tortor sed egestas aliquet, est nibh tristique enim, sit amet ornare ante arcu vel leo.\r\nNullam mi lectus, laoreet eget fermentum quis, adipiscing et purus. Suspendisse nec condimentum leo. Ut ultrices malesuada eros, vel imperdiet nunc elementum vel. Donec vitae orci arcu. Etiam at turpis a ipsum pellentesque placerat. Nam malesuada, urna id pharetra malesuada, arcu arcu elementum tortor, sed venenatis felis nunc eu sem. Praesent ullamcorper, turpis vitae feugiat porta, arcu eros porta mi, quis ultrices tellus sapien sed quam. Quisque accumsan malesuada leo, at pellentesque felis bibendum at. Integer commodo sollicitudin felis et mollis. Mauris risus eros, auctor vitae bibendum eget, hendrerit quis turpis.\r\nEtiam adipiscing metus nec diam bibendum elementum. In at est rhoncus nibh laoreet congue id at tellus. Vestibulum et elit ligula, vel commodo nisl. Fusce vitae porta lectus. Vivamus suscipit dictum massa, ac porta sapien consectetur id. In hac habitasse platea dictumst. Aliquam id neque at sem sollicitudin pharetra. Aenean imperdiet tellus id nisl malesuada vitae bibendum odio convallis. Pellentesque dictum porta erat, at pretium augue egestas ut. Nam tempus mauris est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam gravida sodales dignissim. Sed facilisis nunc eget enim lobortis faucibus. In ac purus sit amet lectus venenatis interdum.'),
(4, '2012-12-14 00:00:00', 3, 8, 'Заголовок новости 4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla. Aliquam nisi ipsum, hendrerit a egestas a, tincidunt vulputate justo. Donec a ipsum ac metus accumsan lobortis. Vivamus nec nulla at augue facilisis varius. Morbi a velit eros, non ornare magna. Nam dui erat, suscipit ut vehicula non, interdum vitae eros. Aliquam eu rhoncus libero. Curabitur aliquet ultricies est. Morbi feugiat iaculis posuere. Suspendisse sit amet dui in sapien egestas semper. Nullam nec justo id lacus suscipit tincidunt eu sit amet neque. Vivamus vel leo metus. Proin adipiscing mattis est in gravida. Fusce nec purus nisi, id ullamcorper erat. Donec metus justo, auctor et fermentum ultricies, viverra ac velit. Proin blandit euismod lacinia. Fusce sit amet mollis turpis. Vestibulum sed odio massa. Proin interdum elit nec velit commodo pretium. Curabitur eget justo vitae nisi sodales suscipit. Morbi elit nisi, porta sit amet suscipit at, porttitor ac tellus. Curabitur gravida placerat condimentum. Suspendisse in laoreet diam. Duis iaculis, justo vitae euismod eleifend, neque nisi auctor arcu, sed posuere erat justo a nunc. Ut varius est non quam blandit placerat lobortis arcu pellentesque. Sed consequat dapibus suscipit. Donec odio felis, pharetra in lobortis ac, venenatis in lacus.\r\nVivamus vulputate, sem id pharetra porta, turpis nunc elementum ipsum, quis varius elit felis id nisl. Quisque interdum purus ut eros sodales egestas. Suspendisse suscipit urna rutrum est sagittis quis tempor metus consequat. Donec dapibus, justo eu iaculis gravida, purus neque posuere enim, vel vestibulum ante velit vitae dui. Ut sit amet nibh elit, sed commodo ipsum. Suspendisse eu mi justo, ut hendrerit lectus. Nam ullamcorper, mi vel imperdiet luctus, augue purus mattis eros, nec vulputate nulla dolor et sapien. Nullam placerat molestie consectetur. Nulla pretium lorem in arcu fringilla sed malesuada nisl lacinia. In hac habitasse platea dictumst. Morbi egestas, turpis at tristique consequat, arcu orci faucibus eros, a auctor massa nunc a mauris. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin eget massa ante. Cras volutpat, tortor sed egestas aliquet, est nibh tristique enim, sit amet ornare ante arcu vel leo.\r\nNullam mi lectus, laoreet eget fermentum quis, adipiscing et purus. Suspendisse nec condimentum leo. Ut ultrices malesuada eros, vel imperdiet nunc elementum vel. Donec vitae orci arcu. Etiam at turpis a ipsum pellentesque placerat. Nam malesuada, urna id pharetra malesuada, arcu arcu elementum tortor, sed venenatis felis nunc eu sem. Praesent ullamcorper, turpis vitae feugiat porta, arcu eros porta mi, quis ultrices tellus sapien sed quam. Quisque accumsan malesuada leo, at pellentesque felis bibendum at. Integer commodo sollicitudin felis et mollis. Mauris risus eros, auctor vitae bibendum eget, hendrerit quis turpis.\r\nEtiam adipiscing metus nec diam bibendum elementum. In at est rhoncus nibh laoreet congue id at tellus. Vestibulum et elit ligula, vel commodo nisl. Fusce vitae porta lectus. Vivamus suscipit dictum massa, ac porta sapien consectetur id. In hac habitasse platea dictumst. Aliquam id neque at sem sollicitudin pharetra. Aenean imperdiet tellus id nisl malesuada vitae bibendum odio convallis. Pellentesque dictum porta erat, at pretium augue egestas ut. Nam tempus mauris est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam gravida sodales dignissim. Sed facilisis nunc eget enim lobortis faucibus. In ac purus sit amet lectus venenatis interdum.');

-- --------------------------------------------------------

--
-- Структура таблицы `news_main_category`
--

DROP TABLE IF EXISTS `news_main_category`;
CREATE TABLE IF NOT EXISTS `news_main_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `news_main_category`
--

INSERT INTO `news_main_category` (`id`, `name`) VALUES
(1, 'Новости администрации'),
(2, 'Новости производителей'),
(3, 'Новости специалистов'),
(4, 'Новости учебных заведений');

-- --------------------------------------------------------

--
-- Структура таблицы `sysdev_description`
--

DROP TABLE IF EXISTS `sysdev_description`;
CREATE TABLE IF NOT EXISTS `sysdev_description` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `theme_id` int(11) unsigned NOT NULL,
  `account_id` int(11) unsigned NOT NULL,
  `date` datetime NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  KEY `theme_id` (`theme_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=40 ;

--
-- Дамп данных таблицы `sysdev_description`
--

INSERT INTO `sysdev_description` (`id`, `theme_id`, `account_id`, `date`, `content`) VALUES
(16, 9, 13, '0000-00-00 00:00:00', '<font face="tahoma"><u>Для заказчиков</u></font><br><br><div><font face="tahoma">Для заказчиков проектов Корпоративный портал планирования и реализации инженерных проектов ОАО «Евразклимат» служит высокотехнологичной комфортной рабочей площадкой полного цикла, обладающей максимально широким набором информационных и методологических возможностей для осуществления подготовки, рабочего планирования, исполнения, контроля и сдачи работ проектов.</font></div><br><span style="font-family: tahoma;">Пользователи-заказчики могут осуществлять на Портале первичный анализ своих проектов силами высококлассных специалистов инженерного профиля, также являющихся пользователями Портала; из числа данных специалистов, которые получают на Портале соответствующие статусы - с учетом сертификаций и рейтингов, заказчики могут набирать необходимые им профессиональные исполнительские коллективы.</span><br><br><div><font face="tahoma">Пользуясь мощной, постоянно обновляемой информационной базой Портала, включающей актуальные каталоги инженерного оборудования всех типов - с ценами, условиями поставки, подробными описаниями и складскими справками, заказчики легко могут спланировать бюджет закупок. Также заказчики могут использовать информацию каталогов, касающуюся цены, стоимости и условий оказания инженерных услуг, и выбрать необходимых для проекта поставщиков услуг.</font></div><br><span style="font-family: tahoma;">К услугам заказчиков обширная методологическая и техническая база Портала, включающая все необходимые для реализации инженерных проектов методики, сервисы, шаблоны, алгоритмы, формы документов, средства расчетов, финансового планирования и контроля.</span><br><br><div><font face="tahoma">Вся деятельность заказчиков на Портале осуществляется в максимально комфортных условиях, создаваемых как оптимальной эргономикой навигации и каждого из разделов Портала, так и большим набором сервисов отдыха, в том числе сервисов телевидения, игр, музыки и др.</font></div><div><br></div>'),
(17, 8, 13, '0000-00-00 00:00:00', '<u><font face="tahoma">Для пользователей</font></u><br><br><font face="tahoma">Портал разработан в интересах пользователей-участников выбора, планирования и исполнения любых инженерных проектов, и представляет собой комфортную высокотехнологичную рабочую площадку полного цикла.&nbsp;</font><br><br><font face="tahoma">Каждая операция проекта, независимо от его объема и сложности, может быть успешно реализована пользователями Портала при использовании актуальной постоянно обновляемой информационной базы, технологий, инструментов, шаблонов, алгоритмов, рейтинговых и статистических данных и других возможностей Портала. Каждый пользователь, благодаря оперативной навигации, имеет возможность оснастить свой Личный кабинет на Портале любым набором информационных и других виджетов, переключить Кабинет в режим различных &nbsp;иностранных языков, проводить обсуждения и голосования по вопросам проектов, и в целом осуществлять проекты «полного цикла».&nbsp;</font><br><br><font face="tahoma">Комфортная рабочая среда является одним из важных факторов, способствующих успешному выполнению проектов пользователями, которые в полной мере могут использовать имеющиеся на Портале сервисы отдыха, включая сервисы телевещания, игр, музыки и др.</font>'),
(21, 3, 13, '0000-00-00 00:00:00', '<font face="tahoma" style="color: rgb(0, 0, 0); font-family: tahoma, arial, verdana, sans-serif; font-size: 12px;"><u>Принципы работы</u></font><br><br><font face="Tahoma, sans-serif" size="2">Создавая Корпоративный портал планирования и реализации инженерных проектов, компания «Евразклимат» исходила из задачи предоставить любым участникам инженерных проектов комфортную высокотехнологичную рабочую площадку полного цикла. В соответствии с этим при создании Портала компания исходила из следующих принципов:</font><br><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">1. Многофункциональность</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">Вся структура Портала, его навигация, методология, технологические решения призваны обеспечить исполнение всех функций планирования и исполнения в рамках инженерных проектов любого масштаба и сложности.</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">2. Информативность</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">Благодаря мощной непрерывно обновляемой информационной базе Портала, заказчики, руководители и исполнители проектов имеют возможность получить актуальные сведения обо всех присутствующих на рынке производителях товаров и услуг, в том числе об их условиях поставки, ценах и складских остатках, а также об используемых на рынке проектных методологий.</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">3. Обеспечения полного цикла</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">Для инженерных проектов любой сложности на Портале обеспечиваются все возможности их исполнения «от нуля – под ключ».</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">4. Оптимальность и экономичность</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">Технические, информационные и методологические возможности Портала позволяют заказчикам объективно оценивать и планировать свои проекты, подбирать нужных им специалистов на основе объективных критериев и рейтингов, формировать оптимальные исполнительские группы, выбирать оборудование, материалы, инструменты с учетом всех требований.</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">5. Аналитичность</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">Портал предусматривает возможность для лиц, принимающих решения в рамках проектов, организацию обсуждения сложных задач проектов среди специалистов-пользователей Портала – для выбора проектных групп и принятия обоснованных технических и управленческих решений.</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">6. Комфортность</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">При работе над проектами на Портале, пользователь, пользуясь возможностями высокой оптимизации поиска, выбора и принятия решения по технической части проекта, работает при этом в максимально комфортной среде, благодаря как эргономичности представления на Портале информации, так и наличию большого количества сервисов отдыха, включая телевещание, игры, музыку и др.</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">7. Обеспечение личного пространства</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">Каждому пользователю на Портале предоставляется Личный кабинет, обладающий всей необходимой навигацией для формирования и обновления данным пользователем оптимального для него набора информационных и методических виджетов, с возможностью быстрого выбора и переформатирования информации из базы данных Портала, а также необходимыми коммуникационными возможностями для формирования исполнительских групп, проведения согласований, заключения договоров, осуществления платежей и др.</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">8. Межрегиональность</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">Независимо от региона, в котором находится пользователь, Портал предоставляет ему все необходимые допуски и технические возможности для доступа и работы в его личном кабинете, и в целом, для реализации его задач в рамках проектов. &nbsp;</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">9. Мультиязычность</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><font face="Tahoma, sans-serif" size="2"><br></font><div style="text-indent: 0px;"><font face="Tahoma, sans-serif" size="2">Каждый пользователь имеет возможность из своего кабинета включить различный языковый режим для своей работы на Портале, в результате чего все страницы Портала будут автоматически представляться ему на выбранном им языке. &nbsp;&nbsp;&nbsp;</font></div><p style="color: rgb(0, 0, 0); font-family: tahoma, arial, verdana, sans-serif; font-size: 12px;"></p><p style="color: rgb(0, 0, 0); font-family: tahoma, arial, verdana, sans-serif; font-size: 12px;"></p>'),
(22, 10, 13, '0000-00-00 00:00:00', '<u>Для производителей</u><br><br><div>Непременным условием эффективной работы Портала является укрепление партнерских отношений с производителями современного инженерного оборудования, выстраивание системы работы на Портале, исходя из их интересов.&nbsp;</div><div>Вся размещаемая на Портале информация об оборудовании обновляется только на основе актуальных сведений, поступающих от соответствующих производителей или их официальных представителей. Наделенные необходимыми полномочиями сотрудники производителей контролируют правильность информации об оборудовании их компаний, размещенной в каталогах Портала, и имеют право изменять и дополнять данные сведения.</div><br>На Портале исключена реализация контрафактного или вышедшего из строя инженерного оборудования. Наличие необходимых сертификатов оборудования является непременным условием реализации проектов на Портале.<br><div>По запросу пользователей Портала консультации по работе с оборудованием производят имеющие соответствующие сертификаты специалисты, также являющиеся пользователями Портала, или уполномоченные сотрудники производителей.</div><br><div>Каждому представителю производителя обеспечиваются максимально комфортные условия для работы на Портале - им предоставляются эргономичные Личные кабинеты, функционал которых организован оптимально, в соответствии с задачами конкретного сотрудника. Личные кабинеты представителей производителей обладают всеми возможностями для оперативной навигации по Порталу, выбора и правок нужной информации в каталогах, использования имеющихся на Портале разнообразных методик, шаблонов и алгоритмов. Кабинеты обладают необходимыми коммуникативными возможностями для проведения согласований или консультаций.</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</div><div>Также комфортность работы на Портале представителей производителя обеспечивается большим набором сервисов отдыха, в том числе телевещания, игр, музыки и др.</div><div><br></div>'),
(23, 11, 13, '0000-00-00 00:00:00', '<u><font face="tahoma">Для специалистов</font></u><br><br><div><font face="tahoma">Самые широкие возможности открывает Портал для специалистов, заинтересованных участвовать в профильных им инженерных проектах. На Портале реализуются самые разнообразные проекты, в которых используется современное инженерное оборудования и широкий набор услуг.</font></div><br><span style="font-family: tahoma;">Любой сертифицированный специалист, благодаря коммуникационным возможностям Личного кабинета, предоставленного ему на Портале, получает доступ к информации обо всех размещенных на Портале новых проектах. Выбрав один или несколько проектов, специалист может инициировать свое участие в них, и после проведения заказчиками конкурсных процедур, он может стать членом соответствующих исполнительских коллективов.</span><br><span style="font-family: tahoma;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><br><div><font face="tahoma">Кроме того, в целях повышения возможности быть включенным в новый проект в качестве профильного исполнителя, специалист может собрать вокруг себя на Портале Рабочую группу из различных специалистов, предназначенную для комплексного выполнения проектов. Также специалист может войти в состав уже существующих Рабочих групп, если в данных группах есть соответствующие вакансии.</font></div><br><span style="font-family: tahoma;">Значительная часть исполнительской работы специалиста на Портале, связанная с согласованиями между членами рабочих групп, с подбором информации об оборудовании, с созданием проектной документации, договоров, актов и других документов, с проведением платежей, осуществляется специалистом через Личный кабинет, при использовании баз данных, навигации, коммуникативных возможностей Портала, а также его методической и технической базы.</span><br><br><div><font face="tahoma">Специалисты, успешно выполняющие свои функции в рамках проектов, а также эффективно работающие Рабочие группы, получают соответствующие рейтинги в размещенных на Портале справочниках пользователей-специалистов и имеют приоритет при подборе заказчиками исполнительских коллективов.</font></div><br><span style="font-family: tahoma;">Кроме широких функциональных возможностей Портала, которые используют специалисты в своей работе, Портал предоставляет им также большой набор сервисов отдыха, в том числе телевещания, игр, музыки, благодаря чему работа пользователей-специалистов осуществляется в максимально комфортных условиях.&nbsp;</span><br><div><br></div>'),
(24, 12, 13, '0000-00-00 00:00:00', '<u><font face="tahoma">Для партнеров</font></u><br><br><div><font face="tahoma">Корпоративный портал планирования и реализации инженерных проектов ОАО «Евразклимат», обладающий мощной, постоянно обновляемой информационной базой, прекрасно выстроенной проектной системой и оперативной навигацией, позволяет значительно оптимизировать и интенсифицировать рабочие взаимоотношения компании ОАО «Евразклимат» и ее партнеров.</font></div><br><span style="font-family: tahoma;">Вся цепочка «единого цикла» планирования и исполнения проектов реализуется на Портале из Личного кабинета представителя партнера. Среди этих задач: оперативное получение точной информации о размещенных на Портале заказчиками проектах, в которых могли бы принять участие партнеры, а также исполнительские задачи в рамках данных проектов.</span><br><span style="font-family: tahoma;">&nbsp;</span><br><div><font face="tahoma">Благодаря оптимальной коммуникативной системе Портала, представители партнеров могут также оперативно &nbsp;проводить любые согласования в рамках проектов, в том числе по вопросам цен, системы логистики, по условиям оказания проектных услуг. Также на Портале представители партнеров могут получать квалифицированные консультации от других пользователей портала – специалистов различного инженерного профиля.</font></div><br><span style="font-family: tahoma;">Для эффективной организации работ на Портале для партнеров собраны многочисленные современные методики планирования и расчетов, шаблоны всех видов проектных документов, алгоритмы осуществления действий и операций в рамках инженерных проектов.</span><br><br><div><font face="tahoma">Вся информация, касающаяся взаимоотношений партнеров с пользователями Портала и с компанией ОАО «Евразклимат», по желанию партнеров может быть закрыта от постороннего доступа как частично, так и полностью.</font></div><br><span style="font-family: tahoma;">Кроме прекрасно организованной производственной и информационной среды, на Портале созданы условия для по-настоящему комфортной работы представителей партнеров, которым, кроме эргономичных адаптированных в соответствии с их пожеланиями кабинетов, предлагается также большой набор сервисов отдыха, в том числе телевещания, игр, музыки и др. &nbsp; &nbsp;&nbsp;</span><br><div><br></div>'),
(25, 13, 13, '0000-00-00 00:00:00', '<u>Для филиалов</u><br><br><div>Благодаря Корпоративному порталу планирования и реализации инженерных проектов значительно облегчается взаимодействие компании ОАО «Евразклимат» с ее филиалами, как в плане оперативного привлечения филиалов к проектам компании, так и в вопросах непосредственного выполнения их сотрудниками работ проектов.</div><br>Организованные на Портале Личные кабинеты представителей филиалов, имеющие полный доступ к торговой площадке и ко всем другим разделам Портала, а также к его обширной информационной базе, позволяют филиалам оперативно инициировать участие в инженерных проектах, размещенных заказчиками на Портале, а затем планировать и исполнять работы проектов, независимо от их уровня сложности.<br><br><div>Согласования с заказчиками, с членами исполнительских групп и другими специалистами, являющимися пользователями Портала, филиалы могут проводить с высокой степенью оперативности, благодаря прекрасной системе коммуникации Портала, а также благодаря его гибкой системе навигации. Кроме того, представителям филиала обеспечивается выборочное направление прямо в кабинет любого пакета новой информации, появляющейся на Портале.</div><br>Все каталоги оборудования Портала заполняются и контролируются уполномоченными представителями производителей – актуальность и постоянное обновление данных каталогов гарантируют филиалам только самую достоверную и полную информацию для использования в инженерных проектах.<br><br>К услугам филиалов также собранные на Портале многочисленные современные методики планирования и расчетов, шаблоны всех видов проектных документов, алгоритмы осуществления действий и операций в рамках проектов.<br><br>На Портале созданы максимально комфортные условия для деятельности пользователей. Кроме прекрасной эргономики каждого из разделов Портала, пользователям предоставляется большой набор сервисов отдыха, в том числе телевещания, игр, музыки и др. &nbsp;&nbsp;<br><div><br></div>'),
(27, 5, 13, '0000-00-00 00:00:00', '<font face="tahoma" size="2"><span style="line-height: 18px;"><u>Терминология</u></span></font><br><br><div><font face="tahoma" size="2"><u>Сайт (веб-сайт)</u> - совокупность HTML страниц и иных электронных документов, объединенных в рамках единого доменного имени (IP-адреса).</font></div><br><div><font face="tahoma" size="2"><u>Портал (Корпоративный портал планирования и реализации инженерных проектов ОАО «Евразклимат»)</u> - сайт в сети Интернет, автоматизированная информационная система с внедренной системой управления и открытым доступом для пользователей, предоставляющая различные интерактивные сервисы с целью планирования и реализации инженерных проектов.</font></div><br><div><font face="tahoma" size="2"><u>Интерфейс</u> – совокупность средств и методов, с помощью которых пользователь взаимодействует с продуктом/системой, в том числе устройства ввода (клавиатура, мышь и т.д.), а также видимые экранные объекты (окна, кнопки, ссылки и т.д.)</font></div><br><div><font face="tahoma" size="2"><u>Система навигации</u> - статические и динамические элементов интерфейса Портала, позволяющие пользователю работать с Главной страницей, разделами, подразделами и виджетами Портала.</font></div><br><div><font face="tahoma" size="2"><u>Пользователь</u> – зарегистрировавшийся или не зарегистрировавшийся на Портале участник работы со структурными составляющими и элементами навигации Портала.</font></div><br><div><font face="tahoma" size="2"><u>Авторизованный пользователь</u> &nbsp;- пользователь, прошедший процедуру регистрации и получивший для работы с Порталом ряд дополнительных полномочий.</font></div><br><div><font face="tahoma" size="2"><u>Авторизация</u> - процесс проверки текущих прав доступа пользователя при попытке выполнения каких-либо действий.</font></div><br><div><font face="tahoma" size="2"><u>Главная страница</u> – основная структурная составляющая Портала, представляющая пользователю совокупность разделов Портала.</font></div><br><span style="font-family: tahoma; font-size: small;"><u>Раздел</u> - структурная составляющая Портала, представляющая пользователю совокупность логически единых подразделов Портала.</span><br><br><div><font face="tahoma" size="2"><u>Подраздел</u> - структурная составляющая Портала, представляющая пользователю совокупность логически единых системных сервисов Портала.</font></div><br><div><font face="tahoma" size="2"><u>Рабочая область</u> – часть структурной составляющей Портала, в рамках которой пользователь может размещать индивидуальную информацию и виджеты, а также осуществлять проектные действия с использованием методик и шаблонов, имеющихся на Портале.</font></div><br><div><font face="tahoma" size="2"><u>Личный кабинет</u> – личный раздел зарегистрированного на Портале пользователя, созданный им на базе раздела, копирующего Главную страницу Портала; личный кабинет имеет полный доступ ко всем разделам и методикам Портала, личную навигацию по Порталу, систему быстрого выбора на Портале и размещения избранной информации, систему оперативных коммуникаций со всеми участниками проектов.</font></div><div><font face="tahoma" size="2">&nbsp;</font></div><div><font face="tahoma" size="2"><u>Аккаунт </u>– учетная запись пользователя, при помощи которой он работает на Портале.</font></div><br><span style="font-family: tahoma; font-size: small;"><u>Системные сервисы</u> – набор программ, позволяющих пользователю планировать и реализовывать свои задачи на Портале, в том числе проекты в рамках любого инженерного сегмента рынка.</span><br><br><div><font face="tahoma" size="2"><u>Виджет</u> - структурная единица Портала, предназначенная для размещения одного системного сервиса.</font></div><div><font face="tahoma" size="2">&nbsp;&nbsp;</font></div><div><font face="tahoma" size="2"><u>Статичное меню</u> – меню первого уровня, элемент навигации пользователя по структурным единицам Портала, не изменяющийся в рамках различных составляющих определенной структурной единицы Портала.</font></div><div><font face="tahoma" size="2">&nbsp; &nbsp;&nbsp;</font></div><div><font face="tahoma" size="2"><u>Динамичное меню</u> – меню второго уровня, элемент навигации пользователя по структурным единицам Портала, не изменяющийся в рамках различных составляющих определенной структурной единицы Портала.</font></div><div><font face="tahoma" size="2">&nbsp;&nbsp;</font></div><div><font face="tahoma" size="2"><u>Функционал</u> – возможности исполнения пользователем задач в рамках определенной структурной составляющей Портала. &nbsp;</font></div><div><br></div>');
INSERT INTO `sysdev_description` (`id`, `theme_id`, `account_id`, `date`, `content`) VALUES
(32, 2, 13, '0000-00-00 00:00:00', '<font face="tahoma" size="2"><u>Общее описание</u></font><br><br><div><font face="tahoma" size="2">Корпоративный портал планирования и реализации инженерных проектов ОАО «Евразклимат» (далее – Портал) предназначен для оптимизации управления проектами и бизнес-процессами в рамках &nbsp;аудитории ООО «Евразклимат».&nbsp;</font></div><br><span style="font-family: tahoma; font-size: small;">Портал создан в интересах клиентов и сотрудников компании.&nbsp;</span><span style="font-family: tahoma; font-size: small;">В рамках указанной общей цели, Портал предназначен для решения следующих задач:</span><br><br><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Предоставление участникам проектов ООО «Евразклимат» площадки для информационного обмена, в &nbsp;том числе касающегося:</font></div><div style="text-align: left;"><font face="tahoma" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>- необходимой общей информации об исполняемых и выполненных в рамках системы проектах (по типам, <span class="Apple-tab-span" style="white-space:pre">	</span>уровню сложности, объемам, регионам, срокам и др.);</font></div><div><font face="tahoma" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>- необходимой рабочей информации о конкретных проектах (их инициаторы, цели, структура, исполнители, сроки исполнения и др.)</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Помощь компании в поиске новых специализированных проектов</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Предоставление площадки для проведения конкурсов и аукционов для выбора компанией партнеров</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Интеграция современных технических разработок и методик с целью эффективной проектной работы компании&nbsp;</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Предоставление участникам проектов ООО «Евразклимат» полного пакета методик для эффективной реализации проектов, в том числе:</font></div><div><font face="tahoma" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>- проектных алгоритмов, инструкций, методов определения проблемных мест и способов их избегания;</font></div><div><font face="tahoma" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>- документационных форм, шаблонов и правил составления документов;&nbsp;</font></div><div><font face="tahoma" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>- оптимальных методик финансового планирования и контроля в рамках проектов &nbsp;(расчета, проведения платежей, аккумулирования средств, отчетов, взаиморасчетов и др.) &nbsp;&nbsp;</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Организация взаимодействия различных типов специалистов для реализации совместных проектов</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Осуществление помощи в аттестации и подборе квалифицированных кадров в рамках задач ОАО «Евразклимат», а также в организации обучения данных кадров</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Предоставление пользователям статистической информации, необходимой для выбора, планирования и реализации проектов компании</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Предоставление пользователям рейтинговой информации, необходимой для выбора, планирования и реализации проектов компании, в том числе:</font></div><div><font face="tahoma" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>- рейтингов проектов в зависимости от их типа, сложности, объема, требований к группам исполнителей;</font></div><div><font face="tahoma" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>- рейтингов производителей, и поставщиков, в том числе по критериям качества, цены продукции и условий ее поставки;</font></div><div><font face="tahoma" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>- рейтингов сотрудников и партнеров, по различным критериям, в том числе: как исполнителей проектов, как инициаторов организации проектных групп, как инициаторов размещения новой информации на Портале, как инициаторов совершенствования Портала</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Поиск и представление участникам проектов специализированных новостей</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Осуществление каталогизации высококачественных товаров и услуг в сфере строительства внутренних и внешних инженерных систем, сетей и технологий</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Системная координация работы с филиалов ОАО «Евразклимат»</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Осуществление культурно-развлекательной функции для участников проектов – партнеров и сотрудников компании ОАО «Евразклимат»</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Осуществление маркетинговых функций в интересах компании</font></div><div><font face="tahoma" size="2"><br></font></div><div><font face="tahoma" size="2">Для обеспечения взаимодействия в рамках проектов ОАО «Евразклимат» сотрудников филиалов из других регионах страны, а также с заграничными партнерами, Портал обеспечивает участникам проектов мультиязычную поддержку – по желанию любого пользователя, вся присутствующая на Портале информация может быть в рамках Личного кабинета данного пользователя на Портале переведена на различные языки.</font></div><br><span style="font-family: tahoma; font-size: small;">Структура Портала определяется его основными функциями как инструмента системы управления проектами. В силу этого, основными его разделами являются:</span><br><br><div><font face="tahoma" size="2">Раздел «<b>ГЛАВНАЯ СТРАНИЦА</b>»: предоставляет пользователям информацию обо всех технических и информационных возможностях Портала, в том числе дает описание каждой из проектных функций Портала, &nbsp;их назначение, порядок их использования и существующие ограничения.</font></div><div><font face="tahoma" size="2">&nbsp;</font></div><div><font face="tahoma" size="2">Раздел «<b>КАТАЛОГИ</b>»: содержит подробную постоянно обновляемую информацию о существующих на рынке товарах и услугах различных производителей, включая цены, условия поставки, наличие на складе; содержит экспертную и рейтинговую информацию о данных товарах и услугах.</font></div><br><div><font face="tahoma" size="2">РАЗДЕЛ «<b>СПЕЦИАЛИСТЫ</b>»: содержит полную информацию обо всех специалистах, отобранных компанией для участия в своих инженерных проектах - на основании опыта и профессиональных качеств; также раздел предназначен для формирования, на основе согласования между специалистами проектных групп (временных или постоянных), предназначенных для комплексного исполнения всех работ проектов.</font></div><br><div><font face="tahoma" size="2">Раздел «<b>CRM</b>»: окно системы управления проектами является главным окном кабинета зарегистрированного пользователя Портала; оно предназначено для планирования и исполнения проектов, том числе для выбора проектной группы, поиска и подбора оптимального набора оборудования, услуг, материалов, инструментов, подготовки документов проекта, организации рабочих согласований и другого информационного обмена в рамках проектов, а также для организации и контроля рабочего исполнения и сдачи-приемки работ.</font></div><br><span style="font-family: tahoma; font-size: small;">РАЗДЕЛ «<b>ПОЧТА</b>»: содержит полный функционал по работе в рамках проектов с почтовыми сообщениями в рамках почтовых доменов ООО «Евразклимат».&nbsp;</span><br><br><div><font face="tahoma" size="2">РАЗДЕЛ «<b>ЗОНА ОТДЫХА</b>»: предоставляет пользователям Портала возможности для отдыха и развлечения - с использованием находящихся на Портале различных игровых и развлекательно-познавательных сервисов.</font></div><br><span style="font-family: tahoma; font-size: small;">Кроме того, на Портале предусмотрена возможность для постоянного его совершенствования – повышения его технологических и методических возможностей. Для этого Портал содержит систему стимулов для пользователей, желающих принять участие в такой работе, а также полный набор возможностей для такой работы, в том числе для:</span><br><span style="font-family: tahoma; font-size: small;">&nbsp;</span><br><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>размещения пользователями на Портале своих предложений о дополнении его новыми разделами и методиками – с автоматическим выносом данных предложений на голосование всех пользователей системы;</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>участия в обсуждениях и голосованиях по вносимым другими пользователями предложениям о совершенствовании системы; &nbsp;</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>в случае принятия решения (в рамках проведенного на Портале голосования) о создании для системы новых разделов или методик, пользователь-инициатор предложения через Портал может заключить договор с администрацией Портала о разработке данным пользователем соответствующих разделов или методик; данные договора предусматривают единовременное вознаграждение или за возможность в дальнейшем получать дивиденды от использования другими пользователями системы данных новых разделов или методик.</font></div><div><br></div>'),
(39, 1, 13, '0000-00-00 00:00:00', '<h1><font face="tahoma" size="2"><u>О системе</u></font></h1><font size="2"><font face="tahoma"><u>Общее описание</u></font><br style="font-family: tahoma, arial, verdana, sans-serif;"><br style="font-family: tahoma, arial, verdana, sans-serif;"></font><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">Корпоративный портал планирования и реализации инженерных проектов ОАО «Евразклимат» (далее – Портал) предназначен для оптимизации управления проектами и бизнес-процессами в рамках &nbsp;аудитории ООО «Евразклимат».&nbsp;</font></div><font size="2"><br style="font-family: tahoma, arial, verdana, sans-serif;"><span style="font-family: tahoma;">Портал создан в интересах клиентов и сотрудников компании.&nbsp;</span><span style="font-family: tahoma;">В рамках указанной общей цели, Портал предназначен для решения следующих задач:</span><br style="font-family: tahoma, arial, verdana, sans-serif;"><br style="font-family: tahoma, arial, verdana, sans-serif;"></font><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>Предоставление участникам проектов ООО «Евразклимат» площадки для информационного обмена, в &nbsp;том числе касающегося:</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2"><span class="Apple-tab-span" style="white-space: pre;">	</span>- необходимой общей информации об исполняемых и выполненных в рамках системы проектах (по типам,<span class="Apple-tab-span" style="white-space: pre;">	</span>уровню сложности, объемам, регионам, срокам и др.);</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2"><span class="Apple-tab-span" style="white-space: pre;">	</span>- необходимой рабочей информации о конкретных проектах (их инициаторы, цели, структура, исполнители, сроки исполнения и др.)</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>Помощь компании в поиске новых специализированных проектов</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>Предоставление площадки для проведения конкурсов и аукционов для выбора компанией партнеров</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>Интеграция современных технических разработок и методик с целью эффективной проектной работы компании&nbsp;</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>Предоставление участникам проектов ООО «Евразклимат» полного пакета методик для эффективной реализации проектов, в том числе:</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2"><span class="Apple-tab-span" style="white-space: pre;">	</span>- проектных алгоритмов, инструкций, методов определения проблемных мест и способов их избегания;</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2"><span class="Apple-tab-span" style="white-space: pre;">	</span>- документационных форм, шаблонов и правил составления документов;&nbsp;</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2"><span class="Apple-tab-span" style="white-space: pre;">	</span>- оптимальных методик финансового планирования и контроля в рамках проектов &nbsp;(расчета, проведения платежей, аккумулирования средств, отчетов, взаиморасчетов и др.) &nbsp;&nbsp;</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>Организация взаимодействия различных типов специалистов для реализации совместных проектов</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>Осуществление помощи в аттестации и подборе квалифицированных кадров в рамках задач ОАО «Евразклимат», а также в организации обучения данных кадров</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>Предоставление пользователям статистической информации, необходимой для выбора, планирования и реализации проектов компании</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>Предоставление пользователям рейтинговой информации, необходимой для выбора, планирования и реализации проектов компании, в том числе:</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2"><span class="Apple-tab-span" style="white-space: pre;">	</span>- рейтингов проектов в зависимости от их типа, сложности, объема, требований к группам исполнителей;</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2"><span class="Apple-tab-span" style="white-space: pre;">	</span>- рейтингов производителей, и поставщиков, в том числе по критериям качества, цены продукции и условий ее поставки;</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2"><span class="Apple-tab-span" style="white-space: pre;">	</span>- рейтингов сотрудников и партнеров, по различным критериям, в том числе: как исполнителей проектов, как инициаторов организации проектных групп, как инициаторов размещения новой информации на Портале, как инициаторов совершенствования Портала</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>Поиск и представление участникам проектов специализированных новостей</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>Осуществление каталогизации высококачественных товаров и услуг в сфере строительства внутренних и внешних инженерных систем, сетей и технологий</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>Системная координация работы с филиалов ОАО «Евразклимат»</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>Осуществление культурно-развлекательной функции для участников проектов – партнеров и сотрудников компании ОАО «Евразклимат»</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>Осуществление маркетинговых функций в интересах компании</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2"><br></font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">Для обеспечения взаимодействия в рамках проектов ОАО «Евразклимат» сотрудников филиалов из других регионах страны, а также с заграничными партнерами, Портал обеспечивает участникам проектов мультиязычную поддержку – по желанию любого пользователя, вся присутствующая на Портале информация может быть в рамках Личного кабинета данного пользователя на Портале переведена на различные языки.</font></div><font size="2"><br style="font-family: tahoma, arial, verdana, sans-serif;"><span style="font-family: tahoma;">Структура Портала определяется его основными функциями как инструмента системы управления проектами. В силу этого, основными его разделами являются:</span><br style="font-family: tahoma, arial, verdana, sans-serif;"><br style="font-family: tahoma, arial, verdana, sans-serif;"></font><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">Раздел «<b>ГЛАВНАЯ СТРАНИЦА</b>»: предоставляет пользователям информацию обо всех технических и информационных возможностях Портала, в том числе дает описание каждой из проектных функций Портала, &nbsp;их назначение, порядок их использования и существующие ограничения.</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">&nbsp;</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">Раздел «<b>КАТАЛОГИ</b>»: содержит подробную постоянно обновляемую информацию о существующих на рынке товарах и услугах различных производителей, включая цены, условия поставки, наличие на складе; содержит экспертную и рейтинговую информацию о данных товарах и услугах.</font></div><font size="2"><br style="font-family: tahoma, arial, verdana, sans-serif;"></font><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">РАЗДЕЛ «<b>СПЕЦИАЛИСТЫ</b>»: содержит полную информацию обо всех специалистах, отобранных компанией для участия в своих инженерных проектах - на основании опыта и профессиональных качеств; также раздел предназначен для формирования, на основе согласования между специалистами проектных групп (временных или постоянных), предназначенных для комплексного исполнения всех работ проектов.</font></div><font size="2"><br style="font-family: tahoma, arial, verdana, sans-serif;"></font><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">Раздел «<b>CRM</b>»: окно системы управления проектами является главным окном кабинета зарегистрированного пользователя Портала; оно предназначено для планирования и исполнения проектов, том числе для выбора проектной группы, поиска и подбора оптимального набора оборудования, услуг, материалов, инструментов, подготовки документов проекта, организации рабочих согласований и другого информационного обмена в рамках проектов, а также для организации и контроля рабочего исполнения и сдачи-приемки работ.</font></div><font size="2"><br style="font-family: tahoma, arial, verdana, sans-serif;"><span style="font-family: tahoma;">РАЗДЕЛ «<b>ПОЧТА</b>»: содержит полный функционал по работе в рамках проектов с почтовыми сообщениями в рамках почтовых доменов ООО «Евразклимат».&nbsp;</span><br style="font-family: tahoma, arial, verdana, sans-serif;"><br style="font-family: tahoma, arial, verdana, sans-serif;"></font><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">РАЗДЕЛ «<b>ЗОНА ОТДЫХА</b>»: предоставляет пользователям Портала возможности для отдыха и развлечения - с использованием находящихся на Портале различных игровых и развлекательно-познавательных сервисов.</font></div><font size="2"><br style="font-family: tahoma, arial, verdana, sans-serif;"><span style="font-family: tahoma;">Кроме того, на Портале предусмотрена возможность для постоянного его совершенствования – повышения его технологических и методических возможностей. Для этого Портал содержит систему стимулов для пользователей, желающих принять участие в такой работе, а также полный набор возможностей для такой работы, в том числе для:</span><br style="font-family: tahoma, arial, verdana, sans-serif;"><span style="font-family: tahoma;">&nbsp;</span><br style="font-family: tahoma, arial, verdana, sans-serif;"></font><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>размещения пользователями на Портале своих предложений о дополнении его новыми разделами и методиками – с автоматическим выносом данных предложений на голосование всех пользователей системы;</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>участия в обсуждениях и голосованиях по вносимым другими пользователями предложениям о совершенствовании системы; &nbsp;</font></div><div style="font-family: tahoma, arial, verdana, sans-serif;"><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space: pre;">	</span>в случае принятия решения (в рамках проведенного на Портале голосования) о создании для системы новых разделов или методик, пользователь-инициатор предложения через Портал может заключить договор с администрацией Портала о разработке данным пользователем соответствующих разделов или методик; данные договора предусматривают единовременное вознаграждение или за возможность в дальнейшем получать дивиденды от использования другими пользователями системы данных новых разделов или методик.</font></div><div><br><font face="tahoma"><u>Принципы работы</u></font><br><br><font face="Tahoma, sans-serif" size="2">Создавая Корпоративный портал планирования и реализации инженерных проектов, компания «Евразклимат» исходила из задачи предоставить любым участникам инженерных проектов комфортную высокотехнологичную рабочую площадку полного цикла. В соответствии с этим при создании Портала компания исходила из следующих принципов:</font><br><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">1. Многофункциональность</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">Вся структура Портала, его навигация, методология, технологические решения призваны обеспечить исполнение всех функций планирования и исполнения в рамках инженерных проектов любого масштаба и сложности.</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">2. Информативность</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">Благодаря мощной непрерывно обновляемой информационной базе Портала, заказчики, руководители и исполнители проектов имеют возможность получить актуальные сведения обо всех присутствующих на рынке производителях товаров и услуг, в том числе об их условиях поставки, ценах и складских остатках, а также об используемых на рынке проектных методологий.</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">3. Обеспечения полного цикла</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">Для инженерных проектов любой сложности на Портале обеспечиваются все возможности их исполнения «от нуля – под ключ».</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">4. Оптимальность и экономичность</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">Технические, информационные и методологические возможности Портала позволяют заказчикам объективно оценивать и планировать свои проекты, подбирать нужных им специалистов на основе объективных критериев и рейтингов, формировать оптимальные исполнительские группы, выбирать оборудование, материалы, инструменты с учетом всех требований.</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">5. Аналитичность</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">Портал предусматривает возможность для лиц, принимающих решения в рамках проектов, организацию обсуждения сложных задач проектов среди специалистов-пользователей Портала – для выбора проектных групп и принятия обоснованных технических и управленческих решений.</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">6. Комфортность</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">При работе над проектами на Портале, пользователь, пользуясь возможностями высокой оптимизации поиска, выбора и принятия решения по технической части проекта, работает при этом в максимально комфортной среде, благодаря как эргономичности представления на Портале информации, так и наличию большого количества сервисов отдыха, включая телевещание, игры, музыку и др.</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">7. Обеспечение личного пространства</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">Каждому пользователю на Портале предоставляется Личный кабинет, обладающий всей необходимой навигацией для формирования и обновления данным пользователем оптимального для него набора информационных и методических виджетов, с возможностью быстрого выбора и переформатирования информации из базы данных Портала, а также необходимыми коммуникационными возможностями для формирования исполнительских групп, проведения согласований, заключения договоров, осуществления платежей и др.</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">8. Межрегиональность</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">Независимо от региона, в котором находится пользователь, Портал предоставляет ему все необходимые допуски и технические возможности для доступа и работы в его личном кабинете, и в целом, для реализации его задач в рамках проектов. &nbsp;</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">9. Мультиязычность</font></div><div><font face="Tahoma, sans-serif" size="2"><br></font></div><div><font face="Tahoma, sans-serif" size="2">Каждый пользователь имеет возможность из своего кабинета включить различный языковый режим для своей работы на Портале, в результате чего все страницы Портала будут автоматически представляться ему на выбранном им языке.</font></div><br><font face="tahoma" size="2"><span style="line-height: 18px;"><u>Терминология</u></span></font><br><br><div><font face="tahoma" size="2"><u>Сайт (веб-сайт)</u>&nbsp;- совокупность HTML страниц и иных электронных документов, объединенных в рамках единого доменного имени (IP-адреса).</font></div><br><div><font face="tahoma" size="2"><u>Портал (Корпоративный портал планирования и реализации инженерных проектов ОАО «Евразклимат»)</u>&nbsp;- сайт в сети Интернет, автоматизированная информационная система с внедренной системой управления и открытым доступом для пользователей, предоставляющая различные интерактивные сервисы с целью планирования и реализации инженерных проектов.</font></div><br><div><font face="tahoma" size="2"><u>Интерфейс</u>&nbsp;– совокупность средств и методов, с помощью которых пользователь взаимодействует с продуктом/системой, в том числе устройства ввода (клавиатура, мышь и т.д.), а также видимые экранные объекты (окна, кнопки, ссылки и т.д.)</font></div><br><div><font face="tahoma" size="2"><u>Система навигации</u>&nbsp;- статические и динамические элементов интерфейса Портала, позволяющие пользователю работать с Главной страницей, разделами, подразделами и виджетами Портала.</font></div><br><div><font face="tahoma" size="2"><u>Пользователь</u>&nbsp;– зарегистрировавшийся или не зарегистрировавшийся на Портале участник работы со структурными составляющими и элементами навигации Портала.</font></div><br><div><font face="tahoma" size="2"><u>Авторизованный пользователь</u>&nbsp;&nbsp;- пользователь, прошедший процедуру регистрации и получивший для работы с Порталом ряд дополнительных полномочий.</font></div><br><div><font face="tahoma" size="2"><u>Авторизация</u>&nbsp;- процесс проверки текущих прав доступа пользователя при попытке выполнения каких-либо действий.</font></div><br><div><font face="tahoma" size="2"><u>Главная страница</u>&nbsp;– основная структурная составляющая Портала, представляющая пользователю совокупность разделов Портала.</font></div><br><span style="font-family: tahoma; font-size: small;"><u>Раздел</u>&nbsp;- структурная составляющая Портала, представляющая пользователю совокупность логически единых подразделов Портала.</span><br><br><div><font face="tahoma" size="2"><u>Подраздел</u>&nbsp;- структурная составляющая Портала, представляющая пользователю совокупность логически единых системных сервисов Портала.</font></div><br><div><font face="tahoma" size="2"><u>Рабочая область</u>&nbsp;– часть структурной составляющей Портала, в рамках которой пользователь может размещать индивидуальную информацию и виджеты, а также осуществлять проектные действия с использованием методик и шаблонов, имеющихся на Портале.</font></div><br><div><font face="tahoma" size="2"><u>Личный кабинет</u>&nbsp;– личный раздел зарегистрированного на Портале пользователя, созданный им на базе раздела, копирующего Главную страницу Портала; личный кабинет имеет полный доступ ко всем разделам и методикам Портала, личную навигацию по Порталу, систему быстрого выбора на Портале и размещения избранной информации, систему оперативных коммуникаций со всеми участниками проектов.</font></div><div><font face="tahoma" size="2">&nbsp;</font></div><div><font face="tahoma" size="2"><u>Аккаунт&nbsp;</u>– учетная запись пользователя, при помощи которой он работает на Портале.</font></div><br><span style="font-family: tahoma; font-size: small;"><u>Системные сервисы</u>&nbsp;– набор программ, позволяющих пользователю планировать и реализовывать свои задачи на Портале, в том числе проекты в рамках любого инженерного сегмента рынка.</span><br><br><div><font face="tahoma" size="2"><u>Виджет</u>&nbsp;- структурная единица Портала, предназначенная для размещения одного системного сервиса.</font></div><div><font face="tahoma" size="2">&nbsp;&nbsp;</font></div><div><font face="tahoma" size="2"><u>Статичное меню</u>&nbsp;– меню первого уровня, элемент навигации пользователя по структурным единицам Портала, не изменяющийся в рамках различных составляющих определенной структурной единицы Портала.</font></div><div><font face="tahoma" size="2">&nbsp; &nbsp;&nbsp;</font></div><div><font face="tahoma" size="2"><u>Динамичное меню</u>&nbsp;– меню второго уровня, элемент навигации пользователя по структурным единицам Портала, не изменяющийся в рамках различных составляющих определенной структурной единицы Портала.</font></div><div><font face="tahoma" size="2">&nbsp;&nbsp;</font></div><div><font face="tahoma" size="2"><u>Функционал</u>&nbsp;– возможности исполнения пользователем задач в рамках определенной структурной составляющей Портала.&nbsp;</font></div></div>');

-- --------------------------------------------------------

--
-- Структура таблицы `sysdev_themes`
--

DROP TABLE IF EXISTS `sysdev_themes`;
CREATE TABLE IF NOT EXISTS `sysdev_themes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `account_id` int(11) unsigned NOT NULL,
  `extended` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  KEY `name` (`name`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=46 ;

--
-- Дамп данных таблицы `sysdev_themes`
--

INSERT INTO `sysdev_themes` (`id`, `name`, `parent_id`, `account_id`, `extended`) VALUES
(1, 'О системе', NULL, 1, 0),
(2, 'Общее описание', 1, 1, 0),
(3, 'Принципы работы', 1, 1, 0),
(5, 'Терминология', 1, 1, 0),
(6, 'География проекта', 1, 1, 0),
(7, 'Привлекательность системы', NULL, 1, 0),
(8, 'Для пользователей', 7, 1, 0),
(9, 'Для заказчиков', 7, 1, 0),
(10, 'Для производителей', 7, 1, 0),
(11, 'Для специалистов', 7, 1, 0),
(12, 'Для партнеров', 7, 1, 0),
(13, 'Для филиалов', 7, 1, 0),
(14, 'Для разработчиков', 7, 1, 0),
(15, 'Основные разделы системы', NULL, 1, 0),
(16, 'Главная страница', 15, 1, 0),
(17, 'Каталог товаров и услуг', 15, 1, 0),
(18, 'Специалисты', 15, 1, 0),
(19, 'Система управления бизнес-процессами (CRM)', 15, 1, 0),
(21, 'Почта', 15, 1, 0),
(22, 'Зона отдыха', 15, 1, 0),
(23, 'Игры', 22, 1, 0),
(24, 'Радио', 22, 1, 0),
(25, 'Телевидение', 22, 1, 0),
(26, 'Прочие развлечения', 22, 1, 0),
(27, 'Сервисы', NULL, 1, 0),
(28, 'Основные', 27, 1, 0),
(29, 'Второстепенные', 27, 1, 0),
(30, 'Документы', 28, 1, 0),
(31, 'Заказчики', 28, 1, 0),
(32, 'Калькулятор', 28, 1, 0),
(33, 'Каталог', 28, 1, 0),
(34, 'Курсы валют', 28, 1, 0),
(35, 'Новости', 28, 1, 0),
(36, 'Поиск', 28, 1, 0),
(37, 'Прогноз погоды', 28, 1, 0),
(38, 'Проекты', 28, 1, 0),
(39, 'Производители', 28, 1, 0),
(40, 'Сообщения', 28, 1, 0),
(41, 'Специалисты', 28, 1, 0),
(42, 'Счета', 28, 1, 0),
(43, 'Разрабатываемые решения', NULL, 1, 0),
(44, 'Сервисы', 43, 1, 0),
(45, 'Иной функционал', 43, 1, 0);

--
-- Ограничения внешнего ключа сохраненных таблиц
--

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
-- Ограничения внешнего ключа таблицы `acl_roles`
--
ALTER TABLE `acl_roles`
  ADD CONSTRAINT `acl_roles_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `acl_roles` (`id`);

--
-- Ограничения внешнего ключа таблицы `acl_roles_accounts`
--
ALTER TABLE `acl_roles_accounts`
  ADD CONSTRAINT `acl_roles_accounts_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `acl_roles_accounts_ibfk_3` FOREIGN KEY (`role_id`) REFERENCES `acl_roles` (`id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `catalog_airing`
--
ALTER TABLE `catalog_airing`
  ADD CONSTRAINT `catalog_airing_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_airing_groups` (`id`),
  ADD CONSTRAINT `catalog_airing_ibfk_10` FOREIGN KEY (`isolation_class_id`) REFERENCES `catalog_airing_isolation_clases` (`id`),
  ADD CONSTRAINT `catalog_airing_ibfk_2` FOREIGN KEY (`mark_id`) REFERENCES `catalog_airing_marks` (`id`),
  ADD CONSTRAINT `catalog_airing_ibfk_3` FOREIGN KEY (`product_type_id`) REFERENCES `catalog_airing_product_types` (`id`),
  ADD CONSTRAINT `catalog_airing_ibfk_4` FOREIGN KEY (`implementation_type_id`) REFERENCES `catalog_airing_implementation_types` (`id`),
  ADD CONSTRAINT `catalog_airing_ibfk_5` FOREIGN KEY (`control_type_id`) REFERENCES `catalog_airing_control_types` (`id`),
  ADD CONSTRAINT `catalog_airing_ibfk_6` FOREIGN KEY (`connection_type_id`) REFERENCES `catalog_airing_connection_types` (`id`),
  ADD CONSTRAINT `catalog_airing_ibfk_7` FOREIGN KEY (`protection_type_id`) REFERENCES `catalog_airing_protection_types` (`id`),
  ADD CONSTRAINT `catalog_airing_ibfk_8` FOREIGN KEY (`material_id`) REFERENCES `catalog_airing_materials` (`id`),
  ADD CONSTRAINT `catalog_airing_ibfk_9` FOREIGN KEY (`power_source_id`) REFERENCES `catalog_airing_power_sources` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_automation`
--
ALTER TABLE `catalog_automation`
  ADD CONSTRAINT `catalog_automation_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_automation_groups` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_10` FOREIGN KEY (`isolation_type_id`) REFERENCES `catalog_automation_isolation_types` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_2` FOREIGN KEY (`mark_id`) REFERENCES `catalog_automation_marks` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_3` FOREIGN KEY (`product_type_id`) REFERENCES `catalog_automation_product_types` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_4` FOREIGN KEY (`implementation_type_id`) REFERENCES `catalog_automation_implementation_types` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_5` FOREIGN KEY (`control_type_id`) REFERENCES `catalog_automation_control_types` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_6` FOREIGN KEY (`connection_type_id`) REFERENCES `catalog_automation_connection_types` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_7` FOREIGN KEY (`protection_type_id`) REFERENCES `catalog_automation_protection_types` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_8` FOREIGN KEY (`material_id`) REFERENCES `catalog_automation_materials` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_9` FOREIGN KEY (`power_source_id`) REFERENCES `catalog_automation_power_sources` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_conditioners`
--
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

--
-- Ограничения внешнего ключа таблицы `catalog_dustextraction`
--
ALTER TABLE `catalog_dustextraction`
  ADD CONSTRAINT `catalog_dustextraction_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_dustextraction_groups` (`id`),
  ADD CONSTRAINT `catalog_dustextraction_ibfk_2` FOREIGN KEY (`mark_id`) REFERENCES `catalog_dustextraction_marks` (`id`),
  ADD CONSTRAINT `catalog_dustextraction_ibfk_3` FOREIGN KEY (`filtration_id`) REFERENCES `catalog_dustextraction_filtrations` (`id`),
  ADD CONSTRAINT `catalog_dustextraction_ibfk_4` FOREIGN KEY (`motor_id`) REFERENCES `catalog_dustextraction_motors` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_electricity`
--
ALTER TABLE `catalog_electricity`
  ADD CONSTRAINT `catalog_electricity_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_electricity_groups` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_10` FOREIGN KEY (`isolation_type_id`) REFERENCES `catalog_electricity_isolation_types` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_2` FOREIGN KEY (`mark_id`) REFERENCES `catalog_electricity_marks` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_3` FOREIGN KEY (`product_type_id`) REFERENCES `catalog_electricity_product_types` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_4` FOREIGN KEY (`implementation_type_id`) REFERENCES `catalog_electricity_implementation_types` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_5` FOREIGN KEY (`control_type_id`) REFERENCES `catalog_electricity_control_types` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_6` FOREIGN KEY (`connection_type_id`) REFERENCES `catalog_electricity_connection_types` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_7` FOREIGN KEY (`protection_type_id`) REFERENCES `catalog_electricity_protection_types` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_8` FOREIGN KEY (`material_id`) REFERENCES `catalog_electricity_materials` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_9` FOREIGN KEY (`power_source_id`) REFERENCES `catalog_electricity_power_sources` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_heating`
--
ALTER TABLE `catalog_heating`
  ADD CONSTRAINT `catalog_heating_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_heating_groups` (`id`),
  ADD CONSTRAINT `catalog_heating_ibfk_2` FOREIGN KEY (`mark_id`) REFERENCES `catalog_heating_marks` (`id`),
  ADD CONSTRAINT `catalog_heating_ibfk_3` FOREIGN KEY (`product_type_id`) REFERENCES `catalog_heating_product_types` (`id`),
  ADD CONSTRAINT `catalog_heating_ibfk_4` FOREIGN KEY (`implementation_type_id`) REFERENCES `catalog_heating_implementation_types` (`id`),
  ADD CONSTRAINT `catalog_heating_ibfk_5` FOREIGN KEY (`control_type_id`) REFERENCES `catalog_heating_control_types` (`id`),
  ADD CONSTRAINT `catalog_heating_ibfk_6` FOREIGN KEY (`connection_type_id`) REFERENCES `catalog_heating_connection_types` (`id`),
  ADD CONSTRAINT `catalog_heating_ibfk_7` FOREIGN KEY (`protection_type_id`) REFERENCES `catalog_heating_protection_types` (`id`),
  ADD CONSTRAINT `catalog_heating_ibfk_8` FOREIGN KEY (`material_id`) REFERENCES `catalog_heating_materials` (`id`),
  ADD CONSTRAINT `catalog_heating_ibfk_9` FOREIGN KEY (`power_source_id`) REFERENCES `catalog_heating_power_sources` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_watersupply`
--
ALTER TABLE `catalog_watersupply`
  ADD CONSTRAINT `catalog_watersupply_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_watersupply_groups` (`id`),
  ADD CONSTRAINT `catalog_watersupply_ibfk_2` FOREIGN KEY (`mark_id`) REFERENCES `catalog_watersupply_marks` (`id`),
  ADD CONSTRAINT `catalog_watersupply_ibfk_3` FOREIGN KEY (`product_type_id`) REFERENCES `catalog_watersupply_product_types` (`id`),
  ADD CONSTRAINT `catalog_watersupply_ibfk_4` FOREIGN KEY (`implementation_type_id`) REFERENCES `catalog_watersupply_implementation_types` (`id`),
  ADD CONSTRAINT `catalog_watersupply_ibfk_5` FOREIGN KEY (`control_type_id`) REFERENCES `catalog_watersupply_control_types` (`id`),
  ADD CONSTRAINT `catalog_watersupply_ibfk_6` FOREIGN KEY (`connection_type_id`) REFERENCES `catalog_watersupply_connection_types` (`id`),
  ADD CONSTRAINT `catalog_watersupply_ibfk_7` FOREIGN KEY (`protection_type_id`) REFERENCES `catalog_watersupply_protection_types` (`id`),
  ADD CONSTRAINT `catalog_watersupply_ibfk_8` FOREIGN KEY (`material_id`) REFERENCES `catalog_watersupply_materials` (`id`),
  ADD CONSTRAINT `catalog_watersupply_ibfk_9` FOREIGN KEY (`power_source_id`) REFERENCES `catalog_watersupply_power_sources` (`id`);

--
-- Ограничения внешнего ключа таблицы `news_main`
--
ALTER TABLE `news_main`
  ADD CONSTRAINT `news_main_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `news_main_category` (`id`),
  ADD CONSTRAINT `news_main_ibfk_3` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `sysdev_description`
--
ALTER TABLE `sysdev_description`
  ADD CONSTRAINT `sysdev_description_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  ADD CONSTRAINT `sysdev_description_ibfk_2` FOREIGN KEY (`theme_id`) REFERENCES `sysdev_themes` (`id`);

--
-- Ограничения внешнего ключа таблицы `sysdev_themes`
--
ALTER TABLE `sysdev_themes`
  ADD CONSTRAINT `sysdev_themes_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
