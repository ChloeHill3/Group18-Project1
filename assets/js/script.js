// var today=(moment().format("D/M/YYYY"));
let destId;
let cityName;
let countryName;
let countries=[];
let destinationId=[];
let hotelData=[];

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

});  //------------end of the main parts 

function city(cityName){
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
         queryURLBooking="https://booking-com.p.rapidapi.com/v1/hotels/search?dest_id="+destId+"&order_by=popularity&filter_by_currency=GBP&adults_number=2&room_number=1&checkout_date=2023-08-27&units=metric&checkin_date=2023-08-15&dest_type=city&locale=en-gb&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0&include_adjacency=true"
         // console.log(queryURLBooking);
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
            hotelData[i*10+9]=+responseData.result[i].url;
         } 
            console.log(hotelData);
         })
      
      
}  // ---------------end of the city function
            
            function events(){
               
      fetch("https://app.ticketmaster.com/discovery/v2/events.json?countryCode=GB&size=200&city=Leeds&apikey=xOBqfo7UG9ZGWRTl5OAaO9z1Ysd5Bnr1")
      .then(response => console.log(response.json()))
      
   } //-----------------end of the event
   