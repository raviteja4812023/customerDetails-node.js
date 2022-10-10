CREATE TABLE address(
  addressId INT NOT NULL PRIMARY KEY,
  customerId INT NOT NULL UNIQUE,
  address VARCHAR(200),
  landmark VARCHAR(200),
  city VARCHAR(200),
  state VARCHAR(200),
  country VARCHAR(200),
  zipcode INT,
  FOREIGN KEY (customerId) REFERENCES customer(customerId) ON DELETE CASCADE
)