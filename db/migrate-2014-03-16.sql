SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `crm_projects_members`;
CREATE TABLE IF NOT EXISTS `crm_projects_members` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `account_id` int(10) unsigned NOT NULL,
  `role` enum('customer','manager','projector','logistic') NOT NULL DEFAULT 'customer',
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `crm_projects_members`
  ADD CONSTRAINT `crm_projects_members_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `crm_projects_members_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `crm_projects` (`id`) ON DELETE CASCADE;

SET FOREIGN_KEY_CHECKS=1;