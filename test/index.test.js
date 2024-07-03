const { Room, Booking } = require("./index");

const roomTemplate = {
  name: "luxury double bed",
  rate: 10000,
  discount: 0,
  bookings: [],
};
const bookingTemplate = {
  name: "John Doe",
  email: "john@example.com",
  checkIn: new Date("2024-01-03"),
  checkOut: new Date("2024-01-04"),
  discount: 0,
  room: {},
};
describe("Clase Room", () => {
  describe("Método isOccupied", () => {
    test("If there are no reservations it returns false", () => {
      const room = new Room({ ...roomTemplate });
      const booking1 = new Booking({
        ...bookingTemplate,
        checkIn: new Date("2024-01-10"),
        checkOut: new Date("2024-01-17"),
      });
      const booking2 = new Booking({
        ...bookingTemplate,
        checkIn: new Date("2024-04-04"),
        checkOut: new Date("2024-04-07"),
      });
      room.bookings = [booking1, booking2];
      expect(room.isOccupied(new Date("2024-05-10"))).toBe(false);
    });

    test("If reserved it returns true", () => {
      const room = new Room({ ...roomTemplate });
      const booking1 = new Booking({
        ...bookingTemplate,
        checkIn: new Date("2024-01-10"),
        checkOut: new Date("2024-01-17"),
      });
      const booking2 = new Booking({
        ...bookingTemplate,
        checkIn: new Date("2024-04-04"),
        checkOut: new Date("2024-04-07"),
      });
      room.bookings = [booking1, booking2];
      expect(room.isOccupied(new Date("2024-01-12"))).toBe(true);
    });
  });

  describe("Metod occupancy percentage", () => {
    test("occupancy percentage with multiple reservations", () => {
      const room = new Room({ ...roomTemplate });
      const booking1 = new Booking({
        ...bookingTemplate,
        checkIn: new Date("2024-01-10"),
        checkOut: new Date("2024-01-17"),
      });
      const booking2 = new Booking({
        ...bookingTemplate,
        checkIn: new Date("2024-04-04"),
        checkOut: new Date("2024-04-07"),
      });
      room.bookings = [booking1, booking2];

      expect(
        room.occupancyPercentage(new Date("2024-01-10"), new Date("2024-01-13"))
      ).toBe(100);
    });

    test("occupancy percentage when there are no reservations", () => {
      const room = new Room({ ...roomTemplate });
      const booking1 = new Booking({
        ...bookingTemplate,
        checkIn: new Date("2024-01-10"),
        checkOut: new Date("2024-01-17"),
      });
      const booking2 = new Booking({
        ...bookingTemplate,
        checkIn: new Date("2024-02-10"),
        checkOut: new Date("2024-02-17"),
      });
      room.bookings = [booking1, booking2];
      expect(
        room.occupancyPercentage(new Date("2024-01-01"), new Date("2024-05-01"))
      ).toBe(12);
    });
  });
  describe("Metod occupancy total percentage", () => {
    test("Total occupancy percentage in all rooms", () => {
      const room = new Room({ ...roomTemplate });
      const booking1 = new Booking({
        ...bookingTemplate,
        checkIn: new Date("2024-01-10"),
        checkOut: new Date("2024-01-17"),
      });
      const booking2 = new Booking({
        ...bookingTemplate,
        checkIn: new Date("2024-02-10"),
        checkOut: new Date("2024-02-17"),
      });
      room.bookings = [booking1, booking2];
      const room1 = new Room({
        ...roomTemplate,
        bookings: [booking1, booking2],
      });
      const room2 = new Room({
        ...roomTemplate,
        bookings: [booking1, booking2],
      });

      const listRooms = [room1, room2];

      expect(
        Room.totalOccupancyPercentage(
          listRooms,
          new Date("2024-01-01"),
          new Date("2024-05-01")
        )
      ).toBe(12);
    });
  });
  describe("Metod available rooms", () => {
    test("rooms that are not occupied", () => {
      const booking1 = new Booking({
        ...bookingTemplate,
        checkIn: new Date("2024-01-10"),
        checkOut: new Date("2024-01-13"),
      });
      const booking2 = new Booking({
        ...bookingTemplate,
        checkIn: new Date("2024-02-15"),
        checkOut: new Date("2024-02-17"),
      });

      const room1 = new Room({
        ...roomTemplate,
        name: "luxury single bed",
        bookings: [booking1],
      });
      const room2 = new Room({
        ...roomTemplate,
        bookings: [booking2],
      });

      const listRooms = [room1, room2];

      expect(
        Room.availableRooms(
          listRooms,
          new Date("2024-02-01"),
          new Date("2024-02-25")
        )
      ).toEqual([room1]);
    });
  });
});
describe("Clase Booking", () => {
  describe("Método getFee", () => {
    test("price without discounts", () => {
      const booking = new Booking({
        ...bookingTemplate,
        checkIn: new Date("2024-01-10"),
        checkOut: new Date("2024-01-13"),
      });

      const room1 = new Room({
        ...roomTemplate,
        bookings: [booking],
      });
      booking.room = room1;
      expect(booking.getFee()).toEqual(30000);
    });
    test("discounted price in room", () => {
      const booking = new Booking({
        ...bookingTemplate,
        checkIn: new Date("2024-01-10"),
        checkOut: new Date("2024-01-13"),
      });

      const room1 = new Room({
        ...roomTemplate,
        bookings: [booking],
        discount: 30,
      });
      booking.room = room1;
      expect(booking.getFee()).toEqual(21000);
    });
    test("discounted price in booking", () => {
      const booking = new Booking({
        ...bookingTemplate,
        discount: 10,
        checkIn: new Date("2024-01-10"),
        checkOut: new Date("2024-01-13"),
      });

      const room1 = new Room({
        ...roomTemplate,
        bookings: [booking],
      });
      booking.room = room1;
      expect(booking.getFee()).toEqual(27000);
    });
    test("discounted price in booking and room", () => {
      const booking = new Booking({
        ...bookingTemplate,
        discount: 10,
        checkIn: new Date("2024-01-10"),
        checkOut: new Date("2024-01-13"),
      });

      const room1 = new Room({
        ...roomTemplate,
        discount: 10,
        bookings: [booking],
      });
      booking.room = room1;
      expect(booking.getFee()).toEqual(24300);
    });
  });
});
