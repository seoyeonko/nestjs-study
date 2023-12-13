// 게이트웨이
// - HTTP 프로토콜; 컨트롤러부터 요청을 받음 -> 서비스 -> 레포지토리
// - WS 프로토콜; 게이트웨이로부터 요청을 받음 -> 서비스 -> 레포지토리
// - @WebSocketGateway() 데코레이터: 해당 클래스가 게이트웨이 역할을 함

import { Server, Socket } from 'socket.io';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'chat' }) // 웹소켓 서버 설정 데코레이터
export class ChatGateway {
  @WebSocketServer() server: Server; // 웹소켓 서버 인스턴스 선언

  @SubscribeMessage('message') // message 이벤트 구독
  handleMessage(socket: Socket, data: any): void {
    const { message, nickname } = data;

    // 전송을 요청한 클라이언트를 제외하고 다른 클라이언트에게 전송
    socket.broadcast.emit('message', { message: `${nickname} : ${message}` });
  }
}

@WebSocketGateway({ namespace: 'room' })
export class RoomGateway {
  // 채팅 게이트웨이 의존성 주입
  // - 게이트웨이는 프로바이더이므로다른 곳에 의존성을 주입해 사용 가능
  // - 의존성 주입은 게이트웨이 클래스 간에도 적용 가능
  constructor(private readonly chatGateway: ChatGateway) {}
  rooms = [];

  @WebSocketServer() server: Server;

  @SubscribeMessage('createRoom')
  handleMessage(@MessageBody() data) {
    const { nickname, room } = data;
    this.chatGateway.server.emit('notice', {
      message: `${nickname} 님이 ${room} 방을 만들었습니다.`,
    });
    this.rooms.push(room);
    this.server.emit('rooms', this.rooms);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket, data) {
    const { nickname, room, toLeaveRoom } = data;
    socket.leave(toLeaveRoom);
    this.chatGateway.server.emit('notice', {
      message: `${nickname} 님이 ${room} 방에 입장했습니다.`,
    });
    socket.join(room); // 채팅방에 입장
  }

  @SubscribeMessage('message')
  handleMessageToRoom(socket: Socket, data) {
    const { nickname, room, message } = data;
    socket.leave(data);
    // 지정한 채팅방으로 나 이외의 모든 사람에게 데이터 전송
    socket.broadcast.to(room).emit('message', {
      message: `${nickname} : ${message}`,
    });
    socket.join(room); // 채팅방에 입장
  }
}
