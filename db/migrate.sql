SET FOREIGN_KEY_CHECKS=0;
ALTER TABLE  `experts` CHANGE  `rating`  `rating` INT( 10 ) UNSIGNED NULL DEFAULT NULL;

CREATE TABLE `experts2job_types` (
  `expert_id` int(10) unsigned NOT NULL,
  `job_type_id` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `expert_id` (`expert_id`),
  KEY `job_type_id` (`job_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

ALTER TABLE `experts2job_types`
  ADD CONSTRAINT `experts2job_types_ibfk_1` FOREIGN KEY (`expert_id`) REFERENCES `experts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `experts2job_types_ibfk_3` FOREIGN KEY (`job_type_id`) REFERENCES `experts_job_types` (`id`) ON DELETE CASCADE;

SET FOREIGN_KEY_CHECKS=1;
