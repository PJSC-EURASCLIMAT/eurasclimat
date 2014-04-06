SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE  `aboutsystem_themes` CHANGE  `name`  `text` VARCHAR( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ;

ALTER TABLE `aboutsystem_themes` DROP INDEX name;

CREATE TABLE `experts_courses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `type_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

ALTER TABLE `experts_courses`
  ADD CONSTRAINT `experts_courses_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `experts_course_types` (`id`) ON DELETE CASCADE;


CREATE TABLE `experts_course_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `sort` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=144 ;

ALTER TABLE `experts_course_types`
  ADD CONSTRAINT `experts_course_types_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `experts_course_types` (`id`) ON DELETE CASCADE;


SET FOREIGN_KEY_CHECKS=1;