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
let hotelCounter=0;
let eventCounter = 0;
let hotelCardEL = [];
let localStorageHotel = [];
let localStorageEvents = [];
let localStorageHotelOBJ = {};
let localStorageEventsOBJ = {};
let eventTotal=0;
let tempHotelData = ["Phoenix Hotel","Review score:8.3 Check In at 13:00 Check Out at 11:00","1-8 Kensington Garden Square, W2 4BH","price per night GBP 100.5 /Full amount GBP 251.25","https://cf.bstatic.com/xdata/images/hotel/max1280x900/126384338.jpg?k=fca4950f46fbe387b1c81a1dc97b82a27197e1e1363ad0a42dc14922fcede614&o=","https://www.booking.com/hotel/gb/phoenixhotel.html","Radisson Blu Edwardian Bloomsbury Street Hotel, London","Review score:8.4 Check In at 15:00 Check Out at 11:00","9-13 Bloomsbury Street, Nr Covent Garden, WC1B 3QD","price per night GBP 250.18 /Full amount GBP 625.45","https://cf.bstatic.com/xdata/images/hotel/max1280x900/306934099.jpg?k=1b2e7236f35829f64f10f521476d2858a4448cb05624f138dc694e8ad7cd2aad&o=","https://www.booking.com/hotel/gb/radissonedwardianmarlborough.html","Aloft London Excel","Review score:8.3 Check In at 15:00 Check Out at 12:00","One Eastern Gateway, Royal Victoria Dock, E16 1FR","price per night GBP 119.66 /Full amount GBP 299.16","https://cf.bstatic.com/xdata/images/hotel/max1280x900/373996226.jpg?k=66105663f9ba5946ddb22ba6c678e438df9b4507aa5fe1787279f1e2e2089e6d&o=","https://www.booking.com/hotel/gb/aloft-london-excel.html","citizenM London Bankside","Review score:8.6 Check In at 14:00 Check Out at 11:00","20 Lavington Street, SE1 0NZ","price per night GBP 162.33 /Full amount GBP 405.83","https://cf.bstatic.com/xdata/images/hotel/max1280x900/270976856.jpg?k=2a59631ae56e4796972a91ab7d9f353a0259fb0e669f07aa4e72e49e7b124478&o=","https://www.booking.com/hotel/gb/citizenm-london-bankside.html"]
let tempEventsData =["Wicked","Event date: 2023-02-15 Starts at 14:30:00","https://s1.ticketm.net/dam/a/419/01f28290-5703-4eff-a2d6-053f5c79c419_1619391_RETINA_PORTRAIT_3_2.jpg","https://theatre.ticketmaster.co.uk/book/1DU1L-apollo-victoria-london-wicked/#perf=1DU1L-16N&date=2023-02-15&time=2.30PM",
               "Best of Enemies","Event date: 2023-02-15 Starts at 14:30:00","https://s1.ticketm.net/dam/a/89b/068b7e13-7efa-4b5a-9ef2-97c20393c89b_1779961_RETINA_PORTRAIT_3_2.jpg","https://theatre.ticketmaster.co.uk/book/1EWPY-best-of-enemies/#perf=1EWPY-2Z&date=2023-02-15&time=2.30PM",
               "Best of Enemies","Event date: 2023-02-15 Starts at 19:30:00","https://s1.ticketm.net/dam/a/89b/068b7e13-7efa-4b5a-9ef2-97c20393c89b_1779961_RETINA_PORTRAIT_3_2.jpg","https://theatre.ticketmaster.co.uk/book/1EWPY-best-of-enemies/#perf=1EWPY-30&date=2023-02-15&time=7.30PM",
               "Only Fools and Horses The Musical","Event date: 2023-02-15 Starts at 14:30:00","https://s1.ticketm.net/dam/a/fad/a841e8b2-c3e1-47fb-a0ca-a2abcf6b9fad_1822431_CUSTOM.jpg","https://theatre.ticketmaster.co.uk/book/NHHG-only-fools-and-horses/#perf=NHHG-40D&date=2023-02-15&time=2.30PM",
               "Only Fools and Horses The Musical","Event date: 2023-02-15 Starts at 19:30:00","https://s1.ticketm.net/dam/a/fad/a841e8b2-c3e1-47fb-a0ca-a2abcf6b9fad_1822431_CUSTOM.jpg","https://theatre.ticketmaster.co.uk/book/NHHG-only-fools-and-horses/#perf=NHHG-40E&date=2023-02-15&time=7.30PM",
               "Mamma Mia! the Party","Event date: 2023-02-15 Starts at 18:30:00","https://s1.ticketm.net/dam/a/725/3af7a38a-0007-45ad-9ea0-e69fa10d9725_EVENT_DETAIL_PAGE_16_9.jpg","https://www.ticketmaster.co.uk/mamma-mia-the-party-london-15-02-2023/event/35005D5A8F5D3505"]
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
   document.querySelector("#more-results").addEventListener("click", function (event) {
      event.preventDefault();
      var localStorageHotelOBJ = JSON.parse(localStorage.getItem("localStorageHotelOBJ"));
      if (hotelCounter<16){hotelCounter = hotelCounter+4;} else{hotelCounter=0;}
      // console.log(hotelCounter)
      dataToCarousel(localStorageHotelOBJ,hotelCounter);
   }) //===== end of event listeners for HOTELS 

   document.querySelector("#more-events").addEventListener("click", function (event) {
      event.preventDefault();
      var localStorageEventsOBJ = JSON.parse(localStorage.getItem("localStorageEventsOBJ"));
      // j=Math.floor(((localStorageEventsOBJ.length)/6))-1;
      // console.log("event repeat sequence",j);
      if (eventCounter<(Math.floor(eventTotal/6-1)*6)){eventCounter = eventCounter+6;} else{eventCounter=0;}
      // console.log(localStorageEventsOBJ,eventCounter)
      dataToEvents(localStorageEventsOBJ,eventCounter);
   }) //===== end of event listeners for EVENTS
   
   
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
   if ( localStorage.localStorageEvents === undefined )
        {
           var localStorageEvents=tempEventsData }
     else{
        var localStorageEvents = JSON.parse(localStorage.getItem("localStorageEvents"));
          }     
      //    var searchedCities = JSON.parse(localStorage.getItem("searchedCities"));
   //    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
