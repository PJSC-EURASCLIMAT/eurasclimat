SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE  `news_main` ADD  `published` INT( 1 ) NOT NULL DEFAULT  '0';

ALTER TABLE  `news_main` CHANGE  `category_id`  `category_id` INT( 10 ) UNSIGNED NULL ;

ALTER TABLE  `news_main` DROP FOREIGN KEY  `news_main_ibfk_1` ;

ALTER TABLE  `news_main` ADD CONSTRAINT  `news_main_ibfk_1` FOREIGN KEY (  `category_id` ) REFERENCES  `news_main_category` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT ;

ALTER TABLE `news_main` ADD FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

SET FOREIGN_KEY_CHECKS=1;