
-- Table to store scraped raw booking data
CREATE TABLE IF NOT EXISTS booking_data (
id INTEGER PRIMARY KEY,
restaurant_name varchar(250) NOT NULL,
scraped_date DATE NOT NULL,
scraped_time TIME NOT NULL,
booking_date DATE NOT NULL,
booking_time TIME NOT NULL,
booking_status varchar(250) NOT NULL);

-- Create a table to store raw restaurant data
CREATE TABLE IF NOT EXISTS restaurants (
restaurant_name varchar(250) NOT NULL PRIMARY KEY,
restaurant_address varchar(250) NOT NULL,
rating INTEGER NOT NULL,
review_count INTEGER NOT NULL,
description VARCHAR(250),
scraped_date DATE NOT NULL,
scraped_time TIME NOT NULL);

-- Create cleaned data table for analysis
CREATE TABLE IF NOT EXISTS data
(
    restaurant_name        varchar(250) not null,
    booking_date           DATE         not null,
    clean_booking_date     text,
    scraped_date           DATE         not null,
    scraped_weekday        text,
    booking_day_gap        integer,
    month_year             text,
    min_booking_time       real,
    max_booking_time       real,
    available_count        real,
    prev_available_count   real,
    unavailable_count      integer,
    prev_unavailable_count integer,
    none_available         varchar(250),
    a_booking_count        real,
    u_booking_count        real,
    booking_count          real
);

-- Create trigger to update data when underlying booking data table changes
CREATE TRIGGER update_data
    AFTER INSERT ON booking_data
    BEGIN
        DELETE FROM data;
        INSERT INTO data
        WITH clean_booking_data AS (
            SELECT *
            FROM booking_data WHERE booking_time NOT LIKE 'Continue'),

            unavailable_temp AS (SELECT restaurant_name, booking_date, scraped_date, COUNT(DISTINCT booking_time) AS unavailable_count
            FROM clean_booking_data
            GROUP BY restaurant_name, booking_date, scraped_date, booking_status
            HAVING booking_status = 'Unavailable'),

            available_temp AS (SELECT restaurant_name, booking_date, scraped_date,
                                      CASE WHEN booking_status = 'None Available' THEN 0 ELSE COUNT(DISTINCT booking_time) END AS available_count
            FROM clean_booking_data
            GROUP BY restaurant_name, booking_date, scraped_date, booking_status
            HAVING booking_status = 'Available' OR booking_status = 'None Available'),

            none_available_temp AS (SELECT DISTINCT restaurant_name, booking_date, scraped_date, booking_status AS none_available
            FROM clean_booking_data
            WHERE booking_status = 'None Available'),

        time AS (SELECT restaurant_name, booking_date, scraped_date, MIN(booking_time) AS min_booking_time, MAX(booking_time) AS max_booking_time
                 FROM clean_booking_data
                 GROUP BY restaurant_name, booking_date, scraped_date),

        tempOne AS (SELECT A.restaurant_name, A.booking_date, A. scraped_date,
               time.min_booking_time, time.max_booking_time,
               available_count,
               LAG(available_count, 1, available_count) OVER (PARTITION BY A.restaurant_name, A.booking_date ORDER BY A.scraped_date) AS prev_available_count,
               unavailable_count,
               LAG(unavailable_count, 1, unavailable_count) OVER (PARTITION BY A.restaurant_name, A.booking_date ORDER BY A.scraped_date) AS prev_unavailable_count,
               none_available
        FROM available_temp AS A
        LEFT JOIN unavailable_temp U ON A.restaurant_name = U.restaurant_name AND A.booking_date = U.booking_date AND A.scraped_date = U.scraped_date
        LEFT JOIN none_available_temp N ON A.restaurant_name = N.restaurant_name AND A.booking_date = N.booking_date AND A.scraped_date = N.scraped_date
        LEFT JOIN time ON A.restaurant_name = time.restaurant_name AND A.booking_date = time.booking_date AND A.scraped_date = time.scraped_date),

        tempTwo AS (SELECT *, CASE WHEN tempOne.prev_available_count - tempOne.available_count < 0 THEN 0
            WHEN tempOne.prev_available_count - tempOne.available_count IS NULL THEN 0
            ELSE tempOne.prev_available_count - tempOne.available_count END AS a_booking_count,
            CASE WHEN tempOne.unavailable_count - tempOne.prev_unavailable_count < 0 THEN 0
            WHEN tempOne.unavailable_count - tempOne.prev_unavailable_count IS NULL THEN 0
            ELSE tempOne.unavailable_count - tempOne.prev_unavailable_count END AS u_booking_count,
            date(strftime('%Y-', scraped_date) ||
               CASE
                WHEN UPPER(substr(booking_date, 1, 3)) = 'JAN' THEN '01'
                WHEN UPPER(substr(booking_date, 1, 3)) = 'FEB' THEN '02'
                WHEN UPPER(substr(booking_date, 1, 3)) = 'MAR' THEN '03'
                WHEN UPPER(substr(booking_date, 1, 3)) = 'APR' THEN '04'
                WHEN UPPER(substr(booking_date, 1, 3)) = 'MAY' THEN '05'
                WHEN UPPER(substr(booking_date, 1, 3)) = 'JUN' THEN '06'
                WHEN UPPER(substr(booking_date, 1, 3)) = 'JUL' THEN '07'
                WHEN UPPER(substr(booking_date, 1, 3)) = 'AUG' THEN '08'
                WHEN UPPER(substr(booking_date, 1, 3)) = 'SEP' THEN '09'
                WHEN UPPER(substr(booking_date, 1, 3)) = 'OCT' THEN '10'
                WHEN UPPER(substr(booking_date, 1, 3)) = 'NOV' THEN '11'
                WHEN UPPER(substr(booking_date, 1, 3)) = 'DEC' THEN '12'
            END ||
            '-' ||
                CASE WHEN LENGTH(substr(booking_date, 5)) = 1 THEN CONCAT('0', substr(booking_date, 5))
                    ELSE substr(booking_date, 5)
                    END) AS clean_booking_date
        FROM tempOne
        GROUP BY restaurant_name, booking_date, scraped_date)

        SELECT restaurant_name, booking_date, clean_booking_date, scraped_date,
        CASE cast (strftime('%w', scraped_date) as integer)
          when 0 then 'Sunday'
          when 1 then 'Monday'
          when 2 then 'Tuesday'
          when 3 then 'Wednesday'
          when 4 then 'Thursday'
          when 5 then 'Friday'
          else 'Saturday' end as scraped_weekday,
        julianday(clean_booking_date) - julianday(scraped_date) AS booking_day_gap,
        strftime('%m-%Y', scraped_date) AS month_year,
        min_booking_time, max_booking_time,
        available_count, prev_available_count,
        unavailable_count, prev_unavailable_count, none_available,
        a_booking_count, u_booking_count,
        MAX(a_booking_count, u_booking_count, 0) AS booking_count
        FROM tempTwo;
    END;
