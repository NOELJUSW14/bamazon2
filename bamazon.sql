DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

-- Create the table in the specified schema
CREATE TABLE products
(
    item_id INT NOT NULL AUTO_INCREMENT (100),

   product_name VARCHAR(100),

   department_name VARCHAR(100),

   price DECIMAL(10,2),

   stock_quantity INT NULL,

   PRIMARY KEY id
);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Water Proof Solar Power Bank", Solar, 25, 100), ("Solar Power Bank with LED Light", Solar, 22, 100), ("Laptop Solar Power Bank", Solar, 27, 50), ("Water Proof Solar Power Bank", Large_Capacity, 35, 40)

