SETUP

Testing has been done with Windows PowerShell.

Windows PowerShell:

# This will delete all the database collections. (**Only needs to be used if databaseSetup.js fails**)
node deleteTables.js


1.
# This will create the mongoDB database, collections, and populate with fake data.
node databaseSetup.js

2.
# This will start the server.
node app.js

3.
# This will load the login page (index.html).
http://localhost:3000

4.

#Login Options

Waiter - Staff1 - password
Kitchen - Staff2 - password
Counter - Staff3 - password
Admin - Staff4 - password



Testing:

Login as admin and load all webpages in seperate tabs if you want to view/test all in one go.

Admin can view all pages:
http://localhost:3000/waiter
http://localhost:3000/kitchen
http://localhost:3000/counter
http://localhost:3000/admin

Waiter - Select table and items, delete items, add a note, place order.
Kitchen - View the place order, waiting time, and complete the order. (Updates every 10s)
Counter - View completed orders, save, delete or print a bill, preview bill, print as .pdf. (Updates every minute)
Admin - View menu/prices, add item, delete item, update item. (Updates every minute)



#Waiter View
Select Table Number

Select menu item and add item - repeat for multiple

Order - Will populate with the added items - Can remove items by clicking [ X ].
Order Textbox (Readonly) - Order preview that will be sent to Kitchen.

Additional Notes - Text notes

Total - Updates based on items added/removed - (Readonly)

Pleace Order - Order is sent to Kitchen.


#Kitchen

Table - Displays all current orders.
Complete - Click when order has been completed - (Displays confirmation alert)


#Counter

Table - Displays all completed orders.

Save - Saves the order total and date saved.

Print - (Displays confirmation alert) - Opens bill preview 
Print Bill - Opens a new tab with the option to print/save the bill as a .pdf file.

Delete - Removes the competed order.

Get Weekly(WIP) - Displays this weeks current income.


#Admin

Add Menu Item - Add a new item to the menu (Item Name/ Price)

Delete Menu Item - Select and then delete the menu item (Updates every 60s)

Update Item Price - Select item to update and add new price

View Menu - Displays all current menu items and the prices.

Can view all pages:
http://localhost:3000/waiter
http://localhost:3000/kitchen
http://localhost:3000/counter
http://localhost:3000/admin


#All Pages

Logout - Logs user out but render/redirect is currently broken for this.

If not logged in a message is displayed on the webpage.



