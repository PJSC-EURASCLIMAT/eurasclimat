--
-- Структура таблицы `files`
--

DROP TABLE IF EXISTS `files`;
CREATE TABLE IF NOT EXISTS `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `account_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  KEY `account_id_2` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Ограничения внешнего ключа таблицы `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;


--
-- Структура таблицы `main_sysdev_project_docs`
--

DROP TABLE IF EXISTS `main_sysdev_project_docs`;
CREATE TABLE IF NOT EXISTS `main_sysdev_project_docs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(11) unsigned DEFAULT NULL,
  `project_id` int(11) unsigned DEFAULT NULL,
  `file_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `main_sysdev_project_docs_ibfk_1` (`account_id`),
  KEY `main_sysdev_project_docs_ibfk_2` (`project_id`),
  KEY `file_id` (`file_id`),
  KEY `file_id_2` (`file_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=87 ;

--
-- Ограничения внешнего ключа таблицы `main_sysdev_project_docs`
--
ALTER TABLE `main_sysdev_project_docs`
  ADD CONSTRAINT `main_sysdev_project_docs_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `main_sysdev_project_docs_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `main_sysdev_projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `main_sysdev_project_docs_ibfk_4` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE;
