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


ALTER TABLE `crm_projects` DROP FOREIGN KEY `crm_projects_ibfk_4`; 
ALTER TABLE `crm_projects` DROP FOREIGN KEY `crm_projects_ibfk_5`;

ALTER TABLE `crm_projects` DROP INDEX `customer_id`;
ALTER TABLE `crm_projects` DROP INDEX `manager_id`;

ALTER TABLE `crm_projects` DROP `manager_id`;
ALTER TABLE `crm_projects` CHANGE `customer_id` `customer_name` VARCHAR(255) NULL DEFAULT NULL;

SET FOREIGN_KEY_CHECKS=1;