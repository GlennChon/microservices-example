const validateLatLng = (lat, lng) => {
  let message;
  if (lat < -90 || lat > 90) {
    message = "Latitude must be between -90 and 90 degrees inclusive.";
  } else if (lng < -180 || lng > 180) {
    message = "Longitude must be between -180 and 180 degrees inclusive.";
  } else if (lat == "" || lng == "") {
    message = "Enter a valid Latitude or Longitude!";
  }
  return message;
};

const distance = {
  find: function (req, res) {
    let coord1ErrorMessage = validateLatLng(lat1, lng1);
    let coord2ErrorMessage = validateLatLng(lat2, lng2);
    if (coord1ErrorMessage || coord2ErrorMessage) {
      let message;
      if (coord1ErrorMessage) {
        message += ` +Coord1Error: ${coord1ErrorMessage}`;
      }
      if (coord2ErrorMessage) {
        message += ` +Coord2Error: ${coord2ErrorMessage}`;
      }
      let error = new Error(message);
      res.send(error);
    }
    const lat1 = req.params.lat1;
    const lng1 = req.params.lng1;
    const lat2 = req.params.lat2;
    const lng2 = req.params.lng2;

    const RKm = 6371; // Earth radius in km
    const RMi = 3950; // Earth radius in mi

    const x1 = lat1 - lat2;
    const x2 = lng1 - lng2;
    const dLat = x1.toRadians();
    const dLng = x2.toRadians();
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat.toRadians()) *
        Math.cos(lat1.toRadians()) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceKm = RKm * c;
    const distanceMi = RMi * c;

    res.send({ distanceKm: distanceKm, distanceMi: distanceMi });
  },
};

module.exports = distance;
