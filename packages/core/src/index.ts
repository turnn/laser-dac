import * as dgram from 'dgram';
import { EtherConn } from './EtherConn';
import { twohex } from './parse';

interface IDevice {
  ip: string;
  port: number;
  name: string;
  hw_revision: number;
  sw_revision: number;
}

export class EtherDream {
  static _find = function(limit, timeout, callback) {
    const ips: string[] = [];
    const devices: IDevice[] = [];

    const server = dgram.createSocket('udp4');

    const timeouttimer = setTimeout(function() {
      server.close();
      callback(devices);
    }, timeout);

    server.on('message', function(msg, rinfo) {
      const ip = rinfo.address;
      if (ips.indexOf(ip) != -1) return;
      ips.push(ip);

      const name =
        'EtherDream @ ' +
        twohex(msg[0]) +
        ':' +
        twohex(msg[1]) +
        ':' +
        twohex(msg[2]) +
        ':' +
        twohex(msg[3]) +
        ':' +
        twohex(msg[4]) +
        ':' +
        twohex(msg[5]);

      devices.push({
        ip: ip,
        port: 7765,
        name: name,
        hw_revision: msg[6],
        sw_revision: msg[7]
      });

      if (devices.length >= limit) {
        server.close();
        clearTimeout(timeouttimer);
        callback(devices);
      }
    });

    server.bind(7654);

    // wait two seconds for data to come back...
  };

  static find = function(callback) {
    EtherDream._find(99, 2000, callback);
  };

  static findFirst = function(callback) {
    EtherDream._find(1, 4000, callback);
  };

  static connect = function(ip, port, callback) {
    const conn = new EtherConn();
    conn.connect(
      ip,
      port,
      function(success) {
        callback(success ? conn : null);
      }
    );
  };
}
