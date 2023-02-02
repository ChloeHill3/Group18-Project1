const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '30127d541bmsh49dbbd8b4e4b4e2p1f3e25jsncfd15d310205',
		'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
	}
};

fetch('https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=bristol', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));


   const options2 = {
      method: 'GET',
      headers: {
         'X-RapidAPI-Key': '30127d541bmsh49dbbd8b4e4b4e2p1f3e25jsncfd15d310205',
         'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      }
   };
   
   fetch('https://booking-com.p.rapidapi.com/v1/hotels/search?dest_id=-2590919&order_by=popularity&filter_by_currency=GBP&adults_number=2&room_number=1&checkout_date=2023-08-27&units=metric&checkin_date=2023-08-15&dest_type=city&locale=en-gb&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0&include_adjacency=true', options2)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
