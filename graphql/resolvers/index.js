const Event = require('../../models/event');
module.exports = {
    events: () => {
      return [];
    },
    bookings: () => {
      return [];
    },
    createEvent: async (args, req) => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
          creator: null  // We'll update this in a future commit when we have users
        });
      
        try {
          const result = await event.save();
          return {
            ...result._doc,
            _id: result.id
          };
        } catch (err) {
          throw err;
        }
    }      
    createUser: args => {
      return {
        _id: Math.random().toString(),
        email: args.userInput.email
      };
    },
    login: (args) => {
      return {
        userId: "demo",
        token: "demo-token",
        tokenExpiration: 1
      };
    },
    bookEvent: (args) => {
      return {
        _id: Math.random().toString(),
        event: args.eventId,
        user: "user1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    },
    cancelBooking: (args) => {
      return {
        _id: args.bookingId,
        title: "Demo Event",
        description: "This is a fake event for cancel",
        price: 10,
        date: new Date().toISOString(),
        creator: {
          _id: "user1",
          email: "test@example.com"
        }
      };
    }
  };
  