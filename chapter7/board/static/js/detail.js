const postOption = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

async function modifyPost() {
  const password = prompt('패스워드를 입력해주세요');
  if (!password) {
    return;
  }

  const result = await fetch('/check-password', {
    ...postOption,
    body: JSON.stringify({ id: '{{post._id}}', password }),
  });

  const data = await result.json();

  if (data.isExist) {
    document.location = '/modify/{{post._id}}';
  } else {
    alert('패스워드가 올바르지 않습니다.');
  }
}
