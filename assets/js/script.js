var today = (moment().format("YYYY-MM-DD"));
let destId;
let cityName;
let countryName;
let eventCityName;
let countries = [];
let destinationId = [];
let hotelData = [];
let hotelDataOBJ = {};
let EventsDataOBJ = {};
let adultsNumber = 1;
let roomNumber = 1;
let hotelCardEL = [];
let localStorageHotel = [];
let localStorageEvent = [];
let tempHotelData = ["Phoenix Hotel","Review score:8.3 Check In at 13:00 Check Out at 11:00","1-8 Kensington Garden Square, W2 4BH","price per night GBP 100.5 /Full amount GBP 251.25","https://cf.bstatic.com/xdata/images/hotel/max1280x900/126384338.jpg?k=fca4950f46fbe387b1c81a1dc97b82a27197e1e1363ad0a42dc14922fcede614&o=","https://www.booking.com/hotel/gb/phoenixhotel.html","Radisson Blu Edwardian Bloomsbury Street Hotel, London","Review score:8.4 Check In at 15:00 Check Out at 11:00","9-13 Bloomsbury Street, Nr Covent Garden, WC1B 3QD","price per night GBP 250.18 /Full amount GBP 625.45","https://cf.bstatic.com/xdata/images/hotel/max1280x900/306934099.jpg?k=1b2e7236f35829f64f10f521476d2858a4448cb05624f138dc694e8ad7cd2aad&o=","https://www.booking.com/hotel/gb/radissonedwardianmarlborough.html","Aloft London Excel","Review score:8.3 Check In at 15:00 Check Out at 12:00","One Eastern Gateway, Royal Victoria Dock, E16 1FR","price per night GBP 119.66 /Full amount GBP 299.16","https://cf.bstatic.com/xdata/images/hotel/max1280x900/373996226.jpg?k=66105663f9ba5946ddb22ba6c678e438df9b4507aa5fe1787279f1e2e2089e6d&o=","https://www.booking.com/hotel/gb/aloft-london-excel.html","citizenM London Bankside","Review score:8.6 Check In at 14:00 Check Out at 11:00","20 Lavington Street, SE1 0NZ","price per night GBP 162.33 /Full amount GBP 405.83","https://cf.bstatic.com/xdata/images/hotel/max1280x900/270976856.jpg?k=2a59631ae56e4796972a91ab7d9f353a0259fb0e669f07aa4e72e49e7b124478&o=","https://www.booking.com/hotel/gb/citizenm-london-bankside.html"]

addingSavedData ()
document.querySelector("#search-button").addEventListener("click", function (event) {
   // Preventing the submit button from trying to submit the form
   event.preventDefault();
   
   //--------checking dates if acceptable
   var startDate = document.getElementById("start-date").value;
   var endDate = document.getElementById("end-date").value;
   var adultsNumber = document.getElementById("adults").value;
   var roomNumber = document.getElementById("rooms").value;
   let errorText = "";
   if (startDate < today || endDate < today || endDate < startDate) { errorText = "wrong dates are entered"; }
   // !!!!!!!need to go in HTML!! console.log(errorText,today,startDate,endDate);
   errorText = "";
   var cityName = document.getElementById("search-input").value;
   if (cityName !== "") {
      
      eventCityName=cityName;
      console.log("event City"+eventCityName," City Name "+cityName)
      citySearch(cityName, startDate, endDate)
      
      
   };
   
   
   
});  //------------end of the main parts 
// if ( localStorage.length >0 ){
   //    var searchedCities = JSON.parse(localStorage.getItem("searchedCities"));
   //    }
   //    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));




