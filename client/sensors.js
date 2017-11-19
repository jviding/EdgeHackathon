var Sensordrone = require('sensordrone');
var util = require('util');
var async = require('async');


// npm install async
// npm install sensordrone
//




function Sensors() {
  this.holelimit = 30;
  this.mooselimit = 4000;

  this._sd = null;
  this._lastLux = 3000;
  this._isMoose = false;
  this._isHole = false;

  this._isSensorEnabled = false;
  this._isServicesDiscovered = false;
  this._isConnected = false;
}




Sensors.prototype.enableSensors = function() {
  var that = this;
  Sensordrone.discover(function(sensordrone) {
    that._sd = sensordrone;
    async.series([
      function(callback) {
        console.log('connect');
        sensordrone.connect(callback);
        that._isConnected = true;

        sensordrone.on('disconnect', function() {
          console.log('disconnected!');
          process.exit(0);
        });
      },
      function(callback) {
        console.log('discoverServicesAndCharacteristics');
        sensordrone.discoverServicesAndCharacteristics(callback);
        that._isServicesDiscovered = true;
      },
      function(callback) {
        console.log('enable RGBC');
        sensordrone.enableRGBC(function() {
          that._isSensorEnabled = true;
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



Sensors.prototype.readSensors = function() {
  var that = this;
  //console.log('read RGBC');
  try {
    if (that.isReady()) {
      that._sd.readRGBC(function(r, g, b, c, lux, temp) {
          //console.log('RGBC = %d %d %d %d %d Lux %d K', r.toFixed(1), g.toFixed(1), b.toFixed(1), c.toFixed(1), lux.toFixed(1), temp.toFixed(1));
          this.lastLux = lux.toFixed(1);
          console.log('RGBC = ' + this.lastLux);

          if (this.lastLux >= this.mooseLimit) {
            this._isMoose = true;
          }
          if (this.lastLux <= this.holeLimit) {
            this._isHole = true;
          }
        }
      }.bind(this));
  } catch (ex) {
    console.log(this.lastLux);
  }
}

Sensors.prototype.isMoose = function() {
  if (this._isMoose) {
    this._isMoose = false;
    return true;
  }
  return false;
}


Sensors.prototype.isHole = function() {
  if (this._isHole) {
    this._isHole = false;
    return true;
  }
  return false;
}


Sensors.prototype.closeSensors = function() {
  console.log('disable RGBC');
  this._isConnected = false;
  this._sd.disconnect();
}


Sensors.prototype.isReady = function() {
  return this._isSensorEnabled &&
    this._isServicesDiscovered &&
    this._isConnected;
}





var s = new Sensors();

s.enableSensors();

setTimeout(function() {
  setInterval(function() {
    s.readSensors();
  }, 12000);
}, 6000);

//s.closeSensors();





//s.ReadSensors();
//s.CloseSensors();
