class Room {
  constructor(object) {
    this.name = object.name;
    this.rate = object.rate;
    this.discount = object.discount;
    this.bookings = object.bookings || [];
  }

  isOccupied(date) {
    return this.bookings.some(
      (booking) => date >= booking.checkIn && date < booking.checkOut
    );
  }

  occupancyPercentage(startDate, endDate) {
    const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24); // Convertir a días
    let occupiedDays = 0;

    this.bookings.forEach((booking) => {
      const bookingStart =
        booking.checkIn < startDate ? startDate : booking.checkIn;
      const bookingEnd =
        booking.checkOut > endDate ? endDate : booking.checkOut;

      if (bookingStart < endDate && bookingEnd > startDate) {
        occupiedDays += (bookingEnd - bookingStart) / (1000 * 60 * 60 * 24); // Convertir a días
      }
    });

    if (totalDays === 0) return 0;
    return (occupiedDays / totalDays) * 100;
  }

  static totalOccupancyPercentage(rooms, startDate, endDate) {
    const totalPercentages = rooms.reduce(
      (acc, room) => acc + room.occupancyPercentage(startDate, endDate),
      0
    );
    return totalPercentages / rooms.length;
  }

  static availableRooms(rooms, startDate, endDate) {
    return rooms.filter(
      (room) => !room.isOccupied(startDate) && !room.isOccupied(endDate)
    );
  }
}

class Booking {
  constructor(object) {
    this.name = object.name;
    this.email = object.email;
    this.checkIn = object.checkIn;
    this.checkOut = object.checkOut;
    this.discount = object.discount;
    this.room = object.room;
  }

  get fee() {}
}

module.exports = { Room, Booking };
