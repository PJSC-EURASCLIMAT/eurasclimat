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
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 1, 'Администратор', 'admin@e-head.ru', NULL, NULL, 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `acl_permissions`
--

INSERT INTO `acl_permissions` (`id`, `role_id`, `resource_id`, `privilege_id`) VALUES
(1, 1, 1, 1),
(2, 1, 1, 3),
(3, 1, 2, 1),
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
-- Структура таблицы `catalog_categories`
--

DROP TABLE IF EXISTS `catalog_categories`;
CREATE TABLE IF NOT EXISTS `catalog_categories` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(250) NOT NULL,
  `parent` int(10) unsigned default NULL,
  PRIMARY KEY  (`id`),
  KEY `parent` (`parent`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT AUTO_INCREMENT=10 ;

--
-- Дамп данных таблицы `catalog_categories`
--

INSERT INTO `catalog_categories` (`id`, `name`, `parent`) VALUES
(1, 'Продукция', NULL),
(2, 'Специальные виды работ', NULL),
(3, 'Проектные работы', NULL),
(4, 'Основное оборудование', 1),
(5, 'Вспомогательные материалы', 1),
(6, 'Расходные материалы', 1),
(7, 'Расходные материалы', 3),
(8, 'Расходные материалы', 2),
(9, 'Расходные инструменты', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_chapters`
--

DROP TABLE IF EXISTS `catalog_chapters`;
CREATE TABLE IF NOT EXISTS `catalog_chapters` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(250) NOT NULL,
  `parent` int(10) unsigned default NULL,
  PRIMARY KEY  (`id`),
  KEY `parent` (`parent`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `catalog_chapters`
--

INSERT INTO `catalog_chapters` (`id`, `name`, `parent`) VALUES
(1, 'Новая продукция', NULL),
(2, 'Б/у продукция', NULL),
(3, 'Складская позиция', 1),
(4, 'Заказная позиция', 1),
(5, 'Протестированная', 2),
(6, 'Не протестированная', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_items`
--

DROP TABLE IF EXISTS `catalog_items`;
CREATE TABLE IF NOT EXISTS `catalog_items` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `category_id` int(10) unsigned NOT NULL,
  `mark_id` int(10) unsigned default NULL,
  `type_id` int(10) unsigned NOT NULL,
  `measure_id` int(10) unsigned default NULL,
  `chapter_id` int(10) unsigned NOT NULL,
  `marking` varchar(250) NOT NULL,
  `price` double(10,2) NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `category_id` (`category_id`),
  KEY `mark_id` (`mark_id`),
  KEY `type_id` (`type_id`),
  KEY `measure_id` (`measure_id`),
  KEY `chapter_id` (`chapter_id`)
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
  `name` varchar(250) NOT NULL,
  `country` varchar(250) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Дамп данных таблицы `catalog_marks`
--

INSERT INTO `catalog_marks` (`id`, `name`, `country`) VALUES
(1, 'Мицубиси', 'Япония'),
(3, 'Дайкин', 'Япония'),
(4, 'Панасоник', 'Япония'),
(5, 'Медея', 'Китай'),
(6, 'Хаер', 'Китай'),
(7, 'ЛДЖ', 'Китай'),
(8, 'Самсунг', 'Китай'),
(9, 'Аирвел', 'Франция'),
(10, 'Винтера', 'Италия'),
(11, 'Денко', 'Великобритания');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_measures`
--

DROP TABLE IF EXISTS `catalog_measures`;
CREATE TABLE IF NOT EXISTS `catalog_measures` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `catalog_measures`
--

INSERT INTO `catalog_measures` (`id`, `name`) VALUES
(1, 'шт');

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_types`
--

DROP TABLE IF EXISTS `catalog_types`;
CREATE TABLE IF NOT EXISTS `catalog_types` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(250) NOT NULL,
  `parent` int(10) unsigned default NULL,
  PRIMARY KEY  (`id`),
  KEY `parent` (`parent`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT AUTO_INCREMENT=8 ;

--
-- Дамп данных таблицы `catalog_types`
--

INSERT INTO `catalog_types` (`id`, `name`, `parent`) VALUES
(1, 'Кондиционеры', NULL),
(2, 'Внутренние блоки', 1),
(3, 'Наружные блоки', 1),
(4, 'Настенный тепло холод', 2),
(5, 'Настенный только холод', 2),
(6, 'Касетный тепло холод', 2),
(7, 'Настенный тепло холод', 3);

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
-- Ограничения внешнего ключа таблицы `catalog_categories`
--
ALTER TABLE `catalog_categories`
  ADD CONSTRAINT `catalog_categories_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `catalog_categories` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_chapters`
--
ALTER TABLE `catalog_chapters`
  ADD CONSTRAINT `catalog_chapters_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `catalog_chapters` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_items`
--
ALTER TABLE `catalog_items`
  ADD CONSTRAINT `catalog_items_ibfk_10` FOREIGN KEY (`type_id`) REFERENCES `catalog_types` (`id`),
  ADD CONSTRAINT `catalog_items_ibfk_5` FOREIGN KEY (`chapter_id`) REFERENCES `catalog_chapters` (`id`),
  ADD CONSTRAINT `catalog_items_ibfk_6` FOREIGN KEY (`measure_id`) REFERENCES `catalog_measures` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `catalog_items_ibfk_8` FOREIGN KEY (`category_id`) REFERENCES `catalog_categories` (`id`),
  ADD CONSTRAINT `catalog_items_ibfk_9` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`);

--
-- Ограничения внешнего ключа таблицы `catalog_types`
--
ALTER TABLE `catalog_types`
  ADD CONSTRAINT `catalog_types_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `catalog_types` (`id`);

