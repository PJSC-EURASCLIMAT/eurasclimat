SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE `accounts_contacts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `owner_id` int(10) unsigned NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  KEY `contact_id` (`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `accounts_contacts`
  ADD CONSTRAINT `accounts_contacts_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `accounts_contacts_ibfk_2` FOREIGN KEY (`contact_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE;


SET FOREIGN_KEY_CHECKS=1;