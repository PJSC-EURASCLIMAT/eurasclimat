ALTER TABLE `catalog_conditioners` DROP `mount_price`;
ALTER TABLE `catalog_airing` DROP `mount_price`;
ALTER TABLE `catalog_automation` DROP `mount_price`;
ALTER TABLE `catalog_dustextraction` DROP `mount_price`;
ALTER TABLE `catalog_electricity` DROP `mount_price`;
ALTER TABLE `catalog_heating` DROP `mount_price`;
ALTER TABLE `catalog_watersupply` DROP `mount_price`;

ALTER TABLE `catalog_conditioners` DROP `storage`;
ALTER TABLE `catalog_airing` DROP `storage`;
ALTER TABLE `catalog_automation` DROP `storage`;
ALTER TABLE `catalog_dustextraction` DROP `storage`;
ALTER TABLE `catalog_electricity` DROP `storage`;
ALTER TABLE `catalog_heating` DROP `storage`;
ALTER TABLE `catalog_watersupply` DROP `storage`;

ALTER TABLE `catalog_conditioners` DROP `reserve`;
ALTER TABLE `catalog_airing` DROP `reserve`;
ALTER TABLE `catalog_automation` DROP `reserve`;
ALTER TABLE `catalog_dustextraction` DROP `reserve`;
ALTER TABLE `catalog_electricity` DROP `reserve`;
ALTER TABLE `catalog_heating` DROP `reserve`;
ALTER TABLE `catalog_watersupply` DROP `reserve`;

ALTER TABLE `catalog_conditioners` DROP `order`;
ALTER TABLE `catalog_airing` DROP `order`;
ALTER TABLE `catalog_automation` DROP `order`;
ALTER TABLE `catalog_dustextraction` DROP `order`;
ALTER TABLE `catalog_electricity` DROP `order`;
ALTER TABLE `catalog_heating` DROP `order`;
ALTER TABLE `catalog_watersupply` DROP `order`;

SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE  `sysdev_description` DROP FOREIGN KEY  `sysdev_description_ibfk_2` ;
ALTER TABLE  `sysdev_description` DROP FOREIGN KEY  `sysdev_description_ibfk_1` ;

RENAME TABLE `sysdev_themes` TO `aboutsystem_themes` ;
RENAME TABLE `sysdev_description` TO `aboutsystem_description` ;

ALTER TABLE  `aboutsystem_themes` CHANGE `account_id` `account_id` INT( 11 ) UNSIGNED NULL ;
ALTER TABLE  `aboutsystem_description` CHANGE `account_id` `account_id` INT(11) UNSIGNED NULL ;
ALTER TABLE  `aboutsystem_description` ADD FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE ;
ALTER TABLE  `aboutsystem_description` DROP FOREIGN KEY  `aboutsystem_description_ibfk_3`,
    ADD FOREIGN KEY (`theme_id`) REFERENCES  `aboutsystem_themes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE ;
ALTER TABLE  `aboutsystem_themes` DROP FOREIGN KEY  `aboutsystem_themes_ibfk_2` ,
    ADD FOREIGN KEY (`account_id`) REFERENCES  `e-head_ec`.`accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE ;

SET FOREIGN_KEY_CHECKS=1;