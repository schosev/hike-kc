USE hikekc_db;

INSERT INTO Parks (park_name, park_desc, park_address, park_rating, park_lon, park_lat, park_elev, total_trail_lngth_meters, createdAt, updatedAt)
VALUES("Test Park", "Test park description", "123 Main St, Blue Springs, MO", 4, -94.3523, 39.0081, 900, 1900.01, NOW(), NOW());

INSERT INTO Parks (park_name, park_desc, park_address, park_rating, park_lon, park_lat, park_elev, total_trail_lngth_meters, createdAt, updatedAt)
VALUES("Burr Oak Woods Conservation Area", "Burr Oak  includes steep forested hillsides along Burr Oak Creek (the namesake of the property), large limestone boulders and outcrops, restored prairies and woodlands, and a trail complex that will guide visitors through many of the listed features.",
 "1401 NW Park Rd., Blue Springs, MO 64015", 5, -94.28983, 39.049292, 931, 4341.87, NOW(), NOW());

INSERT INTO Trails (trail_name, trail_desc, trail_rating, trail_length_meters, trail_length_miles, hiking, mtb, walking, gravel, paved, single_track, mulch, createdAt, updatedAt, fk_park_id)
VALUES("Test Trail", "Test trail description", 4, 1900.01, 1.5, TRUE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE, NOW(), NOW(), 1);

INSERT INTO Tracks (track_name, createdAt, updatedAt, fk_trail_id)
VALUES("Test track name", NOW(), NOW(), 1);

INSERT INTO Cords (lat, lon, distance, elev, ascent, descent, createdAt, updatedAt, fk_track_id)
VALUES(39.008100000, -94.352300000, 0, 900, 0, 0, NOW(), NOW(), 1), (39.000000000, -94.350000000, 0, 875, 0, 0, NOW(), NOW(), 1), (38.990000000, -94.340000000, 0, 850, 0, 0, NOW(), NOW(), 1);
 
select * from Parks;
select * from Trails;
select * from Tracks;
select * from cords;