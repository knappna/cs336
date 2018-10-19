$( document ).ready(function() {


    //$( "#mybutton" ).click(function( event ) {
       // $("<em>", {html: "Hello, Lab7!"}).appendTo("body");
        //event.preventDefault();
//    });
    // Request web content (asynchronously) and handle result using promises.
    $("#mybutton").click(
        function () {
            if ($(this).hasClass("minus")) {
                //AJAX request issued
                let jsPromise = Promise.resolve($.ajax({
                    url: "/hello",
                    type: "GET",
                    data: {
                        name: "lab07"
                    }
                }));
                jsPromise.then(function (result) {
                    //if AJAX request worked
                    $("#mybutton").next("div").html("<p>" + result.name + "</p>");
                }, function (xhr) {
                    //if it failed
                    $("#mybutton").next("div").html("<p>" + xhr.statusText + "</p>");
                });
            }
        }
    );
         
});

