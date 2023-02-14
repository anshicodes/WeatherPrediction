let weather = {
    "apiKey": "01aa43cdc7c85e14455edabb001de418",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city + "&units=metric&appid=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data)
    {
        const { name } = data;
        const {icon, description}= data.weather[0]; //because this is an array
        const {temp,humidity}= data.main;
        const {speed} = data.wind;
        //for testing:-
        //console.log(name, icon, description, temp, humidity,speed)
        document.querySelector(".city").innerText= "Weather in " + name; //.city because class name is city
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon +".png"; //@2x.png makes the icon 2x bigger
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText= temp+ "°C";
        document.querySelector(".humidity").innerText= "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText= "Wind Speed: "+ speed +"kmph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);        
        //got search-bar from index.html
    }
};

document.querySelector(".search button")
.addEventListener("click", function() {
    weather.search(); //get content of search bar and search for it
}); //in html, "script.js defer" because click action cannot happen before creating the search button

document.querySelector(".search-bar")
.addEventListener("keyup", function() {
    if(event.key == 'Enter') {
        weather.search();
    }
});

weather.fetchWeather("Delhi");
