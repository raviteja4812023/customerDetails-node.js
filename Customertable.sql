CREATE TABLE customer(
  customerId INT NOT NULL PRIMARY KEY,
  firstName VARCHAR(200),
  lastName VARCHAR(200),
  userName VARCHAR(200),
  email VARCHAR(200),
  phone INT,
  dob DATE,
  gender VARCHAR(200)
)