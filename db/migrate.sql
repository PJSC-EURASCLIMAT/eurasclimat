SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE  `courses` ADD  `closed` INT( 1 ) NOT NULL DEFAULT  '0';

ALTER TABLE  `courses` DROP FOREIGN KEY  `courses_ibfk_1` ;
ALTER TABLE  `courses` ADD CONSTRAINT  `courses_ibfk_1` FOREIGN KEY (  `type_id` ) REFERENCES  `e-head_ec`.`courses_groups` (
`id`
) ON DELETE RESTRICT ON UPDATE RESTRICT ;

SET FOREIGN_KEY_CHECKS=1;