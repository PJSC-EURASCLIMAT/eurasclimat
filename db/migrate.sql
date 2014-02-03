SET FOREIGN_KEY_CHECKS=0;
ALTER TABLE  `experts` ADD  `work_years` INT( 2 ) NULL ,
ADD  `study_years` INT( 2 ) NULL ,
ADD  `sert_count` INT( 2 ) NULL ;
ALTER TABLE  `experts` DROP  `experience` ;

SET FOREIGN_KEY_CHECKS=1;