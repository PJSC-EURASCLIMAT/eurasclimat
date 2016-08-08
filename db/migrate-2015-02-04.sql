SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE IF NOT EXISTS `contractors_engsystypes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contractor_id` int(10) unsigned NOT NULL,
  `engsystype_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contractor_id` (`contractor_id`),
  KEY `engsystype_id` (`engsystype_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `contractors_marks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contractor_id` int(10) unsigned NOT NULL,
  `mark_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contractor_id` (`contractor_id`),
  KEY `mark_id` (`mark_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


ALTER TABLE `contractors_engsystypes`
  ADD CONSTRAINT `contractors_engsystypes_ibfk_2` FOREIGN KEY (`engsystype_id`) REFERENCES `engineering_system_types` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `contractors_engsystypes_ibfk_1` FOREIGN KEY (`contractor_id`) REFERENCES `contractors` (`id`) ON DELETE CASCADE;

ALTER TABLE `contractors_marks`
  ADD CONSTRAINT `contractors_marks_ibfk_2` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `contractors_marks_ibfk_1` FOREIGN KEY (`contractor_id`) REFERENCES `contractors` (`id`) ON DELETE CASCADE;

SET FOREIGN_KEY_CHECKS=1;