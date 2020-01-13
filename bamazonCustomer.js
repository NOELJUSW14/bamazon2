var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",

  // Your password
  database: "bamazon_db"

});
// Running this application will first display all of the items available for sale.
connection.connect(function (err) {
  if (err) throw err;
  console.log(
    "You are connected as id " + connection.threadId + "\n" +
    "Welcome to Energy Unlimited!\n"
  );

  afterConnection()
});
function afterConnection() {
  //Query database to display items in store
  var query = connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      console.log(
        "\n",
        "ID:" + res[i].item_id,
        "\nName:" + res[i].product_name,
        "\nPrice:" + "$" + res[i].price,
        "\nQTY Available:" + res[i].stock_quantity)
    }

  })
  console.log(query.sql)
  purchase()
}
function purchase() {

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "ID",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];

            for (var i = 0; i < res.length; i++) {
              choiceArray.push(
                "ID:" + res[i].item_id + "|" +
                "Name:" + res[i].product_name + "|" +
                "Price:" + "$" + res[i].price)
            }
            return choiceArray;

          },
          message: "What is the ID of the product they would like to buy?"
        },
        {
          name: "bid",
          type: "input",
          message: "How many would you like to purchase?"
        }

      ]).then(function (answer) {
        var quantityOrder = parseInt(answer.bid);
        var query = connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: newStock
            },
            {
              id: chosenItem.id
            }
          ],
          function (err, res) {
            if (error) throw err;
            for (var i = 0; i < res.length; i++) {
              var newStock = chosenItem.stock_quantity - quantityOrder;
              if (res[i].stock_quantity > parseInt(answer.bid)) {


                console.log("Order placed successfully!");
                afterConnection();
              } else {
                // bid wasn't high enough, so apologize and start over
                console.log("We dont have enought in stock!");
                afterConnection();

              }

            }
          })
      })
  })
}

