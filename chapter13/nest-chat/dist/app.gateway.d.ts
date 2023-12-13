import { Server, Socket } from 'socket.io';
export declare class ChatGateway {
    server: Server;
    handleMessage(socket: Socket, data: any): void;
}
export declare class RoomGateway {
    rooms: any[];
    server: Server;
    handleMessage(data: any): void;
}
