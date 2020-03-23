
CREATE TABLE articles
(
  id serial NOT NULL,
  employee_id integer NOT NULL,
  title character varying NOT NULL,
  article character varying NOT NULL,
  articledate timestamp without time zone DEFAULT now(),
  CONSTRAINT articles_pkey PRIMARY KEY (id)
);

CREATE TABLE employee
(
  id serial NOT NULL,
  firstname character varying NOT NULL,
  lastname character varying NOT NULL,
  email character varying NOT NULL,
  password character varying NOT NULL,
  gender character varying NOT NULL,
  jobrole character varying NOT NULL,
  isadmin boolean DEFAULT false,
  department character varying NOT NULL,
  regdate timestamp without time zone DEFAULT now(),
  CONSTRAINT employee_pkey PRIMARY KEY (id)
);

CREATE TABLE gif
(
  id serial NOT NULL,
  employee_id integer NOT NULL,
  imageurl character varying NOT NULL,
  title character varying NOT NULL,
  gifdate timestamp without time zone DEFAULT now(),
  CONSTRAINT gif_pkey PRIMARY KEY (id)
);


CREATE TABLE gif_comment
(
  id serial NOT NULL,
  gif_id integer NOT NULL,
  employee_id integer NOT NULL,
  comment character varying NOT NULL,
  comment_date timestamp without time zone DEFAULT now(),
  CONSTRAINT gif_comment_pkey PRIMARY KEY (id)
);

DELETE FROM employee WHERE id = 9;
SELECT * FROM employee;
SELECT * FROM articles;
