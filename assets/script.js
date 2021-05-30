//start function
APIkey = "862f97705f5cae105644a854f96037eb";
let city = $("#city-search").val();

$(document).ready(function () {
    let cityHistory = [];
 

function saveCities() {
    let searches = [];
    cities = Object.keys(localStorage),
    i = cities.lenght;
    while (i -- ) {
        searches.push(localStorage.getItem(cities[i]));
    }
    for (j=0; j < searches.length; j++) {
        $("#search-history-results").append("<button class='city-searches>" + searches[j] + "</button>");
    }
 }
 saveCities();
 listCities();

 function listCities () {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $("#history-list").append(listItem);
    saveCities();
}
    $('#searchBtn').click(function () {
        //creating a variable for the value of the input = city
        let city = $("#city-search").val();
        //if city is not blank then use an ajax call to get data from the API url and console log that data
        if (city != "") {
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&APPID=862f97705f5cae105644a854f96037eb",
                type: "GET",
                dataType: "jsonp",
                success: function (data) {
                    console.log(data);
                    //Create variable to use showCurrentWeather method
                    let current = showCurrentWeather(data);
                    //Displaying the value to the html id of showCurrentWeather
                    $("#showCurrentWeather").html(current);
                    //Empty the search bar when button is pushed
                    $("#city-search").val('');
                    $("#search-history-results").append("<button class='city-history'>" + city + "</button>");
                    localStorage.setItem(city, city);


                }
            })
        } $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=imperial" + "&APPID=862f97705f5cae105644a854f96037eb",
            type: "GET",
        }).then(function (response) {
            for (let i =0; i < response.list.lenght; i++ ) {
                let dateTime = response.list[i].dt_txt;
                let date = dateTime.split(" ")[0];
                let time = dateTime.split(" ")[1];

                if (time === "12:00:00") {
                    $("#day-" + day_counter).children(".card-date").text(month + "/" + day + "/" + year);
                    $("#day-" + day_counter).children(".icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png");
                    $("#day-" + day_counter).children(".5day-temp").text("Temperature: " + response.list[i].main.temp + "°F");
                    $("#day-" + day_counter).children(".5day-humidity").text("Humidity: " +response.list[i].main.humidity + "%");
                    day_counter++;
                    
                }
            }
        })
        })
        });
      //  getFutureForecast();
       
    //Created function to get data for current weather
    function showCurrentWeather(data) {
        //Creating h1 with data.name to display the name of the current city searched
     return "<h1 stlye='font-size: 50px; font-weight: bold;'> " + data.name + " </h1>" +
        //Creating an image to display the weather icon that matches the data.weather
            "<img src=' https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png'> " +
        //Creating an h2 element to display the description data from the weather object with index 0
             "<h3>Condition: " + data.weather[0].main + "</h3>" +
            //Displaying the temp that is found in the main object
            "<h3>Temperature: " + data.main.temp + "°F </h3>" +
            //Displaying the humidity 
            "<h3>Humidity: " + data.main.humidity + "% </h3>" +
            //Displaying the wind speed 
            "<h3>Wind Speed: " + data.wind.speed + "MPH </h3>" 
            
    }


































