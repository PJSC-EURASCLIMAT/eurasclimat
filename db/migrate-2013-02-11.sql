ALTER TABLE `accounts` ADD `country` VARCHAR(2) NULL AFTER `email`;
ALTER TABLE `accounts` ADD `city` VARCHAR(255) NULL AFTER `country`;