import { Server, Socket } from 'socket.io';
export declare class ChatGateway {
    server: Server;
    handleMessage(socket: Socket, data: any): void;
}
export declare class RoomGateway {
    private readonly chatGateway;
    constructor(chatGateway: ChatGateway);
    rooms: any[];
    server: Server;
    handleMessage(data: any): void;
    handleJoinRoom(socket: Socket, data: any): void;
    handleMessageToRoom(socket: Socket, data: any): void;
}
