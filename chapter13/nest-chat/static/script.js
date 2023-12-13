const socket = io('http://localhost:3000/chat'); // 네임스페이스 추가
const roomSocket = io('http://localhost:3000/room'); // 채팅방을 네임스페이스 생성
const nickname = prompt('닉네입을 입력해주세요');
let currentRoom = '';

socket.on('connect', () => {
  console.log('connected');
});

function sendMessage() {
  if (currentRoom === '') {
    alert('방을 선택해주세요');
    return;
  }

  const message = $('#message').val();
  const data = { message, nickname, room: currentRoom };
  $('#chat').append(`<div>나: ${message}</div>`);
  socket.emit('message', data);
  return false;
}

function createRoom() {
  const room = prompt('채팅방 이름 입력');
  roomSocket.emit('createRoom', { room, nickname });
}

socket.on('message', (data) => {
  console.log(data);
  $('#chat').append(`<div>${data.message}</div>`);
});

socket.on('notice', (data) => {
  console.log(data);
  $('#notice').append(`<div>${data.message}</div>`);
});

roomSocket.on('rooms', (data) => {
  console.log(data);
  $('#rooms').empty();
  data.forEach((room) => {
    $('#rooms').append(
      `<li>${room} <button onclick="joinRoom('${room}')">join</button></li>`,
    );
  });
});

function joinRoom(room) {
  roomSocket.emit('joinRoom', { room, nickname, toLeaveRoom: currentRoom });
  $('#chat').html(); // 채팅방 이동시 기존 메세지 삭제
  currentRoom = room; // 현재 들어와 있는 방의 값 변경
}
