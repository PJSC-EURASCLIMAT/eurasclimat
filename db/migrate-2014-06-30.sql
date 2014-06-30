SET FOREIGN_KEY_CHECKS=0;

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

SET FOREIGN_KEY_CHECKS=1;