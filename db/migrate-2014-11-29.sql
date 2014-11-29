SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `catalog_related_services`;
CREATE TABLE IF NOT EXISTS `catalog_related_services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned NOT NULL,
  `entity` text NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  `term` text NOT NULL,
  `price` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


ALTER TABLE `catalog_related_services`
  ADD CONSTRAINT `catalog_related_services_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `catalog_services` (`id`);

SET FOREIGN_KEY_CHECKS=1;