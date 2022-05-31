class Reservation {
    constructor(id, place_id, user_id, reservation_time) {
        this.id = id;
        this.place_id = place_id;
        this.user_id = user_id;
        this.reservation_time = reservation_time;
    }
}

module.exports = Reservation;