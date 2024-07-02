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
        room.occupancyPercentage(new Date("2024-01-01"), new Date("2024-05-01"))
      ).toBeCloseTo(8, 121);
    });

    test("occupancy percentage when there are no reservations", () => {
      const room = new Room({ ...roomTemplate });
      const booking1 = new Booking({
        ...bookingTemplate,
      });
      const booking2 = new Booking({
        ...bookingTemplate,
      });
      room.bookings = [booking1, booking2];
      expect(
        room.occupancyPercentage(new Date("2024-01-01"), new Date("2024-05-01"))
      ).toBe(0);
    });
  });
});