function addingSavedData (){
   
   if ( localStorage.localStorageHotel === undefined )
      {
         var localStorageHotel=tempHotelData }
   else{
      var localStorageHotel = JSON.parse(localStorage.getItem("localStorageHotel"));
        }
      //    var searchedCities = JSON.parse(localStorage.getItem("searchedCities"));
   //    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
console.log(localStorageHotel);
for (let i = 0; i < 4; i++) {
   let hotelCardName = "hotelCard" + i;
   document.getElementById(hotelCardName+"name").textContent =  localStorageHotel[i*6];
   document.getElementById(hotelCardName+"details").textContent =localStorageHotel[i*6+1];
   document.getElementById(hotelCardName+"address").textContent = localStorageHotel[i*6+2];
   document.getElementById(hotelCardName+"price").textContent = localStorageHotel[i*6+3];
   let imgEl=document.getElementById(hotelCardName+"img");
   let imgUrl=localStorageHotel[i*6+4];
   imgEl.setAttribute("src",imgUrl);
   document.getElementById(hotelCardName+"link").href =localStorageHotel[i*6+5];


   
}




   // if (locObject.keys(EventsOBJ).length === 0) // true EventsOBJ)
   //  {
   //    var EventsDataOBJ = JSON.parse(localStorage.getItem("EventsOBJ"))
   //    console.log(EventsDataOBJ)
   // }


}
// ==================


// stringifying the myCountryInfo object and 
// storing it in the localStorage
// localStorage.setItem('myCountryInfo', JSON.stringify(myCountryInfo))

// // retrieving localStorage data in HTML
// document.getElementById("content").innerHTML = localStorage.getItem("myCountryInfo");
// // ==================

function dataToCarousel(params) {

  // if
   console.log("data from hotel obj", params)
   k = 2;
   for (let i = 0; i < 4; i++) {
      let hotelCardName = "hotelCard" + i;
      document.getElementById(hotelCardName+"name").textContent = params[i+k].hotel_name;
      localStorageHotel[i*6]=params[i+k].hotel_name;
      document.getElementById(hotelCardName+"details").textContent ="Review score:"+params[i+k].review_score+" Check In at "+params[i+k].checkin+ " "+"Check Out at "+params[i+k].checkout;
      localStorageHotel[i*6+1]=("Review score:"+params[i+k].review_score+" Check In at "+params[i+k].checkin+ " "+"Check Out at "+params[i+k].checkout)
      document.getElementById(hotelCardName+"address").textContent = params[i+k].address;
      localStorageHotel[i*6+2]=params[i+k].address;
      document.getElementById(hotelCardName+"price").textContent = ("price per night "+params[i+k].currency+" "+ Math.floor(params[i+k].price_per_night*100)/100+" /Full amount "+params[i+k].currency+" "+Math.floor(params[i+k].total_amount*100)/100 );
      localStorageHotel[i*6+3]=("price per night "+params[i+k].currency+" "+ Math.floor(params[i+k].price_per_night*100)/100+" /Full amount "+params[i+k].currency+" "+Math.floor(params[i+k].total_amount*100)/100 );
      let imgEl=document.getElementById(hotelCardName+"img")
      let imgUrl=params[i+k].photo
      imgEl.setAttribute("src",imgUrl);
      localStorageHotel[i*6+4]=params[i+k].photo;
      document.getElementById(hotelCardName+"link").href = params[i+k].url;
      localStorageHotel[i*6+5]=params[i+k].url;

     
   }
   console.log(localStorageHotel);
   localStorage.setItem("localStorageHotel", JSON.stringify(localStorageHotel))

}//==============end of the dataToCarousel

function dataToEvents(parObj) {

      console.log("data from Event obj-in function", parObj)
      k = 2;
      for (let i = 0; i < 6; i++) {
         let eventCardName = "eventCard" + i;
         // console.log(eventCardName);
         document.getElementById(eventCardName+"title").textContent = parObj[i+k].event_name;
         document.getElementById(eventCardName+"info").textContent =("Event date: "+parObj[i+k].start_date+" Starts at "+parObj[i+k].start_time);
         let eventImgEl=document.getElementById(eventCardName+"img")
         let imgUrl=parObj[i+k].photo
         eventImgEl.setAttribute("src",imgUrl);
         document.getElementById(eventCardName+"link").href = parObj[i+k].url;
        
      }
   
   
   



} //==============end of the dataToEvents


