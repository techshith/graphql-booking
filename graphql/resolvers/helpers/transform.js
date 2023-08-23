const transformEvent = event => {
  if (!event || !event._doc) return event;
  return {
    ...event._doc,
    _id: event.id,
    date: new Date(event._doc.date).toISOString()
  };
};