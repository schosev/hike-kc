USE hikekc_db;

-- INSERT INTO Parks (park_name, park_desc_short, park_desc_long_1, park_desc_long_2, park_desc_long_3, park_desc_long_4, park_desc_long_5, park_desc_long_6, park_desc_long_7, park_desc_long_8, park_desc_long_9, park_desc_long_10, park_address, park_rating, park_lon, park_lat, park_elev, total_trail_lngth_meters, createdAt, updatedAt)
INSERT INTO Parks (park_name, park_desc_short, park_desc_long, park_address, park_rating, park_lon, park_lat, park_elev, total_trail_lngth_meters, createdAt, updatedAt)
VALUES("Test Park", "Test park description", "Test park long description one", "123 Main St, Blue Springs, MO", 4, -94.3523, 39.0081, 900, 1900.01, NOW(), NOW());

-- INSERT INTO Parks (park_name, park_desc_short, park_desc_long_1, park_desc_long_2, park_desc_long_3, park_desc_long_4, park_desc_long_5, park_desc_long_6, park_desc_long_7, park_desc_long_8, park_desc_long_9, park_desc_long_10, park_address, park_rating, park_lon, park_lat, park_elev, total_trail_lngth_meters, createdAt, updatedAt)
INSERT INTO Parks (park_name, park_desc_short, park_desc_long, park_address, park_rating, park_lon, park_lat, park_elev, total_trail_lngth_meters, createdAt, updatedAt)
VALUES("Burr Oak Woods Conservation Area", "Burr Oak  includes steep forested hillsides along Burr Oak Creek (the namesake of the property), large limestone boulders and outcrops, restored prairies and woodlands, and a trail complex that will guide visitors through many of the listed features.",
 "<p>Burr Oak Woods Conservation Area is a 1,071 acres property located in Blue Springs just north of I-70. Features on the area include but are not limited to steep forested hillsides along Burr Oak Creek (the namesake of the property), large limestone boulders and outcrops, prairie and woodland restoration sites.</p>
 <p>It has a rich diversity of wildlife species. Deer, turkey, squirrels, raccoons, coyotes, and songbirds are commonly seen. A special bird watching area is available in the nature center.</p>
 <h6>Burr Oak Woods Conservation Nature Center</h6><p>The nature center opened in 1982 and features state of the art hands-on conservation exhibits. Check out the larger than life children’s area and the brand new exhibits added in 2016 featuring streams and forests.</p>
 <p>The center serves as a focal point of nature interpretation and conservation education with its 168-seat auditorium and 3000-gallon aquarium. Meet native fish and live reptiles and amphibians up close. Special events and programs are scheduled throughout the year. Conservation programs are available to organized groups upon advance request.</p>
 <p>The nature center is open from 8:00 a.m. to 5:00 p.m. Tuesday through Saturday. The nature center is closed Sunday, Monday, and all state holidays.</p>",
 -- NUll, NULL, NULL, NULL, NULL,
 "1401 NW Park Rd., Blue Springs, MO 64015", 5, -94.28983, 39.049292, 931, 4341.87, NOW(), NOW());

-- INSERT INTO Trails (trail_name, trail_desc_short, trail_desc_long_1, trail_desc_long_2, trail_desc_long_3, trail_desc_long_4, trail_desc_long_5, trail_desc_long_6, trail_desc_long_7, trail_desc_long_8, trail_desc_long_9, trail_desc_long_10, trail_rating, trail_length_meters, trail_length_miles, hiking, mtb, walking, gravel, paved, single_track, mulch, createdAt, updatedAt, fk_park_id)
INSERT INTO Trails (trail_name, trail_desc_short, trail_desc_long, trail_rating, trail_diff, trail_length_meters, trail_length_miles, hiking, mtb, walking, gravel, paved, single_track, mulch, createdAt, updatedAt, fk_park_id)
VALUES("Test Trail", "Test trail description", "Test trail long description", 4, 2, 1900.01, 1.5, TRUE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE, NOW(), NOW(), 1);

INSERT INTO Tracks (track_name, createdAt, updatedAt, fk_trail_id)
VALUES("Test track name", NOW(), NOW(), 1);

INSERT INTO Cords (lat, lon, distance, elev, ascent, descent, createdAt, updatedAt, fk_track_id)
VALUES(39.008100000, -94.352300000, 0, 900, 0, 0, NOW(), NOW(), 1), (39.000000000, -94.350000000, 0, 875, 0, 0, NOW(), NOW(), 1), (38.990000000, -94.340000000, 0, 850, 0, 0, NOW(), NOW(), 1);
 
select * from Parks;
select * from Trails;
select * from Tracks;
select * from cords;