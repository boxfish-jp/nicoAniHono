CREATE TABLE IF NOT EXISTS `chlist` (
    chlist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    caddtime TEXT DEFAULT (datetime('now','localtime')) ,
    ch_id INTEGER,
    ch_title TEXT,
    ch_url TEXT,
    ch_detail TEXT,
    ch_LtstFree INTEGER,
    ch_PrmFree INTEGER,
    syear INTEGER,
    sseason INTEGER,
    ch_twt TEXT,
    ch_site TEXT,
    ch_thumb TEXT
);

CREATE TABLE IF NOT EXISTS `ranking` (
    ranking_id INTEGER PRIMARY KEY AUTOINCREMENT,
    raddtime TEXT DEFAULT (datetime('now','localtime')) ,
    ch_id INTEGER,
    r_current_seq INTEGER,
    r_total_view INTEGER,
    r_total_mylist INTEGER,
    r_total_comment INTEGER,
    r_ave_view INTEGER,
    r_ave_mylist INTEGER,
    r_ave_comment INTEGER,
    r_diff_view INTEGER,
    r_diff_mylist INTEGER,
    r_diff_comment INTEGER
);

CREATE TABLE IF NOT EXISTS `season` (
    season_id INTEGER PRIMARY KEY AUTOINCREMENT,
    saddtime TEXT DEFAULT (datetime('now','localtime')) ,
    syear INTEGER,
    sseason INTEGER,
    sdesc TEXT
);

CREATE TABLE IF NOT EXISTS `videos` (
    video_id INTEGER PRIMARY KEY AUTOINCREMENT,
    vaddtime TEXT DEFAULT (datetime('now','localtime')) ,
    ch_id INTEGER,
    ch_seq INTEGER,
    ch_seq_url TEXT,
    ch_seq_title TEXT,
    ch_seq_desc TEXT,
    ch_seq_thumb TEXT,
    ch_seq_detail TEXT
);

CREATE TABLE IF NOT EXISTS `viewData` (
    viewData_id INTEGER PRIMARY KEY AUTOINCREMENT,
    daddtime TEXT DEFAULT (datetime('now','localtime')) ,
    ch_id INTEGER,
    ch_seq INTEGER,
    view_amount INTEGER,
    comment_amount INTEGER,
    mylist_amount INTEGER,
    diff_view INTEGER,
    diff_comment INTEGER,
    diff_mylist INTEGER
);