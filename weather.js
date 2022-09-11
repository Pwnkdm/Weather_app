          
    // fetch
    //  url


    //  fc57aff8f863ff4ae3685e708aac6dd5   --->apikey
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

let container = document.getElementById("info");

async function getWeather(){
    
    try{
     let city =document.getElementById("city").value;
    //let res = await fetch(`api.openweathermap.org/data/2.5/weather?q=${city}&appid=fc57aff8f863ff4ae3685e708aac6dd5&units=metric`);  
    let res =await fetch(`https://api.openweathermap.org/data/2.5/weather?&q=${city}&appid=fc57aff8f863ff4ae3685e708aac6dd5&units=metric`);  

    let data = await res.json();
    // console.log("data:",data);
    appendData(data);
    weekdata();
    
} catch (err){
        console.log("err:",err);
}

}    

function appendData(data){
    container.innerHTML=null;
    document.getElementById("map").innerHTML=null;
    let name= document.createElement("h5");
        name.innerText= `City:${data.name}`;

    let temp= document.createElement("h5");
          temp.innerText= `Temprature:${data.main.temp}`;

    let pressure= document.createElement("h5");
        pressure.innerText = `Pressure:${data.main.pressure}`;

    let humi= document.createElement("h5");
         humi.innerText= `Humidity:${data.main.humidity}%`;

         let minTemp= document.createElement("h5");
         minTemp.innerText= `Min Temp:${data.main.temp_min}°c `;

         let maxTemp= document.createElement("h5");
         maxTemp.innerHTML= `<i class="fa-solid fa-temperature-high"></i> Max Temp:${data.main.temp_max}°c`;

         let wind= document.createElement("h5");
         wind.innerText= `Wind:${data.wind.speed}`;

         let clouds= document.createElement("h5");
         clouds.innerText= `Clouds:${data.clouds.all}`;
        //  console.log(clouds)

         let sunrise= document.createElement("h5");
         sunrise.innerText= `Sunrise:${data.sys.sunrise}`;

         let sunset= document.createElement("h5");
         sunset.innerText= `Sunset:${data.sys.sunset}`;

         var map = document.createElement("iframe")
         map.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyA4c_4bZmjp9jVdnluPg1B23ehyEr5gl-w&q=${data.name}`
         document.getElementById('map').append(map);

         container.append(name,minTemp,maxTemp,wind,clouds,pressure,humi,sunrise,sunset);

}




    // for 7 days data  

    async function weekdata() {

        try {
            let city = document.getElementById("city").value
            let responce = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=176ec5e1926748ee54eea47b99a97178&units=metric`);
             wdata = await responce.json();
            console.log( wdata.list);
            
             displayweekdata(wdata.list);
            document.getElementById("city").value = "";
        } catch (error) {
            console.log("not updated week data")
        }
    }


          
    function displayweekdata(d) {

        document.getElementById("weekdata").innerHTML = "";
        d.map(function (data, i, arr) {
            if (i > 6) {
                return;
            }
            var box1 = document.createElement("div");
            box1.id = "box"
            if (i == 0) {
                var day = document.createElement("h2");
                day.textContent = `MON`;
                box1.append(day);
            }
            if (i == 1) {
                var day = document.createElement("h2");
                day.textContent = `TUE`;
                box1.append(day);
            }
            if (i == 2) {
                var day = document.createElement("h2");
                day.textContent = `WED`;
                box1.append(day);
            }
            if (i == 3) {
                var day = document.createElement("h2");
                day.textContent = `THU`;
                box1.append(day);
            }
            if (i == 4) {
                var day = document.createElement("h2");
                day.textContent = `FRI`;
                box1.append(day);
            }
            if (i == 5) {
                var day = document.createElement("h2");
                day.textContent = `SAT`;
                box1.append(day);
            }
            if (i == 6) {
                var day = document.createElement("h2");
                day.textContent = `SUN`;
                box1.append(day);
            }
            if (data.main.temp > 25) {
                var icon = document.createElement("div");
                icon.innerHTML = `<i class="fa-solid fa-sun"></i>`
                icon.id = "icon"
            }
            if (data.main.temp < 25) {
                var icon = document.createElement("div");
                icon.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`
                icon.id = "icon"
            }
            if (data.main.temp < 10) {
                var icon = document.createElement("div");
                icon.innerHTML = `<i class="fa-solid fa-snowflake"></i>`
                icon.id = "icon"
            }
            var temp = document.createElement("h1");
            temp.textContent = `${data.main.temp}°c`;
    
            var temp_max = document.createElement("p");
            temp_max.textContent = ` ${data.main.temp_max}°c`;
            var temp_min = document.createElement("p");
            temp_min.textContent = `${data.main.temp_min}°c`;
    
            box1.append(temp, icon, temp_max, temp_min)
            document.getElementById("weekdata").append(box1);
        });
    
    }