/*
  *********INSTRUCTIONS*********
  Terminal command to run this file from root directory
  psql productsdb -f productsdb.sql
      ^name of the database that was created to hold the tables

              ^lets it know it's a file to handle

                  ^name of the sql file and its path or run this from the
                  same directory
*/
-- ONLY USE THESE IF YOU NEED TO COMPLETELY REFRESH THE DATA
-- DROP TABLE IF EXISTS products CASCADE;
-- DROP TABLE IF EXISTS features;
-- DROP TABLE IF EXISTS related;
-- DROP TABLE IF EXISTS styles CASCADE;
-- DROP TABLE IF EXISTS photos;
-- DROP TABLE IF EXISTS skus;

-- PRODUCTS TABLE CREATION
-- CREATE TABLE IF NOT EXISTS products (
--   id integer PRIMARY KEY,
--   name text,
--   slogan text,
--   description text,
--   category text,
--   default_price real
-- );

-- COPY products(id, name, slogan, description, category, default_price)
-- FROM '/home/gzmacat/hackreactor/Service-Products/Database/Data/product.csv'
-- DELIMITER ',' CSV HEADER;

-- -- FEATURES TABLE CREATION
-- CREATE TABLE IF NOT EXISTS features (
--   id integer PRIMARY KEY,
--   product_id integer,
--   feature text,
--   value text,
--   FOREIGN KEY (product_id) REFERENCES products(id)
-- );

-- COPY features(id, product_id, feature, value)
-- FROM '/home/gzmacat/hackreactor/Service-Products/Database/Data/features.csv'
-- DELIMITER ',' CSV HEADER;

-- -- RELATED PRODUCT IDS TABLE CREATION
-- CREATE TABLE IF NOT EXISTS related (
--   id integer PRIMARY KEY,
--   current_product_id integer,
--   related_product_id integer,
--   FOREIGN KEY (current_product_id) REFERENCES products(id)
-- );

-- COPY related(id, current_product_id, related_product_id)
-- FROM '/home/gzmacat/hackreactor/Service-Products/Database/Data/related.csv'
-- DELIMITER ',' CSV HEADER;

-- -- STYLES TABLE CREATION
-- CREATE TABLE IF NOT EXISTS styles (
--   id integer PRIMARY KEY,
--   product_id integer,
--   name text,
--   sale_price real,
--   original_price real,
--   default_style boolean,
--   FOREIGN KEY (product_id) REFERENCES products(id)
-- );

-- COPY styles(id, product_id, name, sale_price, original_price, default_style)
-- FROM '/home/gzmacat/hackreactor/Service-Products/Database/Data/styles.csv'
-- DELIMITER ',' NULL AS 'NULL' CSV HEADER;

-- PHOTOS TABLE CREATION
-- CREATE TABLE IF NOT EXISTS photos (
--   id integer PRIMARY KEY,
--   style_id integer,
--   url varchar(1000),
--   thumbnail_url varchar(1000),
--   FOREIGN KEY (style_id) REFERENCES styles(id)
-- );

-- COPY photos(id, style_id, url, thumbnail_url)
-- FROM '/home/gzmacat/hackreactor/Service-Products/Database/photos.csv'
-- DELIMITER ',' NULL AS 'NULL' CSV HEADER;

-- SKUS TABLE CREATION
-- CREATE TABLE IF NOT EXISTS skus (
--   id integer PRIMARY KEY,
--   style_id integer,
--   size varchar(10),
--   quantity integer,
--   FOREIGN KEY (style_id) REFERENCES styles(id)
-- );

-- COPY skus(id, style_id, size, quantity)
-- FROM '/home/gzmacat/hackreactor/Service-Products/Database/Data/skus.csv'
-- DELIMITER ',' NULL AS 'NULL' CSV HEADER;

/*
psql:productsdb.sql:85: ERROR:  value too long for type character varying(1000)
CONTEXT:  COPY photos, line 218, column thumbnail_url: "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=3
*/

