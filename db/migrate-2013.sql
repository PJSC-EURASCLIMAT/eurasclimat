SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE IF NOT EXISTS `catalog_images` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` text character set latin1 NOT NULL,
  `entity` varchar(255) character set latin1 NOT NULL,
  `entity_id` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- 2013-01-24 --

ALTER TABLE `accounts` ADD `country` VARCHAR(2) NULL AFTER `email`;
ALTER TABLE `accounts` ADD `city` VARCHAR(255) NULL AFTER `country`;

-- 2013-04-12 --

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

INSERT INTO `main_sysdev_projects` (`id`, `name`, `parent_id`, `account_id`, `extended`, `description`, `date_plan_begin`, `date_plan_end`, `date_fact_end`, `date_vote_begin`, `date_vote_end`, `date_discuss_begin`, `date_discuss_end`, `date_create`, `leaf`, `budget`) VALUES
(1, 'Создание и развитие разделов', NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-04-07 19:48:15', 'false', NULL),
(2, 'Главное окно', 1, 1, 0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla. Aliquam nisi ipsum, hendrerit a egestas a, tincidunt vulputate justo. Donec a ipsum ac metus accumsan lobortis. Vivamus nec nulla at augue facilisis varius. Morbi a velit eros, non ornare magna. Nam dui erat, suscipit ut vehicula non, interdum vitae eros. Aliquam eu rhoncus libero. Curabitur aliquet ultricies est. Morbi feugiat iaculis posuere. Suspendisse sit amet dui in sapien egestas semper. Nullam nec justo id lacus suscipit tincidunt eu sit amet neque. Vivamus vel leo metus. Proin adipiscing mattis est in gravida. Fusce nec purus nisi, id ullamcorper erat. Donec metus justo, auctor et fermentum ultricies, viverra ac velit. Proin blandit euismod lacinia. Fusce sit amet mollis turpis. Vestibulum sed odio massa. Proin interdum elit nec velit commodo pretium. Curabitur eget justo vitae nisi sodales suscipit. Morbi elit nisi, porta sit amet suscipit at, porttitor ac tellus. Curabitur gravida placerat condimentum. Suspendisse in laoreet diam. Duis iaculis, justo vitae euismod eleifend, neque nisi auctor arcu, sed posuere erat justo a nunc. Ut varius est non quam blandit placerat lobortis arcu pellentesque. Sed consequat dapibus suscipit. Donec odio felis, pharetra in lobortis ac, venenatis in lacus. Vivamus vulputate, sem id pharetra porta, turpis nunc elementum ipsum, quis varius elit felis id nisl. Quisque interdum purus ut eros sodales egestas. Suspendisse suscipit urna rutrum est sagittis quis tempor metus consequat. Donec dapibus, justo eu iaculis gravida, purus neque posuere enim, vel vestibulum ante velit vitae dui. Ut sit amet nibh elit, sed commodo ipsum. Suspendisse eu mi justo, ut hendrerit lectus. Nam ullamcorper, mi vel imperdiet luctus, augue purus mattis eros, nec vulputate nulla dolor et sapien. Nullam placerat molestie consectetur. Nulla pretium lorem in arcu fringilla sed malesuada nisl lacinia. In hac habitasse platea dictumst. Morbi egestas, turpis at tristique consequat, arcu orci faucibus eros, a auctor massa nunc a mauris. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin eget massa ante. Cras volutpat, tortor sed egestas aliquet, est nibh tristique enim, sit amet ornare ante arcu vel leo. Nullam mi lectus, laoreet eget fermentum quis, adipiscing et purus. Suspendisse nec condimentum leo. Ut ultrices malesuada eros, vel imperdiet nunc elementum vel. Donec vitae orci arcu. Etiam at turpis a ipsum pellentesque placerat. Nam malesuada, urna id pharetra malesuada, arcu arcu elementum tortor, sed venenatis felis nunc eu sem. Praesent ullamcorper, turpis vitae feugiat porta, arcu eros porta mi, quis ultrices tellus sapien sed quam. Quisque accumsan malesuada leo, at pellentesque felis bibendum at. Integer commodo sollicitudin felis et mollis. Mauris risus eros, auctor vitae bibendum eget, hendrerit quis turpis. Etiam adipiscing metus nec diam bibendum elementum. In at est rhoncus nibh laoreet congue id at tellus. Vestibulum et elit ligula, vel commodo nisl. Fusce vitae porta lectus. Vivamus suscipit dictum massa, ac porta sapien consectetur id. In hac habitasse platea dictumst. Aliquam id neque at sem sollicitudin pharetra. Aenean imperdiet tellus id nisl malesuada vitae bibendum odio convallis. Pellentesque dictum porta erat, at pretium augue egestas ut. Nam tempus mauris est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam gravida sodales dignissim. Sed facilisis nunc eget enim lobortis faucibus. In ac purus sit amet lectus venenatis interdum.', '2013-04-01 08:02:50', '2013-04-30 08:02:53', '2013-04-01 08:02:57', '2013-04-30 08:03:00', '2013-04-01 08:03:03', '2013-04-30 08:03:06', '2013-04-01 08:03:10', '2013-04-07 19:48:18', 'true', 10000.00),
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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

INSERT INTO `main_sysdev_project_docs` (`id`, `account_id`, `project_id`, `date_create`, `url`, `visible`, `name`) VALUES
(1, 1, 2, '2013-04-05 16:00:19', '#', 1, 'Техническое задание'),
(2, 1, 2, '2013-04-05 16:00:58', '#', 1, 'Акт приема-передачи работ'),
(3, 1, 2, '2013-04-05 16:02:17', '#', 1, 'Руководство пользователя'),
(4, 1, 2, '2013-04-05 16:02:53', '#', 1, 'Руководство для разработчика'),
(5, 1, 2, '2013-04-05 16:04:26', '#', 1, 'Смета');

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

INSERT INTO `main_sysdev_project_stages` (`id`, `name`, `date_plan_begin`, `date_plan_end`, `date_fact_begin`, `date_fact_end`, `account_id`, `project_id`, `date_create`, `index`) VALUES
(1, 'Составление  технического задания', '2013-04-05 00:00:00', '2013-04-08 16:06:31', '2013-04-10 16:06:35', '2013-04-12 16:06:40', 1, 2, '2013-04-05 16:06:47', 1),
(2, 'Составление договора', '2013-04-09 00:00:00', '2013-04-12 16:07:24', '2013-04-13 16:07:30', '2013-04-15 16:07:54', 1, 2, '2013-04-05 16:08:28', 2),
(3, 'Разработка', '2013-04-13 00:00:00', '2013-04-15 16:09:07', '2013-04-14 16:09:16', '2013-04-15 16:09:21', 1, 2, '2013-04-05 16:09:30', 3),
(4, 'Тестирование', '2013-04-15 16:09:47', '2013-04-16 16:09:56', '2013-05-15 16:10:03', '2013-04-18 16:10:14', 1, 2, '2013-04-05 16:10:22', 4),
(5, 'Внедрение', '2013-04-16 16:11:23', '2013-04-17 16:11:28', '2013-04-19 16:11:33', '2013-04-20 16:11:36', 1, 2, '2013-05-07 16:11:42', 5),
(6, 'Сдача все работ', '2013-04-20 16:12:01', '2013-04-21 16:12:18', '2013-04-22 16:12:25', '2013-04-25 16:12:40', 1, 2, '2013-04-05 16:12:54', 6);

CREATE TABLE IF NOT EXISTS `main_sysdev_project_votes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `mark_id` tinyint(4) NOT NULL,
  `project_id` int(11) unsigned DEFAULT NULL,
  `account_id` int(11) unsigned DEFAULT NULL,
  `date_create` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `main_sysdev_project_votes_ibfk_1` (`account_id`),
  KEY `main_sysdev_project_votes_ibfk_2` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `main_sysdev_projects`
  ADD CONSTRAINT `main_sysdev_projects_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

ALTER TABLE `main_sysdev_project_discussions`
  ADD CONSTRAINT `main_sysdev_project_discussions_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `main_sysdev_project_discussions_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `main_sysdev_projects` (`id`) ON DELETE SET NULL;

ALTER TABLE `main_sysdev_project_docs`
  ADD CONSTRAINT `main_sysdev_project_docs_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `main_sysdev_project_docs_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `main_sysdev_projects` (`id`) ON DELETE SET NULL;

ALTER TABLE `main_sysdev_project_stages`
  ADD CONSTRAINT `main_sysdev_project_stages_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `main_sysdev_project_stages_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `main_sysdev_projects` (`id`) ON DELETE SET NULL;

ALTER TABLE `main_sysdev_project_votes`
  ADD CONSTRAINT `main_sysdev_project_votes_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `main_sysdev_project_votes_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `main_sysdev_projects` (`id`) ON DELETE SET NULL;

INSERT INTO acl_resources (id, name, title, parent_id)  VALUES 
(19, 'projectdev', 'Сведения о проекте по разработке системы', NULL),
(20, 'info', 'Информация о проекте', 19),
(21, 'stages', 'Сведения об исполнении проекта', 19),
(22, 'docs', 'Документация проекта', 19),
(23, 'chart', 'Сведения об исполнении проекта (диаграмма)', 19),
(24, 'comments', 'Обсуждение проекта', 19),
(25, 'votes', 'Голосование по проекту', 19);

-- 2013-05-24 --

ALTER TABLE  `catalog_conditioners` ADD  `description` TEXT NULL;
ALTER TABLE  `catalog_airing` ADD  `description` TEXT NULL;
ALTER TABLE  `catalog_automation` ADD  `description` TEXT NULL;
ALTER TABLE  `catalog_electricity` ADD  `description` TEXT NULL;
ALTER TABLE  `catalog_heating` ADD  `description` TEXT NULL;
ALTER TABLE  `catalog_watersupply` ADD  `description` TEXT NULL;
ALTER TABLE  `catalog_dustextraction` ADD  `description` TEXT NULL;

-- 2013-06-01 --

ALTER TABLE  `catalog_conditioners` ADD  `description` TEXT NULL;
ALTER TABLE  `catalog_airing` ADD  `description` TEXT NULL;
ALTER TABLE  `catalog_automation` ADD  `description` TEXT NULL;
ALTER TABLE  `catalog_electricity` ADD  `description` TEXT NULL;
ALTER TABLE  `catalog_heating` ADD  `description` TEXT NULL;
ALTER TABLE  `catalog_watersupply` ADD  `description` TEXT NULL;
ALTER TABLE  `catalog_dustextraction` ADD  `description` TEXT NULL;

-- 2013-06-27 --

ALTER TABLE  `catalog_conditioners` ADD  `code` VARCHAR( 100 ) NULL AFTER  `id`;
ALTER TABLE  `catalog_airing` ADD  `code` VARCHAR( 100 ) NULL AFTER  `id`;
ALTER TABLE  `catalog_automation` ADD  `code` VARCHAR( 100 ) NULL AFTER  `id`;
ALTER TABLE  `catalog_dustextraction` ADD  `code` VARCHAR( 100 ) NULL AFTER  `id`;
ALTER TABLE  `catalog_electricity` ADD  `code` VARCHAR( 100 ) NULL AFTER  `id`;
ALTER TABLE  `catalog_heating` ADD  `code` VARCHAR( 100 ) NULL AFTER  `id`;
ALTER TABLE  `catalog_watersupply` ADD  `code` VARCHAR( 100 ) NULL AFTER  `id`;

DROP TABLE IF EXISTS `catalog_services`;
CREATE TABLE IF NOT EXISTS `catalog_services` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `group_id` int(10) unsigned NOT NULL,
  `code` VARCHAR( 255 ) NULL,
  `name` text NOT NULL,
  `price` double(10,2) NOT NULL,
  `measure` VARCHAR( 255 ) NULL,
  `term` VARCHAR( 255 ) NULL,
  PRIMARY KEY  (`id`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_services_groups`;
