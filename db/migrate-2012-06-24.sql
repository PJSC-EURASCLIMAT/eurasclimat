ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_ibfk_1` ;
ALTER TABLE `accounts` DROP `role_id` ;
ALTER TABLE `accounts` DROP `phone` ; 
ALTER TABLE `accounts` DROP `state` ;

CREATE TABLE IF NOT EXISTS `acl_roles_accounts` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `account_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `role_account` (`account_id`,`role_id`),
  KEY `account_id` (`account_id`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

ALTER TABLE `acl_roles_accounts`
  ADD CONSTRAINT `acl_roles_accounts_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `acl_roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `acl_roles_accounts_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE ;
  
INSERT INTO `acl_roles_accounts` (`account_id`, `role_id`) VALUES ('1', '1') ;