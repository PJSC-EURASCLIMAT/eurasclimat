SET FOREIGN_KEY_CHECKS=0;

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


SET FOREIGN_KEY_CHECKS=1;