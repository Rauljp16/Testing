const { Room } = require("./index");

const roomTemplate = { name: "luxury double bed", rate: 10000, discount: 0 };

test("Room with empty bookings returns false isOcupied", () => {
  const room = new Room({ ...roomTemplate });
  room.booking = [];
  expect(room.isOccupied("2024-01-03")).toBe(false);
});
