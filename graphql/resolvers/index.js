module.exports = {
    events: () => {
      return [];
    },
    bookings: () => {
      return [];
    },
    createEvent: args => {
      return {
        ...args.eventInput,
        _id: Math.random().toString(),
        date: new Date().toISOString()
      };
    },
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
  