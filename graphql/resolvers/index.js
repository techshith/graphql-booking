const DataLoader = require('dataloader');
const User = require('../../models/user');
const Event = require('../../models/event');
const Booking = require('../../models/booking');
// Batch function for user loading
const userLoader = new DataLoader(async userIds => {
    const users = await User.find({ _id: { $in: userIds } });
  
    return userIds.map(id =>
      users.find(user => user._id.toString() === id.toString())
    );
});
  

// Batch function for event loading
const eventLoader = new DataLoader(async eventIds => {
    const events = await Event.find({ _id: { $in: eventIds } });
  
    return eventIds.map(id =>
      events.find(event => event._id.toString() === id.toString())
    );
});  
module.exports = {
    events: () => {
      return [];
    },

bookings: async (args, req) => {
  if (!req.isAuth) {
    throw new Error('Unauthenticated!');
  }

  try {
    const bookings = await Booking.find({ user: req.userId }).populate('event');
    return bookings.map(booking => {
      return {
        ...booking._doc,
        _id: booking.id,
        event: {
          ...booking._doc.event._doc,
          _id: booking._doc.event.id
        },
        user: booking._doc.user,
        createdAt: booking._doc.createdAt.toISOString(),
        updatedAt: booking._doc.updatedAt.toISOString()
      };
    });
  } catch (err) {
    throw err;
  }
}

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
  