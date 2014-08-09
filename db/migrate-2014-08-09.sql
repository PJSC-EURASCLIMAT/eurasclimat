SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE `market_docs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(11) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `market_docsversions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_id` int(10) unsigned DEFAULT NULL,
  `file_id` int(10) unsigned DEFAULT NULL,
  `version` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `file_id` (`file_id`),
  KEY `doc_id` (`doc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `market_docs` ADD FOREIGN KEY (`type_id`) REFERENCES `doc_types` (`id`);

ALTER TABLE `market_docsversions`
  ADD FOREIGN KEY (`doc_id`) REFERENCES `market_docs` (`id`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE;

SET FOREIGN_KEY_CHECKS=1;