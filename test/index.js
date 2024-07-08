// class Room {
//   constructor(object) {
//     this.name = object.name;
//     this.rate = object.rate;
//     this.discount = object.discount;
//     this.bookings = object.bookings || [];
//   }

//   isOccupied(date) {
//     return this.bookings.some(
//       (booking) => date >= booking.checkIn && date < booking.checkOut
//     );
//   }

//   occupancyPercentage(startDate, endDate) {
//     let occupancyDays = 0;
//     let totalDays = endDate - startDate;
//     totalDays = totalDays / (24 * 60 * 60 * 1000);
//     for (
//       let date = new Date(startDate.getTime());
//       date < endDate;
//       date.setDate(date.getDate() + 1)
//     ) {
//       if (this.isOccupied(date)) {
//         occupancyDays++;
//       }
//     }
//     let percentage = (occupancyDays / totalDays) * 100;
//     percentage = Math.round(percentage);
//     return percentage;
//   }

//   static totalOccupancyPercentage(rooms, startDate, endDate) {
//     let totalPercentage = 0;
//     rooms.forEach((element) => {
//       totalPercentage += element.occupancyPercentage(startDate, endDate);
//     });
//     totalPercentage = totalPercentage / rooms.length;
//     return totalPercentage;
//   }

//   static availableRooms(rooms, startDate, endDate) {
//     const availableRooms = [];
//     for (let index = 0; index < rooms.length; index++) {
//       if (rooms[index].occupancyPercentage(startDate, endDate) === 0)
//         availableRooms.push(rooms[index]);
//     }

//     return availableRooms;
//   }
// }

// class Booking {
//   constructor(object) {
//     this.name = object.name;
//     this.email = object.email;
//     this.checkIn = object.checkIn;
//     this.checkOut = object.checkOut;
//     this.discount = object.discount;
//     this.room = object.room;
//   }

//   getFee() {
//     let totalDays = this.checkOut - this.checkIn;
//     totalDays = totalDays / (24 * 60 * 60 * 1000);
//     let totalRate = this.room.rate * totalDays;
//     totalRate = totalRate - (totalRate * this.discount) / 100;
//     totalRate = totalRate - (totalRate * this.room.discount) / 100;
//     console.log(totalRate);
//     return totalRate;
//   }
// }

// module.exports = { Room, Booking };
