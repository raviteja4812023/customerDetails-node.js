const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "customerDetails.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.post("/customers/",async (request,response)=>{
const { customerId,firstName,lastName,userName,email,phone,dob,gender} = request.body;
const insertCustomerValues=`
    INSERT INTO customer(
    customerId,
    firstName ,
    lastName ,
    userName ,
    email ,
    phone ,
    dob ,
    gender`
    values(
        `${customerId}`,`${firstName}`,`${lastName}`,`${userName}`,
        `${email}`,`${phone}`,`${dob}`,`${gender};`
    )
 const customerValues=await database.run(insertCustomerValues);
 response.send("customer added successfully");
})

app.post("/address/",async (request,response)=>{
const { addressId,customerId,address,landmark,city,state,country,zipcode} = request.body;
const insertAddressValues=`
    INSERT INTO address(
    addressId,
    customerId,
    address,
    landmark,
    city,
    state,
    country,
    zipcode 
    values(
        `${addressId}`,`${customerId}`,`${address}`,`${landmark}`,
        `${city}`,`${state}`,`${country}`,`${zipcode}`;`
    );
    const addressValues=await database.run(insertAddressValues);
    response.send(" Address added successfully");
});

app.get("/customers/", async (request, response) => {
  const getCustomerQuery = `
    SELECT
      *
    FROM
      customer;`;
  const customersArray = await database.all(getCustomerQuery);
  response.send(
    customersArray.map((eachCustomer) =>
    (eachCustomer)
  );
});

app.get("/customers/:customerId/", async (request, response) => {
  const { customerId } = request.params;
  const getCustomerQuery = `
    SELECT 
      * 
    FROM 
      customer 
    WHERE 
      customerId = ${customerId};`;
  const customer = await database.get(getCustomerQuery);
  response.send(customer);
});

app.put("/customer/:customerId/", async (request, response) => {
  const { firstName, lastName, userName,email,address,city } = request.body;
  const { customerId } = request.params;
  const updateCustomerQuery = `
  UPDATE
    customer Natural Join address
  SET
    firstName = '${firstName}',
    lastName = ${lastNumber},
    userName = '${userName}',
    email = '${email}',
    address = '${address}'
    city = '${city}'
  WHERE
    customerId = ${CustomerId};`;

  await database.run(updateCustomerQuery);
  response.send("customer Details Updated");
});

app.delete("/customers/:customerId/", async (request, response) => {
  const { customerId } = request.params;
  const deleteCustomer = `
  DELETE FROM
    customer
  WHERE
    customerId = ${CustomerId};`;
  await database.run(deleteCustomer);
  response.send("Customer Removed");
});
module.exports = app;
