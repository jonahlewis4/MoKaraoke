CREATE TABLE IF NOT EXISTS videos (
                                      uuid TEXT PRIMARY KEY,
                                      fspath TEXT NOT NULL,
                                      title TEXT,
                                      youtubeUrl TEXT,
                                      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);