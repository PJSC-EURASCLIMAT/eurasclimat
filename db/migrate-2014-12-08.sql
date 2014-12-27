SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `contractors`;
CREATE TABLE IF NOT EXISTS `contractors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `full_name` text,
  `legal_address` text,
  `postal_address` text,
  `form_organization` text,
  `ogrn` text,
  `okved` text,
  `okato` text,
  `okpo` text,
  `inn_kpp` text,
  `bank_account` text,
  `bank` text,
  `bik` text,
  `corr_account` text,
  `general_director` text,
  `chief_accountant` text,
  `phone` text,
  `site` text,
  `trademark` text,
  `eng_sys_type_id` INT(10) UNSIGNED NULL,
  `goods` text,
  `address` text,
  `shipment` text,
  `discount` text,
  `note` text,
  PRIMARY KEY (`id`),
  KEY `eng_sys_type_id` (`eng_sys_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

INSERT INTO `contractors` (`id`, `name`, `full_name`, `legal_address`, `postal_address`, `form_organization`, `ogrn`, `okved`, `okato`, `okpo`, `inn_kpp`, `bank_account`, `bank`, `bik`, `corr_account`, `general_director`, `chief_accountant`, `phone`, `site`) VALUES
(1, 'ОАО "ЕВРАЗКЛИМАТ"', 'Открытое Акционерное Общество "ЕВРАЗКЛИМАТ"', '115088, г.Москва, ул.Угрешская, д.2, стр.52', '115088, г.Москва, ул.Угрешская, д.2, стр.52', 'Открытое Акционерное Общество', '1127746189801', '45,3', '45290582000', '09151522', '7723831289/772301001', '40702810000050240701', 'АКБ ОАО "РОСЕВРОБАНК" (ОАО)', '044585777', '30101810800000000777', 'Ковшилов Игорь Анатольевич', 'Громоздин Павел Сергеевич', '8 (495) 988-92-96', 'http://eurasclimat.ru');

DROP TABLE IF EXISTS `contractors_contacts`;
CREATE TABLE IF NOT EXISTS `contractors_contacts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contractor_id` int(10) unsigned NOT NULL,
  `account_id` int(10) unsigned DEFAULT NULL,
  `name` text NOT NULL,
  `function` text,
  `work_phone` text,
  `mobile_phone` text,
  `email` text,
  PRIMARY KEY (`id`),
  KEY `contractor_id` (`contractor_id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `contractors_docs`;
CREATE TABLE IF NOT EXISTS `contractors_docs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(11) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

DROP TABLE IF EXISTS `contractors_docsversions`;
CREATE TABLE IF NOT EXISTS `contractors_docsversions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_id` int(10) unsigned DEFAULT NULL,
  `file_id` int(10) unsigned DEFAULT NULL,
  `version` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `file_id` (`file_id`),
  KEY `doc_id` (`doc_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

ALTER TABLE `contractors` ADD FOREIGN KEY (`eng_sys_type_id`) REFERENCES `engineering_system_types`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

ALTER TABLE `contractors_contacts`
  ADD CONSTRAINT `contractors_contacts_ibfk_1` FOREIGN KEY (`contractor_id`) REFERENCES `contractors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `contractors_contacts_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

ALTER TABLE `contractors_docs`
  ADD CONSTRAINT `contractors_docs_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `doc_types` (`id`);

ALTER TABLE `market_docsversions`
  ADD CONSTRAINT `contractors_docsversions_ibfk_1` FOREIGN KEY (`doc_id`) REFERENCES `contractors_docs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `contractors_docsversions_ibfk_2` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE;

  SET FOREIGN_KEY_CHECKS=1;