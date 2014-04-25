SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `accounts` ADD `ukkom` TINYINT( 1 ) NOT NULL DEFAULT '0';

ALTER TABLE `catalog_airing` ADD `name` TEXT NULL DEFAULT NULL AFTER `marking`;
ALTER TABLE `catalog_airing` ADD `dealer_price` TEXT NULL DEFAULT NULL AFTER `price`;
ALTER TABLE `catalog_airing` ADD `currency_id` int(10) unsigned DEFAULT NULL AFTER `dealer_price`;

ALTER TABLE `catalog_automation` ADD `name` TEXT NULL DEFAULT NULL AFTER `marking`;
ALTER TABLE `catalog_automation` ADD `dealer_price` TEXT NULL DEFAULT NULL AFTER `price`;
ALTER TABLE `catalog_automation` ADD `currency_id` int(10) unsigned DEFAULT NULL AFTER `dealer_price`;

ALTER TABLE `catalog_dustextraction` ADD `name` TEXT NULL DEFAULT NULL AFTER `marking`;
ALTER TABLE `catalog_dustextraction` ADD `dealer_price` TEXT NULL DEFAULT NULL AFTER `price`;
ALTER TABLE `catalog_dustextraction` ADD `currency_id` int(10) unsigned DEFAULT NULL AFTER `dealer_price`;

ALTER TABLE `catalog_electricity` ADD `name` TEXT NULL DEFAULT NULL AFTER `marking`;
ALTER TABLE `catalog_electricity` ADD `dealer_price` TEXT NULL DEFAULT NULL AFTER `price`;
ALTER TABLE `catalog_electricity` ADD `currency_id` int(10) unsigned DEFAULT NULL AFTER `dealer_price`;

ALTER TABLE `catalog_heating` ADD `name` TEXT NULL DEFAULT NULL AFTER `marking`;
ALTER TABLE `catalog_heating` ADD `dealer_price` TEXT NULL DEFAULT NULL AFTER `price`;
ALTER TABLE `catalog_heating` ADD `currency_id` int(10) unsigned DEFAULT NULL AFTER `dealer_price`;

ALTER TABLE `catalog_watersupply` ADD `name` TEXT NULL DEFAULT NULL AFTER `marking`;
ALTER TABLE `catalog_watersupply` ADD `dealer_price` TEXT NULL DEFAULT NULL AFTER `price`;
ALTER TABLE `catalog_watersupply` ADD `currency_id` int(10) unsigned DEFAULT NULL AFTER `dealer_price`;

SET FOREIGN_KEY_CHECKS=1;