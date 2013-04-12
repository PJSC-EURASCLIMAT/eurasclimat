--
-- Переименование таблиц на префикс main_
--
RENAME TABLE sysdev_projects TO main_sysdev_projects,
  sysdev_project_discussions TO main_sysdev_project_discussions,
  sysdev_project_docs TO main_sysdev_project_docs,
  sysdev_project_stages TO main_sysdev_project_stages,
  sysdev_project_votes TO main_sysdev_project_votes;
   

-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Апр 11 2013 г., 01:19
-- Версия сервера: 5.5.16
-- Версия PHP: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `evrazclimat`
--

-- --------------------------------------------------------

--
-- Структура таблицы `sysdev_projects`
--

CREATE TABLE IF NOT EXISTS `sysdev_projects` (
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
-- Дамп данных таблицы `sysdev_projects`
--

INSERT INTO `sysdev_projects` (`id`, `name`, `parent_id`, `account_id`, `extended`, `description`, `date_plan_begin`, `date_plan_end`, `date_fact_end`, `date_vote_begin`, `date_vote_end`, `date_discuss_begin`, `date_discuss_end`, `date_create`, `leaf`, `budget`) VALUES
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

-- --------------------------------------------------------

--
-- Структура таблицы `sysdev_project_discussions`
--

CREATE TABLE IF NOT EXISTS `sysdev_project_discussions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content` text,
  `date_create` datetime NOT NULL,
  `account_id` int(11) unsigned DEFAULT NULL,
  `project_id` int(11) unsigned DEFAULT NULL,
  `approved` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `sysdev_project_discussions_ibfk_1` (`account_id`),
  KEY `sysdev_project_discussions_ibfk_2` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `sysdev_project_docs`
--

CREATE TABLE IF NOT EXISTS `sysdev_project_docs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(11) unsigned DEFAULT NULL,
  `project_id` int(11) unsigned DEFAULT NULL,
  `date_create` datetime NOT NULL,
  `url` varchar(1000) DEFAULT NULL,
  `visible` tinyint(4) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sysdev_project_docs_ibfk_1` (`account_id`),
  KEY `sysdev_project_docs_ibfk_2` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `sysdev_project_docs`
--

INSERT INTO `sysdev_project_docs` (`id`, `account_id`, `project_id`, `date_create`, `url`, `visible`, `name`) VALUES
(1, 1, 2, '2013-04-05 16:00:19', '#', 1, 'Техническое задание'),
(2, 1, 2, '2013-04-05 16:00:58', '#', 1, 'Акт приема-передачи работ'),
(3, 1, 2, '2013-04-05 16:02:17', '#', 1, 'Руководство пользователя'),
(4, 1, 2, '2013-04-05 16:02:53', '#', 1, 'Руководство для разработчика'),
(5, 1, 2, '2013-04-05 16:04:26', '#', 1, 'Смета');

-- --------------------------------------------------------

--
-- Структура таблицы `sysdev_project_stages`
--

CREATE TABLE IF NOT EXISTS `sysdev_project_stages` (
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
  KEY `sysdev_project_stages_ibfk_2` (`project_id`),
  KEY `sysdev_project_stages_ibfk_1` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `sysdev_project_stages`
--

INSERT INTO `sysdev_project_stages` (`id`, `name`, `date_plan_begin`, `date_plan_end`, `date_fact_begin`, `date_fact_end`, `account_id`, `project_id`, `date_create`, `index`) VALUES
(1, 'Составление  технического задания', '2013-04-05 00:00:00', '2013-04-08 16:06:31', '2013-04-10 16:06:35', '2013-04-12 16:06:40', 1, 2, '2013-04-05 16:06:47', 1),
(2, 'Составление договора', '2013-04-09 00:00:00', '2013-04-12 16:07:24', '2013-04-13 16:07:30', '2013-04-15 16:07:54', 1, 2, '2013-04-05 16:08:28', 2),
(3, 'Разработка', '2013-04-13 00:00:00', '2013-04-15 16:09:07', '2013-04-14 16:09:16', '2013-04-15 16:09:21', 1, 2, '2013-04-05 16:09:30', 3),
(4, 'Тестирование', '2013-04-15 16:09:47', '2013-04-16 16:09:56', '2013-05-15 16:10:03', '2013-04-18 16:10:14', 1, 2, '2013-04-05 16:10:22', 4),
(5, 'Внедрение', '2013-04-16 16:11:23', '2013-04-17 16:11:28', '2013-04-19 16:11:33', '2013-04-20 16:11:36', 1, 2, '2013-05-07 16:11:42', 5),
(6, 'Сдача все работ', '2013-04-20 16:12:01', '2013-04-21 16:12:18', '2013-04-22 16:12:25', '2013-04-25 16:12:40', 1, 2, '2013-04-05 16:12:54', 6);

-- --------------------------------------------------------

--
-- Структура таблицы `sysdev_project_votes`
--

CREATE TABLE IF NOT EXISTS `sysdev_project_votes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `mark_id` tinyint(4) NOT NULL,
  `project_id` int(11) unsigned DEFAULT NULL,
  `account_id` int(11) unsigned DEFAULT NULL,
  `date_create` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sysdev_project_votes_ibfk_1` (`account_id`),
  KEY `sysdev_project_votes_ibfk_2` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `sysdev_projects`
--
ALTER TABLE `sysdev_projects`
  ADD CONSTRAINT `sysdev_projects_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `sysdev_project_discussions`
--
ALTER TABLE `sysdev_project_discussions`
  ADD CONSTRAINT `sysdev_project_discussions_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `sysdev_project_discussions_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `sysdev_projects` (`id`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `sysdev_project_docs`
--
ALTER TABLE `sysdev_project_docs`
  ADD CONSTRAINT `sysdev_project_docs_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `sysdev_project_docs_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `sysdev_projects` (`id`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `sysdev_project_stages`
--
ALTER TABLE `sysdev_project_stages`
  ADD CONSTRAINT `sysdev_project_stages_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `sysdev_project_stages_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `sysdev_projects` (`id`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `sysdev_project_votes`
--
ALTER TABLE `sysdev_project_votes`
  ADD CONSTRAINT `sysdev_project_votes_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `sysdev_project_votes_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `sysdev_projects` (`id`) ON DELETE SET NULL;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


--
-- Добавление ресурсов 
--
INSERT INTO acl_resources (id, name, title, parent_id) 
VALUES 
(19, 'projectdev', 'Сведения о проекте по разработке системы', NULL),
(20, 'info', 'Информация о проекте', 19),
(21, 'stages', 'Сведения об исполнении проекта', 19),
(22, 'docs', 'Документация проекта', 19),
(23, 'chart', 'Сведения об исполнении проекта (диаграмма)', 19),
(24, 'comments', 'Обсуждение проекта', 19),
(25, 'votes', 'Голосование по проекту', 19);