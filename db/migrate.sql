SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE  `professions` ADD  `base_salary` INT UNSIGNED NOT NULL ,
ADD  `eng_sys_type_id` INT( 10 ) UNSIGNED DEFAULT NULL ,
ADD  `qualification_id` INT( 10 ) UNSIGNED DEFAULT NULL ,
ADD  `factor` FLOAT NOT NULL ;

ALTER TABLE  `professions` ADD INDEX (  `eng_sys_type_id` ) ;
ALTER TABLE  `professions` ADD INDEX (  `qualification_id` ) ;

ALTER TABLE `professions`
  ADD CONSTRAINT `professions_ibfk_1` FOREIGN KEY (`eng_sys_type_id`) REFERENCES `engineering_system_types` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `professions_ibfk_2` FOREIGN KEY (`qualification_id`) REFERENCES `qualifications` (`id`) ON DELETE SET NULL;



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


ALTER TABLE `qualifications`
  ADD CONSTRAINT `qualifications_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `qualifications_types` (`id`) ON DELETE CASCADE;



SET FOREIGN_KEY_CHECKS=1;