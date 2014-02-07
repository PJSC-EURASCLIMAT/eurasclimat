SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `crm_projects` 
    ADD `customer_id` INT UNSIGNED NULL AFTER `creator_id`, 
    ADD INDEX (`customer_id`) ;
ALTER TABLE `crm_projects` 
    ADD `manager_id` INT UNSIGNED NULL AFTER `customer_id`, 
    ADD INDEX (`manager_id`) ;
ALTER TABLE `crm_projects` ADD `stage` 
    SET('preparation','coordination','execution','implementation') 
    NOT NULL DEFAULT 'preparation' AFTER `manager_id`;
ALTER TABLE `crm_projects` ADD `address` TEXT NULL AFTER `customer_id`;
ALTER TABLE `crm_projects` ADD `object_type` TEXT NULL AFTER `address`;
ALTER TABLE `crm_projects` ADD `area` INT NULL AFTER `object_type`;
ALTER TABLE `crm_projects` ADD `description` TEXT NULL AFTER `area`;

ALTER TABLE `crm_projects` 
    ADD `sys_cond` INT NULL , 
    ADD `sys_vent` INT NULL , 
    ADD `sys_heat` INT NULL , 
    ADD `sys_water` INT NULL , 
    ADD `sys_electricity` INT NULL , 
    ADD `sys_automation` INT NULL , 
    ADD `sys_canal` INT NULL , 
    ADD `sys_fire` INT NULL , 
    ADD `sys_security` INT NULL , 
    ADD `sys_internet` INT NULL , 
    ADD `sys_phone` INT NULL , 
    ADD `sys_radio` INT NULL , 
    ADD `sys_tv` INT NULL , 
    ADD `sys_dispatch` INT NULL , 
    ADD `sys_clean` INT NULL ;

ALTER TABLE `crm_projects` 
    ADD `serv_project` INT NULL , 
    ADD `serv_logistic` INT NULL , 
    ADD `serv_execution` INT NULL , 
    ADD `serv_implementation` INT NULL ;

-- foreign keys --
     
ALTER TABLE `crm_projects` ADD FOREIGN KEY (`customer_id`) 
    REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;
ALTER TABLE `crm_projects` ADD FOREIGN KEY (`manager_id`) 
    REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

SET FOREIGN_KEY_CHECKS=1;