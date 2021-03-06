const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let wifiSchema = new Schema({
    MAC_Address: {type: String},
    First_Seen: {type: String},
    Last_Seen: {type: String},
    Signal_Strength: {type: Number},
    ESSID: {type: String},
    BSSID: {type: String},
    Probed_ESSID: {type: String},
    Is_AP: {type: Boolean},
    Manufacturer: {type: String},
},{timestamps: true});

module.exports = mongoose.model('Wifi', wifiSchema);