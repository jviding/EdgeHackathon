# Set up Raspbian headless:

1. Write image to SD
   $ sudo dd bs=4M if=/home/jasu/Downloads/Raspi/2017-09-07-raspbian-stretch-lite.img of=/dev/sdb conv=fsync

2. Unmount and mount SD

3. Add empty file with the name 'ssh' to the root of /boot/ partition - the smaller partition

4. Add the following lines to: /etc/wpa_supplicant/wpa_supplicant.conf

network={
    ssid="Honor 8"
    psk="1705f6e3f126"
}

5. You can now boot up your Raspbian and connect with
    $ ssh pi@0.0.0.ip
    passwd: raspberry


# Configure bluetooth

1. sudo apt-get update
2. sudo apt-get upgrade


-> Update Bluez:

1. https://www.raspberrypi.org/forums/viewtopic.php?f=63&t=145364
2. https://www.raspberrypi.org/forums/viewtopic.php?f=29&t=87138#p619713

Guide for connecting:
1. https://www.cnet.com/how-to/how-to-setup-bluetooth-on-a-raspberry-pi-3/

# Set up hostname

1. Change /etc/hosts 127.0.1.1 hostname
2. Then: sudo hostnamectl set-hostname “Berry-x”
3. reboot

More at:
1. https://www.networkworld.com/article/3129313/internet-of-things/whats-in-a-raspberry-pi-name-how-to-rename-your-rpi-under-raspbian.html

# Install Node
 $ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
 $ sudo apt-get install -y nodejs
 ($ sudo apt-get install -y build-essential)





# Bluetooth paring

https://www.cnet.com/how-to/how-to-setup-bluetooth-on-a-raspberry-pi-3/

sudo bluetoothctl
agent on
scan on
pair XX:XX:XX:XX:XX:XX. Pincode: 0000
connect XX:XX:XX:XX:XX:XX.
quit

To list all paired devices: devices


berry-2 00:17:E9:50:E9:BB SensordroneE9BB
berry-6 00:17:E9:50:E1:75 SensordroneE175


Before launching, make sure you have done:
npm install async
npm install sensordrone

as npm install is not enough.
