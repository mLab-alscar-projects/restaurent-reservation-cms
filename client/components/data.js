// RESTAURENTS
export const restaurantsData = [
    { 
      name: "Eat'in", 
      tables: 7, 
      color: '#3498db', 
      description: "Modern Cuisine",
      location: "soweto",
      timeslot: "08:00 - 17:00",
      cuisine: "Contemporary",
      image: require('../assets/eatin.jpg'),
      menu: [
        { id: '1', name: 'Grilled Chicken', price: 'R62.99', image: require('../assets/chicken.jpg') },
        { id: '2', name: 'Vegan Salad', price: 'R58.99', image: require('../assets/salad.jpg') },
        { id: '3', name: 'Pasta Carbonara', price: 'R84.49', image: require('../assets/pasta.jpg') },
        { id: '4', name: 'Cheeseburger Small', price: 'R99.99', image: require('../assets/burger.jpg') },
        { id: '5', name: 'Cheeseburger Extra', price: 'R99.99', image: require('../assets/burger.jpg') },
        { id: '6', name: 'Cheeseburger Normal', price: 'R99.99', image: require('../assets/burger.jpg') },
        { id: '7', name: 'Cheeseburger Hot', price: 'R99.99', image: require('../assets/burger.jpg') },
      ],
      ratings: {}
    },

    { 
      name: "Foodies' Delight", 
      tables: 3, 
      color: '#2ecc71', 
      description: "Gourmet Experience",
      cuisine: "International",
      image: require('../assets/foodies.jpg'),
      menu: [
        { id: '1', name: 'Grilled Chicken', price: 'R62.99', image: require('../assets/chicken.jpg') },
        { id: '2', name: 'Vegan Salad', price: 'R58.99', image: require('../assets/salad.jpg') },
        { id: '3', name: 'Pasta Carbonara', price: 'R84.49', image: require('../assets/pasta.jpg') },
        { id: '4', name: 'Cheeseburger Small', price: 'R99.99', image: require('../assets/burger.jpg') },
        { id: '5', name: 'Cheeseburger Extra', price: 'R99.99', image: require('../assets/burger.jpg') },
        { id: '6', name: 'Cheeseburger Normal', price: 'R99.99', image: require('../assets/burger.jpg') },
        { id: '7', name: 'Cheeseburger Hot', price: 'R99.99', image: require('../assets/burger.jpg') },
      ],

    },

    { 
      name: "Munchies", 
      tables: 3, 
      color: '#ffaf58', 
      description: "Casual Dining",
      cuisine: "Fast Casual",
      image: require('../assets/munchies.jpg')
    },
    { 
      name: "Spice Route", 
      tables: 5, 
      color: '#9b59b6', 
      description: "Exotic Flavors",
      cuisine: "Fusion",
      image: require('../assets/spice.jpg')
    }
  ];
  // ENDS

  // RESERVATIONS
  export const reservationsData = [
    {

      // FOODIES
      name: "Foodies' Delight",

      tickets: [
        {
          id: 1,
          date: "Dec 15, 2024",
          time: "7:30 PM",
          guests: 2,
          status: "Confirmed",
          imageUri: require('../assets/burger.jpg')
        },

        {
          id: 2,
          date: "Dec 22, 2024",
          time: "6:45 PM", 
          guests: 4,
          status: "Pending",
          imageUri: require('../assets/burger.jpg')
        },

        {
          id: 3,
          date: "Dec 22, 2024",
          time: "6:45 PM", 
          guests: 4,
          status: "Pending",
          imageUri: require('../assets/burger.jpg')
        },

        {
          id: 4,
          date: "Dec 22, 2024",
          time: "6:45 PM", 
          guests: 4,
          status: "Pending",
          imageUri: require('../assets/burger.jpg')
        },
      ],

      notifications : [
        {
          id: 1,
          message: "Reservation confirmed for 2 people",
          time: "10 mins ago",
          type: "success"
        },
        {
          id: 2,
          message: "Table waitlist update",
          time: "2 hours ago",
          type: "info"
        },
        {
          id: 3,
          message: "Reservation request pending",
          time: "Yesterday",
          type: "pending"
        }
      ]
    },
    // ENDS

    {
      // EAT' IN
      name: "Eat' In",
      tickets: [
        {
          id: 1,
          date: "Dec 15, 2024",
          time: "7:30 PM",
          guests: 2,
          status: "Confirmed",
          imageUri: require('../assets/burger.jpg'),
          notifications: []
        },

        {
          id: 2,
          date: "Dec 22, 2024",
          time: "6:45 PM", 
          guests: 4,
          status: "Pending",
          imageUri: require('../assets/burger.jpg')
        },

        {
          id: 3,
          date: "Dec 22, 2024",
          time: "6:45 PM", 
          guests: 4,
          status: "Pending",
          imageUri: require('../assets/burger.jpg')
        },

        {
          id: 4,
          date: "Dec 22, 2024",
          time: "6:45 PM", 
          guests: 4,
          status: "Pending",
          imageUri: require('../assets/burger.jpg')
        },
      ],

      notifications : [
        {
          id: 1,
          message: "Reservation confirmed for 2 people",
          time: "10 mins ago",
          type: "success"
        },
        {
          id: 2,
          message: "Table waitlist update",
          time: "2 hours ago",
          type: "info"
        },
        {
          id: 3,
          message: "Reservation request pending",
          time: "Yesterday",
          type: "pending"
        }
      ]
    },
    // ENDS


    {
      // MUNCHIES
      name: "Munchies",
      tickets: [
        {
          id: 1,
          date: "Dec 15, 2024",
          time: "7:30 PM",
          guests: 2,
          status: "Confirmed",
          imageUri: require('../assets/burger.jpg')
        },

        {
          id: 2,
          date: "Dec 22, 2024",
          time: "6:45 PM", 
          guests: 4,
          status: "Pending",
          imageUri: require('../assets/burger.jpg')
        },

        {
          id: 3,
          date: "Dec 22, 2024",
          time: "6:45 PM", 
          guests: 4,
          status: "Pending",
          imageUri: require('../assets/burger.jpg')
        },

        {
          id: 4,
          date: "Dec 22, 2024",
          time: "6:45 PM", 
          guests: 4,
          status: "Pending",
          imageUri: require('../assets/burger.jpg')
        },
      ],

      notifications : [
        {
          id: 1,
          message: "Reservation confirmed for 2 people",
          time: "10 mins ago",
          type: "success"
        },
        {
          id: 2,
          message: "Table waitlist update",
          time: "2 hours ago",
          type: "info"
        },
        {
          id: 3,
          message: "Reservation request pending",
          time: "Yesterday",
          type: "pending"
        },
        {
          id: 4,
          message: "Reservation request pending",
          time: "Yesterday",
          type: "pending"
        }
      ]
    },
    // ENDS
]
// ENDS
