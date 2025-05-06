import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    client.emit('message', payload);
  }

  @SubscribeMessage('typing')
  handleTyping(client: Socket, payload: any) {
    client.broadcast.emit('typing', payload);
  }
}
