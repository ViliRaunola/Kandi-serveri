const express = require('express');
const router = express.Router();
const Wifi = require('../models/Wifi')
const Bluetooth = require('../models/Bluetooth')

//Route for saving the data 
// router.post('/save/wifi', (req, res, next) => {
//     const options = {upsert: true};

//     //console.log(req.body)

//     //Saving the wifi data   
//     wifi_list = req.body.wifi;
//     wifi_list.forEach(data => {
//         Wifi.findOneAndUpdate({
//         MAC_Address: data.MAC_Address}, 
//         {
//         First_Seen: data.First_Seen, 
//         Last_Seen: data.Last_Seen,
//         Signal_Strength: data.Signal_Strength,
//         ESSID: data.ESSID,
//         BSSID: data.BSSID,
//         Probed_ESSID: data.Probed_ESSID,
//         Is_AP: data.Is_AP
//         }, 
//         options, (err) => {
//             if(err) {
//                 console.log(err)
//                 res.json({success: false});
//                 return err;
//             }
//         });
//     });
//     console.log('Saved data to databse')
//     res.json({success: true})
// });

router.post('/save/wifi', (req, res, next) => {

    //Saving the wifi data
    var wifi_list = req.body.wifi;
    wifi_list.forEach(data => {
        Wifi.findOne({MAC_Address: data.MAC_Address} ,(err, found) => {
            if(err){
                res.json({success: false});
                console.log(err)
                return err;
            }
            if(found){
                found.Last_Seen = data.Last_Seen;
                found.Signal_Strength = data.Signal_Strength;
                found.save(err => {
                    if(err){
                        res.json({success: false});
                        console.log(err)
                        return err;
                    }  
                })
            }else{
                Wifi.create({
                    MAC_Address: data.MAC_Address,
                    First_Seen: data.First_Seen, 
                    Last_Seen: data.Last_Seen,
                    Signal_Strength: data.Signal_Strength,
                    ESSID: data.ESSID,
                    BSSID: data.BSSID,
                    Probed_ESSID: data.Probed_ESSID,
                    Is_AP: data.Is_AP,
                    Manufacturer: data.Manufacturer
                },
                (err) => {
                    if(err){
                        res.json({success: false});
                        console.log(err)
                        return err;
                    }
                });
            }
        });
    })
    console.log('Saved data to databse')
    return res.json({success: true})
});
 

router.post('/save/bt', (req, res, next) => {

    //Saving the bluetooth data
    var bluetooth_list = req.body.bluetooth;
    bluetooth_list.forEach(data => {
        Bluetooth.findOne({MAC_Address: data.MAC_Address} ,(err, found) => {
            if(err){
                res.json({success: false});
                console.log(err)
                return err;
            }
            if(found){
                found.Last_Seen = data.Last_Seen;
                found.RSSI = data.RSSI;
                found.save(err => {
                    if(err){
                        res.json({success: false});
                        console.log(err)
                        return err;
                    }  
                })
            }else{
                Bluetooth.create({
                    MAC_Address: data.MAC_Address,
                    Name: data.Name,
                    Company: data.Company,
                    First_Seen: data.Last_Seen,
                    Last_Seen: data.Last_Seen,
                    RSSI: data.RSSI_value,
                },
                (err) => {
                    if(err){
                        res.json({success: false});
                        console.log(err)
                        return err;
                    }
                });
            }
        });
    })
    console.log('Saved data to databse')
    return res.json({success: true})
});

router.get('/data', (req, res, next) => {
    Bluetooth.find({}, (err, bt_datas) => {
        if(err) throw err;
        Wifi.find({}, (err, wifi_datas) => {
            if(err) throw err
            return res.json({wifi: wifi_datas, bt: bt_datas});
        })
    })
})


module.exports = router;