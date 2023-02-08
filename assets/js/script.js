var today = (moment().format("YYYY-MM-DD"));
let destId;
let cityName;
let countryName;
let countries = [];
let destinationId = [];
let hotelData = [];
let hotelDataOBJ = {};
let EventsDataOBJ = {};
let adultsNumber = 1;
let roomNumber = 1;
let hotelCardEL = [];

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

      citySearch(cityName, startDate, endDate)

      // countryName = countries[0];
      // destId = destinationId[0];
      // booking(destId);
   };



});  //------------end of the main parts 


function dataToCarousel(params) {
   // if
   console.log("data from hotel obj", params)
   k = 2;
   for (let i = 0; i < 4; i++) {
      let hotelCardName = "hotelCard" + i;
      console.log(hotelCardName);
      console.log(params[i+k].url)
      // console.log(params[i].hotel_name);
      document.getElementById(hotelCardName+"name").textContent = params[i+k].hotel_name;
      document.getElementById(hotelCardName+"details").textContent ="Review score:"+params[i+k].review_score+" Check In at "+params[i+k].checkin+ " "+"Check Out at "+params[i+k].checkout;
      document.getElementById(hotelCardName+"address").textContent = params[i+k].address;
      // details
      document.getElementById(hotelCardName+"price").textContent = ("price per night "+params[i+k].currency+" "+ Math.floor(params[i+k].price_per_night*100)/100+" /Full amount "+params[i+k].currency+" "+Math.floor(params[i+k].total_amount*100)/100 );
      document.getElementById(hotelCardName+"address").textContent = params[i+k].address;
      let imgEl=document.getElementById(hotelCardName+"img")
      let imgUrl=params[i+k].photo
      imgEl.setAttribute("src",imgUrl);
      document.getElementById(hotelCardName+"link").href = params[i+k].url;
     
   }


}

function dataToEvents(params) {


}


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
         // console.log(hotelData);

         // fetch on ticketmaster
         events(cityName, startDate, endDate);
         
      }).catch(err => console.log(err))


   // promiseCheck();
}// ---------------end of the city function

function events(cityName, startDate, endDate) {
   queryURLEvents = "https://app.ticketmaster.com/discovery/v2/events.json?city=sheffield&size=200&apikey=hQFb4tXqGqiHrogU7XknBuIpl0lYAK4h"
   fetch(queryURLEvents)
      .then(response => response.json())
      .then(data => {
         let eventsData = data;
         console.log(cityName,startDate,endDate)
         for (let i = 0; i < eventsData._embedded.events.length; i++) {

            EventsDataOBJ[i] =
            {
               event_name: eventsData._embedded.events[i].name, start_date: eventsData._embedded.events[i].dates.start.localDate,
               start_time: eventsData._embedded.events[i].dates.start.localTime, photo: eventsData._embedded.events[i].images[1].url,
               url: eventsData._embedded.events[i].url
            };
         }
         console.log("hotel Data before render", hotelDataOBJ);
         console.log("events Data before render", EventsDataOBJ)

         dataToCarousel(hotelDataOBJ)
      }); 
      
}