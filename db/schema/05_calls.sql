DROP TABLE IF EXISTS calls CASCADE;
CREATE TABLE calls (
  id SERIAL PRIMARY KEY NOT NULL,
  session_id INTEGER REFERENCES sessions(id),
  day_of_month INTEGER NOT NULL
);
