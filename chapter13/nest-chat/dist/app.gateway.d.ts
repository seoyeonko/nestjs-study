import { Server, Socket } from 'socket.io';
export declare class ChatGateway {
    server: Server;
    handleMessage(socket: Socket, data: any): void;
}
