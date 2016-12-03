    // How would you return back a single gif tied to a search term?
    // http://api.giphy.com/v1/gifs/search?q=funny+dog&api_key=dc6zaTOxFJmzC&limit=1

    // How would you return five gifs tied to a search term?
    // http://api.giphy.com/v1/gifs/search?q=funny+dog&api_key=dc6zaTOxFJmzC&limit=5

    // How would you return the trending gifs back from this API?
    // http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC
$(document).ready(function(){

var PUBLIC_KEY = 'dc6zaTOxFJmzC';
var BASE_URL = '//api.giphy.com/v1/gifs/';
var ENDPOINT = 'search';
var LIMIT = 10;
//Do not need to use RATING variable
var RATING = "G";
var userInput;
var newButtonInput;
var queryURL;




console.log("http:"+BASE_URL+ENDPOINT+"?q=$"+userInput+"&limit="+LIMIT+"&rating="+RATING+"&api_key="+PUBLIC_KEY);

// var queryURL = "http:"+BASE_URL+ENDPOINT+"?q=$"+userInput+"&limit="+LIMIT+"&rating="+RATING+"&api_key="+PUBLIC_KEY;

// Prevents form from refreshing when enter is pressed
$("form").submit(function(event){
  event.preventDefault();
});

// Code for Enter button to add new animal
$('#textBoxInput').bind("enterKey",function(e){
      
   addButton();

});
$('#textBoxInput').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});


$(document).on("click", "#newAnimal", function(e){
    // newButtonInput = $("#textBoxInput").val();
    // $("#textBoxInput").val("testing");

    // Get value inside textbox
    // newButtonInput = $("#textBoxInput").val().trim();
    console.log(newButtonInput);
    
    
    addButton();
    
  });


$(document).on("click", ".gifButton", function(e){
  
  clicked(e);
  
});

// Pause/Play gif on click
$(document).on("click", ".imageGif", function(e){
  
  var state = $(this).attr("data-state");
  // console.log(state);
  if(state === "animate"){
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
  }
  else{
    $(this).attr("src", $(this).data("animate"));
    $(this).attr("data-state", "animate");
  }
  
  
});


  
var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "ferret", "bird"];

for(var i = 0; i < topics.length; i++){
    var animalButton = $("<button>");
    animalButton.text(topics[i]);
    // adding on click functionality
    animalButton.addClass("gifButton");
    // adding bootstrap button classes
    animalButton.addClass("btn");
    animalButton.addClass("btn-primary");

    animalButton.attr("data-animal", topics[i]);

    console.log("new button");
    $("#topicRow").append(animalButton);
} // end of adding buttons loop

function gifCall(){
      $.ajax({ url: queryURL, method: "GET" }).done(function(responseGIPHY) {
      
      // <img src="">

      // $(".gifArea").html(responseGIPHY.data[0].embed_url);
      // $(".gifArea").html('<img src="' + responseGIPHY.data[0].images.fixed_height_downsampled.url + '">');
      // $(".gifArea").prepend("<h4>Rating: " + responseGIPHY.data[0].rating + "</h4>");

      for(var x = 0; x < LIMIT; x++){
        var newDiv = $("<div>");
        var newImage = $("<img>")
        newImage.attr("src", responseGIPHY.data[x].images.fixed_height_downsampled.url);
        newImage.attr("data-still", responseGIPHY.data[x].images.fixed_height_still.url);
        newImage.attr("data-animate", responseGIPHY.data[x].images.fixed_height_downsampled.url);
        newImage.attr("data-state", "animate");
        newImage.addClass("imageGif");
        // newDiv.append('<img src="' + responseGIPHY.data[x].images.fixed_height_downsampled.url + '">');
        newDiv.append(newImage);
        newDiv.prepend("<h4>Rating: " + responseGIPHY.data[x].rating + "</h4>");

        // $(".gifArea").append('<img src="' + responseGIPHY.data[x].images.fixed_height_downsampled.url + '">');
        // $(".gifArea").prepend("<h4>Rating: " + responseGIPHY.data[x].rating + "</h4>");
        $(".gifArea").append (newDiv);
      }

      // console.log(responseGIPHY.data[0].images.fixed_height.url);

    }); 

} // end of gifCall

function addButton(){
  var button2 = $("<button>");
  // Get value inside the text box. Trim is to eliminate the extra spaces after input
  newButtonInput = $("#textBoxInput").val().trim();
  button2.text(newButtonInput);
  // not working correctly
  button2.attr("data-animal", newButtonInput);

  button2.addClass("gifButton");
  button2.addClass("btn");
  button2.addClass("btn-primary");

  $("#topicRow").append(button2);

} // end of addButton

function clicked(e){

  clearGifArea();
  userInput = $(e.target).data("animal");
  queryURL = "https:"+BASE_URL+ENDPOINT+"?q=$"+userInput+"&limit="+LIMIT+"&api_key="+PUBLIC_KEY;
  // "&rating="+RATING
  gifCall();


}

function clearGifArea(){
  $(".gifArea").html("");
}



}); // end of document ready