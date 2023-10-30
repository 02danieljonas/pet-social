\echo 'Delete and recreate social db?' \prompt 'Return for yes or control-C to cancel > ' answer

\connect postgres
DROP DATABASE IF EXISTs "pet-social";

CREATE DATABASE "pet-social";

\connect 'pet-social'

\i pet-social_schema.sql

\i pet-social_seed.sql