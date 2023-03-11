window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone1 = document.querySelector('.location-timezone1');
    let locationTimezone2 = document.querySelector('.location-timezone2');
    let weatherIcon = document.querySelector('.weather-icon');
    let temperatureSection =document.querySelector('.temperature');
    const temperatureSpan=document.querySelector('.temperature span')
    
    if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(position=>{
               long = position.coords.longitude;
               lat = position.coords.latitude;
               

               const api=`http://api.weatherapi.com/v1/current.json?key=0b11b578052d462cadc42424231103&q=${lat},${long}`
               fetch(api)
                 .then(response=>{
                   return response.json();
                })
                .then(data=>{
                    console.log(data);
                  const {temp_c,temp_f,condition} = data.current;
                  //Set DOM Elements from the API
                  temperatureDegree.textContent = temp_c;
                  temperatureDescription.textContent =condition.text;
                  locationTimezone1.textContent=data.location.name;
                  locationTimezone2.textContent=data.location.country;
                                 
                  //set Icon
                  const icon = data.current.condition.icon;
                  weatherIcon.setAttribute('src', `https:${icon}`);
                  //Change temperature to Celsius/Farenheit
                   temperatureSection.addEventListener('click',()=>{
                    if(temperatureSpan.textContent === "C"){
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temp_f;

                    }else{
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = temp_c;
                    }
                   })
                });
         });

         
    }else{
        h1.textContent = "Hey please enable your geolocation."
    }

    
});