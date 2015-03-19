SET FOREIGN_KEY_CHECKS=0;

DROP TABLE `calcpd`, `calcpd_content`;

DROP TABLE IF EXISTS `crm_projects_calcpd`;
CREATE TABLE IF NOT EXISTS `crm_projects_calcpd` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `serv_id` int(10) unsigned NOT NULL,
  `obj_type_id` int(10) unsigned NOT NULL,
  `obj_class_id` int(10) unsigned NOT NULL,
  `square` double(10,3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `obj_type_id` (`obj_type_id`),
  KEY `obj_class_id` (`obj_class_id`),
  KEY `serv_id` (`serv_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

ALTER TABLE `crm_projects_calcpd`
  ADD CONSTRAINT `crm_projects_calcpd_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `crm_projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `crm_projects_calcpd_ibfk_2` FOREIGN KEY (`serv_id`) REFERENCES `calcpd_serv` (`id`),
  ADD CONSTRAINT `crm_projects_calcpd_ibfk_3` FOREIGN KEY (`obj_type_id`) REFERENCES `calcpd_obj_type` (`id`),
  ADD CONSTRAINT `crm_projects_calcpd_ibfk_4` FOREIGN KEY (`obj_class_id`) REFERENCES `calcpd_obj_class` (`id`);

SET FOREIGN_KEY_CHECKS=1;