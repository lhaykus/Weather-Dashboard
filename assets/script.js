//Declaring variables
APIkey = "862f97705f5cae105644a854f96037eb";
let city = $("#city-search").val();

//start function
$(document).ready(function () {
    //Function to save searches to local storage
    function saveCities() {
        //creating an empty array to store the searched cities in
        let searches = [];
        //
        cities = Object.keys(localStorage),
            i = cities.lenght;
        while (i--) {
            //pushing searches into local storage and getting the stores cities from local storage index
            searches.push(localStorage.getItem(cities[i]));
        }
        for (j = 0; j < searches.length; j++) {
            //Creating buttons for each search that is saved in search history
            $("#search-history-results").append("<button class='city-searches>" + searches[j] + "</button>");
        };
    };

    //function to save to local storage
    saveCities();
    //function to list the search history
    listCities();


    //Function to list the search history citites
    function listCities() {
        //adding <li> element to the html class and giving them the text of the name of the city that was searched
        let listItem = $("<li>").addClass("list-group-item").text(city);
        //appending the list items to the id history-list to show on the page
        $("#history-list").append(listItem);
        saveCities();
    };



    //Function for when the search button is clicked
    $('#searchBtn').click(function () {
        //creating a variable for the value of the input = city
        let city = $("#city-search").val();
        //if city is not blank then use an ajax call to get data from the API url and console log that data
        if (city != "") {
            //Empty the search bar when button is pushed
            $("#city-search").val('');
            //Call function to call the API for current weather
            getCurrentWeather();
            getForecast();
            //   getUV();

        };


        function getCurrentWeather() {
            $.ajax({
                //url for the current weather, added &units=imperia to conver to °F 
                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&APPID=862f97705f5cae105644a854f96037eb",
                type: "GET",
            }).then(function (data) {
                console.log(data);
                //Create variable to use showCurrentWeather function
                let current = showCurrentWeather(data);
                //Displaying the value to the html id of showCurrentWeather
                $("#showCurrentWeather").html(current);
                //Appending the search history and creating buttons with the name of the city searched
                $("#search-history-results").append("<button class='city-history'>" + city + "</button>");
                //saving city into local storage
                localStorage.setItem(city, city);

            });

        };


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


        };

        function getForecast() {
            let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=imperial&APPID=862f97705f5cae105644a854f96037eb";

            $.ajax({
                url: forecastUrl,
                type: "GET",
                dataType: "jsonp",
            }).then(function (data) {
                console.log(data);

                let results = data.list;
                console.log(results);

                let forecast = showForecast(results);
                $("#showForecast").html(forecast);

            });

        };

        function showForecast(results) {
            return "<img src=' https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png'> " +
                "<h3 class='forecast0;'>Temperature: " + results[0].main.temp + "°F </h3>" +
                "<h3>Humidity: " + results[0].main.humidity + "% </h3>" +

                "<img src=' https://openweathermap.org/img/wn/" + data.weather[1].icon + ".png'> " +
                "<h3 class='forecast1;'>Temperature: " + results[1].main.temp + "°F </h3>" +
                "<h3>Humidity: " + results[1].main.humidity + "% </h3>" +

                "<img src=' https://openweathermap.org/img/wn/" + data.weather[2].icon + ".png'> " +
                "<h3 class='forecast2;'>Temperature: " + results[2].main.temp + "°F </h3>" +
                "<h3>Humidity: " + results[2].main.humidity + "% </h3>" +

                "<img src=' https://openweathermap.org/img/wn/" + data.weather[3].icon + ".png'> " +
                "<h3 class='forecast3;'>Temperature: " + results[3].main.temp + "°F </h3>" +
                "<h3>Humidity: " + results[3].main.humidity + "% </h3>" +

                "<img src=' https://openweathermap.org/img/wn/" + data.weather[4].icon + ".png'> " +
                "<h3 class='forecast4;'>Temperature: " + results[4].main.temp + "°F </h3>" +
                "<h3>Humidity: " + results[4].main.humidity + "% </h3>"

        };

        /*    function getUV(data) {
                         latitude = data.coord.lat;
                         longitude = data.coord.lon;
             
                         $.ajax({
                             url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + "&lon=" + longitude + "&units=imperial&APPID=862f97705f5cae105644a854f96037eb",
                             type: "GET",
                         }).then(function (response) {
                             let currentUV = $("#uv-index");
                             currentUV.append($("#showCurrentWeather").text("UV Index: ") + response.value);
                         });
                     };
             */
    });
});