// console.log(localStorageHotel);
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
for (let i = 0; i < 6; i++) {
   let eventCardName = "eventCard" + i;
   document.getElementById(eventCardName+"title").textContent = localStorageEvents[i*4];
   document.getElementById(eventCardName+"info").textContent =localStorageEvents[i*4+1];
   let eventImgEl=document.getElementById(eventCardName+"img");
   let imgUrl=localStorageEvents[i*4+2];
   eventImgEl.setAttribute("src",imgUrl);
   document.getElementById(eventCardName+"link").href = localStorageEvents[i*4+3];

  
}


} // ============end of addingSavedData


function dataToCarousel(params,HCounter) {
   
      var params = JSON.parse(localStorage.getItem("localStorageHotelOBJ"));
      for (let i = 0; i < 4; i++) {
         let hotelCardName = "hotelCard" + i;
         document.getElementById(hotelCardName+"name").textContent = params[i+HCounter].hotel_name;
         localStorageHotel[i*6]=params[i+HCounter].hotel_name;
         document.getElementById(hotelCardName+"details").textContent ="Review score :"+params[i+HCounter].review_score+" Check In at "+params[i+HCounter].checkin+ " "+"Check Out at "+params[i+HCounter].checkout;
         localStorageHotel[i*6+1]=("Review score :"+params[i+HCounter].review_score+" Check In at "+params[i+HCounter].checkin+ " "+"Check Out at "+params[i+HCounter].checkout)
         document.getElementById(hotelCardName+"address").textContent = params[i+HCounter].address;
         localStorageHotel[i*6+2]=params[i+HCounter].address;
         document.getElementById(hotelCardName+"price").textContent = ("price per night "+params[i+HCounter].currency+" "+ Math.floor(params[i+HCounter].price_per_night*100)/100+" /Full amount "+params[i+HCounter].currency+" "+Math.floor(params[i+HCounter].total_amount*100)/100 );
         localStorageHotel[i*6+3]=("price per night "+params[i+HCounter].currency+" "+ Math.floor(params[i+HCounter].price_per_night*100)/100+" /Full amount "+params[i+HCounter].currency+" "+Math.floor(params[i+HCounter].total_amount*100)/100 );
         let imgEl=document.getElementById(hotelCardName+"img")
         let imgUrl=params[i+HCounter].photo
         imgEl.setAttribute("src",imgUrl);
         localStorageHotel[i*6+4]=params[i+HCounter].photo;
         document.getElementById(hotelCardName+"link").href = params[i+HCounter].url;
         localStorageHotel[i*6+5]=params[i+HCounter].url;
         
      }
      localStorage.setItem("localStorageHotel", JSON.stringify(localStorageHotel))
}//==============end of the dataToCarousel

