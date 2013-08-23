ALTER TABLE `main_sysdev_projects` ADD `stage` INT NULL COMMENT 'код стадии проекта';
UPDATE `main_sysdev_projects` SET `stage`= 2;