CREATE TABLE IF NOT EXISTS `catalog_services_groups` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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

ALTER TABLE `catalog_services`  ADD CONSTRAINT `catalog_services_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_services_groups` (`id`);

-- 2013-07-08 --

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
  
-- 2013-07-18 --

DROP TABLE IF EXISTS `catalog_projects`;
CREATE TABLE IF NOT EXISTS `catalog_projects` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL default CURRENT_TIMESTAMP,
  `creator_id` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `creator_id` (`creator_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `catalog_projects` ADD CONSTRAINT `catalog_projects_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `accounts` (`id`);

DROP TABLE IF EXISTS `catalog_projects_equipment`;
CREATE TABLE IF NOT EXISTS `catalog_projects_equipment` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `project_id` int(10) unsigned NOT NULL,
  `entity` varchar(255) NOT NULL,
  `entity_id` int(10) unsigned NOT NULL,
  `number` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `catalog_projects_equipment` ADD CONSTRAINT `catalog_projects_equipment_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `catalog_projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
  
DROP TABLE IF EXISTS `catalog_projects_services`;
CREATE TABLE IF NOT EXISTS `catalog_projects_services` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `project_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  `number` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `project_id` (`project_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `catalog_projects_services` ADD CONSTRAINT `catalog_projects_services_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `catalog_projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `catalog_projects_services` ADD CONSTRAINT `catalog_projects_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`);

