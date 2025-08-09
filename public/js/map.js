mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
  container: 'map',
  center: listing_data.geometry.coordinates,
  zoom: 9
});



const marker1 = new mapboxgl.Marker({color:"purple"})
        .setLngLat(listing_data.geometry.coordinates)    //listing geometery map
        .setPopup ( new mapboxgl.Popup({offset:25}).setHTML(`<h4>${listing_data.location}</h4><p>Exact location will be  provided after booking</p>`))
        .addTo(map);



