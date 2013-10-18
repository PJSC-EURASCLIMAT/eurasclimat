DELETE FROM `acl_resources` WHERE `acl_resources`.`name` = 'sysdev';
UPDATE  `acl_resources` SET  `name` =  'sysdev' WHERE  `acl_resources`.`name` = 'projectdev';
