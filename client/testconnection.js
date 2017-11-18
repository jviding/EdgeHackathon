var Sensordrone = require('sensordrone');
var util = require('util');
var async = require('async');

Sensordrone.discover(function(sensordrone) {
  console.log(sensordrone);
  //process.exit();
});












Sensordrone.discover(function(sensordrone) {
  async.series([
      function(callback) {
        console.log('connect');
        sensordrone.connect(callback);

        sensordrone.on('disconnect', function() {
          console.log('disconnected!');
          process.exit(0);
        });
      },
      function(callback) {
        console.log('discoverServicesAndCharacteristics');
        sensordrone.discoverServicesAndCharacteristics(callback);
      },
      function(callback) {
        console.log('read battery voltage');
        sensordrone.readBatteryVoltage(function(voltage) {
          console.log('battery voltage = %d V', voltage.toFixed(1));

          callback();
        });
      },
      function(callback) {
        console.log('set LEDs');
        sensordrone.setLeds(255, 255, 255, 255, 255, 255, function() {
          callback();
        });
      },
      function(callback) {
        console.log('enable RGBC');
        sensordrone.enableRGBC(function() {
          callback();
        });
      },
      function(callback) {
        console.log('read RGBC');
        setTimeout(function() {
          sensordrone.readRGBC(function(r, g, b, c, lux, temp) {
            console.log('RGBC = %d %d %d %d %d Lux %d K', r.toFixed(1), g.toFixed(1), b.toFixed(1), c.toFixed(1), lux.toFixed(1), temp.toFixed(1));
            callback();
          });
        }, 1000);
      },
      function(callback) {
        console.log('disable RGBC');
        sensordrone.disableRGBC(function() {
          callback();
        });
      },
      function(callback) {
        console.log('disconnect');
        sensordrone.disconnect(callback);
      }
    ]
  );
});
