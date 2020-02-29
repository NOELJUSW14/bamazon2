var mysql = require('mysql')
var inquirer = require('inquirer')
var Table = require('cli-table3');

var connection = mysql.createConnection({
  host: '127.0.0.1',

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: 'root',

  // Your password
  password: 'root',

  // Your DB
  database: 'bamazon_db',
})
// Running this application will first display all of the items available for sale.
connection.connect(function(err){
  if (err) {
    console.log('Cannot connect!')
  } else {
    console.log(
      'You are connected as id ' +
        connection.threadId +
        '\n' +
        'Welcome to Energy Unlimited!\n',
    );
    display()
   
  }
});
  
var display = function() {
connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
var table = new Table({
  head: ['ID', 'Name','Price','Qty Available'],
  colWidths: [10, 60, 10, 10],
  colAligns:["center","left", "right"],
  style:{ 'padding-left': 0, 'padding-right': 0 }
});

for (var i = 0; i < res.length; i++) {
  table.push([res[i].item_id,res[i].product_name,"$"+ res[i].price,res[i].stock_quantity])
}
  console.log(table.toString());
  afterDisplay() 
});
}

function afterDisplay() {
  inquirer.prompt([
		{
			name: "action",
			type: "list",
			choices: ["View items for sale", "Leave the store"],
			message: "Please select what you would like to do."
		}]).then(function(action) {
      // if user wants to view items, run the view items function
      if (action.action === "View items for sale") {
        purchase();
        // if user wants to leave, run exit function
      } else if (action.action === "Leave the store") {
        exit();
      }
    });
  }
  //Query database to display items in store
  // var query = connection.query('SELECT * FROM products', function(err, res) {
  //   if (err){
  //     throw err;
  //   } else {
  //     for (var i = 0; i < res.length; i++) {
  //       console.log(
  //         '\n',
  //         'ID:' + res[i].item_id,
  //         '\nName:' + res[i].product_name,
  //       )
  //     }
  //   }
  // })
  // console.log(query.sql)
  // purchase()
function purchase() {
  inquirer
      .prompt(
        {
          name: 'ID',
          type: "input",
          message: 'What is the ID of the product they would like to buy?',
        })
      .then(function(answer) {
        var chosenItem = answer.ID;
        connection.query('SELECT * FROM products', function(err, res) {
          if (err) {
            console.log("Not Available!");
          } if(chosenItem === 0){
            console.log("Make another selection!")
            purchase()
          }else{
          inquirer
            .prompt({
              name: 'bid',
              type: 'input',
              message: 'How many would you like to purchase?',
            })
            .then(function(answer2){
              var quantityOrder = parseInt(answer2.stock_quantity);
              if(quantityOrder > res.stock_quantity){
                console.log("Please adjust your qty");
                purchase();
              }else{
                var newStock = chosenItem.stock_quantity - quantityOrder; //or use answer1 as reference
                connection.query(
                'UPDATE products SET stock_quantity =' +
              newStock +
              'WHERE id =' +
              chosenItem,
            function(err, resUpdate) {
              if (err) console.log(err);
              console.log('Order placed successfully!')
              connection.end()
            }
        )}})}})})}
            // else {
            //   // bid wasn't high enough, so apologize and start over
            //   console.log('We dont have enought in stock!')
            //   afterConnection()
            //  