-- 2013-08-16 --

ALTER TABLE `main_sysdev_projects` ADD `position` INT NULL COMMENT 'порядковый номер в ветке' AFTER `leaf`;

-- 2013-08-23 --

ALTER TABLE `main_sysdev_projects` ADD `stage` INT NULL COMMENT 'код стадии проекта';
UPDATE `main_sysdev_projects` SET `stage`= 2;

-- 2013-08-26 --

ALTER TABLE  `accounts` ADD  `lang` VARCHAR( 2 ) NOT NULL , ADD  `tz` VARCHAR( 3 ) NOT NULL;

-- 2013-09-02 --

DROP TABLE IF EXISTS `catalog_special_services`;
CREATE TABLE `catalog_special_services` (
`id` INT( 10 ) UNSIGNED NOT NULL AUTO_INCREMENT ,
 `group_id` INT( 10 ) UNSIGNED NOT NULL ,
 `code` VARCHAR( 255 ) DEFAULT NULL ,
 `name` TEXT NOT NULL ,
 `price` DOUBLE( 10, 2 ) NOT NULL ,
 `measure` VARCHAR( 255 ) DEFAULT NULL ,
 `term` VARCHAR( 255 ) DEFAULT NULL ,
PRIMARY KEY (`id`) ,
KEY  `group_id` (`group_id`)
) ENGINE = INNODB DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `catalog_special_services_groups`;
CREATE TABLE `catalog_special_services_groups` (
`id` INT( 10 ) UNSIGNED NOT NULL AUTO_INCREMENT ,
 `name` VARCHAR( 255 ) NOT NULL ,
PRIMARY KEY (`id`)
) ENGINE = INNODB DEFAULT CHARSET = utf8;

ALTER TABLE `catalog_special_services` ADD FOREIGN KEY (`group_id`) 
REFERENCES `catalog_special_services_groups` (`id`) 
ON DELETE RESTRICT ON UPDATE RESTRICT ;

