$(document).ready(function(){

    $("#logout").click(function(){
        $.ajax({
            type : 'POST',
            url : '/logout',
            success: function(data){
            }
        });
    });

    $("#kitchen").click(function(){
        $.ajax({
            type : 'POST',
            url : '/kitchen',
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
                var html = "<table class='table table-responsive table-striped table-light'><thead class='thead-dark'><tr><th>Order ID</th><th>Time/Date</th><th>Table Number</th><th>Order</th><th>Notes</th><th>Waiting Time</th><th>Total</th><th>Action</th></tr></thead>";
                for (var i = 0; i < data.length; i++) {

                    var currentDate = Date.now();


                    html+="<tbody id='orderTable'><tr id="+data[i]._id+">";
                    html+="<td>"+data[i]._id+"</td>";
                    html+="<td>"+data[i].order_time+"</td>";
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
                        var check = confirm('Delete Confirmation...');
                        if(check == true) {
                            var id = this.parentElement.id;
                            //console.log(id);
                            $.ajax({
                                type : 'POST',
                                url : '/deleteOrder',
                                data: {_id: id},
                                success: function(data){
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
            document.getElementById('total').innerHTML = total;
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
                        document.getElementById('total').innerHTML = total;
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

function clearOrder(){
    array = [];
    total = 0;
    document.getElementById('order_ul').innerHTML = "";
    document.getElementById('order_text').innerHTML = array;
    document.getElementById('total').innerHTML = "";
}
