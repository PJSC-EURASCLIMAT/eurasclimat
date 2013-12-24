SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `sysdev_description`;

ALTER TABLE `accounts` DROP `email`;
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_ibfk_1`;
ALTER TABLE `accounts` DROP INDEX `country_id`;
ALTER TABLE `accounts` DROP `country_id`;

DROP TABLE IF EXISTS `experts`;
CREATE TABLE `experts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(10) unsigned DEFAULT NULL,
  `desc` text,
  `status_id` int(10) unsigned DEFAULT NULL,
  `equip_id` int(10) unsigned DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  `author_id` int(11) unsigned DEFAULT NULL,
  `active` int(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `status_id` (`status_id`),
  KEY `equip_id` (`equip_id`),
  KEY `author_id` (`author_id`),
  KEY `account_id` (`account_id`) 
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=45 ;

DROP TRIGGER IF EXISTS `experts_date_create`;
DELIMITER //
CREATE TRIGGER `experts_date_create` BEFORE INSERT ON `experts`
 FOR EACH ROW BEGIN
set NEW.date_create = NOW();
set NEW.date_update = NOW();
END
//
DELIMITER ;
DROP TRIGGER IF EXISTS `experts_date_udpate`;
DELIMITER //
CREATE TRIGGER `experts_date_udpate` BEFORE UPDATE ON `experts`
 FOR EACH ROW SET NEW.date_update = NOW()
//
DELIMITER ;

ALTER TABLE `experts`
  ADD CONSTRAINT `experts_ibfk_1` FOREIGN KEY (`equip_id`) REFERENCES `experts_equipment` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `experts_statuses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_5` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

SET FOREIGN_KEY_CHECKS=1;