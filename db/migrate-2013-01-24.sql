CREATE TABLE IF NOT EXISTS `catalog_images` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` text character set latin1 NOT NULL,
  `entity` varchar(255) character set latin1 NOT NULL,
  `entity_id` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;