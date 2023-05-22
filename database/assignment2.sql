--Add row to account table
INSERT INTO 
	account
VALUES
	( 3, 'Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n' );

--change account type
UPDATE
	account
SET
	account_type = 'Admin'
WHERE
	account_id = 3;

--now delete the record(row)
DELETE
FROM
	account
WHERE
	account_id = 3;

--replace some text in the string
UPDATE
	inventory
SET inv_description = REPLACE(inv_description, 'the small interiors', 'a huge interior')
WHERE
	inv_id = 10;

--innerjoin
SELECT
	inventory.inv_make, inventory.inv_model, classification.classification_name
FROM
	inventory
INNER JOIN
	classification
ON
	inventory.classification_id = classification.classification_id
WHERE
	classification.classification_id = 2;


UPDATE
	inventory
SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles')
WHERE
	inv_image = '/images%' or inv_thumbnail = '/images%';