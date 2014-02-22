SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE  `messages` ADD  `type` INT( 2 ) UNSIGNED NULL DEFAULT NULL ;
ALTER TABLE  `messages` ADD  `subject` VARCHAR( 255 ) NULL DEFAULT NULL ;
ALTER TABLE  `messages` ADD  `deleted` INT( 1 ) UNSIGNED NOT NULL DEFAULT  '0';

ALTER TABLE  `messages` ADD  `owner_id` INT( 10 ) UNSIGNED NOT NULL ,
ADD INDEX (  `owner_id` ) ;

ALTER TABLE  `messages` ADD CONSTRAINT  `messages_ibfk_2` 
	FOREIGN KEY (  `receiver_id` ) REFERENCES  `accounts` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT ;
ALTER TABLE  `messages` ADD FOREIGN KEY ( `owner_id` ) REFERENCES  `accounts` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT ;

ALTER TABLE  `messages` ADD  `sender_name` VARCHAR( 255 ) NULL DEFAULT NULL ,
ADD  `receiver_name` VARCHAR( 255 ) NULL DEFAULT NULL ;

SET FOREIGN_KEY_CHECKS=1;
