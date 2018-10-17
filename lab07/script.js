$( document ).ready(function() {


    $( "#mybutton" ).click(function( event ) {


        $("<em>", {html: "Hello, Lab7!"}).appendTo("body");

        event.preventDefault();

    });

});

