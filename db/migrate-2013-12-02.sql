SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `catalog_conditioners` DROP `control_type_id`;
DROP TABLE `catalog_conditioners_control_types`;

ALTER TABLE `catalog_conditioners` DROP `connection_type_id`;
DROP TABLE `catalog_conditioners_connection_types`;

ALTER TABLE `catalog_conditioners` DROP `protection_type_id`;
DROP TABLE `catalog_conditioners_protection_types`;

ALTER TABLE `catalog_conditioners` DROP `material_id`;
DROP TABLE `catalog_conditioners_materials`;

DROP TABLE `catalog_conditioners_power_sources`;

ALTER TABLE `catalog_conditioners` DROP `cooling_outdor_temp`;
ALTER TABLE `catalog_conditioners` DROP `heating_outdor_temp`;
ALTER TABLE `catalog_conditioners` DROP `power_supply`;
ALTER TABLE `catalog_conditioners` DROP `cooling_power_consumption`;
ALTER TABLE `catalog_conditioners` DROP `heating_power_consumption`;
ALTER TABLE `catalog_conditioners` DROP `amperage`;
ALTER TABLE `catalog_conditioners` DROP `sensor_inputs`;
ALTER TABLE `catalog_conditioners` DROP `pressure`;
ALTER TABLE `catalog_conditioners` DROP `eer`;
ALTER TABLE `catalog_conditioners` DROP `weight`;
ALTER TABLE `catalog_conditioners` DROP `cable_length`;
ALTER TABLE `catalog_conditioners` DROP `pipe_diameter_liquid`;
ALTER TABLE `catalog_conditioners` DROP `pipe_diameter_gas`;
ALTER TABLE `catalog_conditioners` DROP `drain_diameter`;
ALTER TABLE `catalog_conditioners` DROP `trunk_length`;
ALTER TABLE `catalog_conditioners` DROP `elevation_difference`;
ALTER TABLE `catalog_conditioners` DROP `square`;
ALTER TABLE `catalog_conditioners` DROP `volume`;
ALTER TABLE `catalog_conditioners` DROP `url`;

ALTER TABLE `catalog_conditioners` ADD `heatingcooling_id` INT UNSIGNED NULL AFTER `implementation_type_id`;
ALTER TABLE `catalog_conditioners` ADD `currency_id` INT UNSIGNED NULL AFTER `price`;
ALTER TABLE `catalog_conditioners` ADD `name` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL AFTER `marking`;

SET FOREIGN_KEY_CHECKS=1;