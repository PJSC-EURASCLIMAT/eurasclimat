SET FOREIGN_KEY_CHECKS=0;



CREATE TABLE `experts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(10) unsigned DEFAULT NULL,
  `desc` text,
  `status_id` int(10) unsigned DEFAULT NULL,
  `equip_id` int(10) unsigned DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  `author_id` int(11) unsigned DEFAULT NULL,
  `active` int(1) unsigned NOT NULL DEFAULT '0',
  `rating` int(10) unsigned DEFAULT NULL,
  `work_years` int(2) DEFAULT NULL,
  `study_years` int(2) DEFAULT NULL,
  `sert_count` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `status_id` (`status_id`),
  KEY `equip_id` (`equip_id`),
  KEY `author_id` (`author_id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;


--
-- Triggers `experts`
--
DROP TRIGGER IF EXISTS `experts_date_create`;
DELIMITER //
CREATE TRIGGER `experts_date_create` BEFORE INSERT ON `experts`
 FOR EACH ROW BEGIN
set NEW.date_create = NOW();
set NEW.date_update = NOW();
END
//
DELIMITER ;
DROP TRIGGER IF EXISTS `experts_date_udpate`;
DELIMITER //
CREATE TRIGGER `experts_date_udpate` BEFORE UPDATE ON `experts`
 FOR EACH ROW SET NEW.date_update = NOW()
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `experts2job_types`
--

CREATE TABLE `experts2job_types` (
  `expert_id` int(10) unsigned NOT NULL,
  `job_type_id` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `expert_id` (`expert_id`),
  KEY `job_type_id` (`job_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=22 ;


--
-- Constraints for dumped tables
--

--
-- Constraints for table `experts`
--
ALTER TABLE `experts`
  ADD CONSTRAINT `experts_ibfk_1` FOREIGN KEY (`equip_id`) REFERENCES `experts_equipment` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `experts_statuses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `experts_ibfk_5` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `experts2job_types`
--
ALTER TABLE `experts2job_types`
  ADD CONSTRAINT `experts2job_types_ibfk_1` FOREIGN KEY (`expert_id`) REFERENCES `experts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `experts2job_types_ibfk_3` FOREIGN KEY (`job_type_id`) REFERENCES `experts_job_types` (`id`) ON DELETE CASCADE;



SET FOREIGN_KEY_CHECKS=1;