--
-- Обновить даты для голосования и комментариев
--
UPDATE main_sysdev_projects 
  set 
  date_vote_begin = '2013-04-01',
  date_vote_end = '2013-04-30', 
  date_discuss_begin = '2013-04-01',
  date_discuss_end = '2013-04-30'
WHERE id=2;