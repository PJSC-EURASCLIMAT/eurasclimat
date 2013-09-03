SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `auth_keys`;
CREATE TABLE `auth_keys` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

ALTER TABLE `auth_keys`
  ADD CONSTRAINT `auth_keys_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

SET FOREIGN_KEY_CHECKS=1;