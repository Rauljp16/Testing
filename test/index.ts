interface BookingObject {
    name: string;
    email: string;
    checkIn: Date;
    checkOut: Date;
    discount: number;
    room: Room;
}

interface RoomObject {
    name: string;
    rate: number;
    discount: number;
    bookings?: Booking[];
}

class Room {
    name: string;
    rate: number;
    discount: number;
    bookings: Booking[];

    constructor(object: RoomObject) {
        this.name = object.name;
        this.rate = object.rate;
        this.discount = object.discount;
        this.bookings = object.bookings || [];
    }

    isOccupied(date: Date): boolean {
        return this.bookings.some(
            (booking: Booking) => date >= booking.checkIn && date < booking.checkOut
        );
    }

    occupancyPercentage(startDate: Date, endDate: Date): number {
        let occupancyDays = 0;
        let totalDays = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000);

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

    static totalOccupancyPercentage(rooms: Room[], startDate: Date, endDate: Date): number {
        let totalPercentage = 0;
        rooms.forEach((element) => {
            totalPercentage += element.occupancyPercentage(startDate, endDate);
        });
        return totalPercentage / rooms.length;
    }

    static availableRooms(rooms: Room[], startDate: Date, endDate: Date): Room[] {
        return rooms.filter(room => room.occupancyPercentage(startDate, endDate) === 0);
    }
}

class Booking {
    name: string;
    email: string;
    checkIn: Date;
    checkOut: Date;
    discount: number;
    room: Room;

    constructor(object: BookingObject) {
        this.name = object.name;
        this.email = object.email;
        this.checkIn = object.checkIn;
        this.checkOut = object.checkOut;
        this.discount = object.discount;
        this.room = object.room;
    }

    getFee(): number {
        let totalDays = (this.checkOut.getTime() - this.checkIn.getTime()) / (24 * 60 * 60 * 1000);
        let totalRate = this.room.rate * totalDays;
        totalRate = totalRate - (totalRate * this.discount) / 100;
        totalRate = totalRate - (totalRate * this.room.discount) / 100;
        console.log(totalRate);
        return totalRate;
    }
}

export { Room, Booking };
