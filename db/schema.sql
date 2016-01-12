DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS opinions;

CREATE TABLE articles (
  id serial primary key,
  title varchar(25),
  link text,
  imageurl text,
  summary varchar(255)
);

CREATE TABLE opinions (
  id serial primary key,
  articles_id numeric,
  opinion varchar(50)
);