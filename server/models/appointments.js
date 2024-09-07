// models/SecondCollection.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AppointmentsSchema = new Schema({
    patientName: {
        type: String,
        required: true
    },
    patientAge: {
        type: Number,
        required: true
    },
    patientEmail: {
        type: String,
        required: true
    },
    patientPhoneNumber: {
        type: String,
        required: true
    },
    patientAppointmentDate: {
        type: Date,
        required: true
    },
    patientSpecialist: {
        type: String,
        required: true
    },
    patientAdditionalInformation: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Appointments', AppointmentsSchema);
