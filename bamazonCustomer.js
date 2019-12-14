var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});
var query = connection.query("")
// Running this application will first display all of the items available for sale.
connection.connect(function(err) {
    if (err) throw err;
    console.log("Welcome to Energy Unlimited!\n" +
    "You are connected as id " + connection.threadId);
    afterConnection()
  });
    function afterConnection() {
      connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(
         "Name:" + res.product_name,
         "Department:" + res.department_name,
      "Price:" + res.price,
      "Availalbe" + res.stock_quantity
        );
        connection.end();
      });
    }
  
  // questions
  // * The first should ask them the ID of the product they would like to buy.
  // * The second message should ask how many units of the product they would like to buy.
inquirer
.prompt([
  {
    type: "input",
    name: "ID",
    message: "What is the product ID of the item you would like to purchase?"
  },
  {
    type: "input",
    name: "Qty",
    message: "How many units would you like?"
  }
]).then(function(answers){
// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
function checkAvailability(){}
// * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

})





// ~~~~~~~Create a Product function~~~~~~~~~~
  // function createProduct(){
  //   console.log("Inserting a new product...\n");
  // var query = connection.query(
  //   "INSERT INTO products SET ?",
  //   {
  //     product_name:,
  //     department_name:,
  //     price:,
  //     stock_quantity:
  //   },
    
  // }
  // 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
  //  * This means updating the SQL database to reflect the remaining quantity.
  //  * Once the update goes through, show the customer the total cost of their purchase.
  function updateProduct(){}
  function deleteProduct(){}
  
  