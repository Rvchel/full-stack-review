--inserts new user
INSERT INTO client (username, password)
--sends back updated info
VALUES ($1, $2) 
--RETURNING username;