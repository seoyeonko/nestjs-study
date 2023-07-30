const express = require('express');
const handlebars = require('express-handlebars');
const app = express();

app.engine('handlebars', handlebars.engine()); // 템플릿 엔진으로 헨들바 등록
app.set('view engine', 'handlebars'); // 웹 페이지 로드시 사용할 템플릿 엔진 등록
app.set('views', __dirname + '/views'); // 뷰 디렉터리 설정

app.get('/', (req, res) => {
  res.render('home', { title: '테스트 게시판', message: '만나서 반갑습니당!' });
});

app.get('/write', (req, res) => {
  res.render('write', { title: '테스트 게시판' });
});

app.get('/detail/:id', (req, res) => {
  res.render('detail', { title: '테스트 게시판' });
});

app.listen(3000);
