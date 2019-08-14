import share from '@teamwork/sharedb/lib/client';
import ReconnectingWebSocket from 'reconnecting-websocket';
import WS from 'isomorphic-ws';
import otText from 'ot-text';

class ShareDB {
  constructor(onConnect, onDisconnect) {
    this.onConnect = onConnect;
    this.onDisconnect = onDisconnect;

    this.binding = {};
    this.doc = {};
    this.socket = {};
    this.connection = {};
  }

  connect = async url => {
    this.socket = await new ReconnectingWebSocket(url, [], {
      WebSocket: WS,
      connectionTimeout: 1000,
      minReconnectionDelay: 400 + Math.random() * 4000,
      minUptime: 8000,
      maxReconnectionDelay: 3000,
      maxRetries: Infinity,
      reconnectionDelayGrowFactor: 1.2,
    });

    this.socket.onopen = () => {
      this.onConnect();
    };

    this.socket.onclose = () => {
      this.onDisconnect();
    };

    // Register text OT type.
    await share.types.register(otText.type);

    // Establish connection with ShareDB server.
    this.connection = new share.Connection(this.socket);
  };

  getDoc = async (user, job) => {
    return this.connection.get(user, job);
  };
}

export default ShareDB;
