var Sensordrone = require('sensordrone');
var util = require('util');
var async = require('async');


// npm install async
// npm install sensordrone
//


function Sensors() {
  this._sd = null;
}


Sensors.prototype.enableSensors = function() {
  var that = this;
  Sensordrone.discover(function(sensordrone) {
    that._sd = sensordrone;
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
        console.log('enable RGBC');
        sensordrone.enableRGBC(function() {
          callback();
        });
      },
      function(callback) {
        //console.log('disconnect');
        //sensordrone.disconnect(callback);
      }
    ]);
  });

}



Sensors.prototype.readSensors = function(callback) {
  var that = this;
  console.log('read RGBC', that);
  setTimeout(function() {
    console.log('readSensors', this._sd);
    that._sd.readRGBC(function(r, g, b, c, lux, temp) {
      console.log('RGBC = %d %d %d %d %d Lux %d K', r.toFixed(1), g.toFixed(1), b.toFixed(1), c.toFixed(1), lux.toFixed(1), temp.toFixed(1));
      //callback();
      if (callback) {
        callback();
      }
    }.bind(this));
  }, 6000);
}


Sensors.prototype.closeSensors = function() {
  console.log('disable RGBC');
  this._sd.disconnect();
}




var sensorReadingHandler = function() {
  s.closeSensors();
}



var s = new Sensors();
s.enableSensors();
s.readSensors(sensorReadingHandler);





//s.ReadSensors();
//s.CloseSensors();
