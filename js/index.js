/**
 * Created by marcinlimanski on 22/07/15.
 */
//Handeling events
$(function(){
    getRequest();

    $('#btn_get').on('click', function () {
        getRequest();
    });

    $('#btn_post').on('click', function () {
        postRequest();
    });

    $('#btn_delete').on('click', function () {
        deleteRequest();
    });

    $('#btn_put').on('click', function () {
        putRequest();
    });

});

function getRequest(){
    $('#get_response').empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/bikes",
        success: function(bikes){
            console.log("data", bikes);
            $.each(bikes, function(index, bike){
                $('#get_response').append('<li>' + bike.name + ', type: ' + bike.type + ' id: '+ bike._id +'</li>');
            });
        },
        error: function (error) {
            $('#get_response').append('<li>' + error.toString() + 'error' + '</li>');
        }
    });
}

function postRequest(){

    var $name = $('#bike_name');
    var $type = $('#bike_type');
    var $price = $('#bike_price');

    //Creating  bike json object
    var bike = {
        name : $name.val(),
        type : $type.val(),
        price : $price.val()
    };
    //Test the object conctent
    console.log(bike);

    //making the post call
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/api/bikes",
        data: bike,
        success : function(){
            //Cant do that because i need the id
            //$('#get_response').append('<li>' + bike.name + ', type: ' + bike.type + '</li>');
            getRequest();
        },
        error : function(){
            alert('Database error, the bike is not saved');
        }
    });
}

function deleteRequest(){
    var $bikeId = $('#bike_id');


    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:8080/api/bikes/' + $bikeId.val(),
        success: function(){
            getRequest();
            $bikeId.val('');
        },
        error: function(error){
            console.log(error);
        }
    });
}

function putRequest(){

    var $bikeIdPut = $('#bike_id_put');
    var $bikeName = $('#bike_name_put');
    var $bikeType = $('#bike_type_put');
    var $bikePrice = $('#bike_price_put');

    var updatedBike = {
        name : $bikeName.val(),
        type: $bikeType.val(),
        rice : $bikePrice.val()
    };

    $.ajax({
        type: "PUT",
        url: 'http://localhost:8080/api/bikes/' + $bikeIdPut.val(),
        data: updatedBike,
        success : function(res){
            getRequest();
            $bikeIdPut.val('');
            $bikeName.val('');
            $bikeType.val('');
            $bikePrice.val('');
            alert(res.message);
        },
        error : function(error){
            alert(error);
        }
    });

}
