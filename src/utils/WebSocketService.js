import SockJS from "sockjs-client/dist/sockjs";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

class WebSocketService {
  constructor() {
    this.client = Stomp.over(() => new SockJS("http://localhost:8080/ws"));
    this.client.reconnect_delay = 5000;
    this.connected = false;
  }

  connect(headers = {}, onConnectCallback) {
    this.client.connect(
      headers,
      () => {
        console.log("Connected");
        this.connected = true;
        if (onConnectCallback) {
          onConnectCallback();
        }
      },
      (error) => {
        console.error("Connection error: ", error);
        this.connected = false;
      },
    );
  }

  disconnect() {
    if (this.client && this.connected) {
      this.client.disconnect(() => {
        console.log("Disconnected");
        this.connected = false;
      });
    }
  }

  subscribe(topic, callback) {
    if (this.connected) {
      return this.client.subscribe(topic, (message) => {
        callback(JSON.parse(message.body));
      });
    } else {
      console.error("Cannot subscribe because the client is not connected");
    }
  }

  send(destination, body) {
    if (this.connected) {
      this.client.send(destination, {}, JSON.stringify(body));
    } else {
      console.error("Cannot send message because the client is not connected");
    }
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
