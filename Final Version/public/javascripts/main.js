$(document).ready(function(){

    function startOfWeek(date)
    {
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

        return new Date(date.setDate(diff));

    }

    dt = new Date(); 

    console.log(startOfWeek(dt).toString());

    function endOfWeek(date)
    {

        var lastday = date.getDate() - (date.getDay() - 1) + 6;
        return new Date(date.setDate(lastday));

    }

    dt1 = new Date(); 

    console.log(endOfWeek(dt1).toString());




    $("#logout").click(function(){
        $.ajax({
            type : 'POST',
            url : '/logout',
            success: function(data){
            }
        });
    });

    setTimeout(function updateKitchen() {
        //console.log("Orders Updated");

        $.ajax({
            type : 'POST',
            url : '/order',
            success: function(data, status){
                //alert("\nStatus: " + status);
                //alert("\nData: " + data); // check if data successfully sent

                data = JSON.parse(data);
                var html = "<table class='table table-responsive table-striped table-light'><thead class='thead-dark'><tr><th>Time/Date</th><th>Table Number</th><th>Order</th><th>Notes</th><th>Waiting Time</th><th>Total</th><th>Action</th></tr></thead>";
                for (var i = 0; i < data.length; i++) {

                    var currentDate = Date.now();

                    html+="<tbody id='orderTable'><tr id="+data[i]._id+">";
                    //html+="<td>"+data[i]._id+"</td>";
                    html+="<td>"+new Date(data[i].order_time)+"</td>";
                    html+="<td>"+data[i].table_no+"</td>";
                    html+="<td>"+data[i].order+"</td>";
                    html+="<td>"+data[i].notes+"</td>";
                    //html+="<td>"+((currentDate - data[i].order_time) / 1000 % 60)+"</td>";
                    //html+="<td>"+parseFloat(((currentDate - data[i].order_time) /1000 %24 /60 %60).toFixed(2))+"</td>";

                    html+="<td>D"
                        +parseFloat(((currentDate - data[i].order_time) / (24 * 60 * 60 * 1000)).toFixed(0))+" H"
                        +parseFloat(((currentDate - data[i].order_time) / (60 * 60 * 1000) % 24).toFixed(0))+" M"
                        +parseFloat(((currentDate - data[i].order_time) / (60 * 1000) % 60).toFixed(0))+" S"
                        +parseFloat(((currentDate - data[i].order_time) / 1000 % 60).toFixed(0))+
                        "</td>";

                    //html+="<td><a onclick='orderComplete("+data[i]._id+")'><button type='button' class='btn btn-success btn-sm'>Completed?</button></a></td>";
                    html+="<td>£"+data[i].total+"</td>";

                    html+="<td id="+data[i]._id+" name='comp_order'><button type='button' class='btn btn-success btn-sm'>Complete</button></td>";

                    html+="</tr></tbody>";
                }
                html+="</table>";
                $("#order_list").html(html);

                var comp_order = document.getElementsByName('comp_order');
                for(var i=0; i<comp_order.length; i++){
                    comp_order[i].onclick = function() {
                        var check = confirm('Confirmation this order is complete...');
                        if(check == true) {
                            var id = this.parentElement.id;
                            //console.log(id);
                            $.ajax({
                                type : 'POST',
                                url : '/comOrder',
                                data: {_id: id},
                                success: function(data){
                                    alert("Completion Sent");
                                }
                            });
                            this.parentElement.style.display = 'none';
                        };
                    }
                }



            }
        }); 

        setTimeout(updateKitchen, 10000);
    });






    setTimeout(function updateCounter() {
        //console.log("Orders Updated");

        $.ajax({
            type : 'POST',
            url : '/completed_orders',
            success: function(data, status){

                data = JSON.parse(data);
                var count = 0;
                var header = "Counter";
                var html = "<table class='table table-responsive table-striped table-light'><thead class='thead-dark'><tr><th>CompletionTime</th><th>Table Number</th><th>Order</th><th>Total</th><th></th><th></th><th></th></tr></thead>";
                for (var i = 0; i < data.length; i++) {

                    var currentDate = Date.now();
                    count = count + 1;

                    html+="<tbody id='orderTable'><tr id="+data[i]._id+">";
                    //html+="<td>"+data[i]._id+"</td>";
                    html+="<td>"+new Date(data[i].order_time)+"</td>";
                    html+="<td>"+data[i].table_no+"</td>";
                    html+="<td>"+data[i].order+"</td>";
                    html+="<td>£"+data[i].total+"</td>";

                    html+="<td id="+data[i]._id+" name='save_bill'><button type='button' class='btn btn-primary btn-sm'>Save</button></td>";
                    html+="<td id="+data[i]._id+" name='print_bill'><button type='button' class='btn btn-success btn-sm' data-toggle='modal' data-target='#myModal'>Print</button></td>";
                    html+="<td id="+data[i]._id+" name='del_bill'><button type='button' class='btn btn-danger btn-sm'>Delete</button></td>";

                    html+="</tr></tbody>";
                }
                html+="</table>";
                $("#com_order_list").html(html);
                $("#counterHead").html(header + " (" + count + ")");


                var save_bill = document.getElementsByName('save_bill');
                for(var i=0; i<save_bill.length; i++){
                    save_bill[i].onclick = function() {
                        var check = confirm('Do you want to save this bill?');
                        if(check == true) {
                            var id = this.parentElement.id;
                            //console.log(id);
                            $.ajax({
                                type : 'POST',
                                url : '/save_bill',
                                data: {_id: id},
                                success: function(data){
                                    alert("Bill Saved");
                                }
                            });

                        };
                    }
                }


                var print_bill = document.getElementsByName('print_bill');
                for(var i=0; i<print_bill.length; i++){
                    print_bill[i].onclick = function() {
                        var check = confirm('Do you want to print this bill?');
                        if(check == true) {
                            var id = this.parentElement.id;
                            //console.log(id);
                            $.ajax({
                                type : 'POST',
                                url : '/print_bill',
                                data: {_id: id},
                                success: function(data){
                                    data = JSON.parse(data);

                                    for (var i = 0; i < data.length; i++) {
                                        var currentDate = new Date();

                                        var array = data[i].order.split(",");
                                        console.log(array);

                                        var html = "<table class='table table-responsive table-light'>";
                                        var html1;

                                        html1+="<tr><td>Restaurant  Bill - Table ("+data[i].table_no+")</td></tr>";
                                        html+="<tr><td>ADDRESS: All Saints Campus, Metropolitan University, Manchester M15 6BH</td></tr>";
                                        html+="<tr><td>CONTACT: 0161 247 1358</td></tr>";
                                        html+="<tr><td> DATE: "+currentDate+"</td></tr>";
                                        html+="<tr><td> ORDER: "+array+"</td></tr>";
                                        html+="<tr><td> TOTAL: £"+data[i].total+"</td></tr>";
                                        html+="<tr><td></td></tr>";
                                        html+="<tr><td>THANK YOU, SEE YOU NEXT TIME</td></tr>";

                                        html+="</tbody>";

                                        html+="</table>";
                                        $("#modal_head").html(html1);
                                        $("#modal_order").html(html);
                                    }



                                }
                            });

                        };
                    }
                }

                var del_bill = document.getElementsByName('del_bill');
                for(var i=0; i<del_bill.length; i++){
                    del_bill[i].onclick = function() {
                        var check = confirm('Do you want to delete this bill?');
                        if(check == true) {
                            var id = this.parentElement.id;
                            //console.log(id);
                            $.ajax({
                                type : 'POST',
                                url : '/del_bill',
                                data: {_id: id},
                                success: function(data){
                                    alert("Bill Deleted");
                                }
                            });
                            this.parentElement.style.display = 'none';
                        };
                    }
                }







            }
        }); 

        setTimeout(updateCounter, 60000);
    });





    setTimeout(function updateMenu() {
        //console.log("Orders Updated");

        $.ajax({
            type : 'POST',
            url : '/menu_request',
            success: function(data, status){

                data = JSON.parse(data);
                var html = "<select class='form-control' id='add_item' name='add_item'>";
                var html2 = "<select class='form-control'>";
                var html3 = "<select class='form-control' id='upd_item' name='upd_item'>";
                var html4 = "<select class='form-control' id='del_item' name='del_item'>";
                for (var i = 0; i < data.length; i++) {

                    html+="<option>"+data[i].desc+"</option>";
                    html2+="<option>"+data[i].desc+" [£"+data[i].price.toFixed(2)+"]</option>";
                    html3+="<option>"+data[i].desc+"</option>";
                    html4+="<option>"+data[i].desc+"</option>";

                }
                html+="</select>";
                $("#test_list").html(html);
                $("#menu_list_view").html(html2);
                $("#upd_menu_list").html(html3);
                $("#del_menu_list").html(html4);

            }
        }); 
        setTimeout(updateMenu, 60000);
    });

    function orderComplete(order_id) {
        $.post("/kitchen" , {oid:order_id} , function(data) {
            $("#" + order_id).fadeOut('fast' , function() {
                $(this).remove();
            });
        });	
    }

});

