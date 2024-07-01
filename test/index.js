// src/index.js

class Room {
  constructor(name, rate, discount) {
    this.name = name;
    this.rate = rate;
    this.discount = discount;
    this.bookings = bookings;
  }
  isOccupied(date) {
    // Este método debe verificar si la habitación está ocupada en una fecha específica
    // Debería devolver true si está ocupada, false si no lo está

    return this.bookings.some(
      (booking) => date >= booking.checkIn && date <= booking.checkOut
    );
  }

  occupancyPercentage(startDate, endDate) {
    // Este método debería calcular el porcentaje de ocupación de la habitación
    // entre dos fechas dadas (startDate y endDate)
  }

  static totalOccupancyPercentage(rooms, startDate, endDate) {
    // Este método estático debería calcular el porcentaje total de ocupación
    // de todas las habitaciones en un array dado de habitaciones
    // dentro del rango de fechas especificado (startDate y endDate)
  }

  static availableRooms(rooms, startDate, endDate) {
    // Este método estático debería devolver un array de habitaciones disponibles
    // (no ocupadas) durante todo el período especificado (startDate a endDate)
  }
}

class Booking {
  constructor(name, email, checkIn, checkOut, discount, room) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  get fee() {
    // Este método getter debería calcular la tarifa total de la reserva
    // teniendo en cuenta los descuentos aplicados tanto en la habitación como en la reserva
  }
}

module.exports = { Room, Booking };
