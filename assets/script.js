//start function
$(document).ready(function () {
    // let APIkey = "862f97705f5cae105644a854f96037eb";
//Creating click event for the search button 
    $('#searchBtn').click(function(){
//creating a variable for the value of the input = city
        let city = $("#city-search").val();
//if city is not blank then use an ajax call to get data from the API url and console log that data
        if(city != ""){
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?q='+ city +"&units=imperial"+"&APPID=862f97705f5cae105644a854f96037eb",
                type: "GET",
                dataType: "jsonp",
                success: function(data) {
                    console.log(data);
                    //Create variable to use showCurrentWeather method
                    let current = showCurrentWeather(data);
                    //Displaying the value to the html id of showCurrentWeather
                    $("#showCurrentWeather").html(current);
                    //Empty the search bar when button is pushed
                    $("#city-search").val('');

                }
            })
        }

    });
//Created function to get data for current weather
function showCurrentWeather(data){
            //Creating h1 with data.name to display the name of the current city searched
    return "<h1 stlye='font-size: 100%; font-weight: bold;' " + data.name + " </h1>"+
     //Creating an h2 element to display the description data from the weather object with index 0
             "<h3 style='font-weight: bold;'>Condition: "+ data.weather[0].main +"</h3>" +
    //Displaying the temp that is found in the main object
            "<h3 style='font-weight: bold;'>Temperature: "+ data.main.temp +"°F </h3>" +
            "<h3 style='font-weight: bold;'>Humidity: "+ data.main.humidity +"% </h3>" +
            "<h3 style='font-weight: bold;'>Wind Speed: "+ data.wind.speed +"MPH </h3>"
}




})
























