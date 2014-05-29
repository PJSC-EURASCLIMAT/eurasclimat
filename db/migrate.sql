SET FOREIGN_KEY_CHECKS=0;

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
  KEY `parent_id` (`parent_id`),
  KEY `parent_id_2` (`parent_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;



ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`chapter_id`) REFERENCES `services_chapters` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `services_ibfk_3` FOREIGN KEY (`profession_id`) REFERENCES `professions` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `services_ibfk_4` FOREIGN KEY (`eng_sys_type_id`) REFERENCES `engineering_system_types` (`id`) ON DELETE SET NULL;


ALTER TABLE `services_chapters`
  ADD CONSTRAINT `services_chapters_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `services_chapters` (`id`) ON DELETE CASCADE;

SET FOREIGN_KEY_CHECKS=1;