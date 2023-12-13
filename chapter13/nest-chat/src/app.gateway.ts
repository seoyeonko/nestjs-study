// 게이트웨이
// - HTTP 프로토콜; 컨트롤러부터 요청을 받음 -> 서비스 -> 레포지토리
// - WS 프로토콜; 게이트웨이로부터 요청을 받음 -> 서비스 -> 레포지토리
// - @WebSocketGateway() 데코레이터: 해당 클래스가 게이트웨이 역할을 함

import { Server, Socket } from 'socket.io';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'chat' }) // 웹소켓 서버 설정 데코레이터
export class ChatGateway {
  @WebSocketServer() server: Server; // 웹소켓 서버 인스턴스 선언

  @SubscribeMessage('message') // message 이벤트 구독
  handleMessage(socket: Socket, data: any): void {
    const { message, nickname } = data;

    // 전송을 요청한 클라이언트를 제외하고 다른 클라이언트에게 전송
    socket.broadcast.emit('message', `${nickname} : ${message}`);
  }
}
