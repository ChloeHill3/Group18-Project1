// var today=(moment().format("D/M/YYYY"));
let destId;
let cityName;
let countryName;
let countries=[];
let destinationId=[];

// var searchedCities=["Searched City","Searched City","Searched City","Searched City","Searched City","Searched City"];
// let currentEl=document.querySelector("#current");
// var iconEl = document.createElement("img");
// var forecastIconEl=[]; 
// var historyButtonEl=[]
document.querySelector("#search-button").addEventListener("click", function(event) {
   // Preventing the submit button from trying to submit the form
   event.preventDefault();
var cityName = document.querySelector("#search-input").value;
  if (cityName !== "")
  {
    city(cityName);
      countryName=countries[0];
      destId=destinationId[0];
   // booking(destId);
  };

});  //end of the main parts 

function city(cityName){
   console.log(cityName);
   const options = {
      method: 'GET',
      headers: {
         'X-RapidAPI-Key': '30127d541bmsh49dbbd8b4e4b4e2p1f3e25jsncfd15d310205',
         'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      }
   };
   queryURL="https://booking-com.p.rapidapi.com/v1/hotels/locations?size=10&locale=en-gb&name="+cityName;
   console.log(queryURL);
   fetch(queryURL, options)
   .then(response => response.json())
   .then(data =>{
      let responseData=data;
      console.log(responseData);
      for (let i = 0; i < 5; i++) {
            countries[i]=responseData[i].country;
            destinationId[i]=responseData[i].dest_id;
         }  
         console.log("country "+countries,"destination Id"+destinationId);
         // call for the 2-nd request
         destId=destinationId[1];
         queryURLBooking="https://booking-com.p.rapidapi.com/v1/hotels/search?dest_id="+destId+"&order_by=popularity&filter_by_currency=GBP&adults_number=2&room_number=1&checkout_date=2023-08-27&units=metric&checkin_date=2023-08-15&dest_type=city&locale=en-gb&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0&include_adjacency=true"
         console.log(queryURLBooking);
         const options1 = {
            method: 'GET',
            headers: {
               'X-RapidAPI-Key': '30127d541bmsh49dbbd8b4e4b4e2p1f3e25jsncfd15d310205',
               'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
         };
           
      return(fetch(queryURLBooking,options1));
      })
      .then(response => response.json())
      .then(data =>{
         let responseData=data;
         console.log(responseData);
         
         })
      
      // .then(response => console.log(response))
      // .catch(err => console.error(err));
      
      // function booking(destId){  
         // fetch(queryURL, options2)
         // .then(response => console.log(response))
         // .catch(err => console.error(err));
         // .then(response => response.json())

}  // end of the city function
            
         // }
            function events(){
               
      fetch("https://app.ticketmaster.com/discovery/v2/events.json?countryCode=GB&size=200&city=Leeds&apikey=xOBqfo7UG9ZGWRTl5OAaO9z1Ysd5Bnr1")
      .then(response => console.log(response.json()))
      
   } //end of the event
   
   
   //   $.ajax({
      //    type:"GET",
      //    url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=xOBqfo7UG9ZGWRTl5OAaO9z1Ysd5Bnr1",
      //    async:true,
      //    dataType: "json",
      //    success: function(json) {
         //                console.log(json);
         //                // Parse the response.
         //                // Do other things.
         //             },
         //    error: function(xhr, status, err) {
            //                // This time, we do not end up here!
            //             }
            //  });
            //   cardName="#forecast"+(i+1);
              
            //   let forecastEl=document.querySelector(cardName+"icon");
            //   // console.log(cardName+"icon");
            //   document.querySelector(cardName).textContent=moment(responseData.dt,"X").format("D/M/YYYY");
            //   document.querySelector(cardName+"Temp").textContent="Temp "+(responseData.main.temp)+" °C";
            //   document.querySelector(cardName+"Wind").textContent="Wind "+Math.round(responseData.wind.speed*3.6* 100)/100+" KPH";
            //   document.querySelector(cardName+"Humidity").textContent="Humidity "+responseData.main.humidity+" %";
              
            //   let iconUrl="http://openweathermap.org/img/wn/"+responseData.weather[0].icon+"@2x.png";
            //   forecastIconEl[i].setAttribute("src",iconUrl);
            //   forecastEl.appendChild(forecastIconEl[i]);