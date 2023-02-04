var today=(moment().format("YYYY-MM-DD"));
let destId;
let cityName;
let countryName;
let countries=[];
let destinationId=[];
let hotelData=[];
let hotelDataOBJ={};
let EventsDataOBJ={};
document.querySelector("#search-button").addEventListener("click", function(event) {
   // Preventing the submit button from trying to submit the form
   event.preventDefault();

   //--------checking dates if acceptable
   var startDate=document.getElementById("start-date").value;
   var endDate=document.getElementById("end-date").value;
   let errorText="";
   if (startDate<today || endDate<today || endDate<startDate)
      { errorText="wrong dates are entered"; } 
   console.log(errorText,today,startDate,endDate);
   errorText="";
var cityName = document.querySelector("#search-input").value;
  if (cityName !== "")
  {
    city(cityName,startDate,endDate);
      countryName=countries[0];
      destId=destinationId[0];
   // booking(destId);
  };
  events(cityName,startDate,endDate);

});  //------------end of the main parts 

function city(cityName,checkin,checkout){
   console.log(cityName);
   const options = {
      method: 'GET',
      headers: {
         'X-RapidAPI-Key': 'fdcf0512e2msh147face6456e1edp1b8e58jsne05ff77baea4',
         'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      }
   };
   queryURL="https://booking-com.p.rapidapi.com/v1/hotels/locations?size=10&locale=en-gb&name="+cityName;
   // console.log(queryURL);
   fetch(queryURL, options)
   .then(response => response.json())
   .then(data =>{
      let responseData=data;
      console.log(responseData);
      for (let i = 0; i < 5; i++) {
            countries[i]=responseData[i].country;
            destinationId[i]=responseData[i].dest_id;
         }  
         // console.log("country "+countries,"destination Id"+destinationId);
         // --------call for the 2-nd request
         destId=destinationId[1];
         queryURLBooking="https://booking-com.p.rapidapi.com/v1/hotels/search?dest_id="+destId+"&order_by=popularity&filter_by_currency=GBP&adults_number=2&room_number=1&checkout_date="+checkout+"&units=metric&checkin_date="+checkin+"&dest_type=city&locale=en-gb&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0&include_adjacency=true"
         console.log(queryURLBooking);
         const options1 = {
            method: 'GET',
            headers: {
               'X-RapidAPI-Key': 'fdcf0512e2msh147face6456e1edp1b8e58jsne05ff77baea4',
               'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
         };
           
      return(fetch(queryURLBooking,options1));
      })
      .then(response => response.json())
      .then(data =>{
         let responseData=data;
         hotelData=[];
         console.log(responseData);

         for (let i = 0; i< responseData.result.length; i++) {
            
            hotelData[i*10+0]=responseData.result[i].hotel_name;
            hotelData[i*10+1]=responseData.result[i].address+","+responseData.result[i].zip;
            hotelData[i*10+2]=responseData.result[i].checkin.from;
            hotelData[i*10+3]=responseData.result[i].checkout.until;
            hotelData[i*10+4]=responseData.result[i].composite_price_breakdown.gross_amount_per_night.value;
            hotelData[i*10+5]=responseData.result[i].composite_price_breakdown.gross_amount_per_night.currency;
            hotelData[i*10+6]=responseData.result[i].composite_price_breakdown.net_amount.value;
            hotelData[i*10+7]="rev. score"+responseData.result[i].review_score;
            hotelData[i*10+8]=responseData.result[i].max_photo_url;
            hotelData[i*10+9]=responseData.result[i].url;
// ======= data in object form
            hotelDataOBJ[i]=
            {hotel_name:responseData.result[i].hotel_name,address:(responseData.result[i].address+","+responseData.result[i].zip),
            checkin:responseData.result[i].checkin.from,checkout:responseData.result[i].checkout.until,
            price_per_night:responseData.result[i].composite_price_breakdown.gross_amount_per_night.value,
            currency:responseData.result[i].composite_price_breakdown.gross_amount_per_night.currency,
            total_amount:responseData.result[i].composite_price_breakdown.net_amount.value, review_score:responseData.result[i].review_score,
            photo:responseData.result[i].max_photo_url, url:responseData.result[i].url
            };

// ======= end data in object form



         } 
            console.log(hotelData);
            console.log(hotelDataOBJ);
         })
      
      
}  // ---------------end of the city function
            
   function events(cityName,startDate,endDate){
      queryURLEvents="https://app.ticketmaster.com/discovery/v2/events.json?city=sheffield&size=200&apikey=hQFb4tXqGqiHrogU7XknBuIpl0lYAK4h"  
      fetch(queryURLEvents)
   .then(response => response.json())
   .then(data =>{
         let eventsData=data;
         console.log(cityName,startDate,endDate)
         for (let i = 0; i < eventsData._embedded.events.length; i++) {

            EventsDataOBJ[i]=
            {event_name:eventsData._embedded.events[i].name,start_date:eventsData._embedded.events[i].dates.start.localDate,
            start_time:eventsData._embedded.events[i].dates.start.localTime,photo:eventsData._embedded.events[i].images[1].url,
            url:eventsData._embedded.events[i].url
            };
         }
         console.log(EventsDataOBJ);
         
      }); //-----------------end of the event
      // .catch(err => console.error(err))
   };