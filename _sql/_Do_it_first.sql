"\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -uroot -p1234

CREATE SCHEMA exam;
use exam;

CREATE USER 'jeongchan'@'%' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON exam.* TO 'jeongchan'@'%';

CREATE TABLE users (
    idUsers       INT NOT NULL AUTO_INCREMENT, 
    id            VARCHAR(20) NOT NULL, 
    email         VARCHAR(30) NOT NULL, 
    nick          VARCHAR(30) NOT NULL,      
    pw            VARCHAR(30) NOT NULL, 
    joinDate      TIMESTAMP NOT NULL, 
    lastLogin     TIMESTAMP NOT NULL, 
    tier          VARCHAR(10) NOT NULL, 
    PRIMARY KEY(idUsers)
);

INSERT INTO users(id, email, nick, pw, joinDate, lastLogin, tier) VALUES ('master', 'master@lee.com','마스터이', '1234', '2023-03-02 14:44:44', '2023-04-05 14:44:44', '돌');


CREATE TABLE study (
    idStudys            INT NOT NULL AUTO_INCREMENT,
    id                  VARCHAR(20) NOT NULL,
    subject_name        VARCHAR(20) NOT NULL,
    precontent          LONGTEXT NOT NULL,
    content             LONGTEXT NOT NULL,
    joinDate            TIMESTAMP NOT NULL,
    PRIMARY KEY(idStudys)
);

INSERT INTO study (id, subject_name, precontent, content, joinDate) VALUES ('master','SQL', 'SELECT, ALTER, DELETE문을 학습', '공부함' ,'2023-03-18');

CREATE TABLE playlist (
    idPlaylist          INT NOT NULL AUTO_INCREMENT,
    id                  VARCHAR(20) NOT NULL,
    music_name          VARCHAR(50) NOT NULL,
    singer              VARCHAR(20) NOT NULL,
    joinDate            TIMESTAMP NOT NULL,
    PRIMARY KEY(idPlaylist)
);

INSERT INTO playlist (id, music_name, singer, joinDate) VALUE ('master', 'Selfmade Orange','CHANGMO','2023-04-28');