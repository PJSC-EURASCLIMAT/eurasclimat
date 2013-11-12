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

ALTER TABLE  `main_sysdev_project_docs` ADD  `file_id` INT NOT NULL;

ALTER TABLE  `main_sysdev_project_docs` ADD INDEX (  `file_id` );

SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE  `main_sysdev_project_docs` ADD FOREIGN KEY (  `file_id` ) REFERENCES  `e-head_ec`.`files` (
`id`
) ON DELETE CASCADE ON UPDATE RESTRICT ;

SET FOREIGN_KEY_CHECKS=1;

ALTER TABLE  `files` ADD  `account_id` INT UNSIGNED NULL;
ALTER TABLE  `files` ADD INDEX (  `account_id` );
ALTER TABLE  `files` ADD FOREIGN KEY (  `account_id` ) REFERENCES  `e-head_ec`.`accounts` (
`id`
) ON DELETE SET NULL ON UPDATE RESTRICT ;