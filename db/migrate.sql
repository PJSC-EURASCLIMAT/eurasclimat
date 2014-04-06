SET FOREIGN_KEY_CHECKS=0;

RENAME TABLE experts_courses TO courses;
RENAME TABLE experts_course_types TO courses_groups;

SET FOREIGN_KEY_CHECKS=1;