function citySearch(cityName, startDate, endDate) {
   // console.log(cityName);
   const options = {
      method: 'GET',
      headers: {
         'X-RapidAPI-Key': 'a596769838msh77f4783e3758cd5p1517b7jsn589aaf3580c9',
         'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      }
   };
   queryURL = "https://booking-com.p.rapidapi.com/v1/hotels/locations?size=10&locale=en-gb&name=" + cityName;
   // console.log(queryURL);
   fetch(queryURL, options)
      .then(response => response.json())
      .then(data => {
         let responseData = data;
         console.log("cityData, for id: ", responseData);
         
         for (let i = 0; i < 5; i++) {
            countries[i] = responseData[i].country;
            destinationId[i] = responseData[i].dest_id;
         }
         // console.log("country "+countries,"destination Id"+destinationId);
         // --------call for the 2-nd request
         destId = destinationId[1];
         bookingSearch(destId, startDate, endDate)
      })
}
function bookingSearch(dest, startDate, endDate) {
   const options = {
      method: 'GET',
      headers: {
         'X-RapidAPI-Key': 'a596769838msh77f4783e3758cd5p1517b7jsn589aaf3580c9',
         'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      }
   };
   let queryURLBooking = "https://booking-com.p.rapidapi.com/v1/hotels/search?dest_id=" + dest + "&order_by=popularity&filter_by_currency=GBP&adults_number=" + adultsNumber + "&room_number=" + roomNumber + "&checkout_date=" + endDate + "&units=metric&checkin_date=" + startDate + "&dest_type=city&locale=en-gb&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0&include_adjacency=true"

   fetch(queryURLBooking, options)
      .then(response => response.json())
      .then(data => {
         let responseData = data;
         // hotelData = [];
         console.log(responseData);

         for (let i = 0; i < responseData.result.length; i++) {

                 // ======= data in object form
            hotelDataOBJ[i] =
            {
               hotel_name: responseData.result[i].hotel_name, address: (responseData.result[i].address + ", " + responseData.result[i].zip),
               checkin: responseData.result[i].checkin.from, checkout: responseData.result[i].checkout.until,
               price_per_night: responseData.result[i].composite_price_breakdown.gross_amount_per_night.value,
               currency: responseData.result[i].composite_price_breakdown.gross_amount_per_night.currency,
               total_amount: responseData.result[i].composite_price_breakdown.net_amount.value, review_score: responseData.result[i].review_score,
               photo: responseData.result[i].max_photo_url, url: responseData.result[i].url
            };

            // ======= end data in object form



         }
         console.log("names in city search",eventCityName, startDate, endDate);

         // fetch on ticketmaster
         events(eventCityName, startDate, endDate);
         
      }).catch(err => console.log(err))
      
      
      // promiseCheck();
   }// ---------------end of the city function
   
   function events(city, start, end) {
      
      console.log(city, start, end);
      start=start+"T00:00:00Z";
      end=end+"T00:00:00Z";
      // num.toString()&startDateTime=2023-02-10
      queryURLEvents = "https://app.ticketmaster.com/discovery/v2/events.json?city="+city+"&startDateTime="+start+"&endDateTime="+end+"&size=200&apikey=hQFb4tXqGqiHrogU7XknBuIpl0lYAK4h";
      // queryURLEvents = "https://app.ticketmaster.com/discovery/v2/events.json?city=sheffield&size=200&apikey=hQFb4tXqGqiHrogU7XknBuIpl0lYAK4h";
      fetch(queryURLEvents)
      .then(response => response.json())
      .then(data => {
         let eventsData = data;
         // console.log(cityName,startDate,endDate)
         for (let i = 0; i < eventsData._embedded.events.length; i++) {
            
            EventsDataOBJ[i] =
            {
               event_name: eventsData._embedded.events[i].name, start_date: eventsData._embedded.events[i].dates.start.localDate,
               start_time: eventsData._embedded.events[i].dates.start.localTime, photo: eventsData._embedded.events[i].images[1].url,
               url: eventsData._embedded.events[i].url
            };
            
            
            
            
         }
         
         console.log("hotel Data before render", hotelDataOBJ);
         console.log("events Data before render", EventsDataOBJ);
         // console.log("local storage",eventsOBJ)
         
         dataToCarousel(hotelDataOBJ);
         // console.log("before event function called", EventsDataOBJ);
         dataToEvents(EventsDataOBJ);
         
         
      }); 
      
   }