SET FOREIGN_KEY_CHECKS=0;

--- 23/01 ---

DROP TABLE IF EXISTS `crm_projects_services`;
DROP TABLE IF EXISTS `crm_projects_expendables`;

ALTER TABLE `catalog_expendables` CHANGE `price` `price` DOUBLE(10,2) NULL;
ALTER TABLE `catalog_special_services` CHANGE `price` `price` DOUBLE(10,2) NULL;

DROP TABLE IF EXISTS `crm_projects_special_services`;
CREATE TABLE IF NOT EXISTS `crm_projects_special_services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  `number` int(10) unsigned DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  `term` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `crm_projects_equipment` CHANGE `number` `number` INT(10) UNSIGNED NULL;
ALTER TABLE `crm_projects_equipment` ADD `price` DOUBLE( 10, 2 ) NULL;

DROP TABLE IF EXISTS `crm_projects_special_services_expendables`;
CREATE TABLE IF NOT EXISTS `crm_projects_special_services_expendables` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ss_id` int(10) unsigned NOT NULL,
  `expendable_id` int(10) unsigned NOT NULL,
  `measure` varchar(255) DEFAULT NULL,
  `number` DOUBLE(10,3) DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `expendable_id` (`expendable_id`),
  KEY `ss_id` (`ss_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `crm_projects_equipment_services`;
CREATE TABLE IF NOT EXISTS `crm_projects_equipment_services` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `eq_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  `term` varchar(255) default NULL,
  `price` double(10,2) default NULL,
  PRIMARY KEY  (`id`),
  KEY `service_id` (`service_id`),
  KEY `eq_id` (`eq_id`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `catalog_special_services_expendables`;
CREATE TABLE IF NOT EXISTS `catalog_special_services_expendables` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `service_id` int(10) unsigned NOT NULL,
  `expendable_id` int(10) unsigned NOT NULL,
  `number` double(10,3) DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`),
  KEY `expendable_id` (`expendable_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

ALTER TABLE `crm_projects_equipment_services`
  ADD CONSTRAINT `crm_projects_equipment_services_ibfk_2` 
    FOREIGN KEY (`eq_id`) REFERENCES `crm_projects_equipment` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `crm_projects_equipment_services_ibfk_1` 
    FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`);

ALTER TABLE `experts` ADD `experience` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL;
ALTER TABLE `experts` ADD `rating` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL;

ALTER TABLE `experts_docs` ADD  `file_id` INT(10) UNSIGNED NULL;
ALTER TABLE `experts_docs` ADD INDEX (`file_id`);

ALTER TABLE `experts_docs` ADD FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

ALTER TABLE `crm_projects_special_services_expendables`
  ADD CONSTRAINT `crm_projects_special_services_expendables_ibfk_2` FOREIGN KEY (`ss_id`) REFERENCES `crm_projects_special_services` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `crm_projects_special_services_expendables_ibfk_1` FOREIGN KEY (`expendable_id`) REFERENCES `catalog_expendables` (`id`);

ALTER TABLE `crm_projects_special_services`
  ADD CONSTRAINT `crm_projects_special_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `catalog_special_services` (`id`),
  ADD CONSTRAINT `crm_projects_special_services_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `crm_projects` (`id`) ON DELETE CASCADE;

ALTER TABLE `catalog_special_services_expendables`
  ADD CONSTRAINT `catalog_special_services_expendables_ibfk_2` FOREIGN KEY (`expendable_id`) REFERENCES `catalog_expendables` (`id`),
  ADD CONSTRAINT `catalog_special_services_expendables_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `catalog_special_services` (`id`) ON DELETE CASCADE;

--- 31/01 ---
  
  ALTER TABLE `crm_projects` 
    ADD `preparation` TIMESTAMP NULL , 
    ADD `coordination` TIMESTAMP NULL , 
    ADD `execution` TIMESTAMP NULL , 
    ADD `implementation` TIMESTAMP NULL ;

--- 02/02 ---

ALTER TABLE `experts` CHANGE `rating` `rating` INT(10) UNSIGNED NULL DEFAULT NULL;

CREATE TABLE `experts2job_types` (
  `expert_id` int(10) unsigned NOT NULL,
  `job_type_id` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `expert_id` (`expert_id`),
  KEY `job_type_id` (`job_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

ALTER TABLE `experts2job_types`
  ADD CONSTRAINT `experts2job_types_ibfk_1` FOREIGN KEY (`expert_id`) REFERENCES `experts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `experts2job_types_ibfk_3` FOREIGN KEY (`job_type_id`) REFERENCES `experts_job_types` (`id`) ON DELETE CASCADE;

--- 04/02 ---

ALTER TABLE `experts` 
    ADD `work_years` INT( 2 ) NULL ,
    ADD  `study_years` INT( 2 ) NULL ,
    ADD  `sert_count` INT( 2 ) NULL ;
ALTER TABLE `experts` DROP `experience` ;

--- 07/02 ---

ALTER TABLE `crm_projects` 
    ADD `customer_id` INT UNSIGNED NULL AFTER `creator_id`, 
    ADD INDEX (`customer_id`) ;
ALTER TABLE `crm_projects` 
    ADD `manager_id` INT UNSIGNED NULL AFTER `customer_id`, 
    ADD INDEX (`manager_id`) ;
ALTER TABLE `crm_projects` ADD `stage` 
    SET('preparation','coordination','execution','implementation') 
    NOT NULL DEFAULT 'preparation' AFTER `manager_id`;
ALTER TABLE `crm_projects` ADD `address` TEXT NULL AFTER `customer_id`;
ALTER TABLE `crm_projects` ADD `object_type` TEXT NULL AFTER `address`;
ALTER TABLE `crm_projects` ADD `area` INT NULL AFTER `object_type`;
ALTER TABLE `crm_projects` ADD `description` TEXT NULL AFTER `area`;

ALTER TABLE `crm_projects` 
    ADD `sys_cond` INT NULL , 
    ADD `sys_vent` INT NULL , 
    ADD `sys_heat` INT NULL , 
    ADD `sys_water` INT NULL , 
    ADD `sys_electricity` INT NULL , 
    ADD `sys_automation` INT NULL , 
    ADD `sys_canal` INT NULL , 
    ADD `sys_fire` INT NULL , 
    ADD `sys_security` INT NULL , 
    ADD `sys_internet` INT NULL , 
    ADD `sys_phone` INT NULL , 
    ADD `sys_radio` INT NULL , 
    ADD `sys_tv` INT NULL , 
    ADD `sys_dispatch` INT NULL , 
    ADD `sys_clean` INT NULL ;

ALTER TABLE `crm_projects` 
    ADD `serv_project` INT NULL , 
    ADD `serv_logistic` INT NULL , 
    ADD `serv_execution` INT NULL , 
    ADD `serv_implementation` INT NULL ;

ALTER TABLE `crm_projects` ADD FOREIGN KEY (`customer_id`) 
    REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;
ALTER TABLE `crm_projects` ADD FOREIGN KEY (`manager_id`) 
    REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

--- 22/02 ---

ALTER TABLE `messages` ADD `type` INT(2) UNSIGNED NULL DEFAULT NULL ;
ALTER TABLE `messages` ADD `subject` VARCHAR(255) NULL DEFAULT NULL ;
ALTER TABLE `messages` ADD `deleted` INT(1) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE `messages` ADD `owner_id` INT(10) UNSIGNED NOT NULL, ADD INDEX (`owner_id`);

ALTER TABLE `messages` 
    ADD `sender_name` VARCHAR(255) NULL DEFAULT NULL,
    ADD `receiver_name` VARCHAR(255) NULL DEFAULT NULL;

ALTER TABLE `messages` ADD FOREIGN KEY (`receiver_id`) 
    REFERENCES `accounts` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT;
ALTER TABLE `messages` ADD FOREIGN KEY (`owner_id`) 
    REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

DROP TABLE IF EXISTS `calcpd_obj_class`;
CREATE TABLE IF NOT EXISTS `calcpd_obj_class` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `calcpd_obj_type`;
CREATE TABLE IF NOT EXISTS `calcpd_obj_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `calcpd_serv`;
CREATE TABLE IF NOT EXISTS `calcpd_serv` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `calcpd_price`;
CREATE TABLE IF NOT EXISTS `calcpd_price` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `serv_id` int(10) unsigned NOT NULL,
  `obj_type_id` int(10) unsigned NOT NULL,
  `obj_class_id` int(10) unsigned NOT NULL,
  `price` double(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `serv_id` (`serv_id`),
  KEY `obj_type_id` (`obj_type_id`),
  KEY `obj_class_id` (`obj_class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `calcpd_price`
  ADD CONSTRAINT `calcpd_price_ibfk_1` FOREIGN KEY (`serv_id`) REFERENCES `calcpd_serv` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `calcpd_price_ibfk_2` FOREIGN KEY (`obj_type_id`) REFERENCES `calcpd_obj_type` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `calcpd_price_ibfk_3` FOREIGN KEY (`obj_class_id`) REFERENCES `calcpd_obj_class` (`id`) ON DELETE CASCADE;

--- 27/02 ---

DROP TABLE IF EXISTS `calcpd`;
CREATE TABLE IF NOT EXISTS `calcpd` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `obj_type_id` int(10) unsigned NOT NULL,
  `account_id` int(10) unsigned DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `obj_type_id` (`obj_type_id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `calcpd_content`;
CREATE TABLE IF NOT EXISTS `calcpd_content` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `serv_id` int(10) unsigned NOT NULL,
  `obj_type_id` int(10) unsigned NOT NULL,
  `obj_class_id` int(10) unsigned NOT NULL,
  `square` double(10,3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `obj_type_id` (`obj_type_id`),
  KEY `obj_class_id` (`obj_class_id`),
  KEY `serv_id` (`serv_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `calcpd`
  ADD CONSTRAINT `calcpd_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `calcpd_ibfk_1` FOREIGN KEY (`obj_type_id`) REFERENCES `calcpd_obj_type` (`id`);

ALTER TABLE `calcpd_content`
  ADD CONSTRAINT `calcpd_content_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `calcpd` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `calcpd_content_ibfk_2` FOREIGN KEY (`serv_id`) REFERENCES `calcpd_serv` (`id`),
  ADD CONSTRAINT `calcpd_content_ibfk_3` FOREIGN KEY (`obj_type_id`) REFERENCES `calcpd_obj_type` (`id`),
  ADD CONSTRAINT `calcpd_content_ibfk_4` FOREIGN KEY (`obj_class_id`) REFERENCES `calcpd_obj_class` (`id`);

--- 05/03 ---

ALTER TABLE `calcpd_price` CHANGE `price`  `price1` DOUBLE(10,2) UNSIGNED NOT NULL;
ALTER TABLE `calcpd_price` 
    ADD `price2` DOUBLE(10,2) UNSIGNED NOT NULL , 
    ADD `price3` DOUBLE(10,2) UNSIGNED NOT NULL , 
    ADD `price4` DOUBLE(10,2) UNSIGNED NOT NULL , 
    ADD `price5` DOUBLE(10,2) UNSIGNED NOT NULL ;

--- 15/03 ---

CREATE TABLE `accounts_contacts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `owner_id` int(10) unsigned NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  KEY `contact_id` (`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `accounts_contacts`
  ADD CONSTRAINT `accounts_contacts_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `accounts_contacts_ibfk_2` FOREIGN KEY (`contact_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE;

ALTER TABLE `crm_projects` DROP FOREIGN KEY `crm_projects_ibfk_4`; 
ALTER TABLE `crm_projects` DROP FOREIGN KEY `crm_projects_ibfk_5`;

ALTER TABLE `crm_projects` DROP INDEX `customer_id`;
ALTER TABLE `crm_projects` DROP INDEX `manager_id`;

ALTER TABLE `crm_projects` DROP `manager_id`;
ALTER TABLE `crm_projects` CHANGE `customer_id` `customer_name` VARCHAR(255) NULL DEFAULT NULL;

--- 16/03 ---

DROP TABLE IF EXISTS `crm_projects_members`;
CREATE TABLE IF NOT EXISTS `crm_projects_members` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `account_id` int(10) unsigned NOT NULL,
  `role` enum('customer','manager','projector','logistic','productor') NOT NULL DEFAULT 'customer',
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `crm_projects_members`
  ADD CONSTRAINT `crm_projects_members_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `crm_projects_members_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `crm_projects` (`id`) ON DELETE CASCADE;
  
--- 21/03 ---  

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

  --- 13/04 ---  
  
  CREATE TABLE `courses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `group_id` int(10) unsigned DEFAULT NULL,
  `closed` tinyint(1) NOT NULL DEFAULT '0',
  `offer_num` varchar(50) DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=190 ;

INSERT INTO `courses` (`id`, `name`, `description`, `group_id`, `closed`, `offer_num`, `price`) VALUES
(1, 'Безопасная эксплуатация газового хозяйства (персонал)', '', 1, 0, '1032689-13', 3000.00),
(2, 'Безопасная эксплуатация дымовых и вентиляционных труб (персонал)', '', 1, 0, '1032692-13', 3000.00),
(3, 'Безопасная эксплуатация котельных (персонал)', '', 1, 0, '1032694-13', 3000.00),
(4, 'Безопасная эксплуатация паровых и водогрейных котлов (персонал)', '', 1, 0, '1032696-13', 3000.00),
(5, 'Безопасная эксплуатация сосудов, работающих под давлением (персонал)', '', 1, 0, '1032698-13', 3000.00),
(6, 'Безопасная эксплуатация трубопроводов пара и горячей воды (персонал)', '', 1, 0, '1032714-13', 3000.00),
(7, 'Верхолазные работы/работы на высоте (персонал)', '', 1, 0, '1032845-13', 3000.00),
(8, 'Водитель погрузчика (автомобильного)', '', 1, 0, '1032890-13', 3500.00),
(9, 'Водитель погрузчика (аккумуляторного)', '', 1, 0, '1032892-13', 3000.00),
(10, 'Газорезчик', '', 1, 0, '1032716-13', 2500.00),
(11, 'Газорезчик (пропан-бутан)', '', 1, 0, '1032718-13', 3000.00),
(12, 'Газосварщик', '', 1, 0, '1032719-13', 2500.00),
(13, 'Изолировщик', '', 1, 0, '1032895-13', 2500.00),
(14, 'Каменщик', '', 1, 0, '1032914-13', 2500.00),
(15, 'Кровельщик (мягкая кровля)', '', 1, 0, '1032771-13', 2500.00),
(16, 'Кровельщик (стальная кровля)', '', 1, 0, '1032773-13', 2500.00),
(17, 'Кровельщик (пропан-бутан)', '', 1, 0, '1032775-13', 3000.00),
(18, 'Лифтер', '', 1, 0, '1032769-13', 2500.00),
(19, 'Маляр', '', 1, 0, '1032915-13', 2500.00),
(20, 'Машинист грузопассажирского строительного подъемника', '', 1, 0, '1032946-13', 4500.00),
(21, 'Машинист грузового строительного подъемника', '', 1, 0, '1032947-13', 3000.00),
(22, 'Машинист двигателей внутреннего сгорания', '', 1, 0, '1032948-13', 5000.00),
(23, 'Машинист компрессорных установок', '', 1, 0, '1032949-13', 3000.00),
(24, 'Машинист крана (крановщик), все типы кранов', '', 1, 0, '953281-13', 4500.00),
(25, 'Машинист кран-балки и электротельфера', '', 1, 0, '1032950-13', 2500.00),
(26, 'Машинист передвижных электростанций', '', 1, 0, '1032952-13', 5000.00),
(27, 'Машинист подъемников (вышек)', '', 1, 0, '955704-13', 4500.00),
(28, 'Машинист подъемников (фасадных)', '', 1, 0, '1032954-13', 3500.00),
(29, 'Монтажник санитарно-технических систем', '', 1, 0, '1032961-13', 2500.00),
(30, 'Монтажник по монтажу стальных и железобетонных конструкций', '', 1, 0, '1032857-13', 2500.00),
(31, 'Монтажник строительных машин и механизмов', '', 1, 0, '1032975-13', 5000.00),
(32, 'Оператор пороховых монтажных пистолетов', '', 1, 0, '1032973-13', 2500.00),
(33, 'Промышленный альпинист (теория)', '', 1, 0, '955553-13', 4000.00),
(34, 'Промышленный альпинист (практика)', '', 1, 0, '955780-13', 6000.00),
(35, 'Рабочий зеленого хозяйства (строительства)', '', 1, 0, '1032976-13', 3000.00),
(36, 'Рабочий люльки подъемника (вышки)', '', 1, 0, '955519-13', 2500.00),
(37, 'Рабочий люльки подъемника фасадного', '', 1, 0, '1032957-13', 2500.00),
(38, 'Рабочий по огнезащитной пропитке', '', 1, 0, '1032910-13', 3000.00),
(39, 'Сварщик пластмасс', '', 1, 0, '1032912-13', 4000.00),
(40, 'Слесарь по ремонту и обслуживанию грузоподъемных машин', '', 1, 0, '1032907-13', 2500.00),
(41, 'Слесарь-ремонтник', '', 1, 0, '1032897-13', 2500.00),
(42, 'Стропальщик', '', 1, 0, '953101-13', 2500.00),
(43, 'Такелажник', '', 1, 0, '1032898-13', 2500.00),
(44, 'Электромеханик строительного подъемника', '', 1, 0, '1032958-13', 4000.00),
(45, 'Электромонтер по ремонту и обслуживанию грузоподъемных машин', '', 1, 0, '1032901-13', 3000.00),
(46, 'Электромонтер по ремонту и обслуживанию электрооборудования', '', 1, 0, '1032905-13', 5000.00),
(47, 'Электросварщик', '', 1, 0, '1032871-13', 2500.00),
(48, 'Электрогазосварщик', '', 1, 0, '1032878-13', 4000.00),
(49, 'Рабочие общестроительных профессий (III выпуск ЕТКС)', '', 1, 0, '1032883-13', 2500.00),
(50, 'Переаттестация рабочих', '', 1, 0, '978670-13', 1500.00),
(51, 'Дежурный у эскалатора', '', 1, 0, '1047194-13', 3000.00),
(52, 'Аккумуляторщик', '', 1, 0, '1076485-13', 2500.00),
(127, 'Промышленная безопасность', '', 2, 0, '1032652-13', 3000.00),
(128, 'Безопасная эксплуатация газового хозяйства, регистрируемое оборудование (ответственные)', '', 2, 0, '1032778-13', 4200.00),
(129, 'Безопасная эксплуатация газового хозяйства, регистрируемое оборудование (члены аттестационных комиссий)', '', 2, 0, '1032780-13', 7500.00),
(130, 'Безопасная эксплуатация газового хозяйства, нерегистрируемое оборудование (ответственные)', '', 2, 0, '1032781-13', 3500.00),
(131, 'Безопасная эксплуатация газового хозяйства, нерегистрируемое оборудование члены аттестационных комиссий)', '', 2, 0, '1032783-13', 4500.00),
(132, 'Безопасная эксплуатация дымовых и вентиляционных труб, регистрируемое оборудование (ответственные)', '', 2, 0, '1032786-13', 4200.00),
(133, 'Безопасная эксплуатация дымовых и вентиляционных труб, нерегистрируемое оборудование (ответственные)', '', 2, 0, '1032789-13', 3500.00),
(134, 'Безопасная эксплуатация паровых и водогрейных котлов, регистрируемое оборудование (ответственные)', '', 2, 0, '1032830-13', 4200.00),
(135, 'Безопасная эксплуатация паровых и водогрейных котлов, регистрируемое оборудование (члены аттестационных комиссий)', '', 2, 0, '1032831-13', 7500.00),
(136, 'Безопасная эксплуатация паровых и водогрейных котлов, нерегистрируемое оборудование (ответственные)', '', 2, 0, '1032832-13', 3500.00),
(137, 'Безопасная эксплуатация паровых и водогрейных котлов, нерегистрируемое оборудование (члены аттестационных комиссий)', '', 2, 0, '1032833-13', 4500.00),
(138, 'Безопасная эксплуатация сосудов, работающих под давлением, регистрируемое оборудование (ответственные)', '', 2, 0, '1032834-13', 4200.00),
(139, 'Безопасная эксплуатация сосудов, работающих под давлением, регистрируемое оборудование (члены аттестационных комиссий)', '', 2, 0, '1032835-13', 7500.00),
(140, 'Безопасная эксплуатация сосудов, работающих под давлением, нерегистрируемое оборудование (ответственные)', '', 2, 0, '1032836-13', 3500.00),
(141, 'Безопасная эксплуатация сосудов, работающих под давлением, нерегистрируемое оборудование (члены аттестационных комиссий)', '', 2, 0, '1032837-13', 4500.00),
(142, 'Безопасная эксплуатация трубопроводов пара и горячей воды, регистрируемое оборудование (ответственные)', '', 2, 0, '1032838-13', 4200.00),
(143, 'Безопасная эксплуатация трубопроводов пара и горячей воды, регистрируемое оборудование (члены аттестационных комиссий)', '', 2, 0, '1032839-13', 7500.00),
(144, 'Безопасная эксплуатация трубопроводов пара и горячей воды, нерегистрируемое оборудование (ответственные)', '', 2, 0, '1032840-13', 3500.00),
(145, 'Безопасная эксплуатация трубопроводов пара и горячей воды, нерегистрируемое оборудование (члены аттестационных комиссий)', '', 2, 0, '1032841-13', 4500.00),
(146, 'Безопасность труда в строительстве (СНиП)', '', 2, 0, '1032848-13', 2500.00),
(147, 'Верхолазные работы/работы на высоте (ответственные)', '', 2, 0, '1032846-13', 3000.00),
(148, 'МПБЭЭ (II группа)', '', 2, 0, '953468-13', 2000.00),
(149, 'МПБЭЭ (III группа)', '', 2, 0, '1032648-13', 2700.00),
(150, 'МПБЭЭ (II-III группа)', '', 2, 0, '1032650-13', 4500.00),
(151, 'МПБЭЭ (IV группа)', '', 2, 0, '978672-13', 3500.00),
(152, 'МПБЭЭ (II-III-IV группа)', '', 2, 0, '978667-13', 7000.00),
(153, 'Оказание первой медицинской помощи', '', 2, 0, '1032676-13', 3000.00),
(154, 'Ответственный за техническую эксплуатацию самоходных машин', '', 2, 0, '1032967-13', 5000.00),
(155, 'Охрана труда для руководителей, специалистов и членов аттестационных комиссий по проверке знаний требований охраны труда', '', 2, 0, '953416-13', 3200.00),
(156, 'Пожарно-технический минимум', '', 2, 0, '953300-13', 2500.00),
(157, 'Правила производства земляных работ', '', 2, 0, '1032682-13', 2500.00),
(158, 'Разработчики ППР и технологических карт по установке и безопасной эксплуатации грузоподъемных машин', '', 2, 0, '1032674-13', 9000.00),
(159, 'Строительный контроль заказчика за строительством, реконструкцией и капитальным ремонтом объектов капитального строительства', '', 2, 0, '1032685-13', 5000.00),
(160, 'Устройство и безопасная эксплуатация грузоподъемных кранов: 9.4.2.', '', 2, 0, '1032662-13', 9000.00),
(161, 'Устройство и безопасная эксплуатация грузоподъемных кранов: 9.4.3.', '', 2, 0, '1032664-13', 3500.00),
(162, 'Устройство и безопасная эксплуатация грузоподъемных кранов: 9.4.4.', '', 2, 0, '1032665-13', 3000.00),
(163, 'Устройство и безопасная эксплуатация кранов-манипуляторов: 5.4.1.', '', 2, 0, '1032654-13', 9000.00),
(164, 'Устройство и безопасная эксплуатация кранов-манипуляторов: 5.4.2.', '', 2, 0, '1032655-13', 3500.00),
(165, 'Устройство и безопасная эксплуатация кранов-манипуляторов: 5.4.5.', '', 2, 0, '1032658-13', 3500.00),
(166, 'Устройство и безопасная эксплуатация кранов-манипуляторов: 5.4.7.', '', 2, 0, '1032660-13', 3000.00),
(167, 'Устройство и безопасная эксплуатация кранов-трубоукладчиков; 5.4.1.', '', 2, 0, '1032977-13', 9000.00),
(168, 'Устройство и безопасная эксплуатация кранов-трубоукладчиков; 5.4.2.', '', 2, 0, '1032978-13', 3500.00),
(169, 'Устройство и безопасная эксплуатация кранов-трубоукладчиков; 5.4.5.', '', 2, 0, '1032980-13', 3500.00),
(170, 'Устройство и безопасная эксплуатация кранов-трубоукладчиков; 5.4.7.', '', 2, 0, '1032982-13', 3000.00),
(171, 'Устройство и безопасная эксплуатация подъемников (вышек): 4.4.2.', '', 2, 0, '1032666-13', 9000.00),
(172, 'Устройство и безопасная эксплуатация подъемников (вышек): 4.4.4.', '', 2, 0, '1032667-13', 3500.00),
(173, 'Устройство и безопасная эксплуатация подъемников (вышек): 4.4.7.', '', 2, 0, '1032670-13', 3500.00),
(174, 'Устройство и безопасная эксплуатация подъемников (вышек): 4.4.9.', '', 2, 0, '1032672-13', 3000.00),
(175, 'Устройство и безопасная эксплуатация строительных подъемников: 4.4.2.', '', 2, 0, '1032961-13', 9000.00),
(176, 'Устройство и безопасная эксплуатация строительных подъемников: 4.4.4.', '', 2, 0, '1032962-13', 3500.00),
(177, 'Устройство и безопасная эксплуатация строительных подъемников: 4.4.6.', '', 2, 0, '1032964-13', 3500.00),
(178, 'Устройство и безопасная эксплуатация строительных подъемников: 4.4.7.', '', 2, 0, '1032965-13', 3000.00),
(179, 'Эксплуатация теплопотребляющих установок и тепловых сетей потребителя (ПТЭТЭ и ПТБ)', '', 2, 0, '1032851-13', 3000.00),
(180, 'Инструктор по применению пороховых инструментов', '', 2, 0, '1032970-13', 5000.00),
(181, 'Руководитель работ с применением пороховых инструментов', '', 2, 0, '1032971-13', 3000.00),
(182, 'Устройство и безопасная эксплуатация эскалаторов: Б.9.29.', '', 2, 0, '1047051-13', 15000.00),
(183, 'Устройство и безопасная эксплуатация эскалаторов: Б.9.30.', '', 2, 0, '1047129-13', 15000.00),
(184, 'Безопасная эксплуатация платформ подъемных для инвалидов: Б.9.26.', '', 2, 0, '514207-14', 3000.00);

CREATE TABLE `courses_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `sort` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

INSERT INTO `courses_groups` (`id`, `text`, `parent_id`, `sort`) VALUES
(1, 'Рабочие', NULL, NULL),
(2, 'Руководители, специалисты, ИТР', NULL, NULL);

ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `courses_groups` (`id`);

ALTER TABLE `courses_groups`
  ADD CONSTRAINT `courses_groups_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `courses_groups` (`id`) ON DELETE CASCADE;
  
--- 24/04 ---  

ALTER TABLE `accounts` ADD `ukkom` TINYINT( 1 ) NOT NULL DEFAULT '0';

ALTER TABLE `catalog_airing` ADD `name` TEXT NULL DEFAULT NULL AFTER `marking`;
ALTER TABLE `catalog_airing` ADD `dealer_price` TEXT NULL DEFAULT NULL AFTER `price`;
ALTER TABLE `catalog_airing` ADD `currency_id` int(10) unsigned DEFAULT NULL AFTER `dealer_price`;

ALTER TABLE `catalog_automation` ADD `name` TEXT NULL DEFAULT NULL AFTER `marking`;
ALTER TABLE `catalog_automation` ADD `dealer_price` TEXT NULL DEFAULT NULL AFTER `price`;
ALTER TABLE `catalog_automation` ADD `currency_id` int(10) unsigned DEFAULT NULL AFTER `dealer_price`;

ALTER TABLE `catalog_dustextraction` ADD `name` TEXT NULL DEFAULT NULL AFTER `marking`;
ALTER TABLE `catalog_dustextraction` ADD `dealer_price` TEXT NULL DEFAULT NULL AFTER `price`;
ALTER TABLE `catalog_dustextraction` ADD `currency_id` int(10) unsigned DEFAULT NULL AFTER `dealer_price`;

ALTER TABLE `catalog_electricity` ADD `name` TEXT NULL DEFAULT NULL AFTER `marking`;
ALTER TABLE `catalog_electricity` ADD `dealer_price` TEXT NULL DEFAULT NULL AFTER `price`;
ALTER TABLE `catalog_electricity` ADD `currency_id` int(10) unsigned DEFAULT NULL AFTER `dealer_price`;

ALTER TABLE `catalog_heating` ADD `name` TEXT NULL DEFAULT NULL AFTER `marking`;
ALTER TABLE `catalog_heating` ADD `dealer_price` TEXT NULL DEFAULT NULL AFTER `price`;
ALTER TABLE `catalog_heating` ADD `currency_id` int(10) unsigned DEFAULT NULL AFTER `dealer_price`;

ALTER TABLE `catalog_watersupply` ADD `name` TEXT NULL DEFAULT NULL AFTER `marking`;
ALTER TABLE `catalog_watersupply` ADD `dealer_price` TEXT NULL DEFAULT NULL AFTER `price`;
ALTER TABLE `catalog_watersupply` ADD `currency_id` int(10) unsigned DEFAULT NULL AFTER `dealer_price`;

--- 17/05 ---  

ALTER TABLE  `news_main` ADD  `published` INT( 1 ) NOT NULL DEFAULT  '0';
ALTER TABLE  `news_main` CHANGE  `category_id`  `category_id` INT( 10 ) UNSIGNED NULL ;
ALTER TABLE  `news_main` DROP FOREIGN KEY  `news_main_ibfk_1` ;
ALTER TABLE  `news_main` ADD CONSTRAINT  `news_main_ibfk_1` FOREIGN KEY (  `category_id` ) REFERENCES  `news_main_category` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT ;
ALTER TABLE `news_main` ADD FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

--- 31/05 ---  

CREATE TABLE `engineering_system_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE `professions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `kch` int(10) DEFAULT NULL,
  `etks` int(10) DEFAULT NULL,
  `okz` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE `services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `chapter_id` int(10) unsigned DEFAULT NULL,
  `profession_id` int(10) unsigned DEFAULT NULL,
  `eng_sys_type_id` int(10) unsigned DEFAULT NULL,
  `norm_hours` int(10) unsigned DEFAULT NULL,
  `min_rank` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profession_id` (`profession_id`),
  KEY `chapter_id` (`chapter_id`),
  KEY `eng_sys_type_id` (`eng_sys_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE `services_chapters` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`chapter_id`) REFERENCES `services_chapters` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `services_ibfk_3` FOREIGN KEY (`profession_id`) REFERENCES `professions` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `services_ibfk_4` FOREIGN KEY (`eng_sys_type_id`) REFERENCES `engineering_system_types` (`id`) ON DELETE SET NULL;

ALTER TABLE `services_chapters`
  ADD CONSTRAINT `services_chapters_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `services_chapters` (`id`) ON DELETE CASCADE;

DROP TABLE 
    `catalog_dustextraction`, 
    `catalog_dustextraction_filtrations`, 
    `catalog_dustextraction_groups`, 
    `catalog_dustextraction_motors`, 
    `catalog_dustextraction_services`;

DROP TABLE 
    `catalog_watersupply`, 
    `catalog_watersupply_connection_types`, 
    `catalog_watersupply_control_types`, 
    `catalog_watersupply_groups`, 
    `catalog_watersupply_implementation_types`, 
    `catalog_watersupply_materials`, 
    `catalog_watersupply_power_sources`, 
    `catalog_watersupply_product_types`, 
    `catalog_watersupply_protection_types`, 
    `catalog_watersupply_services`;

DROP TABLE 
    `catalog_heating`, 
    `catalog_heating_connection_types`, 
    `catalog_heating_control_types`, 
    `catalog_heating_groups`, 
    `catalog_heating_implementation_types`, 
    `catalog_heating_materials`, 
    `catalog_heating_power_sources`, 
    `catalog_heating_product_types`, 
    `catalog_heating_protection_types`, 
    `catalog_heating_services`;

DROP TABLE 
    `catalog_electricity`, 
    `catalog_electricity_connection_types`, 
    `catalog_electricity_control_types`, 
    `catalog_electricity_groups`, 
    `catalog_electricity_implementation_types`, 
    `catalog_electricity_isolation_types`, 
    `catalog_electricity_materials`, 
    `catalog_electricity_power_sources`, 
    `catalog_electricity_product_types`, 
    `catalog_electricity_protection_types`, 
    `catalog_electricity_services`;

DROP TABLE 
    `catalog_automation`, 
    `catalog_automation_connection_types`, 
    `catalog_automation_control_types`, 
    `catalog_automation_groups`, 
    `catalog_automation_implementation_types`, 
    `catalog_automation_isolation_types`, 
    `catalog_automation_materials`, 
    `catalog_automation_power_sources`, 
    `catalog_automation_product_types`, 
    `catalog_automation_protection_types`, 
    `catalog_automation_services`;

--- 08/06 ---  

TRUNCATE smokercabin_themes;
TRUNCATE smokercabin_description;

INSERT INTO `smokercabin_description` (`id`, `theme_id`, `account_id`, `date`, `content`) VALUES
(1, 1, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/07.jpg" width="100%">'),
(2, 2, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/08.jpg" width="100%">'),
(3, 3, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/09.jpg" width="100%">'),
(4, 4, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/10.jpg" width="100%">'),
(5, 5, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/11.jpg" width="100%">'),
(6, 6, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/12.jpg" width="100%">'),
(7, 7, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/13.jpg" width="100%">'),
(8, 8, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/14.jpg" width="100%">'),
(9, 9, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/15.jpg" width="100%">'),
(10, 10, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/16.jpg" width="100%">'),
(11, 11, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/17.jpg" width="100%">'),
(12, 12, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/18.jpg" width="100%">'),
(13, 13, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/19.jpg" width="100%">'),
(14, 14, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/20.jpg" width="100%">'),
(15, 15, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/21.jpg" width="100%">'),
(16, 16, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/22.jpg" width="100%">'),
(17, 17, 1, '2014-06-08 12:54:33', 'Только для зарегистрированных пользователей.'),
(18, 18, 1, '2014-06-08 12:54:33', 'Только для зарегистрированных пользователей.'),
(19, 19, 1, '2014-06-08 12:54:33', 'Только для зарегистрированных пользователей.'),
(20, 20, 1, '2014-06-08 12:54:33', 'Только для зарегистрированных пользователей.'),
(21, 21, 1, '2014-06-08 12:54:33', 'Только для зарегистрированных пользователей.'),
(22, 22, 1, '2014-06-08 12:54:33', 'Только для зарегистрированных пользователей.'),
(23, 23, 1, '2014-06-08 12:54:33', '<embed src="/images/SmokerCabin/animation.swf" wmode="transparent" align="middle" allowscriptaccess="sameDomain" style="border:0px solid #dddddd" height="100%" width="100%" pluginspage="http://www.adobe.com/go/getflashplayer" quality="high" type="application/x-shockwave-flash"></embed>'),
(24, 24, 1, '2014-06-08 12:54:33', '<embed src="/images/SmokerCabin/panorama.swf" wmode="transparent" align="middle" allowscriptaccess="sameDomain" style="border:0px solid #dddddd" height="100%" width="100%" pluginspage="http://www.adobe.com/go/getflashplayer" quality="high" type="application/x-shockwave-flash">');

INSERT INTO `smokercabin_themes` (`id`, `name`, `parent_id`, `account_id`, `extended`) VALUES
(1, 'Вариант исполнения для помещений', NULL, 1, 0),
(2, 'Вариант исполнения для помещений', NULL, 1, 0),
(3, 'Вариант исполнения для помещений', NULL, 1, 0),
(4, 'Вариант исполнения для помещений', NULL, 1, 0),
(5, 'Вариант исполнения для уличных условий', NULL, 1, 0),
(6, 'Вариант исполнения для уличных условий', NULL, 1, 0),
(7, 'Вариант исполнения для уличных условий', NULL, 1, 0),
(8, 'Вариант исполнения для уличных условий', NULL, 1, 0),
(9, 'Исполнение интерьера', NULL, 1, 0),
(10, 'Исполнение интерьера', NULL, 1, 0),
(11, 'Исполнение интерьера', NULL, 1, 0),
(12, 'Исполнение интерьера', NULL, 1, 0),
(13, 'Габаритные размеры', NULL, 1, 0),
(14, 'Габаритные размеры', NULL, 1, 0),
(15, 'Габаритные размеры', NULL, 1, 0),
(16, 'Габаритные размеры', NULL, 1, 0),
(17, 'Конструктивные решения', NULL, 1, 0),
(18, 'Конструктивные решения', NULL, 1, 0),
(19, 'Конструктивные решения', NULL, 1, 0),
(20, 'Конструктивные решения', NULL, 1, 0),
(21, 'Конструктивные решения', NULL, 1, 0),
(22, 'Конструктивные решения', NULL, 1, 0),
(23, 'Анимация экстерьера', NULL, '1', '0'), 
(24, 'Интерактивная панорама интерьера', NULL, '1', '0');

--- 30/06 ---  

CREATE TABLE `qualifications` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type_id` int(10) unsigned NOT NULL,
  `num` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE `qualifications_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

ALTER TABLE  `professions` ADD  `base_salary` INT UNSIGNED NOT NULL ,
ADD  `eng_sys_type_id` INT( 10 ) UNSIGNED DEFAULT NULL ,
ADD  `qualification_type_id` INT( 10 ) UNSIGNED DEFAULT NULL;

ALTER TABLE `professions` ADD INDEX ( `eng_sys_type_id` ) ;
ALTER TABLE `professions` ADD INDEX ( `qualification_type_id` ) ;

ALTER TABLE `professions` ADD FOREIGN KEY ( `qualification_type_id` ) REFERENCES  `qualifications_types` (`id`) ON DELETE SET NULL;
ALTER TABLE `professions` ADD FOREIGN KEY (`eng_sys_type_id`) REFERENCES `engineering_system_types` (`id`) ON DELETE SET NULL;

ALTER TABLE `qualifications` ADD  FOREIGN KEY (`type_id`) REFERENCES `qualifications_types` (`id`) ON DELETE CASCADE;

--- 13/07 ---  

CREATE TABLE IF NOT EXISTS `calcsmr` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(10) unsigned DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL,
  `k_compensation` double(20,5) NOT NULL,
  `k_overheads` double(20,5) NOT NULL,
  `k_estimated` double(20,5) NOT NULL,
  `k_vat` double(20,5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

INSERT INTO `calcsmr` (`id`, `account_id`, `date`, `name`, `k_compensation`, `k_overheads`, `k_estimated`, `k_vat`) VALUES
(5, 1, '2014-07-05 01:59:46', 'Школа', 0.16880, 0.72000, 0.44000, 0.18000);

CREATE TABLE IF NOT EXISTS `calcsmr_projects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `system_name` varchar(255) NOT NULL,
  `k_related` double(20,5) NOT NULL,
  `k_compensation` double(20,5) NOT NULL,
  `k_amortisation` double(20,5) NOT NULL,
  `k_overheads` double(20,5) NOT NULL,
  `k_estimated` double(20,5) NOT NULL,
  `k_vat` double(20,5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=40 ;

INSERT INTO `calcsmr_projects` (`id`, `project_id`, `system_name`, `k_related`, `k_compensation`, `k_amortisation`, `k_overheads`, `k_estimated`, `k_vat`) VALUES
(20, 5, 'Общая вентиляция', 0.07000, 0.20260, 0.06300, 1.08400, 0.49400, 0.18000),
(21, 5, 'Дымозащита', 0.07000, 0.20260, 0.06300, 1.08400, 0.49400, 0.18000),
(22, 5, 'Кондиционирование', 0.05000, 0.15890, 0.24100, 1.08400, 0.49400, 0.18000),
(23, 5, 'Теплоснабжение', 0.07000, 0.44570, 0.06300, 1.08400, 0.49400, 0.18000),
(24, 5, 'Автоматика', 0.10000, 0.60500, 0.06300, 1.08400, 0.49400, 0.18000),
(25, 5, 'Тепловой пункт', 0.07000, 0.20260, 0.06300, 1.08400, 0.49400, 0.18000);

CREATE TABLE IF NOT EXISTS `calcsmr_systems` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `system_id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `measure` varchar(255) NOT NULL,
  `qty` double(10,5) NOT NULL,
  `price` double(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `system_id` (`system_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=563 ;

INSERT INTO `calcsmr_systems` (`id`, `system_id`, `name`, `measure`, `qty`, `price`) VALUES
(1, 20, 'Диффузор 100', 'шт', 85.00000, 147.26),
(2, 20, 'Диффузор 125', 'шт', 100.00000, 178.41),
(3, 20, 'Решетка 200*100', 'шт', 13.00000, 339.00),
(4, 20, 'Решетка 300*100', 'шт', 8.00000, 405.60),
(5, 20, 'Решетка 400*100', 'шт', 14.00000, 471.60),
(6, 20, 'Решетка 400*150', 'шт', 18.00000, 548.40),
(7, 20, 'Решетка 400*200', 'шт', 1.00000, 598.80),
(8, 20, 'Решетка 400*300', 'шт', 2.00000, 827.40),
(9, 20, 'Решетка 500*100', 'шт', 25.00000, 566.40),
(10, 20, 'Решетка 500*150', 'шт', 16.00000, 662.40),
(11, 20, 'Решетка 500*200', 'шт', 8.00000, 771.60),
(12, 20, 'Решетка 600*100', 'шт', 15.00000, 686.40),
(13, 20, 'Решетка 600*150', 'шт', 7.00000, 801.60),
(14, 20, 'Решетка 600*200', 'шт', 21.00000, 928.80),
(15, 20, 'Решетка 700*150', 'шт', 1.00000, 961.20),
(16, 20, 'Решетка 700*200', 'шт', 30.00000, 1131.00),
(17, 20, 'Решетка 700*300', 'шт', 2.00000, 1469.40),
(18, 20, 'Решетка 800*300', 'шт', 12.00000, 1614.60),
(19, 20, 'Решетка 200*100', 'шт', 6.00000, 255.60),
(20, 20, 'Решетка 400*100', 'шт', 4.00000, 324.00),
(21, 20, 'Решетка 400*150', 'шт', 2.00000, 373.20),
(22, 20, 'Воздушно-тепловая завеса', 'шт', 2.00000, 75472.60),
(23, 20, 'Шумоглушитель трубчатый прямоугольный', 'шт', 3.00000, 3162.00),
(24, 20, 'Шумоглушитель пластинчатый', 'шт', 6.00000, 12594.45),
(25, 20, 'Обтекатели 200*1000', 'шт', 6.00000, 448.55),
(26, 20, 'Пластина шумопоглащения 1000*1000 -200', 'шт', 18.00000, 2293.30),
(27, 20, 'Форкамера для шумоглушителя', 'шт', 4.00000, 7000.00),
(28, 20, 'Дроссель клапан 100', 'шт', 3.00000, 160.00),
(29, 20, 'Дроссель клапан 125', 'шт', 3.00000, 190.00),
(30, 20, 'Дроссель клапан 200*150', 'шт', 6.00000, 170.00),
(31, 20, 'Дроссель клапан 250*150', 'шт', 1.00000, 200.00),
(32, 20, 'Дроссель клапан 250*200', 'шт', 2.00000, 230.00),
(33, 20, 'Дроссель клапан 300*200', 'шт', 6.00000, 252.00),
(34, 20, 'Дроссель клапан 300*250', 'шт', 1.00000, 259.20),
(35, 20, 'Дроссель клапан 400*200', 'шт', 3.00000, 266.00),
(36, 20, 'Дроссель клапан 400*250', 'шт', 6.00000, 309.60),
(37, 20, 'Дроссель клапан 500*300', 'шт', 1.00000, 440.20),
(38, 20, 'Короб 400х500 Н=150', 'шт', 5.00000, 401.85),
(39, 20, 'Короб 400х500 Н=200', 'шт', 1.00000, 478.80),
(40, 20, 'Короб 500х400 Н=400', 'шт', 1.00000, 786.60),
(41, 20, 'Короб 500х500 Н=150', 'шт', 1.00000, 470.25),
(42, 20, 'Короб 500х500 Н=200', 'шт', 2.00000, 555.75),
(43, 20, 'Короб 600х400 Н=300', 'шт', 1.00000, 718.20),
(44, 20, 'Короб 600х500 Н=200', 'шт', 13.00000, 632.70),
(45, 20, 'Короб 600х600 Н=200', 'шт', 1.00000, 718.20),
(46, 20, 'Короб 700х500 Н=200', 'шт', 1.00000, 709.65),
(47, 20, 'Короб 700х700 Н=400', 'шт', 1.00000, 1376.55),
(48, 20, 'Короб 800х600 Н=500', 'шт', 1.00000, 1590.30),
(49, 20, 'вентилятор изолированный для прямоугольных каналов', 'шт', 1.00000, 45343.09),
(50, 20, 'вентилятор изолированный для прямоугольных каналов', 'шт', 3.00000, 37916.78),
(51, 20, 'вентилятор изолированный для прямоугольных каналов', 'шт', 7.00000, 35291.78),
(52, 20, 'вентилятор изолированный для прямоугольных каналов', 'шт', 3.00000, 60666.86),
(53, 20, 'вентилятор изолированный для прямоугольных каналов', 'шт', 2.00000, 35000.11),
(54, 20, 'канальный вентилятор в изолированном корпусе', 'шт', 2.00000, 13439.15),
(55, 20, 'вентилятор изолированный для прямоугольных каналов', 'шт', 1.00000, 39711.66),
(56, 20, 'вентилятор изолированный для прямоугольных каналов', 'шт', 2.00000, 58243.77),
(57, 20, '60-35, отсечной клапан', 'шт', 13.00000, 5339.76),
(58, 20, '70-40, отсечной клапан', 'шт', 1.00000, 6197.94),
(59, 20, '80-50, отсечной клапан', 'шт', 4.00000, 7056.11),
(60, 20, 'хомут для круглых воздуховодов', 'шт', 4.00000, 214.54),
(61, 20, '160-900, шумоглушитель круглый', 'шт', 2.00000, 2002.41),
(62, 20, '600мм х 350мм, шумоглушитель прямоугольный', 'шт', 21.00000, 5482.79),
(63, 20, '700мм х 400мм, шумоглушитель прямоугольный', 'шт', 2.00000, 7056.11),
(64, 20, '800мм х 500мм, шумоглушитель прямоугольный', 'шт', 9.00000, 8152.67),
(65, 20, 'Труба стальная оцинкованная 25', 'м', 20.00000, 200.00),
(66, 20, 'Базальтовый огнезащитный материал в клеевым составом', 'м', 900.00000, 279.00),
(67, 20, 'Термашит ФР 15', 'м', 122.00000, 792.00),
(68, 20, 'Клей', 'л', 31.00000, 800.00),
(69, 20, 'Скотч', 'шт', 17.00000, 520.00),
(70, 20, 'ДВЕРЬ ГЕРМЕТИЧ. УТЕПЛ.', 'шт', 2.00000, 7489.53),
(71, 20, 'Воздуховод t=0,5мм ф100', 'пог.м', 406.00000, 79.52),
(72, 20, 'Воздуховод t=0,5мм ф125', 'пог.м', 275.00000, 100.04),
(73, 20, 'Воздуховод t=0,5мм ф160', 'пог.м', 39.00000, 128.25),
(74, 20, 'Воздуховод t=0,5мм ф200', 'пог.м', 22.00000, 161.60),
(75, 20, 'Воздуховод оц. t=0,55мм 150х100 (шина №20)', 'пог.м', 146.00000, 173.38),
(76, 20, 'Воздуховод оц. t=0,55мм 150х150 (шина №20)', 'пог.м', 67.00000, 208.05),
(77, 20, 'Воздуховод оц. t=0,55мм 200х100 (шина №20)', 'пог.м', 56.00000, 208.05),
(78, 20, 'Воздуховод оц. t=0,55мм 200х150 (шина №20)', 'пог.м', 295.00000, 242.73),
(79, 20, 'Воздуховод оц. t=0,55мм 200х200 (шина №20)', 'пог.м', 110.00000, 277.40),
(80, 20, 'Воздуховод оц. t=0,55мм 250х150 (шина №20)', 'пог.м', 76.00000, 277.40),
(81, 20, 'Воздуховод оц. t=0,55мм 250х200 (шина №20)', 'пог.м', 83.00000, 312.08),
(82, 20, 'Воздуховод оц. t=0,55мм 250х250 (шина №20)', 'пог.м', 7.00000, 346.75),
(83, 20, 'Воздуховод оц. t=0,55мм 300х150 (шина №20)', 'пог.м', 59.00000, 312.08),
(84, 20, 'Воздуховод оц. t=0,55мм 300х200 (шина №20)', 'пог.м', 402.00000, 346.75),
(85, 20, 'Воздуховод оц. t=0,55мм 300х250 (шина №20)', 'пог.м', 78.00000, 381.43),
(86, 20, 'Воздуховод оц. t=0,55мм 400х200 (шина №20)', 'пог.м', 81.00000, 416.10),
(87, 20, 'Воздуховод оц. t=0,55мм 450х250 (шина №20)', 'пог.м', 78.00000, 485.45),
(88, 20, 'Воздуховод оц. t=0,55мм 400х300 (шина №20)', 'пог.м', 7.00000, 485.45),
(89, 20, 'Воздуховод оц. t=0,55мм 400х400 (шина №20)', 'пог.м', 87.00000, 554.80),
(90, 20, 'Воздуховод оц. t=0,55мм 500х250 (шина №20)', 'пог.м', 73.00000, 520.13),
(91, 20, 'Воздуховод оц. t=0,55мм 500х300 (шина №20)', 'пог.м', 39.00000, 554.80),
(92, 20, 'Воздуховод оц. t=0,7мм 500х400 (шина №20)', 'пог.м', 39.00000, 701.10),
(93, 20, 'Воздуховод оц. t=0,7мм 600х300 (шина №20)', 'пог.м', 11.00000, 701.10),
(94, 20, 'Воздуховод оц. t=0,7мм 600х400 (шина №20)', 'пог.м', 49.00000, 779.00),
(95, 20, 'Воздуховод оц. t=0,7мм 600х500 (шина №20)', 'пог.м', 28.00000, 856.86),
(96, 20, 'Воздуховод оц. t=0,7мм 800х400 (шина №20)', 'пог.м', 108.00000, 934.80),
(97, 20, 'Воздуховод оц. t=0,7мм 800х500 (шина №20)', 'пог.м', 17.00000, 1012.70),
(98, 20, 'Воздуховод оц. t=0,7мм 800х600 (шина №20)', 'пог.м', 8.00000, 1090.60),
(99, 20, 'Воздуховод оц. t=0,7мм 800х800 (шина №20)', 'пог.м', 50.00000, 1246.40),
(100, 20, 'Воздуховод оц. t=1,0мм 1000х600 (шина №30)', 'пог.м', 1.50000, 1687.20),
(101, 20, 'Воздуховод оц. t=1,0мм 1250х600 (шина №30)', 'пог.м', 2.00000, 1950.83),
(102, 20, 'Короб под решетку 800х300 Н=300', 'шт', 12.00000, 731.03),
(103, 20, 'Короб под решетку 700х300 Н=300', 'шт', 2.00000, 657.92),
(104, 20, 'Короб под решетку 700х200 Н=300', 'шт', 29.00000, 552.33),
(105, 20, 'Короб под решетку 700х150 Н=300', 'шт', 1.00000, 503.59),
(106, 20, 'Короб под решетку 600х200 L=300', 'шт', 3.00000, 536.08),
(107, 20, 'Короб под решетку 600х200 L=100', 'шт', 4.00000, 227.43),
(108, 20, 'Короб под решетку 600х150 L=300', 'шт', 7.00000, 438.61),
(109, 20, 'Короб под решетку 600х100 L=300', 'шт', 15.00000, 389.88),
(110, 20, 'Короб под решетку 500х200 Н=300', 'шт', 6.00000, 422.37),
(111, 20, 'Короб под решетку 500х150 Н=300', 'шт', 15.00000, 450.79),
(112, 20, 'Короб под решетку 500х100 Н=300', 'шт', 25.00000, 333.00),
(113, 20, 'Короб под решетку 400х300 Н=300', 'шт', 2.00000, 395.01),
(114, 20, 'Короб под решетку 400х150 Н=300', 'шт', 12.00000, 285.29),
(115, 20, 'Короб под решетку 400х150 Н=200', 'шт', 1.00000, 204.25),
(116, 20, 'Короб под решетку 400х100 Н=300', 'шт', 14.00000, 248.70),
(117, 20, 'Короб под решетку 300х100 Н=300', 'шт', 8.00000, 197.50),
(118, 20, 'Короб под решетку 100х100 Н=300', 'шт', 13.00000, 146.30),
(119, 20, 'Металлоконструкции', 'кг', 4600.00000, 120.00),
(120, 20, 'Сетка металлическая', 'м', 275.00000, 295.00),
(121, 20, 'Приточная установка 1', 'шт', 1.00000, 404500.87),
(122, 20, 'Приточная установка 2', 'шт', 1.00000, 445742.00),
(123, 20, 'Приточная установка 3', 'шт', 1.00000, 140918.00),
(124, 20, 'Приточная установка 4', 'шт', 1.00000, 140329.29),
(125, 20, 'Приточная установка 5', 'шт', 1.00000, 116971.55),
(126, 20, 'Приточная установка 6', 'шт', 1.00000, 118051.93),
(127, 20, 'Приточная установка 7', 'шт', 1.00000, 139201.61),
(128, 20, 'Приточная установка 8', 'шт', 1.00000, 57758.63),
(129, 20, 'Клапана противопожарные 100', 'шт', 3.00000, 10181.99),
(130, 20, 'Клапана противопожарные 160', 'шт', 1.00000, 10181.99),
(131, 20, 'Клапана противопожарные 200', 'шт', 5.00000, 10282.00),
(132, 20, 'Клапана противопожарные 150', 'шт', 1.00000, 9532.99),
(133, 20, 'Клапана противопожарные 150*150', 'шт', 1.00000, 9559.01),
(134, 20, 'Клапана противопожарные 200*150', 'шт', 7.00000, 9638.01),
(135, 20, 'Клапана противопожарные 200*200', 'шт', 1.00000, 9717.01),
(136, 20, 'Клапана противопожарные 200*250', 'шт', 2.00000, 9769.99),
(137, 20, 'Клапана противопожарные 250*250-2*', 'шт', 1.00000, 9835.99),
(138, 20, 'Клапана противопожарные 300*250', 'шт', 1.00000, 9981.00),
(139, 20, 'Клапана противопожарные 400*200', 'шт', 1.00000, 10096.00),
(140, 20, 'Клапана противопожарные 400*250', 'шт', 1.00000, 10122.01),
(141, 20, 'Клапана противопожарные 400*400', 'шт', 2.00000, 10479.01),
(142, 20, 'Клапана противопожарные 500*250', 'шт', 2.00000, 10386.00),
(143, 20, 'Клапана противопожарные 500*300', 'шт', 2.00000, 10333.00),
(144, 20, 'Клапана противопожарные 600*300', 'шт', 1.00000, 10677.00),
(145, 20, 'Клапана противопожарные 600*400', 'шт', 3.00000, 10804.00),
(146, 20, 'Клапана противопожарные 600*500', 'шт', 1.00000, 10993.00),
(147, 20, 'Клапана противопожарные 800*400', 'шт', 1.00000, 11081.00),
(148, 20, 'Клапана противопожарные 800*800', 'шт', 2.00000, 13813.04),
(149, 20, 'Клапан регулятор-Л-160', 'шт', 2.00000, 12267.00),
(150, 20, 'Клапан регулятор-Л-300*400', 'шт', 2.00000, 14867.00),
(151, 20, 'Защита дефлектор-35Ц', 'шт', 10.00000, 11989.00),
(152, 20, 'Защита дефлектор-40Ц', 'шт', 2.00000, 12715.00),
(153, 20, 'Стакан Монтажный', 'шт', 10.00000, 5248.36),
(154, 20, 'Стакан Монтажный', 'шт', 2.00000, 5622.00),
(155, 20, 'Автоматика П1,П2,П3,П4, П5, П6,П7,П8', 'шт', 1.00000, 762485.60),
(156, 20, 'Фасонные изделия', 'м', 1.00000, 300331.70),
(157, 21, 'Воздуховод (ПрХк)- 300х400 - L1250 (х/к.ст. 1,20мм - R20 - R20)', 'шт', 8.00000, 1124.39),
(158, 21, 'Воздуховод (ПрХк)- 400х400 - L1250 (х/к.ст. 1,20мм - R20 - R20)', 'шт', 4.00000, 1283.21),
(159, 21, 'Воздуховод (ПрХк)- 400х600 - L1250 (х/к.ст. 1,20мм - R20 - R20)', 'шт', 40.00000, 1600.83),
(160, 21, 'Воздуховод (ПрХк)- 400х800 - L1250 (х/к.ст. 1,20мм - R30 - R30)', 'шт', 32.00000, 1918.46),
(161, 21, 'Воздуховод (ПрХк)- 500х800 - L1250 (х/к.ст. 1,20мм - R30 - R30)', 'шт', 53.00000, 2077.27),
(162, 21, 'Воздуховод (ПрХк)- 400х1000 - L1250 (х/к.ст. 1,20мм - R30 - R30)', 'шт', 32.00000, 2236.08),
(163, 21, 'Воздуховод (ПрХк)- 400х700 - L1250 (х/к.ст. 1,20мм - R20 - R20)', 'шт', 16.00000, 1759.64),
(164, 21, 'Воздуховод (ПрХк)- 400х900 - L1250 (х/к.ст. 1,20мм - R30 - R30)', 'шт', 16.00000, 2077.27),
(165, 21, 'Патрубок (ПрХк)- 500x500 - L100 (х/к.ст. 1,40мм - R20 - R20)', 'шт', 1.00000, 187.88),
(166, 21, 'Патрубок (ПрХк)- 600x600 - L100 (х/к.ст. 1,40мм - R20 - R20)', 'шт', 1.00000, 225.46),
(167, 21, 'Базальтовый огнезащитный материал в клеевым составом', 'м', 700.00000, 279.00),
(168, 21, 'ДВЕРЬ ГЕРМЕТИЧ. НЕУТЕПЛ.', 'шт', 8.00000, 6900.00),
(169, 21, 'Фассонные изделия', 'м', 1.00000, 114900.00),
(170, 21, 'Металлоконструкции', 'кг', 1000.00000, 120.00),
(171, 21, 'Сетка металлическая', 'м', 960.00000, 295.00),
(172, 21, 'Приточная установка', 'шт', 1.00000, 85522.22),
(173, 21, 'Приточная установка', 'шт', 1.00000, 211487.81),
(174, 21, 'Автоматика ПД6,7,8,9', 'шт', 1.00000, 589702.04),
(175, 21, 'Приточная установка', 'шт', 1.00000, 85522.22),
(176, 21, 'Вентилятор', 'шт', 2.00000, 173000.00),
(177, 21, 'Вентилятор', 'шт', 1.00000, 164100.00),
(178, 21, 'Вентилятор', 'шт', 3.00000, 111700.00),
(179, 21, 'Переходник крышный', 'шт', 1.00000, 6123.00),
(180, 21, 'Вентилятор', 'шт', 1.00000, 35400.00),
(181, 21, 'Переходник крышный', 'шт', 1.00000, 4872.00),
(182, 21, 'Вентилятор', 'шт', 1.00000, 27900.00),
(183, 21, 'Поддон', 'шт', 3.00000, 5197.00),
(184, 21, 'Переходник крышный', 'шт', 3.00000, 4872.00),
(185, 21, 'Вентилятор', 'шт', 3.00000, 31000.00),
(186, 21, 'Стакан монтажный', 'шт', 3.00000, 28147.00),
(187, 21, 'Стакан монтажный', 'шт', 3.00000, 25369.00),
(188, 21, 'Вентилятор', 'шт', 2.00000, 21251.00),
(189, 21, 'Водонагреватель', 'шт', 2.00000, 16963.00),
(190, 21, 'Клапан лепесковый', 'шт', 6.00000, 16470.00),
(191, 21, 'Стакан монтажный', 'шт', 1.00000, 22542.00),
(192, 21, 'Стакан монтажный', 'шт', 1.00000, 22483.00),
(193, 21, 'Стакан монтажный', 'шт', 1.00000, 29502.98),
(194, 21, 'Клапан Герметик', 'шт', 1.00000, 15741.00),
(195, 21, 'Клапан Герметик', 'шт', 2.00000, 16377.00),
(196, 21, 'Клапан Герметик', 'шт', 14.00000, 15296.00),
(197, 21, 'Клапан Герметик', 'шт', 1.00000, 17024.00),
(198, 21, 'Клапан Герметик', 'шт', 10.00000, 18032.00),
(199, 21, 'Клапан Герметик', 'шт', 2.00000, 21483.00),
(200, 21, 'Приточная установка', 'шт', 1.00000, 211487.81),
(201, 21, 'Клапан лепесковый', 'шт', 6.00000, 16470.00),
(202, 23, 'Насос', 'шт', 4.00000, 15602.58),
(203, 23, 'Насос', 'шт', 8.00000, 10358.80),
(204, 23, 'Насос', 'шт', 2.00000, 5915.53),
(205, 23, 'Клапан запорно-регулирующий', 'шт', 2.00000, 34279.00),
(206, 23, 'Клапан запорно-регулирующий', 'шт', 1.00000, 34987.00),
(207, 23, 'Клапан запорно-регулирующий', 'шт', 2.00000, 30000.00),
(208, 23, 'Клапан запорно-регулирующий', 'шт', 3.00000, 30000.00),
(209, 23, 'Изоляция трубная', 'м', 38.00000, 59.00),
(210, 23, 'Изоляция трубная', 'м', 32.00000, 70.50),
(211, 23, 'Изоляция трубная', 'м', 56.00000, 78.50),
(212, 23, 'Изоляция трубная', 'м', 24.00000, 96.00),
(213, 23, 'Изоляция трубная', 'м', 48.00000, 122.50),
(214, 23, 'Изоляция трубная', 'м', 96.00000, 134.00),
(215, 23, 'Изоляция трубная', 'м', 14.00000, 200.50),
(216, 23, 'Клей', 'шт', 6.00000, 330.00),
(217, 23, 'Кран шаровой стальной Ду100', 'шт', 1.00000, 7693.60),
(218, 23, 'Кран шаровой стальной Ду25', 'шт', 16.00000, 1817.20),
(219, 23, 'Кран шаровой стальной Ду32', 'шт', 7.00000, 1982.40),
(220, 23, 'Кран шаровой стальной Ду40', 'шт', 17.00000, 2784.80),
(221, 23, 'Кран шаровой стальной Ду50', 'шт', 3.00000, 3056.20),
(222, 23, 'Кран шаровой стальной Ду65', 'шт', 6.00000, 4236.20),
(223, 23, 'Фильтр магнитный чугун Ду32', 'шт', 1.00000, 2124.00),
(224, 23, 'Фильтр магнитный чугун Ду40', 'шт', 3.00000, 2430.80),
(225, 23, 'Фильтр магнитный чугун Ду50', 'шт', 1.00000, 4059.20),
(226, 23, 'Фильтр магнитный чугун Ду65', 'шт', 2.00000, 4495.80),
(227, 23, 'Клапан обратный латунь Ду25', 'шт', 9.00000, 704.00),
(228, 23, 'Клапан обратный латунь Ду32', 'шт', 5.00000, 1045.00),
(229, 23, 'Клапан обратный латунь Ду40', 'шт', 5.00000, 1308.00),
(230, 23, 'Клапан обратный латунь Ду50', 'шт', 2.00000, 1870.00),
(231, 23, 'Труба сталь эл/св прямошовн 57х3,5', 'м', 42.00000, 132.16),
(232, 23, 'Труба сталь эл/св прямошовн 76х3,5', 'м', 82.00000, 181.72),
(233, 23, 'Труба сталь эл/св прямошовн 89х3,5', 'м', 176.00000, 217.12),
(234, 23, 'Труба сталь эл/св прямошовн 108х3,5', 'м', 11.00000, 259.60),
(235, 23, 'Труба сталь ВГП Ду15', 'м', 10.00000, 42.36),
(236, 23, 'Труба сталь ВГП Ду25', 'м', 10.00000, 75.52),
(237, 23, 'Труба сталь ВГП Ду32', 'м', 58.00000, 96.76),
(238, 23, 'Труба сталь ВГП Ду40', 'м', 94.00000, 119.18),
(239, 23, 'Манометр', 'шт', 21.00000, 559.32),
(240, 23, 'Термометр биметаллич', 'шт', 14.00000, 260.78),
(241, 23, 'Кран д/манометра 3/ход/конт', 'шт', 49.00000, 93.22),
(242, 23, 'Автоматический воздухоотводч ДУ15', 'шт', 15.00000, 253.70),
(243, 23, 'Кран шаровой латунь Ду15', 'шт', 20.00000, 500.00),
(244, 23, 'Грунтовка  30 кг.', 'шт', 22.00000, 1900.00),
(245, 23, 'Балансровочный клапан 100', 'шт', 1.00000, 37205.00),
(246, 23, 'Балансровочный клапан 65', 'шт', 2.00000, 16759.00),
(247, 23, 'Балансровочный клапан 50', 'шт', 3.00000, 14740.00),
(248, 23, 'Балансровочный клапан 40', 'шт', 4.00000, 13346.00),
(249, 23, 'Балансровочный клапан 32', 'шт', 4.00000, 11461.00),
(250, 23, 'Балансровочный клапан 25', 'шт', 1.00000, 9953.00),
(251, 23, 'Металлоконструкции трубопроводов', 'кг', 160.00000, 120.00),
(252, 23, 'Опора неподвижная', 'шт', 6.00000, 180.00),
(253, 23, 'Стакан расширительный', 'шт', 7.00000, 4000.00),
(254, 22, 'Наружный блок', 'шт', 1.00000, 174517.92),
(255, 22, 'Наружный блок', 'шт', 2.00000, 130429.44),
(256, 22, 'Наружный блок', 'шт', 1.00000, 64602.72),
(257, 22, 'Наружный блок', 'шт', 2.00000, 26511.84),
(258, 22, 'Наружный блок', 'шт', 1.00000, 21444.48),
(259, 22, 'Внутренний блок настенного типа', 'шт', 4.00000, 26218.08),
(260, 22, 'Сплит-система / Внутренний блок / Настенный', 'шт', 2.00000, 25508.16),
(261, 22, 'Сплит-система / Внутренний блок / Настенный', 'шт', 3.00000, 9987.84),
(262, 22, 'Сплит-система / Внутренний блок / Настенный', 'шт', 4.00000, 12852.00),
(263, 22, 'Разветвитель для блоков', 'шт', 3.00000, 2056.32),
(264, 22, 'Пульт управления ИК', 'шт', 11.00000, 2007.36),
(265, 22, 'Труба PPRC 25', 'м', 42.00000, 30.00),
(266, 22, 'Медная труба 1/4"', 'м', 90.00000, 41.90),
(267, 22, 'Медная труба 3/8"', 'м', 135.00000, 71.90),
(268, 22, 'Медная труба 1/2"', 'м', 15.00000, 101.90),
(269, 22, 'Медная труба 5/8"', 'м', 75.00000, 140.90),
(270, 22, 'Флекс', 'м', 390.00000, 14.00),
(271, 24, 'Регулятор скорости вентилятора', 'шт', 2.00000, 17830.99),
(272, 24, 'Термоконтактное реле (настенная установка)', 'шт', 6.00000, 4267.04),
(273, 24, 'Регулятор скорости вентилятора', 'шт', 2.00000, 10059.73),
(274, 24, 'Регулятор скорости вентилятора', 'шт', 3.00000, 7461.36),
(275, 24, 'Защитное реле', 'шт', 12.00000, 1027.27),
(276, 24, 'Регулятор скорости вентилятора', 'шт', 2.00000, 1382.62),
(277, 24, 'Регулятор скорости вентилятора', 'шт', 9.00000, 1668.67),
(278, 24, 'Сдвоенный регулятор скорости вентилятора', 'шт', 2.00000, 24386.50),
(279, 24, 'Шкаф автоматики', 'шт', 11.00000, 15868.64),
(280, 24, 'Преобразователи частоты', 'шт', 13.00000, 23076.92),
(281, 25, 'Неведомая фигня', 'шт', 1.00000, 3315355.00);

ALTER TABLE `calcsmr`
  ADD CONSTRAINT `calcsmr_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

ALTER TABLE `calcsmr_projects`
  ADD CONSTRAINT `calcsmr_projects_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `calcsmr` (`id`) ON DELETE CASCADE;

ALTER TABLE `calcsmr_systems`
  ADD CONSTRAINT `calcsmr_systems_ibfk_1` FOREIGN KEY (`system_id`) REFERENCES `calcsmr_projects` (`id`) ON DELETE CASCADE;

--- 09/08 ---  

CREATE TABLE `market_docs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(11) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `market_docsversions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_id` int(10) unsigned DEFAULT NULL,
  `file_id` int(10) unsigned DEFAULT NULL,
  `version` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `file_id` (`file_id`),
  KEY `doc_id` (`doc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `market_docs` ADD FOREIGN KEY (`type_id`) REFERENCES `doc_types` (`id`);

ALTER TABLE `market_docsversions`
  ADD FOREIGN KEY (`doc_id`) REFERENCES `market_docs` (`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE;
  
--- 30/08 ---  

DROP TABLE 
    `catalog_airing_connection_types`, 
    `catalog_airing_control_types`, 
    `catalog_airing_groups`, 
    `catalog_airing_implementation_types`, 
    `catalog_airing_isolation_clases`, 
    `catalog_airing_materials`, 
    `catalog_airing_power_sources`, 
    `catalog_airing_product_types`, 
    `catalog_airing_protection_types`, 
    `catalog_conditioners_groups`, 
    `catalog_conditioners_implementation_types`, 
    `catalog_conditioners_power_sources`, 
    `catalog_conditioners_product_types`;

DROP TABLE IF EXISTS `catalog_airing`;
CREATE TABLE IF NOT EXISTS `catalog_airing` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
  `group_id` int(10) unsigned DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `marking` text,
  `name` text,
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
  `url` text,
  `price` text,
  `dealer_price` text,
  `currency_id` int(10) unsigned DEFAULT NULL,
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

DROP TABLE IF EXISTS `catalog_electricity_battery`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_battery` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `name` text,
  `marking` text,
  `product_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `type_id` int(10) unsigned DEFAULT NULL,
  `size_type_id` int(10) unsigned DEFAULT NULL,
  `voltage` text,
  `capacity` text,
  `country` text,
  `measure` text,
  `price` text,
  `dealer_price` text,
  `currency_id` int(10) unsigned DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `mark_id` (`mark_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `implementation_type_id` (`implementation_type_id`),
  KEY `type_id` (`type_id`),
  KEY `size_type_id` (`size_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_electricity_isolation`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_isolation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `name` text,
  `marking` text,
  `product_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `colour` text,
  `width` text,
  `length` text,
  `pipe_diameter_id` int(10) unsigned DEFAULT NULL,
  `cambric_diameter` text,
  `combustibility_id` int(10) unsigned DEFAULT NULL,
  `exploitation_id` int(10) unsigned DEFAULT NULL,
  `temp_ranges_id` int(10) unsigned DEFAULT NULL,
  `breakdown_voltage` text,
  `country` text,
  `measure` text,
  `price` text,
  `dealer_price` text,
  `currency_id` int(10) unsigned DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `mark_id` (`mark_id`),
  KEY `implementation_type_id` (`implementation_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_electricity_lamp`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_lamp` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `name` text,
  `marking` text,
  `group_id` int(10) unsigned DEFAULT NULL,
  `product_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `cap_type_id` int(10) unsigned DEFAULT NULL,
  `bulb_type_id` int(10) unsigned DEFAULT NULL,
  `voltage` int(10) unsigned DEFAULT NULL,
  `power` text,
  `reflector_diameter` text,
  `beam_angle` text,
  `dispersion_angle` text,
  `light_stream` text,
  `bulb_diameter` text,
  `tube_diameter` text,
  `lamp_diameter` text,
  `lamp_length` text,
  `country` text,
  `measure` text,
  `price` text,
  `dealer_price` text,
  `currency_id` int(10) unsigned DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `mark_id` (`mark_id`),
  KEY `group_id` (`group_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `implementation_type_id` (`implementation_type_id`),
  KEY `cap_type_id` (`cap_type_id`),
  KEY `bulb_type_id` (`bulb_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_electricity_wires`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_wires` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` text,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `name` text,
  `marking` text,
  `production_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `conductor_material_id` int(10) unsigned DEFAULT NULL,
  `conductor_type_id` int(10) unsigned DEFAULT NULL,
  `conductor_section_id` int(10) unsigned DEFAULT NULL,
  `pairs_number` int(11) DEFAULT NULL,
  `conductors_number` int(11) DEFAULT NULL,
  `isolation_material_id` int(10) unsigned DEFAULT NULL,
  `cable_material_id` int(10) unsigned DEFAULT NULL,
  `wire_colour` text,
  `screening_id` int(10) unsigned DEFAULT NULL,
  `outer_diameter` int(10) unsigned DEFAULT NULL,
  `working_voltage_id` int(10) unsigned DEFAULT NULL,
  `working_frequency_id` int(10) unsigned DEFAULT NULL,
  `isolation_resistance` text,
  `bend_radius` text,
  `combustibility_id` int(10) unsigned DEFAULT NULL,
  `exploitation_id` int(10) unsigned DEFAULT NULL,
  `laying_temp` text,
  `temp_range_id` int(10) unsigned DEFAULT NULL,
  `country` text,
  `measure` text,
  `price` text,
  `dealer_price` text,
  `currency_id` int(10) unsigned DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `mark_id` (`mark_id`),
  KEY `production_type_id` (`production_type_id`),
  KEY `implementation_type_id` (`implementation_type_id`),
  KEY `conductor_material_id` (`conductor_material_id`),
  KEY `conductor_type_id` (`conductor_type_id`),
  KEY `isolation_material_id` (`isolation_material_id`),
  KEY `cable_material_id` (`cable_material_id`),
  KEY `screening_id` (`screening_id`),
  KEY `outer_diameter` (`outer_diameter`),
  KEY `working_voltage_id` (`working_voltage_id`),
  KEY `working_frequency_id` (`working_frequency_id`),
  KEY `combustibility_id` (`combustibility_id`),
  KEY `exploitation_id` (`exploitation_id`),
  KEY `currency_id` (`currency_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `catalog_airing`
  ADD CONSTRAINT `catalog_airing_ibfk_1` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`) ON DELETE SET NULL;

ALTER TABLE `catalog_electricity_battery`
  ADD CONSTRAINT `catalog_electricity_battery_ibfk_1` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`) ON DELETE SET NULL;

ALTER TABLE `catalog_electricity_isolation`
  ADD CONSTRAINT `catalog_electricity_isolation_ibfk_1` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`) ON DELETE SET NULL;

ALTER TABLE `catalog_electricity_lamp`
  ADD CONSTRAINT `catalog_electricity_lamp_ibfk_1` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`) ON DELETE SET NULL;

ALTER TABLE `catalog_electricity_wires`
  ADD CONSTRAINT `catalog_electricity_wires_ibfk_1` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`) ON DELETE SET NULL;

--- 31/08 ---  

DROP TABLE IF EXISTS `catalog_airing`;
CREATE TABLE IF NOT EXISTS `catalog_airing` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
  `group_id` int(10) unsigned DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `marking` text,
  `name` text,
  `product_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `recuperator_id` int(10) unsigned DEFAULT NULL,
  `operate_temp_range_cooling_id` int(10) unsigned DEFAULT NULL,
  `operate_temp_range_heating_id` int(10) unsigned DEFAULT NULL,
  `country` text,
  `power_consumption` text,
  `air_consumption_min` text,
  `air_consumption_max` text,
  `heat_utilization_efficiency_min` text,
  `heat_utilization_efficiency_max` text,
  `static_pressure` text,
  `noise_level_min` text,
  `noise_level_max` text,
  `weight` text,
  `dimensions` text,
  `power_voltage` text,
  `power_phases` text,
  `power_freq` text,
  `price` text,
  `dealer_price` text,
  `currency_id` int(10) unsigned DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `mark_id` (`mark_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `implementation_type_id` (`implementation_type_id`),
  KEY `control_type_id` (`recuperator_id`),
  KEY `connection_type_id` (`operate_temp_range_cooling_id`),
  KEY `protection_type_id` (`operate_temp_range_heating_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

ALTER TABLE `catalog_airing` ADD FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`) ON DELETE SET NULL;

--- 29/11 ---  

DROP TABLE IF EXISTS `catalog_related_services`;
CREATE TABLE IF NOT EXISTS `catalog_related_services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned NOT NULL,
  `entity` text NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  `term` text NOT NULL,
  `price` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `catalog_related_services`
  ADD CONSTRAINT `catalog_related_services_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`);

--- 03/12 ---  

DROP TABLE `catalog_related_services`;

DROP TABLE  
`crm_demoprojects`, 
`crm_demoprojects_discussions`, 
`crm_demoprojects_docs`, 
`crm_demoprojects_docs_versions`, `
crm_demoprojects_equipment`, 
`crm_demoprojects_equipment_services`, 
`crm_demoprojects_groups`, 
`crm_demoprojects_members`, 
`crm_demoprojects_special_services`, 
`crm_demoprojects_special_services_expendables`;
 
--- 08/12 ---  

DROP TABLE IF EXISTS `contractors`;
CREATE TABLE IF NOT EXISTS `contractors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `full_name` text,
  `legal_address` text,
  `postal_address` text,
  `form_organization` text,
  `ogrn` text,
  `okved` text,
  `okato` text,
  `okpo` text,
  `inn_kpp` text,
  `bank_account` text,
  `bank` text,
  `bik` text,
  `corr_account` text,
  `general_director` text,
  `chief_accountant` text,
  `phone` text,
  `site` text,
  `trademark` text,
  `eng_sys_type_id` INT(10) UNSIGNED NULL,
  `goods` text,
  `address` text,
  `shipment` text,
  `discount` text,
  `note` text,
  PRIMARY KEY (`id`),
  KEY `eng_sys_type_id` (`eng_sys_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

INSERT INTO `contractors` (`id`, `name`, `full_name`, `legal_address`, `postal_address`, `form_organization`, `ogrn`, `okved`, `okato`, `okpo`, `inn_kpp`, `bank_account`, `bank`, `bik`, `corr_account`, `general_director`, `chief_accountant`, `phone`, `site`) VALUES
(1, 'ОАО "ЕВРАЗКЛИМАТ"', 'Открытое Акционерное Общество "ЕВРАЗКЛИМАТ"', '115088, г.Москва, ул.Угрешская, д.2, стр.52', '115088, г.Москва, ул.Угрешская, д.2, стр.52', 'Открытое Акционерное Общество', '1127746189801', '45,3', '45290582000', '09151522', '7723831289/772301001', '40702810000050240701', 'АКБ ОАО "РОСЕВРОБАНК" (ОАО)', '044585777', '30101810800000000777', 'Ковшилов Игорь Анатольевич', 'Громоздин Павел Сергеевич', '8 (495) 988-92-96', 'http://eurasclimat.ru');

DROP TABLE IF EXISTS `contractors_contacts`;
CREATE TABLE IF NOT EXISTS `contractors_contacts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contractor_id` int(10) unsigned NOT NULL,
  `account_id` int(10) unsigned DEFAULT NULL,
  `name` text NOT NULL,
  `function` text,
  `work_phone` text,
  `mobile_phone` text,
  `email` text,
  PRIMARY KEY (`id`),
  KEY `contractor_id` (`contractor_id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `contractors_docs`;
CREATE TABLE IF NOT EXISTS `contractors_docs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(11) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

DROP TABLE IF EXISTS `contractors_docsversions`;
CREATE TABLE IF NOT EXISTS `contractors_docsversions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_id` int(10) unsigned DEFAULT NULL,
  `file_id` int(10) unsigned DEFAULT NULL,
  `version` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `file_id` (`file_id`),
  KEY `doc_id` (`doc_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

ALTER TABLE `contractors` ADD FOREIGN KEY (`eng_sys_type_id`) REFERENCES `engineering_system_types`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

ALTER TABLE `contractors_contacts`
  ADD CONSTRAINT `contractors_contacts_ibfk_1` FOREIGN KEY (`contractor_id`) REFERENCES `contractors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `contractors_contacts_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

ALTER TABLE `contractors_docs`
  ADD CONSTRAINT `contractors_docs_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `doc_types` (`id`);

ALTER TABLE `market_docsversions`
  ADD CONSTRAINT `contractors_docsversions_ibfk_1` FOREIGN KEY (`doc_id`) REFERENCES `contractors_docs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `contractors_docsversions_ibfk_2` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE;
    
SET FOREIGN_KEY_CHECKS=1;