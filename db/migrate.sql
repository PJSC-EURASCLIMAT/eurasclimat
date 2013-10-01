SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE  `main_sysdev_project_docs` DROP FOREIGN KEY  `main_sysdev_project_docs_ibfk_2` ,
ADD FOREIGN KEY (  `project_id` ) REFERENCES  `e-head_ec`.`main_sysdev_projects` (
`id`
) ON DELETE CASCADE ON UPDATE RESTRICT ;

SET FOREIGN_KEY_CHECKS=1;