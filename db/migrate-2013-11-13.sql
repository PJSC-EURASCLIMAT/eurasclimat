SET FOREIGN_KEY_CHECKS=0;

TRUNCATE TABLE `catalog_airing_services`;
TRUNCATE TABLE `catalog_automation_services`;
TRUNCATE TABLE `catalog_conditioners_services`;
TRUNCATE TABLE `catalog_dustextraction_services`;
TRUNCATE TABLE `catalog_electricity_services`;
TRUNCATE TABLE `catalog_heating_services`;
TRUNCATE TABLE `catalog_watersupply_services`;

ALTER TABLE `catalog_airing_services` ADD `term` VARCHAR(255) NULL, ADD `price` DOUBLE(10,2) NULL;
ALTER TABLE `catalog_automation_services` ADD `term` VARCHAR(255) NULL, ADD `price` DOUBLE(10,2) NULL;
ALTER TABLE `catalog_conditioners_services` ADD `term` VARCHAR(255) NULL, ADD `price` DOUBLE(10,2) NULL;
ALTER TABLE `catalog_dustextraction_services` ADD `term` VARCHAR(255) NULL, ADD `price` DOUBLE(10,2) NULL;
ALTER TABLE `catalog_electricity_services` ADD `term` VARCHAR(255) NULL, ADD `price` DOUBLE(10,2) NULL;
ALTER TABLE `catalog_heating_services` ADD `term` VARCHAR(255) NULL, ADD `price` DOUBLE(10,2) NULL;
ALTER TABLE `catalog_watersupply_services` ADD `term` VARCHAR(255) NULL, ADD `price` DOUBLE(10,2) NULL;

DROP TABLE IF EXISTS `catalog_services_groups`;

DROP TABLE IF EXISTS `catalog_services`;
CREATE TABLE `catalog_services` (
  `id` int(11) unsigned  NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

INSERT INTO `catalog_services` (`name`) VALUES ('Монтаж'), ('Демонтаж'), ('Настройка'),
('Диагностика'), ('Сервисное обслуживание'), ('Ремонт');

SET FOREIGN_KEY_CHECKS=1;