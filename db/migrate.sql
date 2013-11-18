SET FOREIGN_KEY_CHECKS=0;


DROP TABLE IF EXISTS `files`;
CREATE TABLE IF NOT EXISTS `files` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `path` varchar(255) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) DEFAULT NULL,
  `account_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=54 ;


ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;


DROP TABLE IF EXISTS `main_sysdev_project_docs`;
CREATE TABLE IF NOT EXISTS `main_sysdev_project_docs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(11) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=46 ;


ALTER TABLE `main_sysdev_project_docs`
  ADD CONSTRAINT `main_sysdev_project_docs_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `main_sysdev_projects` (`id`) ON DELETE CASCADE;



DROP TABLE IF EXISTS `main_sysdev_project_docs_versions`;
CREATE TABLE IF NOT EXISTS `main_sysdev_project_docs_versions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_id` int(10) unsigned DEFAULT NULL,
  `file_id` int(10) unsigned DEFAULT NULL,
  `version` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `file_id` (`file_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=36 ;


ALTER TABLE `main_sysdev_project_docs_versions`
  ADD CONSTRAINT `main_sysdev_project_docs_versions_ibfk_1` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE;



SET FOREIGN_KEY_CHECKS=1;