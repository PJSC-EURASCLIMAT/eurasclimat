SET FOREIGN_KEY_CHECKS=0;
CREATE TABLE `messages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` int(10) unsigned DEFAULT NULL,
  `receiver_id` int(10) unsigned DEFAULT NULL,
  `message` text,
  `date` timestamp NULL DEFAULT NULL,
  `read` tinyint(4) DEFAULT '0',
  `parent` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=25 ;


INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `message`, `date`, `read`, `parent`) VALUES
(15, 1, 1, 'test', '2013-10-24 20:11:49', 0, NULL);


ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL;

SET FOREIGN_KEY_CHECKS=1;