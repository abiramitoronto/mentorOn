DROP TABLE IF EXISTS calls CASCADE;
CREATE TABLE calls (
  id SERIAL PRIMARY KEY NOT NULL,
  session_id INTEGER REFERENCES sessions(id)
);
