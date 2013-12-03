SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE `experts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `desc` text,
  `city_id` int(10) unsigned DEFAULT NULL,
  `status_id` int(10) unsigned DEFAULT NULL,
  `equip_id` int(10) unsigned DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  `author_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `status_id` (`status_id`) USING BTREE,
  KEY `equip_id` (`equip_id`) USING BTREE,
  KEY `author_id` (`author_id`) USING BTREE,
  KEY `city_id` (`city_id`) USING BTREE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;


CREATE TABLE `experts_docs` (
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;


CREATE TABLE `experts_equipment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  `author_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`) USING BTREE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;


CREATE TABLE `experts_experience` (
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;


CREATE TABLE `experts_job_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  `author_id` int(11) unsigned DEFAULT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`) USING BTREE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;


CREATE TABLE `experts_rating` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  `author_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;



DROP TABLE IF EXISTS `experts_statuses`;
CREATE TABLE IF NOT EXISTS `experts_statuses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `desc` text,
  `date_create` datetime NOT NULL,
  `date_update` datetime DEFAULT NULL,
  `author_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`) USING BTREE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;


DROP TRIGGER IF EXISTS `date_create`;
DELIMITER //
CREATE TRIGGER `date_create` BEFORE INSERT ON `experts_statuses`
 FOR EACH ROW BEGIN
set NEW.date_create = NOW();
set NEW.date_update = NOW();
END
//
DELIMITER ;
DROP TRIGGER IF EXISTS `date_update`;
DELIMITER //
CREATE TRIGGER `date_update` BEFORE UPDATE ON `experts_statuses`
 FOR EACH ROW SET NEW.date_update = NOW()
//
DELIMITER ;


ALTER TABLE `experts`
  ADD CONSTRAINT `experts_ibfk_4` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_1` FOREIGN KEY (`equip_id`) REFERENCES `experts_equipment` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `experts_statuses` (`id`) ON DELETE SET NULL;

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




SET FOREIGN_KEY_CHECKS=1;