SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE  `professions` DROP FOREIGN KEY  `professions_ibfk_2` ;
ALTER TABLE  `professions` DROP INDEX `qualification_id` ;
ALTER TABLE `professions` DROP `qualification_id`;

ALTER TABLE  `professions` ADD  `qualification_type_id` INT( 10 ) UNSIGNED NULL ;
ALTER TABLE  `professions` ADD INDEX (  `qualification_type_id` ) ;
ALTER TABLE  `professions` ADD FOREIGN KEY (  `qualification_type_id` ) REFERENCES  `e-head_ec`.`qualifications_types` (
`id`
) ON DELETE SET NULL ON UPDATE RESTRICT ;

ALTER TABLE `professions` DROP `factor`;


SET FOREIGN_KEY_CHECKS=1;