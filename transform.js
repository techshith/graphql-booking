const transformEvent = (event) => {
    return {
      ...event._doc,
      _id: event.id,
      date: new Date(event._doc.date).toISOString()
    };
  };
  
    exports.transformEvent = transformEvent;
  