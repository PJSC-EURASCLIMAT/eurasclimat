SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE  `courses` ADD  `offer_num` VARCHAR( 50 ) NULL ,
ADD UNIQUE (`offer_num`);

ALTER TABLE  `courses` ADD  `price` DOUBLE( 8, 2 ) NULL ;

SET FOREIGN_KEY_CHECKS=1;