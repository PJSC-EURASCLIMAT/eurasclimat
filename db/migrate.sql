SET FOREIGN_KEY_CHECKS=0;


CREATE TABLE `courses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `type_id` int(10) unsigned DEFAULT NULL,
  `closed` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;


CREATE TABLE `courses_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `sort` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=156 ;


ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `courses_groups` (`id`);

ALTER TABLE `courses_groups`
  ADD CONSTRAINT `courses_groups_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `courses_groups` (`id`) ON DELETE CASCADE;

SET FOREIGN_KEY_CHECKS=1;