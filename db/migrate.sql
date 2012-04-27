DROP TABLE `languages`;
DROP TABLE `notes`;
DROP TABLE `storage_assets_categories`;
DROP TABLE `storage_categories`;
DROP TABLE `storage_history`;
DROP TABLE `storage_requests`;
DROP TABLE `storage_assets`;
DROP TABLE `storage_measures`;
DROP TABLE `notice_dst`;
DROP TABLE `notice`;
DROP TABLE `fixed_assets_files`;
DROP TABLE `fixed_assets`;
DROP TABLE `files`;
DROP TABLE `orders`;
DROP TABLE `staff_vacations`;
DROP TABLE `staff_payments`;
DROP TABLE `staff_hr`;
DROP TABLE `staff`;
DROP TABLE `staff_categories`;
DROP TABLE `customers`;

TRUNCATE TABLE `acl_resources`;
INSERT INTO `acl_resources` (`name`, `title`, `parent_id`)
VALUES ('admin', 'Администрирование', NULL), ('catalog', 'Каталог', NULL);

INSERT INTO `acl_permissions` (`role_id`, `resource_id`, `privilege_id`) 
VALUES ('1', '1', '1'), ('1', '1', '3'), ('1', '2', '1'), ('1', '2', '3');