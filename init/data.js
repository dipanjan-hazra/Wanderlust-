const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    price: 1500,
    location: "Malibu",
    country: "United States"
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    price: 1200,
    location: "New York City",
    country: "United States"
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
    },
    price: 1000,
    location: "Aspen",
    country: "United States"
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
    },
    price: 2500,
    location: "Florence",
    country: "Italy"
  },

   {
    title: "Urban Studio Apartment",
    description: "A compact, modern studio with all the essentials. Walk to shops and restaurants.",
    image: {
      url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 900,
    location: "Berlin",
    country: "Germany",
    reviews: []
  },
  {
    title: "Riverside Cabin",
    description: "Relax by the river in this cozy wooden cabin. Great for fishing and canoeing.",
    image: {
      url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 750,
    location: "Vancouver",
    country: "Canada",
    reviews: []
  },
  {
    title: "Desert Oasis Retreat",
    description: "Enjoy peaceful sunsets and starry nights in this beautiful desert house.",
    image: {
      url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1100,
    location: "Joshua Tree",
    country: "United States",
    reviews: []
  },
  {
    title: "Luxurious Ski Chalet",
    description: "Hit the slopes and unwind in a deluxe ski chalet with stunning mountain views.",
    image: {
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 3500,
    location: "Chamonix",
    country: "France",
    reviews: []
  },
  {
    title: "Peaceful Countryside Farmhouse",
    description: "Reconnect with nature in this spacious farmhouse, perfect for families.",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1300,
    location: "Cotswolds",
    country: "United Kingdom",
    reviews: []
  },
  {
    title: "Lakeview Modern Home",
    description: "Wake up to breathtaking lake views in this stunning contemporary house.",
    image: {
      url: "https://images.unsplash.com/photo-1465101178521-c1a9136a3d41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 2200,
    location: "Queenstown",
    country: "New Zealand",
    reviews: []
  },
  {
    title: "Charming Canal House",
    description: "Bright, stylish home set on a famous city canal. Walk to museums and cafes.",
    image: {
      url: "https://images.unsplash.com/photo-1426122402199-be02db90eb90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1600,
    location: "Amsterdam",
    country: "Netherlands",
    reviews: []
  },
  {
    title: "Tropical Bungalow",
    description: "Relax in paradise at this cozy bungalow with a private pool and garden.",
    image: {
      url: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1400,
    location: "Bali",
    country: "Indonesia",
    reviews: []
  },
  {
    title: "Seaside Family Villa",
    description: "Spacious villa with pool, terrace, and sea views. Fun for everyone.",
    image: {
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 2000,
    location: "Santorini",
    country: "Greece",
    reviews: []
  },
  {
    title: "Rustic Forest Cabin",
    description: "A cozy log cabin surrounded by pine trees. Perfect for couples and adventurers.",
    image: {
      url: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 700,
    location: "Lake Tahoe",
    country: "United States",
    reviews: []
  },
  {
    title: "Elegant Penthouse Suite",
    description: "Live like royalty in this high-rise penthouse suite with panoramic city views.",
    image: {
      url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    reviews: []
  },
  {
    title: "Vintage City Apartment",
    description: "Classic city apartment, recently renovated but full of vintage charm.",
    image: {
      url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1100,
    location: "Prague",
    country: "Czech Republic",
    reviews: []
  },
  {
    title: "Sunny Garden Guesthouse",
    description: "Charming guesthouse surrounded by colorful gardens and fruit trees.",
    image: {
      url: "https://images.unsplash.com/photo-1468421870903-4df1664ac249?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 950,
    location: "Cape Town",
    country: "South Africa",
    reviews: []
  },
  {
    title: "Minimalist Designer Flat",
    description: "Sleek and modern apartment with minimalist décor. Close to public transit.",
    image: {
      url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1050,
    location: "Tokyo",
    country: "Japan",
    reviews: []
  },
  {
    title: "Island Paradise Hut",
    description: "Private hut on a tropical island with crystal-clear water and white sand.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1250,
    location: "Phuket",
    country: "Thailand",
    reviews: []
  },
  {
    title: "Boutique City Loft",
    description: "Stylish boutique loft with exposed brick and open floor plan. Walk to nightlife.",
    image: {
      url: "https://images.unsplash.com/photo-1424746219973-8fe3bd07d8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1300,
    location: "Barcelona",
    country: "Spain",
    reviews: []
  }
];


module.exports.data = sampleListings;
