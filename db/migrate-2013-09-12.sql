SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE `crm_orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(11) unsigned NOT NULL,
  `category` int(10) DEFAULT NULL,
  `object` int(10) DEFAULT NULL,
  `area` int(10) DEFAULT NULL,
  `contacts` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

ALTER TABLE `crm_orders`
  ADD CONSTRAINT `crm_orders_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

SET FOREIGN_KEY_CHECKS=1;