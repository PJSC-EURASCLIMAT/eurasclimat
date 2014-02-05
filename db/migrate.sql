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
ALTER TABLE `crm_projects` ADD `description` TEXT NULL AFTER `address`;

-- foreign keys --
     
ALTER TABLE `crm_projects` ADD FOREIGN KEY (`customer_id`) 
    REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;
ALTER TABLE `crm_projects` ADD FOREIGN KEY (`manager_id`) 
    REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

SET FOREIGN_KEY_CHECKS=1;