DELETE FROM `e-head_ec`.`acl_resources` WHERE `acl_resources`.`name` = 'sysdev';
UPDATE  `e-head_ec`.`acl_resources` SET  `name` =  'sysdev' WHERE  `acl_resources`.`name` = 'projectdev';
