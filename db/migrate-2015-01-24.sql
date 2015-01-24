SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `crm_projects_members` CHANGE `role` `role` ENUM('customer','manager','projector','logistic','productor','bookkeeper','clerk') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'customer';

SET FOREIGN_KEY_CHECKS=1;