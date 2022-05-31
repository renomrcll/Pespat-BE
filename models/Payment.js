class Payment {
    constructor(id, reservation_id, payment_method, payment_status, payment_amount) {
        this.id = id;
        this.user_id = user_id;
        this.reservation_id = reservation_id;
        this.payment_method = payment_method;
        this.payment_status = payment_status;
        this.payment_amount = payment_amount;
    }
}

module.exports = Payment;