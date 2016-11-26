CREATE TABLE employees(
id SERIAL PRIMARY KEY,
first_name VARCHAR(80),
last_name VARCHAR(80),
id_number INTEGER,
job_title VARCHAR(80),
annual_salary INTEGER,
active BOOLEAN DEFAULT TRUE
);


CREATE TABLE budget(
id SERIAL PRIMARY KEY,
budget INTEGER,
date DATE
);