function dataToEvents(parObj,ECounter) {
   var parObj = JSON.parse(localStorage.getItem("localStorageEventsOBJ"));
      // console.log("data from Event obj-in function", parObj)
      for (let i = 0; i < 6; i++) {
         let eventCardName = "eventCard" + i;
         // console.log(eventCardName);
         localStorageEvents[i*4]=parObj[i+ECounter].event_name;
         document.getElementById(eventCardName+"title").textContent = localStorageEvents[i*4];
         localStorageEvents[i*4+1]=("Event date: "+parObj[i+ECounter].start_date+" Starts at "+parObj[i+ECounter].start_time);
         document.getElementById(eventCardName+"info").textContent =localStorageEvents[i*4+1];
         let eventImgEl=document.getElementById(eventCardName+"img");
         localStorageEvents[i*4+2]=parObj[i+ECounter].photo;
         let imgUrl=localStorageEvents[i*4+2];
         eventImgEl.setAttribute("src",imgUrl);
         localStorageEvents[i*4+3]=parObj[i+ECounter].url;
         document.getElementById(eventCardName+"link").href = localStorageEvents[i*4+3];
        
      }

      localStorage.setItem("localStorageEvents", JSON.stringify(localStorageEvents))
} //==============end of the dataToEvents


function citySearch(cityName, startDate, endDate) {
   // console.log(cityName);
   const options = {
      method: 'GET',
      headers: {
         'X-RapidAPI-Key': 'c5a091254fmsh50d7ed70ccb9fc2p12b177jsncf36da05ba92',
         'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      }
   };
   queryURL = "https://booking-com.p.rapidapi.com/v1/hotels/locations?size=10&locale=en-gb&name=" + cityName;
   // console.log(queryURL);
   fetch(queryURL, options)
      .then(response => response.json())
      .then(data => {
         let responseData = data;
         // console.log("cityData, for id: ", responseData);
         
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
         'X-RapidAPI-Key': 'c5a091254fmsh50d7ed70ccb9fc2p12b177jsncf36da05ba92',
         'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      }
   };
   let queryURLBooking = "https://booking-com.p.rapidapi.com/v1/hotels/search?dest_id=" + dest + "&order_by=popularity&filter_by_currency=GBP&adults_number=" + adultsNumber + "&room_number=" + roomNumber + "&checkout_date=" + endDate + "&units=metric&checkin_date=" + startDate + "&dest_type=city&locale=en-gb&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0&include_adjacency=true"

   fetch(queryURLBooking, options)
      .then(response => response.json())
      .then(data => {
         let responseData = data;
         // hotelData = [];
         // console.log(responseData);

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
         // localStorage.setItem('widgets', JSON.stringify(widgets));
         localStorage.setItem("localStorageHotelOBJ", JSON.stringify(hotelDataOBJ))
         // fetch on ticketmaster
         events(eventCityName, startDate, endDate);
         
      }).catch(err => console.log(err))
      
      
      // promiseCheck();
   }// ---------------end of the city function
   
   function events(city, start, end) {
      
      // console.log(city, start, end);
      start=start+"T00:00:00Z";
      end=end+"T00:00:00Z";
      // num.toString()&startDateTime=2023-02-10
      queryURLEvents = "https://app.ticketmaster.com/discovery/v2/events.json?city="+city+"&startDateTime="+start+"&endDateTime="+end+"&size=200&apikey=hQFb4tXqGqiHrogU7XknBuIpl0lYAK4h";
      // queryURLEvents = "https://app.ticketmaster.com/discovery/v2/events.json?city=sheffield&size=200&apikey=hQFb4tXqGqiHrogU7XknBuIpl0lYAK4h";
      fetch(queryURLEvents)
      .then(response => response.json())
      .then(data => {
         let eventsData = data;
         eventTotal=eventsData._embedded.events.length;
         // console.log(cityName,startDate,endDate)
         for (let i = 0; i < eventTotal; i++) {
            
            EventsDataOBJ[i] =
            {
               event_name: eventsData._embedded.events[i].name, start_date: eventsData._embedded.events[i].dates.start.localDate,
               start_time: eventsData._embedded.events[i].dates.start.localTime, photo: eventsData._embedded.events[i].images[1].url,
               url: eventsData._embedded.events[i].url
            };
                     
         }
         
         console.log("hotel Data before render", hotelDataOBJ);
         console.log("events Data before render", EventsDataOBJ);
         localStorage.setItem("localStorageEventsOBJ", JSON.stringify(EventsDataOBJ))
         
         dataToCarousel(hotelDataOBJ,0);
         dataToEvents(EventsDataOBJ,0);
         
      }); 
      
   }