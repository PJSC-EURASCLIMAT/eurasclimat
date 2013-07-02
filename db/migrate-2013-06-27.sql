SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

ALTER TABLE  `catalog_conditioners` ADD  `code` VARCHAR( 100 ) NULL AFTER  `id`;
ALTER TABLE  `catalog_airing` ADD  `code` VARCHAR( 100 ) NULL AFTER  `id`;
ALTER TABLE  `catalog_automation` ADD  `code` VARCHAR( 100 ) NULL AFTER  `id`;
ALTER TABLE  `catalog_dustextraction` ADD  `code` VARCHAR( 100 ) NULL AFTER  `id`;
ALTER TABLE  `catalog_electricity` ADD  `code` VARCHAR( 100 ) NULL AFTER  `id`;
ALTER TABLE  `catalog_heating` ADD  `code` VARCHAR( 100 ) NULL AFTER  `id`;
ALTER TABLE  `catalog_watersupply` ADD  `code` VARCHAR( 100 ) NULL AFTER  `id`;

--
-- Структура таблицы `catalog_services`
--

DROP TABLE IF EXISTS `catalog_services`;
CREATE TABLE IF NOT EXISTS `catalog_services` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `group_id` int(10) unsigned NOT NULL,
  `code` VARCHAR( 255 ) NULL,
  `name` text NOT NULL,
  `price` double(10,2) NOT NULL,
  `measure` VARCHAR( 255 ) NULL,
  `term` VARCHAR( 255 ) NULL,
  PRIMARY KEY  (`id`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_services_groups`
--

DROP TABLE IF EXISTS `catalog_services_groups`;
CREATE TABLE IF NOT EXISTS `catalog_services_groups` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

INSERT INTO `catalog_services_groups` (`id`, `name`) VALUES
(1, 'Кондиционирование'),
(2, 'Вентиляция'),
(3, 'Отопление'),
(4, 'Водоснабжение'),
(5, 'Канализация'),
(6, 'Пожарная сигнализация'),
(7, 'Охранная сигнализация'),
(8, 'Интернет коммуникации'),
(9, 'Телефонизация'),
(10, 'Радиофикация'),
(11, 'Телевизионные системы и коммуникации'),
(12, 'Электрика'),
(13, 'Автоматизация'),
(14, 'Диспетчеризация'),
(15, 'Системы чистых помещений');

--
-- Ограничения внешнего ключа таблицы `catalog_services`
--
ALTER TABLE `catalog_services`
  ADD CONSTRAINT `catalog_services_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `catalog_services_groups` (`id`);
SET FOREIGN_KEY_CHECKS=1;

