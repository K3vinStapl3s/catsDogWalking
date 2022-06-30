USE cats_dog_walkings_db;

-- wsNote
-- I can't figure out what the syntax error with this code is, I'm using mariaDB through xampp which
-- is a pain to work through as compared to sqlServer or something like that but since I'm running
-- my code through xampp anyways I thought it would work well enough. Could you take a look?
-- it's saying there's a syntax error at the indicated lines near ''... 
CREATE PROCEDURE availableDates (OUT param1 DATE)
BEGIN 
    SELECT DISTINCT availableDate 
		INTO param1
    	FROM
        	(SELECT DISTINCT walkDate AS availableDate
            	FROM walk_appointments
                WHERE username != NULL
            UNION
            SELECT DISTINCT sittingDate AS availableDate
            	FROM overnight_appointments
                WHERE username != NULL); -- wsNote - Here if I have this semicolon in
END; -- wsNote - if I take out the semicolon on the prior line it says it's here...

-- wsNote - I've tried everything I could think of havent worked on the rest of the procedures yet.
		
CREATE PROCEDURE availableWalkTimesForDate @walkDate DATE AS (
	SELECT DISTINCT walkTime
		FROM walkingAppointment
		WHERE walkDate = @walkDate
);

CREATE PROCEDURE selectAllFromOwner @username VARCHAR(20) AS (
	SELECT fName, lName, telNum, email
		FROM owner
		WHERE userName = @username
);

CREATE PROCEDURE updateOwnerPass @username VARCHAR(20) @passwordHash VARCHAR(30) AS (
	UPDATE	owner SET passwordHash = @passwordHash WHERE username = @username
);

CREATE PROCEDURE updateOwnerInfo 
	@username VARCHAR(20),
	@fName VARCHAR(30),
	@lName VARCHAR(30),
	@tel VARCHAR(13),
	@email VARCHAR(40)
	AS (
		UPDATE owner
			set fName = @fname, lName = @lName, telNum = @tel, email = @email
			where username = @username
);


	
	