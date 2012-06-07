ALTER TABLE `acl_roles` DROP `alias` ;
ALTER TABLE `acl_roles` ADD `parent_id` INT UNSIGNED NULL DEFAULT NULL , ADD INDEX ( parent_id ) ;
ALTER TABLE `acl_roles` ADD FOREIGN KEY ( `parent_id` ) REFERENCES `acl_roles` (`id`) ON DELETE RESTRICT ;