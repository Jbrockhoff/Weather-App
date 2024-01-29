var APIKey = "49217d28f21ab3361a703bb2de80b586";

function search() {
    document.querySelector("#forecast-container").innerHTML = " "
    var search = document.getElementById("search-city").value
    var api = "https://api.openweathermap.org/data/2.5/forecast?q="+search+"&appid="+APIKey+"&units=imperial"
    fetch (api).then(function (res) {
        return res.json()
    }).then (function (data){
        document.getElementById("city-name").innerText = data.city.name
        var day = data.list[0]
        document.getElementById("current-date").innerText = dayjs.unix(day.dt).format("MM/D/YY")
        document.getElementById("temp-now").innerText = day.main.temp
        document.getElementById("humidity-now").innerText = day.main.humidity
        document.getElementById("wind-speed-now").innerText = day.wind.speed
        document.getElementById("weather-icon-current").src = "https://openweathermap.org/img/wn/"+day.weather[0].icon+".png"
        for (var i = 7; i < data.list.length; i+=8) {
            var forecastDay = data.list[i]
            var newDay = document.createElement("div")
            newDay.classList.add("col-2")
            var date = document.createElement("p")
            date.innerText = dayjs.unix(forecastDay.dt).format("MM/D/YY")
            var icon = document.createElement("img")
            icon.src = "https://openweathermap.org/img/wn/"+forecastDay.weather[0].icon+".png"
            var temp = document.createElement("p")
            temp.innerText = "Temp: "+forecastDay.main.temp
            var humidity = document.createElement("p")
            humidity.innerText = "Humidity: "+forecastDay.main.humidity
            var windspeed = document.createElement("p")
            windspeed.innerText = "Windspeed: "+forecastDay.wind.speed
            newDay.append(date, icon, temp, humidity, windspeed)
            document.getElementById("forecast-container").append(newDay)
        }
    })
    saveStorage ()
}

function saveStorage () {
    var previousCities = $(this).siblings("#city-name").val();
    localStorage.setItem(previousCities); 

}

//Function to save to local storage
// $("#startButton").on("click", function () {   
//     var previousCities = $(this).siblings("#city-name").val();  
    // var searchHistory= $(this).parent().attr("id"); 
         //set items in local storage.
         
//     localStorage.setItem(previousCities);      
//  });

 $('#start-button .city-name').val(localStorage.getItem('city-name'));

 document.getElementById("start-button").addEventListener("click", search)