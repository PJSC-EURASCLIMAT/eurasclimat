SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE IF NOT EXISTS `crm_demoprojects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creator_id` int(10) unsigned DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `address` text,
  `object_type` text,
  `area` int(11) DEFAULT NULL,
  `description` text,
  `stage` set('preparation','coordination','execution','implementation') NOT NULL DEFAULT 'preparation',
  `preparation` timestamp NULL DEFAULT NULL,
  `coordination` timestamp NULL DEFAULT NULL,
  `execution` timestamp NULL DEFAULT NULL,
  `implementation` timestamp NULL DEFAULT NULL,
  `sys_cond` int(11) DEFAULT NULL,
  `sys_vent` int(11) DEFAULT NULL,
  `sys_heat` int(11) DEFAULT NULL,
  `sys_water` int(11) DEFAULT NULL,
  `sys_electricity` int(11) DEFAULT NULL,
  `sys_automation` int(11) DEFAULT NULL,
  `sys_canal` int(11) DEFAULT NULL,
  `sys_fire` int(11) DEFAULT NULL,
  `sys_security` int(11) DEFAULT NULL,
  `sys_internet` int(11) DEFAULT NULL,
  `sys_phone` int(11) DEFAULT NULL,
  `sys_radio` int(11) DEFAULT NULL,
  `sys_tv` int(11) DEFAULT NULL,
  `sys_dispatch` int(11) DEFAULT NULL,
  `sys_clean` int(11) DEFAULT NULL,
  `serv_project` int(11) DEFAULT NULL,
  `serv_logistic` int(11) DEFAULT NULL,
  `serv_execution` int(11) DEFAULT NULL,
  `serv_implementation` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_id` (`creator_id`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `crm_demoprojects_discussions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content` text,
  `date_create` datetime NOT NULL,
  `account_id` int(11) unsigned DEFAULT NULL,
  `project_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `crm_demoprojects_docs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(11) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `type_id` (`type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `crm_demoprojects_docs_versions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_id` int(10) unsigned DEFAULT NULL,
  `file_id` int(10) unsigned DEFAULT NULL,
  `version` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `file_id` (`file_id`),
  KEY `doc_id` (`doc_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `crm_demoprojects_equipment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `entity` varchar(255) NOT NULL,
  `entity_id` int(10) unsigned NOT NULL,
  `number` int(10) unsigned DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `crm_demoprojects_equipment_services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `eq_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  `term` varchar(255) DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`),
  KEY `eq_id` (`eq_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `crm_demoprojects_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `crm_demoprojects_members` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `account_id` int(10) unsigned NOT NULL,
  `role` enum('customer','manager','projector','logistic','productor') NOT NULL DEFAULT 'customer',
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `crm_demoprojects_special_services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  `number` int(10) unsigned DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  `term` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `crm_demoprojects_special_services_expendables` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ss_id` int(10) unsigned NOT NULL,
  `expendable_id` int(10) unsigned NOT NULL,
  `measure` varchar(255) DEFAULT NULL,
  `number` double(10,3) DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `expendable_id` (`expendable_id`),
  KEY `ss_id` (`ss_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


ALTER TABLE `crm_demoprojects`
  ADD CONSTRAINT `crm_demoprojects_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `crm_demoprojects_ibfk_2` FOREIGN KEY (`creator_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `crm_demoprojects_ibfk_3` FOREIGN KEY (`group_id`) REFERENCES `crm_demoprojects_groups` (`id`);

ALTER TABLE `crm_demoprojects_discussions`
  ADD CONSTRAINT `crm_demoprojects_discussions_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `crm_demoprojects_discussions_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `crm_demoprojects` (`id`) ON DELETE CASCADE;

ALTER TABLE `crm_demoprojects_docs`
  ADD CONSTRAINT `crm_demoprojects_docs_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `crm_demoprojects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `crm_demoprojects_docs_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `doc_types` (`id`);

ALTER TABLE `crm_demoprojects_docs_versions`
  ADD CONSTRAINT `crm_demoprojects_docs_versions_ibfk_1` FOREIGN KEY (`doc_id`) REFERENCES `crm_demoprojects_docs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `crm_demoprojects_docs_versions_ibfk_2` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE;

ALTER TABLE `crm_demoprojects_equipment`
  ADD CONSTRAINT `crm_demoprojects_equipment_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `crm_demoprojects` (`id`) ON DELETE CASCADE;

ALTER TABLE `crm_demoprojects_equipment_services`
  ADD CONSTRAINT `crm_demoprojects_equipment_services_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`),
  ADD CONSTRAINT `crm_demoprojects_equipment_services_ibfk_2` FOREIGN KEY (`eq_id`) REFERENCES `crm_demoprojects_equipment` (`id`) ON DELETE CASCADE;

ALTER TABLE `crm_demoprojects_members`
  ADD CONSTRAINT `crm_demoprojects_members_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `crm_demoprojects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `crm_demoprojects_members_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE;

ALTER TABLE `crm_demoprojects_special_services`
  ADD CONSTRAINT `crm_demoprojects_special_services_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `crm_demoprojects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `crm_demoprojects_special_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_special_services` (`id`);

ALTER TABLE `crm_demoprojects_special_services_expendables`
  ADD CONSTRAINT `crm_demoprojects_special_services_expendables_ibfk_1` FOREIGN KEY (`expendable_id`) REFERENCES `catalog_expendables` (`id`),
  ADD CONSTRAINT `crm_demoprojects_special_services_expendables_ibfk_2` FOREIGN KEY (`ss_id`) REFERENCES `crm_demoprojects_special_services` (`id`) ON DELETE CASCADE;

SET FOREIGN_KEY_CHECKS=1;