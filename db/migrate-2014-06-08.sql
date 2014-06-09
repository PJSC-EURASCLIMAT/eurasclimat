SET FOREIGN_KEY_CHECKS=0;

TRUNCATE smokercabin_themes;
TRUNCATE smokercabin_description;

INSERT INTO `smokercabin_description` (`id`, `theme_id`, `account_id`, `date`, `content`) VALUES
(1, 1, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/07.jpg" width="100%">'),
(2, 2, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/08.jpg" width="100%">'),
(3, 3, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/09.jpg" width="100%">'),
(4, 4, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/10.jpg" width="100%">'),
(5, 5, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/11.jpg" width="100%">'),
(6, 6, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/12.jpg" width="100%">'),
(7, 7, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/13.jpg" width="100%">'),
(8, 8, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/14.jpg" width="100%">'),
(9, 9, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/15.jpg" width="100%">'),
(10, 10, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/16.jpg" width="100%">'),
(11, 11, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/17.jpg" width="100%">'),
(12, 12, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/18.jpg" width="100%">'),
(13, 13, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/19.jpg" width="100%">'),
(14, 14, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/20.jpg" width="100%">'),
(15, 15, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/21.jpg" width="100%">'),
(16, 16, 1, '2014-06-08 12:54:33', '<img src="/images/SmokerCabin/new/22.jpg" width="100%">'),
(17, 17, 1, '2014-06-08 12:54:33', 'Только для зарегистрированных пользователей.'),
(18, 18, 1, '2014-06-08 12:54:33', 'Только для зарегистрированных пользователей.'),
(19, 19, 1, '2014-06-08 12:54:33', 'Только для зарегистрированных пользователей.'),
(20, 20, 1, '2014-06-08 12:54:33', 'Только для зарегистрированных пользователей.'),
(21, 21, 1, '2014-06-08 12:54:33', 'Только для зарегистрированных пользователей.'),
(22, 22, 1, '2014-06-08 12:54:33', 'Только для зарегистрированных пользователей.'),
(23, 23, 1, '2014-06-08 12:54:33', '<embed src="/images/SmokerCabin/animation.swf" wmode="transparent" align="middle" allowscriptaccess="sameDomain" style="border:0px solid #dddddd" height="100%" width="100%" pluginspage="http://www.adobe.com/go/getflashplayer" quality="high" type="application/x-shockwave-flash"></embed>'),
(24, 24, 1, '2014-06-08 12:54:33', '<embed src="/images/SmokerCabin/panorama.swf" wmode="transparent" align="middle" allowscriptaccess="sameDomain" style="border:0px solid #dddddd" height="100%" width="100%" pluginspage="http://www.adobe.com/go/getflashplayer" quality="high" type="application/x-shockwave-flash">');

INSERT INTO `smokercabin_themes` (`id`, `name`, `parent_id`, `account_id`, `extended`) VALUES
(1, 'Вариант исполнения для помещений', NULL, 1, 0),
(2, 'Вариант исполнения для помещений', NULL, 1, 0),
(3, 'Вариант исполнения для помещений', NULL, 1, 0),
(4, 'Вариант исполнения для помещений', NULL, 1, 0),
(5, 'Вариант исполнения для уличных условий', NULL, 1, 0),
(6, 'Вариант исполнения для уличных условий', NULL, 1, 0),
(7, 'Вариант исполнения для уличных условий', NULL, 1, 0),
(8, 'Вариант исполнения для уличных условий', NULL, 1, 0),
(9, 'Исполнение интерьера', NULL, 1, 0),
(10, 'Исполнение интерьера', NULL, 1, 0),
(11, 'Исполнение интерьера', NULL, 1, 0),
(12, 'Исполнение интерьера', NULL, 1, 0),
(13, 'Габаритные размеры', NULL, 1, 0),
(14, 'Габаритные размеры', NULL, 1, 0),
(15, 'Габаритные размеры', NULL, 1, 0),
(16, 'Габаритные размеры', NULL, 1, 0),
(17, 'Конструктивные решения', NULL, 1, 0),
(18, 'Конструктивные решения', NULL, 1, 0),
(19, 'Конструктивные решения', NULL, 1, 0),
(20, 'Конструктивные решения', NULL, 1, 0),
(21, 'Конструктивные решения', NULL, 1, 0),
(22, 'Конструктивные решения', NULL, 1, 0),
(23, 'Анимация экстерьера', NULL, '1', '0'), 
(24, 'Интерактивная панорама интерьера', NULL, '1', '0');

SET FOREIGN_KEY_CHECKS=1;