var array = [];
var total = 0;

//create a new item when clicking addBtn
function newElement1(){
    var li = document.createElement('li');
    var inputValue = document.getElementById('add_item').value;

    $.ajax({
        type : 'POST',
        url : '/item',
        data: {desc: inputValue},
        success: function(data){
            //alert("\nData: " + data);
            total = total + JSON.parse(data);
            //console.log(total);
            document.getElementById('total').innerHTML = total.toFixed(2);
        }
    });

    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if(inputValue === ''){
        alert('Please select an item to add.');
    } else {
        array.push(inputValue);
        document.getElementById('order_ul').appendChild(li);
        document.getElementById('order_text').innerHTML = array;
    }
    //document.getElementById('add_item').value = '';
    //console.log(array);

    var span = document.createElement('SPAN');
    var txt = document.createTextNode(' [ X ]');
    span.className = 'delBtn';
    span.appendChild(txt);
    li.appendChild(span);

    /*    var button = document.createElement('button');
    var txt = document.createTextNode('X');
    button.className = 'btn btn-danger btn-sm ml-1';
    button.setAttribute("name", "delBtn");
    button.appendChild(txt);
    li.appendChild(button);*/

    //var del = document.getElementsByName('delBtn');
    var del = document.getElementsByClassName('delBtn');
    for(var i=0; i<del.length; i++){
        del[i].onclick = function() {
            /*            var check = confirm('Delete Confirmation...');
            if(check == true) {*/
            //get text object and its text data from element 
            var text = this.parentElement.firstChild.data;
            //console.log(text);

            $.ajax({
                type : 'POST',
                url : '/item',
                data: {desc: text},
                success: function(data){
                    //alert("\nData: " + data);
                    total = total - JSON.parse(data);
                    //console.log(total);
                    document.getElementById('total').innerHTML = total.toFixed(2);
                }
            });

            //store index number where 'text' value is found wihtin the array
            var a = array.indexOf(text);
            //console.log(a);

            //loop through array for value and remove it if found
            for (var i = 0; i < array.length; i++){
                if(array[i] === text){
                    array.splice(i,1);
                    break;
                }
            }

            // log updated array
            //console.log(array);
            //console.log(JSON.stringify(array));
            document.getElementById('order_text').innerHTML = array;
            // Hide element
            this.parentElement.style.display = 'none';
            /*}*/
        }
    }
}

function delMenuItem(){
    var inputValue = document.getElementById('del_item').value;

    var check = confirm('Do you want to delete this menu item?');
    if(check == true) {
        $.ajax({
            type : 'POST',
            url : '/del_item',
            data: {desc: inputValue},
            success: function(data){
            }
        });

    };

}

function clearOrder(){
    array = [];
    total = 0;
    document.getElementById('order_ul').innerHTML = "";
    document.getElementById('order_text').innerHTML = array;
    document.getElementById('note_text').innerHTML = "";
    document.getElementById('total').innerHTML = "";
}

function getWeekly() {
    $.ajax({
        type : 'POST',
        url : '/get_weekly',
        success: function(data){
        }
    });
}



//
// David Beattie - 16011511 - pdf print code
//
function printData()
{
    var divToPrint=document.getElementById("modal_order");
    newWindow = window.open("");
    newWindow.document.write(divToPrint.outerHTML);
    newWindow.print();
    newWindow.close();
}
//
//
//





