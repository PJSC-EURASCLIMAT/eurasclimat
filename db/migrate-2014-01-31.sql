SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `crm_projects` 
    ADD `preparation` TIMESTAMP NULL , 
    ADD `coordination` TIMESTAMP NULL , 
    ADD `execution` TIMESTAMP NULL , 
    ADD `implementation` TIMESTAMP NULL ;

SET FOREIGN_KEY_CHECKS=1;
