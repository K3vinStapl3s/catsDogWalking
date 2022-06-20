CREATE DATABASE (IF NOT EXISTS) cats_dog_walking_db;
USE cats_walking_dogs_db;
CREATE TABLE (IF NOT EXISTS) owner
(
	username VARCHAR(20) NOT NULL,
	passwordHash VARCHAR(30) NOT NULL,
	lName VARCHAR(30) NOT NULL,
	fName VARCHAR(30) NOT NULL,
	telNum VARCHAR(13) NOT NULL,
	email VARCHAR(40) NOT NULL,
	PRIMARY KEY(username)
);
CREATE TABLE (IF NOT EXISTS) walkAppointments
(
	walkDate DATE NOT NULL,
	walkTime TIME NOT NULL,
	walkerID VARCHAR(20) NOT NULL,
	username VARCHAR(20),
	checkIn BOOLEAN,
	checkOut BOOLEAN,
	PRIMARY KEY(walkDate,walkTime, walkerID),
	FOREIGN KEY(walkerID) REFERENCES(walker.walkerID),
	FOREIGN KEY(username) REFERENCES(owner.username)
);
CREATE TABLE (IF NOT EXISTS) overnightAppointments
(
	sittingDate DATE NOT NULL,
	sittingTime TIME NOT NULL,
	walkerID VARCHAR(20) NOT NULL,
	username VARCHAR(20),
	checkIn BOOLEAN,
	checkOut BOOLEAN,
	PRIMARY KEY(sittingDate, sittingTime, walkerID),
	FOREIGN KEY(walkerID) REFERENCES(walker.walkerID),
	FOREIGN KEY(username) REFERENCES(owner.username)
);
CREATE TABLE (IF NOT EXISTS) dogInfo
(
	username VARCHAR(20) NOT NULL,
	dogName VARCHAR(20) NOT NULL,
	userNotes VARCHAR(255),
	walkerNotes VARCHAR(255),
	PRIMARY KEY(username, dogName),
	FOREIGN KEY(username) REFERENCES(owner.username)
);
CREATE TABLE (IF NOT EXISTS) walkerInfo
(
	walkerID VARCHAR(20) NOT NULL,
	lName VARCHAR(30) NOT NULL,
	fName VARCHAR(30) NOT NULL,
	telNum VARCHAR(13) NOT NULL,
	PRIMARY KEY(walkerID)
);
