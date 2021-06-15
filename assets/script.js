//Declaring variables
APIkey = "862f97705f5cae105644a854f96037eb";
let city = $("#city-search").val();

//start function
$(document).ready(function () {
    //Function to save searches to local storage
    function saveCities() {
        //creating an empty array to store the searched cities in
        let searches = [];
        //saving the cities in order of searched
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
            //Call function to get the current weather function
            getCurrentWeather();
            //Call function to get the forecast function
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
                //Appending the data from the showCurrentWeather function to the html id "#showCurrentWeather"
                $("#showCurrentWeather").html(current);
                //Appending the search history and creating buttons with the name of the city searched
                $("#search-history-results").append("<button class='city-history'>" + city + "</button>");
                //saving city into local storage
                localStorage.setItem(city, city);


            });

        };


        //Function to return the data from the getCurrentWeather function to elements on the html
        function showCurrentWeather(data) {
            //Creating h1 with data.name to display the name of the current city searched
            return "<h1 stlye='font-size: 50px; font-weight: bold;'> " + data.name + " </h1>" +
                //Creating an image to display the weather icon that matches the data.weatherindex
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

        //Function to get the 5day forecast
        function getForecast() {
            //creating the url for forecastapi in a variable
            //Forecast url
            let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&APPID=862f97705f5cae105644a854f96037eb";
            //Ajax call to get the information from the api
            $.ajax({
                url: forecastUrl,
                type: "GET",
                dataType: "jsonp",
            }).then(function (response) {
                console.log(response);
                //creating a variable for the list array that is found in the data object
                let results = response.list
                //Console log to make sure it shows the list, which it does
                console.log(results);
                //Using a for loop to create html elements to display forecast data to webpage
                for (var i = 0; i < 5; i++) {
//Creating html elements for temp, humidity and windspeed for each card for 5 days
//Using moments to display the dates
                        $("#cardDate0").text(moment().add(1, 'days').format('L')) +
                        $("#icon0").html("<img src=' https://openweathermap.org/img/wn/" + results[0].weather[0].icon + ".png'> ") +
                        $("#cardTemp0").text("Temperature: " + results[0].main.temp + " °F") +
                        $("#cardWind0").text("Wind Speed: " + results[0].wind.speed + " MPH") +
                        $("#cardHumidity0").text("Humidity: " + results[0].main.humidity + "%") +

                        $("#cardDate1").text(moment().add(2, 'days').format('L')) +
                        $("#icon1").html("<img src=' https://openweathermap.org/img/wn/" + results[1].weather[0].icon + ".png'> ") +
                        $("#cardTemp1").text("Temperature: " + results[1].main.temp + " °F") +
                        $("#cardWind1").text("Wind Speed: " + results[1].wind.speed + " MPH") +
                        $("#cardHumidity1").text("Humidity: " + results[1].main.humidity + "%") +

                        $("#cardDate2").text(moment().add(3, 'days').format('L')) +
                        $("#icon2").html("<img src=' https://openweathermap.org/img/wn/" + results[2].weather[0].icon + ".png'> ") +
                        $("#cardTemp2").text("Temperature: " + results[2].main.temp + " °F") +
                        $("#cardWind2").text("Wind Speed: " + results[2].wind.speed + " MPH") +
                        $("#cardHumidity2").text("Humidity: " + results[2].main.humidity + "%") +


                        $("#cardDate3").text(moment().add(4, 'days').format('L')) +
                        $("#icon3").html("<img src=' https://openweathermap.org/img/wn/" + results[3].weather[0].icon + ".png'> ") +
                        $("#cardTemp3").text("Temperature: " + results[3].main.temp + " °F") +
                        $("#cardWind3").text("Wind Speed: " + results[3].wind.speed + " MPH") +
                        $("#cardHumidity3").text("Humidity: " + results[3].main.humidity + "%") +

                        $("#cardDate4").text(moment().add(5, 'days').format('L')) +
                        $("#icon4").html("<img src=' https://openweathermap.org/img/wn/" + results[4].weather[0].icon + ".png'> ") +
                        $("#cardTemp4").text("Temperature: " + results[4].main.temp + " °F") +
                        $("#cardWind4").text("Wind Speed: " + results[4].wind.speed + " MPH") +
                        $("#cardHumidity4").text("Humidity: " + results[4].main.humidity + "%")

                };
            });
        }



    });


});