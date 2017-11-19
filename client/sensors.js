var Sensordrone = require('sensordrone');
var util = require('util');
var async = require('async');
var debug = false;

// npm install async
// npm install sensordrone
//




function Sensors() {
  this.holeLimit = 40;
  this.mooseLimit = 4000;

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
  try {
    Sensordrone.discover(function(sensordrone) {
      that._sd = sensordrone;
      async.series([
        function(callback) {
          if (debug)
            console.log('connect');
          sensordrone.connect(callback);
          that._isConnected = true;

          sensordrone.on('disconnect', function() {
            console.log('disconnected!');
            process.exit(0);
          });
        },
        function(callback) {
          if (debug)
            console.log('discoverServicesAndCharacteristics');
          sensordrone.discoverServicesAndCharacteristics(callback);
          that._isServicesDiscovered = true;
        },
        function(callback) {
          if (debug)
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
  } catch (ex) {
    if (debug)
      console.log(this.lastLux);
  }

}



Sensors.prototype.readSensors = function() {
  var that = this;
  //console.log('read RGBC');
  try {
    if (that.isReady()) {
      that._sd.readRGBC(function(r, g, b, c, lux, temp) {
        //console.log('RGBC = %d %d %d %d %d Lux %d K', r.toFixed(1), g.toFixed(1), b.toFixed(1), c.toFixed(1), lux.toFixed(1), temp.toFixed(1));
        this.lastLux = lux.toFixed(1);
        if (debug)
          console.log('RGBC = ' + this.lastLux);

        if (this.lastLux >= this.mooseLimit) {
          this._isMoose = true;
        }
        if (this.lastLux <= this.holeLimit) {
          this._isHole = true;
        }
      }.bind(this));
    }
  } catch (ex) {
    if (debug)
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
  if (debug)
    console.log('disable RGBC');
  this._isConnected = false;
  this._sd.disconnect();
}


Sensors.prototype.isReady = function() {
  return this._isSensorEnabled &&
    this._isServicesDiscovered &&
    this._isConnected;
}






module.exports = Sensors;

//s.closeSensors();