DROP TABLE IF EXISTS `catalog_expendables`;
CREATE TABLE IF NOT EXISTS `catalog_expendables` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `group_id` int(10) unsigned NOT NULL,
  `code` varchar(255) default NULL,
  `name` text NOT NULL,
  `price` double(10,2) NOT NULL,
  `measure` varchar(255) default NULL,
  PRIMARY KEY  (`id`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_expendables_groups`;
CREATE TABLE IF NOT EXISTS `catalog_expendables_groups` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_special_services_expendables`;
CREATE TABLE IF NOT EXISTS `catalog_special_services_expendables` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `service_id` int(10) unsigned NOT NULL,
  `expendable_id` int(10) unsigned NOT NULL,
  `number` double(10,3) default NULL,
  PRIMARY KEY  (`id`),
  KEY `service_id` (`service_id`),
  KEY `expendable_id` (`expendable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `catalog_expendables`
  ADD CONSTRAINT `catalog_expendables_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_expendables_groups` (`id`);

ALTER TABLE `catalog_special_services_expendables`
  ADD CONSTRAINT `catalog_special_services_expendables_ibfk_3` FOREIGN KEY (`expendable_id`) REFERENCES `catalog_expendables` (`id`),
  ADD CONSTRAINT `catalog_special_services_expendables_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `catalog_special_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

DROP TABLE IF EXISTS `auth_keys`;
CREATE TABLE IF NOT EXISTS `auth_keys` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

-- 2013-09-04 --

DROP TABLE IF EXISTS `auth_keys`;
CREATE TABLE `auth_keys` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

ALTER TABLE `auth_keys`  ADD CONSTRAINT `auth_keys_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- 2013-09-12 --

CREATE TABLE `crm_orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(11) unsigned NOT NULL,
  `category` int(10) DEFAULT NULL,
  `object` int(10) DEFAULT NULL,
  `area` int(10) DEFAULT NULL,
  `contacts` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

ALTER TABLE `crm_orders`  ADD CONSTRAINT `crm_orders_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- 2013-09-19 --

DROP TABLE IF EXISTS `catalog_projects_expendables`;
CREATE TABLE IF NOT EXISTS `catalog_projects_expendables` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `project_id` int(10) unsigned NOT NULL,
  `expendable_id` int(10) unsigned NOT NULL,
  `number` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `project_id` (`project_id`),
  KEY `expendable_id` (`expendable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_projects_special_services`;
CREATE TABLE IF NOT EXISTS `catalog_projects_special_services` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `project_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  `number` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `project_id` (`project_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `catalog_projects_expendables`
  ADD CONSTRAINT `catalog_projects_expendables_ibfk_2` FOREIGN KEY (`expendable_id`) REFERENCES `catalog_expendables` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `catalog_projects_expendables_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `catalog_projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `catalog_projects_special_services`
  ADD CONSTRAINT `catalog_projects_special_services_ibfk_4` FOREIGN KEY (`service_id`) REFERENCES `catalog_special_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `catalog_projects_special_services_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `catalog_projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
  
-- 2013-10-05 --

ALTER TABLE `catalog_conditioners` DROP `mount_price`;
ALTER TABLE `catalog_airing` DROP `mount_price`;
ALTER TABLE `catalog_automation` DROP `mount_price`;
ALTER TABLE `catalog_dustextraction` DROP `mount_price`;
ALTER TABLE `catalog_electricity` DROP `mount_price`;
ALTER TABLE `catalog_heating` DROP `mount_price`;
ALTER TABLE `catalog_watersupply` DROP `mount_price`;

ALTER TABLE `catalog_conditioners` DROP `storage`;
ALTER TABLE `catalog_airing` DROP `storage`;
ALTER TABLE `catalog_automation` DROP `storage`;
ALTER TABLE `catalog_dustextraction` DROP `storage`;
ALTER TABLE `catalog_electricity` DROP `storage`;
ALTER TABLE `catalog_heating` DROP `storage`;
ALTER TABLE `catalog_watersupply` DROP `storage`;

ALTER TABLE `catalog_conditioners` DROP `reserve`;
ALTER TABLE `catalog_airing` DROP `reserve`;
ALTER TABLE `catalog_automation` DROP `reserve`;
ALTER TABLE `catalog_dustextraction` DROP `reserve`;
ALTER TABLE `catalog_electricity` DROP `reserve`;
ALTER TABLE `catalog_heating` DROP `reserve`;
ALTER TABLE `catalog_watersupply` DROP `reserve`;

ALTER TABLE `catalog_conditioners` DROP `order`;
ALTER TABLE `catalog_airing` DROP `order`;
ALTER TABLE `catalog_automation` DROP `order`;
ALTER TABLE `catalog_dustextraction` DROP `order`;
ALTER TABLE `catalog_electricity` DROP `order`;
ALTER TABLE `catalog_heating` DROP `order`;
ALTER TABLE `catalog_watersupply` DROP `order`;

ALTER TABLE  `sysdev_description` DROP FOREIGN KEY  `sysdev_description_ibfk_2` ;
ALTER TABLE  `sysdev_description` DROP FOREIGN KEY  `sysdev_description_ibfk_1` ;

RENAME TABLE `sysdev_themes` TO `aboutsystem_themes` ;
RENAME TABLE `sysdev_description` TO `aboutsystem_description` ;

ALTER TABLE  `aboutsystem_themes` CHANGE `account_id` `account_id` INT( 11 ) UNSIGNED NULL ;
ALTER TABLE  `aboutsystem_description` CHANGE `account_id` `account_id` INT(11) UNSIGNED NULL ;
ALTER TABLE  `aboutsystem_description` ADD FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE ;
ALTER TABLE  `aboutsystem_description` DROP FOREIGN KEY  `aboutsystem_description_ibfk_3`,

    ADD FOREIGN KEY (`theme_id`) REFERENCES  `aboutsystem_themes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE ;
ALTER TABLE  `aboutsystem_themes` DROP FOREIGN KEY  `aboutsystem_themes_ibfk_2` ,
    ADD FOREIGN KEY (`account_id`) REFERENCES  `e-head_ec`.`accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE ;
    
-- 2013-10-17 --

DELETE FROM `acl_resources` WHERE `acl_resources`.`name` = 'sysdev';
UPDATE  `acl_resources` SET  `name` =  'sysdev' WHERE  `acl_resources`.`name` = 'projectdev';

-- 2013-10-25 --

CREATE TABLE `messages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` int(10) unsigned DEFAULT NULL,
  `receiver_id` int(10) unsigned DEFAULT NULL,
  `message` text,
  `date` timestamp NULL DEFAULT NULL,
  `readed` tinyint(4) DEFAULT '0',
  `parent` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

-- 2013-11-13 --

TRUNCATE TABLE `catalog_airing_services`;
TRUNCATE TABLE `catalog_automation_services`;
TRUNCATE TABLE `catalog_conditioners_services`;
TRUNCATE TABLE `catalog_dustextraction_services`;
TRUNCATE TABLE `catalog_electricity_services`;
TRUNCATE TABLE `catalog_heating_services`;
TRUNCATE TABLE `catalog_watersupply_services`;

ALTER TABLE `catalog_airing_services` ADD `term` VARCHAR(255) NULL, ADD `price` DOUBLE(10,2) NULL;
ALTER TABLE `catalog_automation_services` ADD `term` VARCHAR(255) NULL, ADD `price` DOUBLE(10,2) NULL;
ALTER TABLE `catalog_conditioners_services` ADD `term` VARCHAR(255) NULL, ADD `price` DOUBLE(10,2) NULL;
ALTER TABLE `catalog_dustextraction_services` ADD `term` VARCHAR(255) NULL, ADD `price` DOUBLE(10,2) NULL;
ALTER TABLE `catalog_electricity_services` ADD `term` VARCHAR(255) NULL, ADD `price` DOUBLE(10,2) NULL;
ALTER TABLE `catalog_heating_services` ADD `term` VARCHAR(255) NULL, ADD `price` DOUBLE(10,2) NULL;
ALTER TABLE `catalog_watersupply_services` ADD `term` VARCHAR(255) NULL, ADD `price` DOUBLE(10,2) NULL;

DROP TABLE IF EXISTS `catalog_services_groups`;

DROP TABLE IF EXISTS `catalog_services`;
CREATE TABLE `catalog_services` (
  `id` int(11) unsigned  NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

INSERT INTO `catalog_services` (`name`) VALUES ('Монтаж'), ('Демонтаж'), ('Настройка'),
('Диагностика'), ('Сервисное обслуживание'), ('Ремонт');

-- 2013-11-14 --

DROP TABLE IF EXISTS `files`;
CREATE TABLE IF NOT EXISTS `files` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `path` varchar(255) DEFAULT NULL,
  `date` timestamp NULL default CURRENT_TIMESTAMP,
  `name` varchar(255) DEFAULT NULL,
  `account_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `main_sysdev_project_docs`;
CREATE TABLE IF NOT EXISTS `main_sysdev_project_docs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(11) unsigned NOT NULL,
  `file_id` int(11) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `file_id` (`file_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `files`  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;
  
ALTER TABLE `main_sysdev_project_docs`
  ADD CONSTRAINT `main_sysdev_project_docs_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `main_sysdev_projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `main_sysdev_project_docs_ibfk_2` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE;
  
-- 2013-11-18 --

ALTER TABLE  `catalog_projects` RENAME  `crm_projects` ;
ALTER TABLE  `catalog_projects_equipment` RENAME  `crm_projects_equipment` ;
ALTER TABLE  `catalog_projects_expendables` RENAME  `crm_projects_expendables` ;
ALTER TABLE  `catalog_projects_services` RENAME  `crm_projects_services` ;
ALTER TABLE  `catalog_projects_special_services` RENAME  `crm_projects_special_services` ;

ALTER TABLE `crm_projects` ADD `group_id` INT UNSIGNED NOT NULL AFTER `id`, 
ADD INDEX (`group_id`);

ALTER TABLE `crm_projects` CHANGE `creator_id` `creator_id` INT( 10 ) UNSIGNED NULL;

DROP TABLE IF EXISTS `crm_projects_groups`;
CREATE TABLE IF NOT EXISTS `crm_projects_groups` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `crm_projects_groups` (`name`) VALUES ('Общие');

UPDATE `crm_projects` SET `group_id`=1;

ALTER TABLE `crm_projects` ADD FOREIGN KEY (`group_id`) 
REFERENCES `crm_projects_groups` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE `crm_projects` ADD FOREIGN KEY (`creator_id`) 
REFERENCES `accounts` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT ;

-- 2013-11-24 --

DROP TABLE IF EXISTS `files`;
CREATE TABLE IF NOT EXISTS `files` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `path` varchar(255) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) DEFAULT NULL,
  `account_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `main_sysdev_project_docs`;
CREATE TABLE IF NOT EXISTS `main_sysdev_project_docs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(11) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `main_sysdev_project_docs_versions`;
CREATE TABLE IF NOT EXISTS `main_sysdev_project_docs_versions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_id` int(10) unsigned DEFAULT NULL,
  `file_id` int(10) unsigned DEFAULT NULL,
  `version` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `file_id` (`file_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=36 ;

ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

ALTER TABLE `main_sysdev_project_docs`
  ADD CONSTRAINT `main_sysdev_project_docs_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `main_sysdev_projects` (`id`) ON DELETE CASCADE;

ALTER TABLE `main_sysdev_project_docs_versions`
  ADD CONSTRAINT `main_sysdev_project_docs_versions_ibfk_1` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE;
  
-- 2013-12-01 --
  
 DROP TABLE IF EXISTS `doc_types`;
CREATE TABLE `doc_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `main_sysdev_project_docs`;
CREATE TABLE `main_sysdev_project_docs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(11) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `type_id` (`type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

ALTER TABLE `main_sysdev_project_docs`
  ADD CONSTRAINT `main_sysdev_project_docs_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `main_sysdev_projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `main_sysdev_project_docs_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `doc_types` (`id`);
  
-- 2013-12-02 --

ALTER TABLE `catalog_conditioners` DROP `control_type_id`;
DROP TABLE `catalog_conditioners_control_types`;

ALTER TABLE `catalog_conditioners` DROP `connection_type_id`;
DROP TABLE `catalog_conditioners_connection_types`;

ALTER TABLE `catalog_conditioners` DROP `protection_type_id`;
DROP TABLE `catalog_conditioners_protection_types`;

ALTER TABLE `catalog_conditioners` DROP `material_id`;
DROP TABLE `catalog_conditioners_materials`;

DROP TABLE `catalog_conditioners_power_sources`;

ALTER TABLE `catalog_conditioners` DROP `cooling_outdor_temp`;
ALTER TABLE `catalog_conditioners` DROP `heating_outdor_temp`;
ALTER TABLE `catalog_conditioners` DROP `power_supply`;
ALTER TABLE `catalog_conditioners` DROP `cooling_power_consumption`;
ALTER TABLE `catalog_conditioners` DROP `heating_power_consumption`;
ALTER TABLE `catalog_conditioners` DROP `amperage`;
ALTER TABLE `catalog_conditioners` DROP `sensor_inputs`;
ALTER TABLE `catalog_conditioners` DROP `pressure`;
ALTER TABLE `catalog_conditioners` DROP `eer`;
ALTER TABLE `catalog_conditioners` DROP `weight`;
ALTER TABLE `catalog_conditioners` DROP `cable_length`;
ALTER TABLE `catalog_conditioners` DROP `pipe_diameter_liquid`;
ALTER TABLE `catalog_conditioners` DROP `pipe_diameter_gas`;
ALTER TABLE `catalog_conditioners` DROP `drain_diameter`;
ALTER TABLE `catalog_conditioners` DROP `trunk_length`;
ALTER TABLE `catalog_conditioners` DROP `elevation_difference`;
ALTER TABLE `catalog_conditioners` DROP `square`;
ALTER TABLE `catalog_conditioners` DROP `volume`;
ALTER TABLE `catalog_conditioners` DROP `url`;

ALTER TABLE `catalog_conditioners` ADD `heatingcooling_id` INT UNSIGNED NULL AFTER `implementation_type_id`;
ALTER TABLE `catalog_conditioners` ADD `currency_id` INT UNSIGNED NULL AFTER `price`;
ALTER TABLE `catalog_conditioners` ADD `name` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL AFTER `marking`;

-- 2013-12-17 --

DROP TABLE IF EXISTS `experts`;
CREATE TABLE IF NOT EXISTS `experts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(10) unsigned DEFAULT NULL,
  `desc` text,
  `city_id` int(10) unsigned DEFAULT NULL,
  `status_id` int(10) unsigned DEFAULT NULL,
  `equip_id` int(10) unsigned DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  `author_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `status_id` (`status_id`),
  KEY `equip_id` (`equip_id`),
  KEY `author_id` (`author_id`),
  KEY `city_id` (`city_id`),
  KEY `account_id` (`account_id`) 
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TRIGGER IF EXISTS `experts_date_create`;
DELIMITER //
CREATE TRIGGER `experts_date_create` BEFORE INSERT ON `experts`
 FOR EACH ROW BEGIN
set NEW.date_create = NOW();
set NEW.date_update = NOW();
END
//
DELIMITER ;
DROP TRIGGER IF EXISTS `experts_date_udpate`;
DELIMITER //
CREATE TRIGGER `experts_date_udpate` BEFORE UPDATE ON `experts`
 FOR EACH ROW SET NEW.date_update = NOW()
//
DELIMITER ;


DROP TABLE IF EXISTS `experts_docs`;
CREATE TABLE IF NOT EXISTS `experts_docs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `desc` text,
  `doc_type_id` int(10) unsigned DEFAULT NULL,
  `expert_id` int(10) unsigned DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  `author_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doc_type_id` (`doc_type_id`),
  KEY `expert_id` (`expert_id`),
  KEY `author_id` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TRIGGER IF EXISTS `ex_docs_date_create`;
DELIMITER //
CREATE TRIGGER `ex_docs_date_create` BEFORE INSERT ON `experts_docs`
 FOR EACH ROW BEGIN
set NEW.date_create = NOW();
set NEW.date_update = NOW();
END
//
DELIMITER ;
DROP TRIGGER IF EXISTS `ex_docs_date_update`;
DELIMITER //
CREATE TRIGGER `ex_docs_date_update` BEFORE UPDATE ON `experts_docs`
 FOR EACH ROW SET NEW.date_update = NOW()
//
DELIMITER ;

DROP TABLE IF EXISTS `experts_equipment`;
CREATE TABLE IF NOT EXISTS `experts_equipment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  `author_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`) 
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


DROP TRIGGER IF EXISTS `ex_equipment_date_create`;
DELIMITER //
CREATE TRIGGER `ex_equipment_date_create` BEFORE INSERT ON `experts_equipment`
 FOR EACH ROW BEGIN
set NEW.date_create = NOW();
set NEW.date_update = NOW();
END
//
DELIMITER ;
DROP TRIGGER IF EXISTS `ex_equipment_date_update`;
DELIMITER //
CREATE TRIGGER `ex_equipment_date_update` BEFORE UPDATE ON `experts_equipment`
 FOR EACH ROW SET NEW.date_update = NOW()
//
DELIMITER ;

DROP TABLE IF EXISTS `experts_experience`;
CREATE TABLE IF NOT EXISTS `experts_experience` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `desc` text,
  `date_start` varchar(255) DEFAULT NULL,
  `date_end` varchar(255) DEFAULT NULL,
  `expert_id` int(10) unsigned DEFAULT NULL,
  `job_type` int(1) unsigned DEFAULT NULL,
  `doc_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `expert_id` (`expert_id`),
  KEY `doc_id` (`doc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;



DROP TABLE IF EXISTS `experts_job_types`;
CREATE TABLE IF NOT EXISTS `experts_job_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  `author_id` int(11) unsigned DEFAULT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`) 
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


DROP TRIGGER IF EXISTS `ex_job_types_date_create`;
DELIMITER //
CREATE TRIGGER `ex_job_types_date_create` BEFORE INSERT ON `experts_job_types`
 FOR EACH ROW BEGIN
set NEW.date_create = NOW();
set NEW.date_update = NOW();
END
//
DELIMITER ;
DROP TRIGGER IF EXISTS `ex_job_types_date_update`;
DELIMITER //
CREATE TRIGGER `ex_job_types_date_update` BEFORE UPDATE ON `experts_job_types`
 FOR EACH ROW SET NEW.date_update = NOW()
//
DELIMITER ;


DROP TABLE IF EXISTS `experts_rating`;
CREATE TABLE IF NOT EXISTS `experts_rating` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  `author_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TRIGGER IF EXISTS `ex_rating_date_create`;
DELIMITER //
CREATE TRIGGER `ex_rating_date_create` BEFORE INSERT ON `experts_rating`
 FOR EACH ROW BEGIN
set NEW.date_create = NOW();
set NEW.date_update = NOW();
END
//
DELIMITER ;
DROP TRIGGER IF EXISTS `ex_rating_date_update`;
DELIMITER //
CREATE TRIGGER `ex_rating_date_update` BEFORE UPDATE ON `experts_rating`
 FOR EACH ROW SET NEW.date_update = NOW()
//
DELIMITER ;

DROP TABLE IF EXISTS `experts_statuses`;
CREATE TABLE IF NOT EXISTS `experts_statuses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `desc` text,
  `date_create` datetime NOT NULL,
  `date_update` datetime DEFAULT NULL,
  `author_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`) 
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

DROP TRIGGER IF EXISTS `ex_statuses_date_create`;
DELIMITER //
CREATE TRIGGER `ex_statuses_date_create` BEFORE INSERT ON `experts_statuses`
 FOR EACH ROW BEGIN
set NEW.date_create = NOW();
set NEW.date_update = NOW();
END
//
DELIMITER ;
DROP TRIGGER IF EXISTS `ex_statuses_date_update`;
DELIMITER //
CREATE TRIGGER `ex_statuses_date_update` BEFORE UPDATE ON `experts_statuses`
 FOR EACH ROW SET NEW.date_update = NOW()
//
DELIMITER ;

ALTER TABLE `experts`
  ADD CONSTRAINT `experts_ibfk_1` FOREIGN KEY (`equip_id`) REFERENCES `experts_equipment` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `experts_statuses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_4` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_5` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

ALTER TABLE `experts_docs`
  ADD CONSTRAINT `experts_docs_ibfk1` FOREIGN KEY (`doc_type_id`) REFERENCES `doc_types` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_docs_ibfk2` FOREIGN KEY (`expert_id`) REFERENCES `experts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `experts_docs_ibfk3` FOREIGN KEY (`author_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

ALTER TABLE `experts_equipment`
  ADD CONSTRAINT `experts_equipment_ibfk1` FOREIGN KEY (`author_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

ALTER TABLE `experts_experience`
  ADD CONSTRAINT `experts_experience_ibfk1` FOREIGN KEY (`expert_id`) REFERENCES `experts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `experts_experience_ibfk2` FOREIGN KEY (`doc_id`) REFERENCES `experts_docs` (`id`) ON DELETE SET NULL;

ALTER TABLE `experts_job_types`
  ADD CONSTRAINT `experts_job_types_ibfk1` FOREIGN KEY (`author_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

ALTER TABLE `experts_rating`
  ADD CONSTRAINT `experts_rating_ibfk1` FOREIGN KEY (`author_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

ALTER TABLE `experts_statuses`
  ADD CONSTRAINT `experts_statuses_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;
  
-- 2013-12-18 --

ALTER TABLE  `main_sysdev_project_docs_versions` ADD INDEX (  `doc_id` );
ALTER TABLE  `main_sysdev_project_docs_versions` ADD FOREIGN KEY (  `doc_id` ) 
REFERENCES  `main_sysdev_project_docs` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT ;

DROP TABLE IF EXISTS `crm_projects_docs`;
CREATE TABLE IF NOT EXISTS `crm_projects_docs` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `project_id` int(11) unsigned NOT NULL,
  `name` varchar(255) default NULL,
  `type_id` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `project_id` (`project_id`),
  KEY `type_id` (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `crm_projects_docs_versions`;
CREATE TABLE IF NOT EXISTS `crm_projects_docs_versions` (
  `id` int(11) NOT NULL auto_increment,
  `doc_id` int(10) unsigned default NULL,
  `file_id` int(10) unsigned default NULL,
  `version` int(10) unsigned default NULL,
  PRIMARY KEY  (`id`),
  KEY `file_id` (`file_id`),
  KEY `doc_id` (`doc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `crm_projects_docs`
  ADD CONSTRAINT `crm_projects_docs_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `doc_types` (`id`),
  ADD CONSTRAINT `crm_projects_docs_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `crm_projects` (`id`) ON DELETE CASCADE;

ALTER TABLE `crm_projects_docs_versions`
  ADD CONSTRAINT `crm_projects_docs_versions_ibfk_2` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `crm_projects_docs_versions_ibfk_1` FOREIGN KEY (`doc_id`) REFERENCES `crm_projects_docs` (`id`) ON DELETE CASCADE;
  
-- 2013-12-21 --

ALTER TABLE `accounts` DROP `country`,  DROP `city`;

ALTER TABLE `accounts` 
ADD `country_id` INT UNSIGNED NULL DEFAULT NULL, 
ADD `city_id` INT UNSIGNED NULL DEFAULT NULL;

ALTER TABLE `accounts` ADD INDEX (`country_id`);
ALTER TABLE `accounts` ADD INDEX (`city_id`);

ALTER TABLE `accounts` ADD FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE `accounts` ADD FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;


DROP TABLE IF EXISTS `crm_projects_discussions`;
CREATE TABLE IF NOT EXISTS `crm_projects_discussions` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `content` text,
  `date_create` datetime NOT NULL,
  `account_id` int(11) unsigned default NULL,
  `project_id` int(11) unsigned default NULL,
  PRIMARY KEY  (`id`),
  KEY `sysdev_project_discussions_ibfk_1` (`account_id`),
  KEY `sysdev_project_discussions_ibfk_2` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `crm_projects_discussions`
  ADD CONSTRAINT `crm_projects_discussions_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `crm_projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `crm_projects_discussions_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

-- 2013-12-24 --

DROP TABLE IF EXISTS `sysdev_description`;

ALTER TABLE `accounts` DROP `email`;
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_ibfk_1`;
ALTER TABLE `accounts` DROP INDEX `country_id`;
ALTER TABLE `accounts` DROP `country_id`;

DROP TABLE IF EXISTS `experts`;
CREATE TABLE `experts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(10) unsigned DEFAULT NULL,
  `desc` text,
  `status_id` int(10) unsigned DEFAULT NULL,
  `equip_id` int(10) unsigned DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  `author_id` int(11) unsigned DEFAULT NULL,
  `active` int(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `status_id` (`status_id`),
  KEY `equip_id` (`equip_id`),
  KEY `author_id` (`author_id`),
  KEY `account_id` (`account_id`) 
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=45 ;

DROP TRIGGER IF EXISTS `experts_date_create`;
DELIMITER //
CREATE TRIGGER `experts_date_create` BEFORE INSERT ON `experts`
 FOR EACH ROW BEGIN
set NEW.date_create = NOW();
set NEW.date_update = NOW();
END
//
DELIMITER ;
DROP TRIGGER IF EXISTS `experts_date_udpate`;
DELIMITER //
CREATE TRIGGER `experts_date_udpate` BEFORE UPDATE ON `experts`
 FOR EACH ROW SET NEW.date_update = NOW()
//
DELIMITER ;

ALTER TABLE `experts`
  ADD CONSTRAINT `experts_ibfk_1` FOREIGN KEY (`equip_id`) REFERENCES `experts_equipment` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `experts_statuses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_5` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

SET FOREIGN_KEY_CHECKS=1;