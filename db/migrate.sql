CREATE TABLE `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

ALTER TABLE `main_sysdev_project_docs`
  DROP `url`,
  DROP `name`,
  DROP `date_create`;

ALTER TABLE  `main_sysdev_project_docs` ADD  `file_id` INT NOT NULL