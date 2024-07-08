"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = exports.Room = void 0;
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
    let occupancyDays = 0;
    let totalDays =
      (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000);
    for (
      let date = new Date(startDate.getTime());
      date < endDate;
      date.setDate(date.getDate() + 1)
    ) {
      if (this.isOccupied(date)) {
        occupancyDays++;
      }
    }
    let percentage = (occupancyDays / totalDays) * 100;
    return Math.round(percentage);
  }
  static totalOccupancyPercentage(rooms, startDate, endDate) {
    let totalPercentage = 0;
    rooms.forEach((element) => {
      totalPercentage += element.occupancyPercentage(startDate, endDate);
    });
    return totalPercentage / rooms.length;
  }
  static availableRooms(rooms, startDate, endDate) {
    return rooms.filter(
      (room) => room.occupancyPercentage(startDate, endDate) === 0
    );
  }
}
exports.Room = Room;
class Booking {
  constructor(object) {
    this.name = object.name;
    this.email = object.email;
    this.checkIn = object.checkIn;
    this.checkOut = object.checkOut;
    this.discount = object.discount;
    this.room = object.room;
  }
  getFee() {
    let totalDays =
      (this.checkOut.getTime() - this.checkIn.getTime()) /
      (24 * 60 * 60 * 1000);
    let totalRate = this.room.rate * totalDays;
    totalRate = totalRate - (totalRate * this.discount) / 100;
    totalRate = totalRate - (totalRate * this.room.discount) / 100;
    console.log(totalRate);
    return totalRate;
  }
}
exports.Booking = Booking;
