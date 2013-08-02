-- phpMyAdmin SQL Dump
-- version 3.3.7deb7
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Авг 02 2013 г., 19:57
-- Версия сервера: 5.1.49
-- Версия PHP: 5.3.3-7+squeeze3

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=31 ;

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
(15, 'ivan', '7adfca2f2aba4cd301a02b9f33ca9037', 'Иван Нова', '5458778@gmail.com', 'RU', 'Москва', 1),
(16, 'nikolin', '88801278286c4a6e224c35dfe9e1e0fb', 'Николин Павел Владимирович', 'nikolin@eurasmail.ru', 'RU', 'Москва', 1),
(17, 'veligorskaya', 'b0a410daad768dc0064392f1ec096ea3', 'Велигорская Екатерина Александровна', 'veligorskaya@eurasmail.ru', 'RU', 'Москва', 1),
(18, 'chernetsova', '88d4953e10398630173f66ef14e95318', 'Чернецова Юлия Валерьевна', 'chernetsova@eurasmail.ru', 'RU', 'Москва', 1),
(19, 'smirnov.ds', '6594bdf4293b4283d5bafbdb27a20972', 'Смирнов Денис Сергеевич', 'smirnov.ds@eurasmail.ru', 'RU', 'Москва', 1),
(20, 'smirnov.dms', '795c3d3c96a5632e8365b68092e745e5', 'Смирнов Дмитрий Сергеевич', 'smirnov.dms@eurasmail.ru', 'RU', 'Москва', 1),
(21, 'kikarosh', '2b8a54151e09b2e757bf18b19717b9c0', 'Кикарош Андрей Юриевич', 'kikarosh@eurasmail.ru', 'RU', 'Москва', 1),
(22, 'blednikh', 'e137647de090d2468a3171249989529c', 'Бледных Дмитрий Николаевич', 'blednikh@eurasmail.ru', 'RU', 'Москва', 1),
(23, 'kasatkin', 'a226cf6999447ccd1cc8fa95b8b9303e', 'Касаткин Юрий Николаевич', 'kasatkin@eurasmail.ru', 'RU', 'Москва', 1),
(24, 'smirnov.sv', '91d78119616ac74405bcb1a152d89bf8', 'Смирнов Сергей Викторович', 'smirnov.sv@eurasmail.ru', 'RU', 'Москва', 1),
(25, 'sidorov', 'b7d483eb8a29a1df589cf00996b7b893', 'Сидоров Алексей Алексеевич', 'sidorov@eurasmail.ru', 'RU', 'Москва', 1),
(26, 'kovshilov.e', '7951c683af1ea1c611c504fda08853fb', 'Ковшилов Эмануил Анатольевич', 'kovshilov.e@eurasmail.ru', 'RU', 'Москва', 1),
(27, 'khokhlova', '05805a155fda002c7b4aa0e9a7d1a9b6', 'Хохлова Елена Михайловна', 'khokhlova@eurasmail.ru', 'RU', 'Москва', 1),
(28, 'aymaletdinova', 'e2b664e72863273ece7ffdf41bcc32f4', 'Аймалетдинова Рамиля Рафиковна', 'aymaletdinova@eurasmail.ru', 'RU', 'Москва', 1),
(29, 'тайка', 'c98703aed69284552ffffea25a1706d9', 'светланова светлана', 'svetlaneru@mail.ru', 'RU', 'Москва', 1),
(30, 'os76', 'd661dc86e475719c8adc340c53fda8be', 'Осипов Александр Николаевич', 'osipov-7676@bk.ru', 'RU', 'Москва', 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1469 ;

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
(1467, 1, 11, 2),
(1414, 1, 18, 1),
(1415, 1, 18, 2),
(1418, 1, 19, 1),
(1419, 1, 19, 2),
(1420, 1, 20, 1),
(1421, 1, 20, 2),
(1422, 1, 21, 1),
(1423, 1, 21, 2),
(1424, 1, 22, 1),
(1425, 1, 22, 2),
(1431, 1, 23, 1),
(1426, 1, 23, 2),
(1430, 1, 24, 1),
(1427, 1, 24, 2),
(1429, 1, 25, 1),
(1428, 1, 25, 2),
(1460, 1, 26, 1),
(1461, 1, 26, 2),
(1465, 1, 27, 1),
(1466, 1, 27, 2),
(1378, 2, 2, 1),
(1379, 2, 3, 1),
(1380, 2, 4, 1),
(1381, 2, 5, 1),
(1382, 2, 6, 1),
(1383, 2, 7, 1),
(1384, 2, 8, 1),
(1385, 2, 10, 1),
(1416, 2, 18, 1),
(1432, 2, 19, 1),
(1439, 2, 19, 2),
(1433, 2, 20, 1),
(1440, 2, 20, 2),
(1434, 2, 21, 1),
(1441, 2, 21, 2),
(1435, 2, 22, 1),
(1442, 2, 22, 2),
(1436, 2, 23, 1),
(1443, 2, 23, 2),
(1437, 2, 24, 1),
(1444, 2, 24, 2),
(1438, 2, 25, 1),
(1445, 2, 25, 2),
(1462, 2, 26, 1),
(1464, 2, 27, 1),
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
(1417, 3, 18, 1),
(1446, 3, 19, 1),
(1459, 3, 19, 2),
(1447, 3, 20, 1),
(1458, 3, 20, 2),
(1448, 3, 21, 1),
(1457, 3, 21, 2),
(1449, 3, 22, 1),
(1456, 3, 22, 2),
(1450, 3, 23, 1),
(1455, 3, 23, 2),
(1451, 3, 24, 1),
(1454, 3, 24, 2),
(1452, 3, 25, 1),
(1453, 3, 25, 2),
(1463, 3, 26, 1),
(1468, 3, 27, 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

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
(18, 'sysdev', NULL, NULL),
(19, 'projectdev', 'Сведения о проекте по разработке системы', NULL),
(20, 'info', 'Информация о проекте', 19),
(21, 'stages', 'Сведения об исполнении проекта', 19),
(22, 'docs', 'Документация проекта', 19),
(23, 'chart', 'Сведения об исполнении проекта (диаграмма)', 19),
(24, 'comments', 'Обсуждение проекта', 19),
(25, 'votes', 'Голосование по проекту', 19),
(26, 'services', 'Услуги', 2),
(27, 'projects', 'Проекты', 2);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Дамп данных таблицы `acl_roles`
--

INSERT INTO `acl_roles` (`id`, `name`, `parent_id`) VALUES
(1, 'Администратор', NULL),
(2, 'Гость', NULL),
(3, 'Пользователь', NULL),
(4, 'Сотрудник администрации', NULL),
(5, 'Специалист компании', NULL),
(6, 'Представитель производителя', NULL),
(7, 'Представитель филиала', NULL),
(8, 'Представитель партнёра', NULL),
(9, 'Эксперт', NULL),
(10, 'Журналист', NULL),
(11, 'Заказчик', NULL);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

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
(10, 15, 3),
(14, 16, 1),
(11, 17, 1),
(15, 18, 1),
(12, 19, 1),
(13, 20, 1),
(16, 21, 1),
(17, 22, 1),
(18, 23, 1),
(19, 24, 1),
(20, 25, 1),
(21, 26, 1),
(22, 27, 1),
(23, 28, 1),
(24, 29, 3),
(25, 30, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_airing`
--

DROP TABLE IF EXISTS `catalog_airing`;
CREATE TABLE IF NOT EXISTS `catalog_airing` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
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
  `description` text,
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `catalog_airing`
--

INSERT INTO `catalog_airing` (`id`, `code`, `group_id`, `mark_id`, `marking`, `product_type_id`, `implementation_type_id`, `control_type_id`, `connection_type_id`, `protection_type_id`, `material_id`, `power_source_id`, `isolation_class_id`, `country`, `temp`, `power_supply`, `heating_power_consumption`, `amperage`, `sensor_inputs`, `pressure`, `noise_level_min`, `filters_performance`, `performance`, `pollution_size`, `eer`, `weight`, `dimensions`, `cable_length`, `pipe_diameter`, `delivery_height`, `immersion_depth`, `warranty`, `storage`, `reserve`, `order`, `url`, `price`, `mount_price`, `description`) VALUES
(1, NULL, 1, 28, '123', NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, 'AD', '343', '454', '45', '45', '45', '45', '45', NULL, NULL, NULL, '54', '45', '45', '45', '45', NULL, NULL, '45', '45', '45', '45', '45', '45', '45', NULL);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `catalog_airing_control_types`
--

INSERT INTO `catalog_airing_control_types` (`id`, `name`) VALUES
(1, 'пульт');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `catalog_airing_implementation_types`
--

INSERT INTO `catalog_airing_implementation_types` (`id`, `name`) VALUES
(1, 'какой-то там тип');

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
-- Структура таблицы `catalog_airing_services`
--

DROP TABLE IF EXISTS `catalog_airing_services`;
CREATE TABLE IF NOT EXISTS `catalog_airing_services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_airing_services`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_automation`
--

DROP TABLE IF EXISTS `catalog_automation`;
CREATE TABLE IF NOT EXISTS `catalog_automation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
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
  `description` text,
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
-- Структура таблицы `catalog_automation_services`
--

DROP TABLE IF EXISTS `catalog_automation_services`;
CREATE TABLE IF NOT EXISTS `catalog_automation_services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_automation_services`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_conditioners`
--

DROP TABLE IF EXISTS `catalog_conditioners`;
CREATE TABLE IF NOT EXISTS `catalog_conditioners` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
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
  `description` text,
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `catalog_conditioners`
--

INSERT INTO `catalog_conditioners` (`id`, `code`, `group_id`, `mark_id`, `marking`, `product_type_id`, `implementation_type_id`, `control_type_id`, `connection_type_id`, `protection_type_id`, `material_id`, `power_source_id`, `country`, `cooling_capacity`, `heating_capacity`, `cooling_outdor_temp`, `heating_outdor_temp`, `power_supply`, `cooling_power_consumption`, `heating_power_consumption`, `amperage`, `air_consumption_min`, `air_consumption_max`, `sensor_inputs`, `pressure`, `noise_level_min`, `noise_level_max`, `eer`, `weight`, `dimensions`, `cable_length`, `pipe_diameter_liquid`, `pipe_diameter_gas`, `drain_diameter`, `trunk_length`, `elevation_difference`, `square`, `volume`, `warranty`, `storage`, `reserve`, `order`, `url`, `price`, `mount_price`, `description`) VALUES
(1, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ывывывывывыв'),
(2, NULL, NULL, 2, 'mod', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
-- Структура таблицы `catalog_conditioners_services`
--

DROP TABLE IF EXISTS `catalog_conditioners_services`;
CREATE TABLE IF NOT EXISTS `catalog_conditioners_services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `catalog_conditioners_services`
--

INSERT INTO `catalog_conditioners_services` (`id`, `item_id`, `service_id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_dustextraction`
--

DROP TABLE IF EXISTS `catalog_dustextraction`;
CREATE TABLE IF NOT EXISTS `catalog_dustextraction` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
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
  `description` text,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `mark_id` (`mark_id`),
  KEY `filtration_id` (`filtration_id`),
  KEY `motor_id` (`motor_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `catalog_dustextraction`
--

INSERT INTO `catalog_dustextraction` (`id`, `code`, `group_id`, `mark_id`, `marking`, `filtration_id`, `motor_id`, `country`, `power_consumption`, `vacuum_power`, `air_flow`, `vacuum_pressure`, `noise_level`, `amperage`, `dimensions`, `max_remote_pneumo_valve`, `max_riser_height`, `max_cabling_length`, `riser_diameter`, `cabling_diameter`, `dust_tank`, `motor_resource`, `max_users`, `extra_case_valve`, `soft_start`, `clean_pipe`, `vacuum_power_adj`, `case_lcd`, `regulating_valve`, `downy_valve`, `auto_clean`, `warranty`, `storage`, `reserve`, `order`, `url`, `price`, `mount_price`, `description`) VALUES
(1, NULL, 4, NULL, NULL, 2, NULL, 'FI', '1200', '610', '178', '28', '58', '10', NULL, '35', NULL, NULL, NULL, NULL, '8', '500', '1', 'нет', 'есть', 'нет', 'нет', 'нет', NULL, NULL, NULL, '5', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
-- Структура таблицы `catalog_dustextraction_services`
--

DROP TABLE IF EXISTS `catalog_dustextraction_services`;
CREATE TABLE IF NOT EXISTS `catalog_dustextraction_services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_dustextraction_services`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_electricity`
--

DROP TABLE IF EXISTS `catalog_electricity`;
CREATE TABLE IF NOT EXISTS `catalog_electricity` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
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
  `description` text,
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
-- Структура таблицы `catalog_electricity_services`
--

DROP TABLE IF EXISTS `catalog_electricity_services`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_electricity_services`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_heating`
--

DROP TABLE IF EXISTS `catalog_heating`;
CREATE TABLE IF NOT EXISTS `catalog_heating` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
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
  `description` text,
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
-- Структура таблицы `catalog_heating_services`
--

DROP TABLE IF EXISTS `catalog_heating_services`;
CREATE TABLE IF NOT EXISTS `catalog_heating_services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_heating_services`
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `catalog_images`
--

INSERT INTO `catalog_images` (`id`, `name`, `entity`, `entity_id`) VALUES
(1, '', 'watersupply', 1),
(2, '', 'watersupply', 1),
(3, '517afbe94ee88_download.png', 'watersupply', 1),
(4, '51d2aa4daefaf_IMG_0579.JPG', 'conditioners', 2),
(5, '51db079fbec8f_logo-big.png', 'conditioners', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_marks`
--

DROP TABLE IF EXISTS `catalog_marks`;
CREATE TABLE IF NOT EXISTS `catalog_marks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=37 ;

--
-- Дамп данных таблицы `catalog_marks`
--

INSERT INTO `catalog_marks` (`id`, `name`) VALUES
(1, 'NONAME'),
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
-- Структура таблицы `catalog_projects`
--

DROP TABLE IF EXISTS `catalog_projects`;
CREATE TABLE IF NOT EXISTS `catalog_projects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creator_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_id` (`creator_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `catalog_projects`
--

INSERT INTO `catalog_projects` (`id`, `name`, `created_date`, `creator_id`) VALUES
(1, 'GPON', '2013-07-18 17:15:35', 8);

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_projects_equipment`
--

DROP TABLE IF EXISTS `catalog_projects_equipment`;
CREATE TABLE IF NOT EXISTS `catalog_projects_equipment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `entity` varchar(255) NOT NULL,
  `entity_id` int(10) unsigned NOT NULL,
  `number` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Дамп данных таблицы `catalog_projects_equipment`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_projects_services`
--

DROP TABLE IF EXISTS `catalog_projects_services`;
CREATE TABLE IF NOT EXISTS `catalog_projects_services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  `number` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Дамп данных таблицы `catalog_projects_services`
--


-- --------------------------------------------------------

--
-- Структура таблицы `catalog_services`
--

DROP TABLE IF EXISTS `catalog_services`;
CREATE TABLE IF NOT EXISTS `catalog_services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` text NOT NULL,
  `price` double(10,2) NOT NULL,
  `measure` varchar(255) DEFAULT NULL,
  `term` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `catalog_services`
--

INSERT INTO `catalog_services` (`id`, `group_id`, `code`, `name`, `price`, `measure`, `term`) VALUES
(1, 1, 'ААА32', 'Монтаж', 1000.00, 'шт', '2 часа');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_services_groups`
--

DROP TABLE IF EXISTS `catalog_services_groups`;
CREATE TABLE IF NOT EXISTS `catalog_services_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Дамп данных таблицы `catalog_services_groups`
--

INSERT INTO `catalog_services_groups` (`id`, `name`) VALUES
(1, 'Кондиционирование'),
(2, 'Вентиляция'),
(3, 'Отопление'),
(4, 'Водоснабжение'),
(5, 'Канализация'),
(6, 'Пожарная сигнализация'),
(7, 'Охранная сигнализация'),
(8, 'Интернет коммуникации'),
(9, 'Телефонизация'),
(10, 'Радиофикация'),
(11, 'Телевизионные системы и коммуникации'),
(12, 'Электрика'),
(13, 'Автоматизация'),
(14, 'Диспетчеризация'),
(15, 'Системы чистых помещений');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_watersupply`
--

DROP TABLE IF EXISTS `catalog_watersupply`;
CREATE TABLE IF NOT EXISTS `catalog_watersupply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
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
  `description` text,
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
-- Дамп данных таблицы `catalog_watersupply`
--

INSERT INTO `catalog_watersupply` (`id`, `code`, `group_id`, `mark_id`, `marking`, `product_type_id`, `implementation_type_id`, `control_type_id`, `connection_type_id`, `protection_type_id`, `material_id`, `power_source_id`, `country`, `temp`, `power_supply`, `heating_power_consumption`, `amperage`, `sensor_inputs`, `pressure`, `noise_level_min`, `filters_performance`, `performance`, `pollution_size`, `eer`, `weight`, `dimensions`, `cable_length`, `pipe_diameter`, `delivery_height`, `immersion_depth`, `warranty`, `storage`, `reserve`, `order`, `url`, `price`, `mount_price`, `description`) VALUES
(1, NULL, NULL, 25, 'dfg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Корпорация Mitsubishi Electric – это всемирно известный производитель систем кондиционирования воздуха для бытового, коммерческого и промышленного применения.\n\nИстория развития климатического направления в корпорации началась с производства бытовых вентиляторов в 1921 году. Получив признание и популярность, корпорация расширила направление и приступила к выпуску охладителей воздуха. Непростая задача создания систем кондиционирования воздуха для различных климатических зон Японии была с успехом решена. Были разработаны сложнейшие системы, которые могут надежно работать, практически, в любых климатических условиях.\n\nБезопасность для человека и для окружающей среды, бесшумность и высокая энергоэффективность стали основными характеристиками систем кондиционирования воздуха Mitsubishi Electric.');

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
-- Структура таблицы `catalog_watersupply_services`
--

DROP TABLE IF EXISTS `catalog_watersupply_services`;
CREATE TABLE IF NOT EXISTS `catalog_watersupply_services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `catalog_watersupply_services`
--


-- --------------------------------------------------------

--
-- Структура таблицы `main_sysdev_projects`
--

DROP TABLE IF EXISTS `main_sysdev_projects`;
CREATE TABLE IF NOT EXISTS `main_sysdev_projects` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `account_id` int(11) unsigned DEFAULT NULL,
  `extended` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `description` text,
  `date_plan_begin` datetime DEFAULT NULL,
  `date_plan_end` datetime DEFAULT NULL,
  `date_fact_end` datetime DEFAULT NULL,
  `date_vote_begin` datetime DEFAULT NULL,
  `date_vote_end` datetime DEFAULT NULL,
  `date_discuss_begin` datetime DEFAULT NULL,
  `date_discuss_end` datetime DEFAULT NULL,
  `date_create` datetime NOT NULL,
  `leaf` enum('false','true') NOT NULL DEFAULT 'false',
  `budget` decimal(11,2) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `parent_id` (`parent_id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=25 ;

--
-- Дамп данных таблицы `main_sysdev_projects`
--

INSERT INTO `main_sysdev_projects` (`id`, `name`, `parent_id`, `account_id`, `extended`, `description`, `date_plan_begin`, `date_plan_end`, `date_fact_end`, `date_vote_begin`, `date_vote_end`, `date_discuss_begin`, `date_discuss_end`, `date_create`, `leaf`, `budget`) VALUES
(1, 'Создание и развитие разделов', NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:15', 'false', NULL),
(2, 'Главное окно', 1, 1, 0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla. Aliquam nisi ipsum, hendrerit a egestas a, tincidunt vulputate justo. Donec a ipsum ac metus accumsan lobortis. Vivamus nec nulla at augue facilisis varius. Morbi a velit eros, non ornare magna. Nam dui erat, suscipit ut vehicula non, interdum vitae eros. Aliquam eu rhoncus libero. Curabitur aliquet ultricies est. Morbi feugiat iaculis posuere. Suspendisse sit amet dui in sapien egestas semper. Nullam nec justo id lacus suscipit tincidunt eu sit amet neque. Vivamus vel leo metus. Proin adipiscing mattis est in gravida. Fusce nec purus nisi, id ullamcorper erat. Donec metus justo, auctor et fermentum ultricies, viverra ac velit. Proin blandit euismod lacinia. Fusce sit amet mollis turpis. Vestibulum sed odio massa. Proin interdum elit nec velit commodo pretium. Curabitur eget justo vitae nisi sodales suscipit. Morbi elit nisi, porta sit amet suscipit at, porttitor ac tellus. Curabitur gravida placerat condimentum. Suspendisse in laoreet diam. Duis iaculis, justo vitae euismod eleifend, neque nisi auctor arcu, sed posuere erat justo a nunc. Ut varius est non quam blandit placerat lobortis arcu pellentesque. Sed consequat dapibus suscipit. Donec odio felis, pharetra in lobortis ac, venenatis in lacus. Vivamus vulputate, sem id pharetra porta, turpis nunc elementum ipsum, quis varius elit felis id nisl. Quisque interdum purus ut eros sodales egestas. Suspendisse suscipit urna rutrum est sagittis quis tempor metus consequat. Donec dapibus, justo eu iaculis gravida, purus neque posuere enim, vel vestibulum ante velit vitae dui. Ut sit amet nibh elit, sed commodo ipsum. Suspendisse eu mi justo, ut hendrerit lectus. Nam ullamcorper, mi vel imperdiet luctus, augue purus mattis eros, nec vulputate nulla dolor et sapien. Nullam placerat molestie consectetur. Nulla pretium lorem in arcu fringilla sed malesuada nisl lacinia. In hac habitasse platea dictumst. Morbi egestas, turpis at tristique consequat, arcu orci faucibus eros, a auctor massa nunc a mauris. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin eget massa ante. Cras volutpat, tortor sed egestas aliquet, est nibh tristique enim, sit amet ornare ante arcu vel leo. Nullam mi lectus, laoreet eget fermentum quis, adipiscing et purus. Suspendisse nec condimentum leo. Ut ultrices malesuada eros, vel imperdiet nunc elementum vel. Donec vitae orci arcu. Etiam at turpis a ipsum pellentesque placerat. Nam malesuada, urna id pharetra malesuada, arcu arcu elementum tortor, sed venenatis felis nunc eu sem. Praesent ullamcorper, turpis vitae feugiat porta, arcu eros porta mi, quis ultrices tellus sapien sed quam. Quisque accumsan malesuada leo, at pellentesque felis bibendum at. Integer commodo sollicitudin felis et mollis. Mauris risus eros, auctor vitae bibendum eget, hendrerit quis turpis. Etiam adipiscing metus nec diam bibendum elementum. In at est rhoncus nibh laoreet congue id at tellus. Vestibulum et elit ligula, vel commodo nisl. Fusce vitae porta lectus. Vivamus suscipit dictum massa, ac porta sapien consectetur id. In hac habitasse platea dictumst. Aliquam id neque at sem sollicitudin pharetra. Aenean imperdiet tellus id nisl malesuada vitae bibendum odio convallis. Pellentesque dictum porta erat, at pretium augue egestas ut. Nam tempus mauris est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam gravida sodales dignissim. Sed facilisis nunc eget enim lobortis faucibus. In ac purus sit amet lectus venenatis interdum.', '2013-04-01 08:02:50', '2013-04-30 08:02:53', '2013-04-01 08:02:57', '2013-04-01 00:00:00', '2013-04-30 00:00:00', '2013-04-01 00:00:00', '2013-04-30 00:00:00', '2013-04-07 19:48:18', 'true', '10000.00'),
(3, 'Каталог товаров и услуг', 1, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:20', 'true', NULL),
(4, 'Специалисты ', 1, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:22', 'false', NULL),
(5, 'Производители', 1, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:24', 'false', NULL),
(6, 'Заказчики', 1, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:26', 'false', NULL),
(7, 'CRM', 1, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:28', 'false', NULL),
(8, 'Почта', 1, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:30', 'false', NULL),
(9, 'Зона отдыха', 1, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:32', 'false', NULL),
(10, 'Создание проектных сервисов', NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:33', 'false', NULL),
(11, 'Проекты', 10, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:36', 'false', NULL),
(12, 'Документы', 10, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-06 19:48:38', 'false', NULL),
(13, 'Каталог', 10, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:40', 'false', NULL),
(14, 'Счета', 10, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:45', 'false', NULL),
(15, 'Заказчики', 10, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:47', 'false', NULL),
(16, 'Производители', 10, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:49', 'false', NULL),
(17, 'Специалисты', 10, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:51', 'false', NULL),
(18, 'Разработка вспомогательных сервисов', NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:53', 'false', NULL),
(19, 'Курсы валют', 18, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:54', 'false', NULL),
(20, 'Новости', 18, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:49:00', 'false', NULL),
(21, 'Поиск', 18, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:49:01', 'false', NULL),
(22, 'Калькулятор', 18, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:49:03', 'false', NULL),
(23, 'Прогноз погоды', 18, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:49:05', 'false', NULL),
(24, 'Сообщения', 18, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:49:07', 'false', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `main_sysdev_project_discussions`
--

DROP TABLE IF EXISTS `main_sysdev_project_discussions`;
CREATE TABLE IF NOT EXISTS `main_sysdev_project_discussions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content` text,
  `date_create` datetime NOT NULL,
  `account_id` int(11) unsigned DEFAULT NULL,
  `project_id` int(11) unsigned DEFAULT NULL,
  `approved` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `main_sysdev_project_discussions_ibfk_1` (`account_id`),
  KEY `main_sysdev_project_discussions_ibfk_2` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `main_sysdev_project_discussions`
--

INSERT INTO `main_sysdev_project_discussions` (`id`, `content`, `date_create`, `account_id`, `project_id`, `approved`) VALUES
(1, 'Необходимо доработать сервис!', '2013-04-14 00:48:32', 2, 2, 0),
(2, 'test', '2013-04-22 01:33:16', 2, 2, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `main_sysdev_project_docs`
--

DROP TABLE IF EXISTS `main_sysdev_project_docs`;
CREATE TABLE IF NOT EXISTS `main_sysdev_project_docs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(11) unsigned DEFAULT NULL,
  `project_id` int(11) unsigned DEFAULT NULL,
  `date_create` datetime NOT NULL,
  `url` varchar(1000) DEFAULT NULL,
  `visible` tinyint(4) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `main_sysdev_project_docs_ibfk_1` (`account_id`),
  KEY `main_sysdev_project_docs_ibfk_2` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `main_sysdev_project_docs`
--

INSERT INTO `main_sysdev_project_docs` (`id`, `account_id`, `project_id`, `date_create`, `url`, `visible`, `name`) VALUES
(1, 1, 2, '2013-04-05 16:00:19', '#', 1, 'Техническое задание'),
(2, 1, 2, '2013-04-05 16:00:58', '#', 1, 'Акт приема-передачи работ'),
(3, 1, 2, '2013-04-05 16:02:17', '#', 1, 'Руководство пользователя'),
(4, 1, 2, '2013-04-05 16:02:53', '#', 1, 'Руководство для разработчика'),
(5, 1, 2, '2013-04-05 16:04:26', '#', 1, 'Смета');

-- --------------------------------------------------------

--
-- Структура таблицы `main_sysdev_project_stages`
--

DROP TABLE IF EXISTS `main_sysdev_project_stages`;
CREATE TABLE IF NOT EXISTS `main_sysdev_project_stages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date_plan_begin` datetime DEFAULT NULL,
  `date_plan_end` datetime DEFAULT NULL,
  `date_fact_begin` datetime DEFAULT NULL,
  `date_fact_end` datetime DEFAULT NULL,
  `account_id` int(11) unsigned DEFAULT NULL,
  `project_id` int(11) unsigned DEFAULT NULL,
  `date_create` datetime NOT NULL,
  `index` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `main_sysdev_project_stages_ibfk_2` (`project_id`),
  KEY `main_sysdev_project_stages_ibfk_1` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `main_sysdev_project_stages`
--

INSERT INTO `main_sysdev_project_stages` (`id`, `name`, `date_plan_begin`, `date_plan_end`, `date_fact_begin`, `date_fact_end`, `account_id`, `project_id`, `date_create`, `index`) VALUES
(1, 'Составление  технического задания', '2013-04-05 00:00:00', '2013-04-08 16:06:31', '2013-04-10 16:06:35', '2013-04-12 16:06:40', 1, 2, '2013-04-05 16:06:47', 1),
(2, 'Составление договора', '2013-04-09 00:00:00', '2013-04-12 16:07:24', '2013-04-13 16:07:30', '2013-04-15 16:07:54', 1, 2, '2013-04-05 16:08:28', 2),
(3, 'Разработка', '2013-04-13 00:00:00', '2013-04-15 16:09:07', '2013-04-14 16:09:16', '2013-04-15 16:09:21', 1, 2, '2013-04-05 16:09:30', 3),
(4, 'Тестирование', '2013-04-15 16:09:47', '2013-04-16 16:09:56', '2013-05-15 16:10:03', '2013-04-18 16:10:14', 1, 2, '2013-04-05 16:10:22', 4),
(5, 'Внедрение', '2013-04-16 16:11:23', '2013-04-17 16:11:28', '2013-04-19 16:11:33', '2013-04-20 16:11:36', 1, 2, '2013-05-07 16:11:42', 5),
(6, 'Сдача все работ', '2013-04-20 16:12:01', '2013-04-21 16:12:18', '2013-04-22 16:12:25', '2013-04-25 16:12:40', 1, 2, '2013-04-05 16:12:54', 6);

-- --------------------------------------------------------

--
-- Структура таблицы `main_sysdev_project_votes`
--

DROP TABLE IF EXISTS `main_sysdev_project_votes`;
CREATE TABLE IF NOT EXISTS `main_sysdev_project_votes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `mark_id` tinyint(4) NOT NULL,
  `project_id` int(11) unsigned DEFAULT NULL,
  `account_id` int(11) unsigned DEFAULT NULL,
  `date_create` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `main_sysdev_project_votes_ibfk_1` (`account_id`),
  KEY `main_sysdev_project_votes_ibfk_2` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `main_sysdev_project_votes`
--

INSERT INTO `main_sysdev_project_votes` (`id`, `mark_id`, `project_id`, `account_id`, `date_create`) VALUES
(1, 1, 2, 2, '2013-04-14 00:47:56');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Дамп данных таблицы `news_main`
--

INSERT INTO `news_main` (`id`, `date`, `category_id`, `account_id`, `title`, `short_text`, `long_text`) VALUES
(1, '2013-03-25 14:50:00', 1, 8, 'Обновление программного обеспечения', 'Сегодня портал получил очередное обновление программного обеспечения в связи с выходом в свет свежей версии используемого фреймворка - Ext JS 4.2. \r\n', 'Уважаемые пользователи портала ОАО "Евразклимат"!\r\n<br/><br/>\r\nСегодня портал получил очередное обновление программного обеспечения в связи с выходом в свет свежей версии используемого фреймворка - Ext JS 4.2. \r\nПортал ОАО "Евразклимат" был дополнен рядом критически важных обновлений и оптимизаций, которые, по большей части, не заметны глазам посетителей, но очень важны для функционирования портала в целом.<br/><br/>\r\nУбеждены, что обновление не сказалось на работоспособности портала в вашем браузере, впрочем, в случае возникновения каких-либо затруднений в работе просьба сообщать о них на ящик нашей технической поддержки <a href="mailto:support@eurasclimat.ru">support@eurasclimat.ru</a><br/><br/>\r\n\r\nС уважением,<br/>\r\nкоманда портала euraclimat.ru'),
(2, '2013-01-29 18:38:44', 1, 6, 'Запуск сервиса "Курс валют"', 'Вашему вниманию представляем сервис "Курсы валют", запущенный в тестовом режиме.', 'Вашему вниманию представляем сервис "Курсы валют", запущенный в тестовом режиме.<br/><br/>\r\nВ настоящее время представляет собой список валют и кросс-курсов обмена по номиналу. Данные обновляются в режиме онлайн с сайта Центробанка РФ.'),
(3, '2013-01-19 21:12:16', 1, 9, 'Прогноз погоды на портале', 'По многочисленным просьбам пользователей портала ОАО "Евразклимат" с сегодняшнего дня на портале доступен к использованию погодный виджет. Данный сервис позволяет узнать прогноз погоды для выбранного города и страны, доступен живой поиск по названию города и определение местоположения текущего пользователя по IP с отображением прогноза погоды для города, в котором тот находится.', 'По многочисленным просьбам пользователей портала ОАО "Евразклимат" с сегодняшнего дня на портале доступен к использованию погодный виджет. Данный сервис позволяет узнать прогноз погоды для выбранного города и страны, доступен живой поиск по названию города и определение местоположения текущего пользователя по IP с отображением прогноза погоды для города, в котором тот находится.<br/><br/>\r\nТакже пользователь может настроить под себя фиксированное отображение прогноза погоды для указанного города. Прогноз содержит информацию о четырех фазах суток с учетом температуры воздуха, ветра, давления, влажности и облачности.\r\nДанные о погоде поступают в режиме реального времени от нашего партнера weather.com.ua<br/><br/>\r\nВ дальнейшем планируем расширение возможностей данного сервиса.'),
(4, '2012-12-14 11:20:05', 1, 8, 'Запуск портала в бета-режиме', 'Сегодня мы запускаем наш портал в бета-режиме. Это означает, что не вся функциональность реализована на данный момент, а существующие сервисы могут работать в ограниченном, или даже с ошибками режиме.', 'Уважаемые пользователи портала ОАО "Евразклимат"!<br/><br/>\r\n\r\nСегодня мы запускаем наш портал в бета-режиме. Это означает, что не вся функциональность реализована на данный момент, а существующие сервисы могут работать в ограниченном, или даже с ошибками режиме.<br/><br/>\r\nМы работаем над скорейшим развертыванием всего нового, полезного и запланированного для нужд наших пользователей.<br/><br/>\r\nЕсли у вас появились замечания или предложения, с удовольствием выслушаем вас и отреагируем на письмо по адресу: info@euraslclomat.ru или по телефону: +7 (495) 988 9296.\r\n<br/><br/>\r\nС уважением,<br/>\r\nкоманда портала euraclimat.ru\r\n'),
(5, '2013-05-16 18:03:09', 1, 6, 'Интенсификация деятельности ОАО «Евразклимат» на электронных торговых площадках.', 'Компания всё более активно использует электронные торговые площадки для поиска интересующих её проектов и принимает участие в соответствующих конкурсных и аукционных процедурах.', 'Компания всё более активно использует электронные торговые площадки для поиска интересующих её проектов и принимает участие в соответствующих конкурсных и аукционных процедурах. Ранее ОАО «Евразклимат» получило доступ и активно работает на ЭТП: «РосЭлТорг», ММББ, Сбербанк-АСТ, ТТП РФ, АФК «Система», ЮИТ, «ФСК ЕЭС», «МЮ-КонсалтЦентр», «ТДОИ». В ближайшее время компания также начнёт работы на ЭТР «РЖД». Готовится вход компании на «Портал закупок».'),
(6, '2013-05-17 18:04:40', 1, 6, 'Компания ОАО «Евразклимат» интенсифицирует свою работу по развитию партнёрской среды.', 'Компания ОАО «Евразклимат» интенсифицирует свою работу по развитию партнёрской среды. В компании создан Департамент проектов и движения материальных средств»', 'В компании создан Департамент проектов и движения материальных средств», одним из основных направлений которого является расширение круга партнеров, привлекающих для компании заказчиков, и оптимизация работы с такими партнёрами. Задачами Департамента в этой связи является формирование оптимальных схем рабочего взаимодействия с партнёрами, исходя из типов реализуемых с их помощью проектов и с учётом регионов, в которых ими проводится работа. '),
(7, '2013-05-17 18:06:01', 1, 6, 'Внедрение системы электронного управления на базе 1С:Предприятие.', 'В компании ООО "Евразклимат" с 23 марта начата приёмка результатов работ по программированию, имеющему целью создание на базе платформы 1C:Предприятие системы электронного управления проектами компании.', 'В компании ООО "Евразклимат" с 23 марта начата приёмка результатов работ по программированию, имеющему целью создание на базе платформы 1C:Предприятие системы электронного управления проектами компании. В результате внедрения данной разработки, в ОАО "Евразклимат" будет полностью реализован принцип формирования и исполнения проектов в рамках единого информационного поля, которое позволит упростить все рабочие процедуры, в том числе согласования к заказчиками, формирование коммерческих предложений и договоров, проектирование, логистическую работу, производственный процесс. Переход на электронное планирование и контроль реализации проектов - ещё один этап модернизации компании, реализация общего подхода компании на использование в работе современных методов для оптимизации рабочего процесса.');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=52 ;

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
INSERT INTO `sysdev_description` (`id`, `theme_id`, `account_id`, `date`, `content`) VALUES
(43, 14, 13, '0000-00-00 00:00:00', '<u style="font-family: tahoma, arial, verdana, sans-serif; font-size: 12px;"><font size="2">Для разработчиков</font></u><br><br><br><div style="text-indent: 0px;"><span style="font-family: tahoma; font-size: small; text-indent: 35.4pt;">В рамках постоянного обновления и повышения\nфункциональности Корпоративного портала все разработчики могут размещать на нем\nсвои методики или создавать новые – специально под задачи Портала и его\nпользователей. Для этого разработчики могут воспользоваться системой\nсогласования идеи на Портале, получить пожелания к конкретной методике от\nдругих пользователей и, при необходимости, получить практическую помощь в\nразработке.</span></div><br><br><div style="text-indent: 0px;"><span style="font-family: tahoma; font-size: small; text-indent: 35.4pt;">Каждая методика, которая по договору с\nадминистрацией Портала создана или размещена в системе пользователем,\nзакрепляется за ним - с получением им в дальнейшем дивидендов от использования\nметодики другими пользователями.</span></div><br><br><div style="text-indent: 0px;"><span style="font-family: tahoma; font-size: small; text-indent: 35.4pt;">Также, как и другие специалисты,\nразработчики могут образовывать на Портале профессиональные группы, как с целью\nсоздания новых методик для Портала, так и для участия в промышленных проектах,\nразмещаемых в системе заказчиками.</span></div><br><br><div style="text-indent: 0px;"><span style="font-family: tahoma; font-size: small; text-indent: 35.4pt;">Система защиты авторских прав разработчиков\nметодик соблюдается на Портале в полной мере -&nbsp;\nна основании соответствующих условий, отраженных в договорах,\nзаключенных разработчиками с администрацией Портала. &nbsp;</span></div><br><br><div style="text-indent: 0px;"><span style="font-family: tahoma; font-size: small; text-indent: 35.4pt;">Организованные для каждого из разработчиков\nна Портале личные кабинеты, с функционалом, выстроенным под их задачи,\nпозволяют разработчикам оперативно получать всю интересующую их новую\nинформацию, собираемую на Портале в рамках их специализации, формировать свой\nсобственный функционал для работы, а также проводить оперативные согласования с\nдругими пользователями, в том числе участвующими в совместных разработках.</span></div><br><br><div style="text-indent: 0px;"><span style="font-family: tahoma; font-size: small; text-indent: 35.4pt;">Комфортность работы разработчиков в рамках\nПортала благодаря широкому выбору сервисов отдыха, в том числе сервисы ТВ, игры,\nмузыки, благодаря чему работа пользователей-специалистов осуществляется в\nмаксимально комфортных условиях.&nbsp;</span></div>'),
(47, 46, 13, '0000-00-00 00:00:00', '<div><font face="tahoma" size="2"><u>Структура типичной страницы портала</u></font></div><div><font face="tahoma" size="2"><br></font></div><div><font face="tahoma" size="2">Любая страница раздела системы имеет фиксированную структуру состоящую из следующих основных блоков:</font></div><br><span style="font-family: tahoma; font-size: small;">•</span><span class="Apple-tab-span" style="font-family: tahoma; font-size: small; white-space: pre;">	</span><span style="font-family: tahoma; font-size: small;">Рабочая область страницы</span><br><div><font face="tahoma" size="2"><br></font></div><div><font face="tahoma" size="2">Предназначена для осуществления пользователем основных рабочих действий в рамках тематики данной страницы, а также для размещения вспомогательных виджетов и выборок информации.</font></div><br><br><div><span style="font-family: tahoma; font-size: small;">•</span><span class="Apple-tab-span" style="font-family: tahoma; font-size: small; white-space: pre;">	</span><span style="font-family: tahoma; font-size: small;">Основное верхнее меню</span></div><div><font face="tahoma" size="2"><br></font></div><div><font face="tahoma" size="2">Предназначено для размещения закладок разделов, каждый из которых несет отдельную функцию в рамках деятельности по планированию или исполнению проектов Портала.</font></div><br><br><div><span style="font-family: tahoma; font-size: small;">•</span><span class="Apple-tab-span" style="font-family: tahoma; font-size: small; white-space: pre;">	</span><span style="font-family: tahoma; font-size: small;">Верхнее вспомогательное подменю</span></div><div><font face="tahoma" size="2"><br></font></div><div><font face="tahoma" size="2">Предназначено для размещения закладок подразделов, каждый из которых несет одну их функций в рамках общего функционала раздела Портала.</font></div><br><br><div><span style="font-family: tahoma; font-size: small;">•</span><span class="Apple-tab-span" style="font-family: tahoma; font-size: small; white-space: pre;">	</span><span style="font-family: tahoma; font-size: small;">Глобальное меню</span></div><div><font face="tahoma" size="2"><br></font></div><div><font face="tahoma" size="2">Состоит из набора кнопок с функционалом, обслуживающим деятельность пользователя на Портале в целом.</font></div><br><br><div><span style="font-family: tahoma; font-size: small;">•</span><span class="Apple-tab-span" style="font-family: tahoma; font-size: small; white-space: pre;">	</span><span style="font-family: tahoma; font-size: small;">Меню раздела</span></div><div><font face="tahoma" size="2"><br></font></div><div><font face="tahoma" size="2">Состоит из набора кнопок меню, обслуживающим деятельность пользователя на в рамках раздела в целом.</font></div><br><br><div><span style="font-family: tahoma; font-size: small;">•</span><span class="Apple-tab-span" style="font-family: tahoma; font-size: small; white-space: pre;">	</span><span style="font-family: tahoma; font-size: small;">Меню подраздела</span></div><div><font face="tahoma" size="2"><br></font></div><div><font face="tahoma" size="2">Состоит из набора кнопок меню, обслуживающим деятельность пользователя на в рамках подраздела.&nbsp;</font></div>'),
(49, 56, 13, '0000-00-00 00:00:00', '<font face="tahoma" size="2"><u>Рабочая область экрана<br></u></font><br><div><font face="tahoma" size="2">Рабочая область любой из страниц (подразделов) Портала состоит из статичного Главного виджета соответствующей страницы и пространства для размещения динамичных виджетов – вспомогательных относительно тематики данной страницы.</font></div><br><br><div><font face="tahoma" size="2">Главный виджет страницы является основным функциональным пространством, в рамках которого пользователь имеет возможность осуществлять рабочие действия, относящиеся к тематике соответствующего подраздела Портала, в том числе:</font></div><br><br><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Поиск необходимых сведений</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Выбор/подбор информации &nbsp;</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Преобразование информации&nbsp;</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Осуществление инициирования проектов и задач</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Создание проектных решений</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Осуществления согласований&nbsp;</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Создания необходимых документов</font></div><br><br><div><font face="tahoma" size="2">Вспомогательные виджеты несут функции:</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Предоставления пользователю дополнительных возможностей в рамках указанных выше рабочих действий</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Размещения в кабинете дополнительных информационных возможностей, не относящихся к рабочим действиям (погода, курсы валют и др.) &nbsp;</font></div><div><font face="tahoma" size="2">•<span class="Apple-tab-span" style="white-space:pre">	</span>Формирования в кабинете пользователя сервисов отдыха</font></div>'),
(51, 52, 13, '0000-00-00 00:00:00', '<u><font face="tahoma" size="2">Основное верхнее меню</font></u><br><br><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">Закладки, составляющие Основное верхнее меню, делят Портал на функциональные зоны с отдельными общими проектными и другими функциями.</span></font></div><br><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">Основное верхнее меню Портала составляют страницы:</span></font></div><br><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">•<span class="Apple-tab-span" style="white-space:pre">	</span>Главная страница</span></font></div><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">Основная функция - маркетинговая: для размещения информации о целях, функциях, структуре, возможностях Портала.</span></font></div><br><br><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">•<span class="Apple-tab-span" style="white-space:pre">	</span>Каталоги&nbsp;</span></font></div><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">Основная функция - проектная: для размещения информации о товарах и услугах, необходимых для реализации инженерных проектов, и связанным с выбором товаров и услуг функционалом&nbsp;</span></font></div><br><br><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">&nbsp;</span></font></div><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">•<span class="Apple-tab-span" style="white-space:pre">	</span>Специалисты</span></font></div><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">Основная функция - проектная: для размещения информации о специалистах и рабочих группах, необходимая для организации реализации инженерных проектов, и связанным с выбором специалистов функционалом&nbsp;</span></font></div><br><br><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">•<span class="Apple-tab-span" style="white-space:pre">	</span>Торговая площадка</span></font></div><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">Основная функция - проектная: для размещения информации о новых проектах, представленных к реализации на Портале и инициирования участия в проектах</span></font></div><br><br><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">•<span class="Apple-tab-span" style="white-space:pre">	</span>CRM</span></font></div><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">Основная функция - проектная: для размещения функционала, необходимого для рабочего планирования и реализации проектов на Портале&nbsp;</span></font></div><br><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">&nbsp;</span></font></div><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">•<span class="Apple-tab-span" style="white-space:pre">	</span>Почта</span></font></div><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">Основная функция - коммуникативная: для организации почтовых сообщений в рамках или посредством Портала</span></font></div><br><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">&nbsp;</span></font></div><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">•<span class="Apple-tab-span" style="white-space:pre">	</span>Зона отдыха</span></font></div><div><font face="tahoma, arial, verdana, sans-serif"><span style="font-size: 12px;">Основная функция – организация отдыха пользователей: для размещения сервисов отдыха.</span></font></div>');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=57 ;

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
(45, 'Иной функционал', 43, 1, 0),
(46, 'Структура типичной страницы портала', 15, 1, 0),
(52, 'Основное верхнее меню', 46, 1, 0),
(53, 'Верхнее вспомогательное меню', 46, 1, 0),
(54, 'Статичное левое меню', 46, 1, 0),
(55, 'Динамичное левое меню', 46, 1, 0),
(56, 'Рабочая область экрана', 46, 1, 0);

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
  ADD CONSTRAINT `catalog_airing_ibfk_11` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`),
  ADD CONSTRAINT `catalog_airing_ibfk_3` FOREIGN KEY (`product_type_id`) REFERENCES `catalog_airing_product_types` (`id`),
  ADD CONSTRAINT `catalog_airing_ibfk_4` FOREIGN KEY (`implementation_type_id`) REFERENCES `catalog_airing_implementation_types` (`id`),
  ADD CONSTRAINT `catalog_airing_ibfk_5` FOREIGN KEY (`control_type_id`) REFERENCES `catalog_airing_control_types` (`id`),
  ADD CONSTRAINT `catalog_airing_ibfk_6` FOREIGN KEY (`connection_type_id`) REFERENCES `catalog_airing_connection_types` (`id`),
  ADD CONSTRAINT `catalog_airing_ibfk_7` FOREIGN KEY (`protection_type_id`) REFERENCES `catalog_airing_protection_types` (`id`),
  ADD CONSTRAINT `catalog_airing_ibfk_8` FOREIGN KEY (`material_id`) REFERENCES `catalog_airing_materials` (`id`),
  ADD CONSTRAINT `catalog_airing_ibfk_9` FOREIGN KEY (`power_source_id`) REFERENCES `catalog_airing_power_sources` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_airing_services`
--
ALTER TABLE `catalog_airing_services`
  ADD CONSTRAINT `catalog_airing_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`),
  ADD CONSTRAINT `catalog_airing_services_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `catalog_airing` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_automation`
--
ALTER TABLE `catalog_automation`
  ADD CONSTRAINT `catalog_automation_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_automation_groups` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_10` FOREIGN KEY (`isolation_type_id`) REFERENCES `catalog_automation_isolation_types` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_11` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_3` FOREIGN KEY (`product_type_id`) REFERENCES `catalog_automation_product_types` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_4` FOREIGN KEY (`implementation_type_id`) REFERENCES `catalog_automation_implementation_types` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_5` FOREIGN KEY (`control_type_id`) REFERENCES `catalog_automation_control_types` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_6` FOREIGN KEY (`connection_type_id`) REFERENCES `catalog_automation_connection_types` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_7` FOREIGN KEY (`protection_type_id`) REFERENCES `catalog_automation_protection_types` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_8` FOREIGN KEY (`material_id`) REFERENCES `catalog_automation_materials` (`id`),
  ADD CONSTRAINT `catalog_automation_ibfk_9` FOREIGN KEY (`power_source_id`) REFERENCES `catalog_automation_power_sources` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_automation_services`
--
ALTER TABLE `catalog_automation_services`
  ADD CONSTRAINT `catalog_automation_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`),
  ADD CONSTRAINT `catalog_automation_services_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `catalog_automation` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_conditioners`
--
ALTER TABLE `catalog_conditioners`
  ADD CONSTRAINT `catalog_conditioners_ibfk_10` FOREIGN KEY (`group_id`) REFERENCES `catalog_conditioners_groups` (`id`),
  ADD CONSTRAINT `catalog_conditioners_ibfk_12` FOREIGN KEY (`product_type_id`) REFERENCES `catalog_conditioners_product_types` (`id`),
  ADD CONSTRAINT `catalog_conditioners_ibfk_13` FOREIGN KEY (`implementation_type_id`) REFERENCES `catalog_conditioners_implementation_types` (`id`),
  ADD CONSTRAINT `catalog_conditioners_ibfk_14` FOREIGN KEY (`control_type_id`) REFERENCES `catalog_conditioners_control_types` (`id`),
  ADD CONSTRAINT `catalog_conditioners_ibfk_15` FOREIGN KEY (`connection_type_id`) REFERENCES `catalog_conditioners_connection_types` (`id`),
  ADD CONSTRAINT `catalog_conditioners_ibfk_16` FOREIGN KEY (`protection_type_id`) REFERENCES `catalog_conditioners_protection_types` (`id`),
  ADD CONSTRAINT `catalog_conditioners_ibfk_17` FOREIGN KEY (`material_id`) REFERENCES `catalog_conditioners_materials` (`id`),
  ADD CONSTRAINT `catalog_conditioners_ibfk_18` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`),
  ADD CONSTRAINT `catalog_conditioners_ibfk_9` FOREIGN KEY (`power_source_id`) REFERENCES `catalog_conditioners_power_sources` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_conditioners_services`
--
ALTER TABLE `catalog_conditioners_services`
  ADD CONSTRAINT `catalog_conditioners_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`),
  ADD CONSTRAINT `catalog_conditioners_services_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `catalog_conditioners` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_dustextraction`
--
ALTER TABLE `catalog_dustextraction`
  ADD CONSTRAINT `catalog_dustextraction_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_dustextraction_groups` (`id`),
  ADD CONSTRAINT `catalog_dustextraction_ibfk_3` FOREIGN KEY (`filtration_id`) REFERENCES `catalog_dustextraction_filtrations` (`id`),
  ADD CONSTRAINT `catalog_dustextraction_ibfk_4` FOREIGN KEY (`motor_id`) REFERENCES `catalog_dustextraction_motors` (`id`),
  ADD CONSTRAINT `catalog_dustextraction_ibfk_5` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_dustextraction_services`
--
ALTER TABLE `catalog_dustextraction_services`
  ADD CONSTRAINT `catalog_dustextraction_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`),
  ADD CONSTRAINT `catalog_dustextraction_services_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `catalog_dustextraction` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_electricity`
--
ALTER TABLE `catalog_electricity`
  ADD CONSTRAINT `catalog_electricity_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_electricity_groups` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_10` FOREIGN KEY (`isolation_type_id`) REFERENCES `catalog_electricity_isolation_types` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_11` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_3` FOREIGN KEY (`product_type_id`) REFERENCES `catalog_electricity_product_types` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_4` FOREIGN KEY (`implementation_type_id`) REFERENCES `catalog_electricity_implementation_types` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_5` FOREIGN KEY (`control_type_id`) REFERENCES `catalog_electricity_control_types` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_6` FOREIGN KEY (`connection_type_id`) REFERENCES `catalog_electricity_connection_types` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_7` FOREIGN KEY (`protection_type_id`) REFERENCES `catalog_electricity_protection_types` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_8` FOREIGN KEY (`material_id`) REFERENCES `catalog_electricity_materials` (`id`),
  ADD CONSTRAINT `catalog_electricity_ibfk_9` FOREIGN KEY (`power_source_id`) REFERENCES `catalog_electricity_power_sources` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_electricity_services`
--
ALTER TABLE `catalog_electricity_services`
  ADD CONSTRAINT `catalog_electricity_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`),
  ADD CONSTRAINT `catalog_electricity_services_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `catalog_electricity` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_heating`
--
ALTER TABLE `catalog_heating`
  ADD CONSTRAINT `catalog_heating_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_heating_groups` (`id`),
  ADD CONSTRAINT `catalog_heating_ibfk_10` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`),
  ADD CONSTRAINT `catalog_heating_ibfk_3` FOREIGN KEY (`product_type_id`) REFERENCES `catalog_heating_product_types` (`id`),
  ADD CONSTRAINT `catalog_heating_ibfk_4` FOREIGN KEY (`implementation_type_id`) REFERENCES `catalog_heating_implementation_types` (`id`),
  ADD CONSTRAINT `catalog_heating_ibfk_5` FOREIGN KEY (`control_type_id`) REFERENCES `catalog_heating_control_types` (`id`),
  ADD CONSTRAINT `catalog_heating_ibfk_6` FOREIGN KEY (`connection_type_id`) REFERENCES `catalog_heating_connection_types` (`id`),
  ADD CONSTRAINT `catalog_heating_ibfk_7` FOREIGN KEY (`protection_type_id`) REFERENCES `catalog_heating_protection_types` (`id`),
  ADD CONSTRAINT `catalog_heating_ibfk_8` FOREIGN KEY (`material_id`) REFERENCES `catalog_heating_materials` (`id`),
  ADD CONSTRAINT `catalog_heating_ibfk_9` FOREIGN KEY (`power_source_id`) REFERENCES `catalog_heating_power_sources` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_heating_services`
--
ALTER TABLE `catalog_heating_services`
  ADD CONSTRAINT `catalog_heating_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`),
  ADD CONSTRAINT `catalog_heating_services_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `catalog_heating` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_projects`
--
ALTER TABLE `catalog_projects`
  ADD CONSTRAINT `catalog_projects_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `accounts` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_projects_equipment`
--
ALTER TABLE `catalog_projects_equipment`
  ADD CONSTRAINT `catalog_projects_equipment_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `catalog_projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `catalog_projects_services`
--
ALTER TABLE `catalog_projects_services`
  ADD CONSTRAINT `catalog_projects_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`),
  ADD CONSTRAINT `catalog_projects_services_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `catalog_projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `catalog_services`
--
ALTER TABLE `catalog_services`
  ADD CONSTRAINT `catalog_services_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_services_groups` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_watersupply`
--
ALTER TABLE `catalog_watersupply`
  ADD CONSTRAINT `catalog_watersupply_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_watersupply_groups` (`id`),
  ADD CONSTRAINT `catalog_watersupply_ibfk_10` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`),
  ADD CONSTRAINT `catalog_watersupply_ibfk_3` FOREIGN KEY (`product_type_id`) REFERENCES `catalog_watersupply_product_types` (`id`),
  ADD CONSTRAINT `catalog_watersupply_ibfk_4` FOREIGN KEY (`implementation_type_id`) REFERENCES `catalog_watersupply_implementation_types` (`id`),
  ADD CONSTRAINT `catalog_watersupply_ibfk_5` FOREIGN KEY (`control_type_id`) REFERENCES `catalog_watersupply_control_types` (`id`),
  ADD CONSTRAINT `catalog_watersupply_ibfk_6` FOREIGN KEY (`connection_type_id`) REFERENCES `catalog_watersupply_connection_types` (`id`),
  ADD CONSTRAINT `catalog_watersupply_ibfk_7` FOREIGN KEY (`protection_type_id`) REFERENCES `catalog_watersupply_protection_types` (`id`),
  ADD CONSTRAINT `catalog_watersupply_ibfk_8` FOREIGN KEY (`material_id`) REFERENCES `catalog_watersupply_materials` (`id`),
  ADD CONSTRAINT `catalog_watersupply_ibfk_9` FOREIGN KEY (`power_source_id`) REFERENCES `catalog_watersupply_power_sources` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_watersupply_services`
--
ALTER TABLE `catalog_watersupply_services`
  ADD CONSTRAINT `catalog_watersupply_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`),
  ADD CONSTRAINT `catalog_watersupply_services_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `catalog_watersupply` (`id`);

--
-- Ограничения внешнего ключа таблицы `main_sysdev_projects`
--
ALTER TABLE `main_sysdev_projects`
  ADD CONSTRAINT `main_sysdev_projects_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `main_sysdev_project_discussions`
--
ALTER TABLE `main_sysdev_project_discussions`
  ADD CONSTRAINT `main_sysdev_project_discussions_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `main_sysdev_project_discussions_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `main_sysdev_projects` (`id`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `main_sysdev_project_docs`
--
ALTER TABLE `main_sysdev_project_docs`
  ADD CONSTRAINT `main_sysdev_project_docs_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `main_sysdev_project_docs_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `main_sysdev_projects` (`id`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `main_sysdev_project_stages`
--
ALTER TABLE `main_sysdev_project_stages`
  ADD CONSTRAINT `main_sysdev_project_stages_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `main_sysdev_project_stages_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `main_sysdev_projects` (`id`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `main_sysdev_project_votes`
--
ALTER TABLE `main_sysdev_project_votes`
  ADD CONSTRAINT `main_sysdev_project_votes_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `main_sysdev_project_votes_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `main_sysdev_projects` (`id`) ON DELETE SET NULL;

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
