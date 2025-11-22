CREATE TABLE audios (
    id uuid primary key default gen_random_uuid(),
    path text not null
);
