SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE `crm_orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(10) DEFAULT NULL,
  `category` int(10) DEFAULT NULL,
  `object` int(10) DEFAULT NULL,
  `area` int(10) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `skype` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8


SET FOREIGN_KEY_CHECKS=1;