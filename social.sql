\echo 'Delete and recreate social db?' \prompt 'Return for yes or control-C to cancel > ' answer

\connect postgres
DROP DATABASE IF EXISTs social;

CREATE DATABASE social;

\connect social

\i social_schema.sql

\i social-seed.sql