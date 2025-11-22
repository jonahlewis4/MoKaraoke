CREATE TABLE videos (
  uuid         uuid PRIMARY KEY,
  fspath       text NOT NULL,
  created_at   timestamptz default now()
)