const Booking = require('../../models/booking');

module.exports = {
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }

      await Booking.deleteOne({ _id: args.bookingId });
      return "Booking cancelled successfully";
    } catch (err) {
      throw err;
    }
  }
};
