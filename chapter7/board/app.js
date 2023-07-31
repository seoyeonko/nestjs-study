const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const mongodbConnection = require('./configs/mongodb-connection');
const postService = require('./services/post-service');
const {ObjectId} = require('mongodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/static'));

app.engine(
  'handlebars',
  handlebars.create({
    helpers: require('./configs/handlebars-helpers'),
  }).engine
); // 템플릿 엔진으로 헨들바 등록
app.set('view engine', 'handlebars'); // 웹 페이지 로드시 사용할 템플릿 엔진 등록
app.set('views', __dirname + '/views'); // 뷰 디렉터리 설정

app.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || '';
  try {
    const [posts, paginator] = await postService.list(collection, page, search);

    res.render('home', { title: '테스트 게시판', search, paginator, posts });
  } catch (error) {
    console.log(error);

    res.render('home', { title: '테스트 게판' });
  }
});

app.get('/write', (req, res) => {
  res.render('write', { title: '테스트 게시판', mode: 'create' });
});

app.post('/write', async (req, res) => {
  const post = req.body;

  const result = await postService.writePost(collection, post);
  console.log('>>>', result);
  res.redirect(`/detail/${result.insertedId}`);
});

app.get('/detail/:id', async (req, res) => {
  const result = await postService.getDetailPost(collection, req.params.id);
  res.render('detail', { title: '테스트 게시판', post: result.value });
});

app.post('/check-password', async (req, res) => {
  // id, password 값을 가져옴
  const { id, password } = req.body;
  console.log(id, password);

  // postService의 getPostByIdAndPassword() 함수를 사용해 게시글 데이터 확인
  const post = await postService.getPostByIdAndPassword(collection, {
    id,
    password,
  });
  // 데이터가 있으면 isExist true, 없으면 isExist false
  if (!post) {
    return res.status(404).json({ isExist: false });
  } else {
    return res.json({ isExist: true });
  }
});

// 수정 페이지로 이동 (mode: modify)
app.get('/modify/:id', async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(collection, id);
  console.log(post);

  res.render('write', { title: '테스트 게시판', mode: 'modify', post });
});

// 게시글 수정
app.post('/modify/', async (req, res) => {
  const { id, title, writer, password, content } = req.body;

  const post = {
    title,
    writer,
    password,
    content,
    createDt: new Date().toISOString(),
  };

  // 업데이트 결과
  const result = postService.updatePost(collection, id, post);
  res.redirect(`/detail/${id}`);
});

// 게시글 삭제
app.delete("/delete", async (req, res) => {
  const { id, password } = req.body;
  try {
    // collection의 deleteOne을 사용해 게시글 하나를 삭제
    const result = await collection.deleteOne({
      _id: ObjectId(id),
      password: password,
    });
    // 삭제 결과가 잘 못된 경우의 처리
    if (result.deletedCount !== 1) {
      console.log("삭제 실패");
      return res.json({ isSuccess: false });
    }
    return res.json({ isSuccess: true });
  } catch (error) {
    // 에러가 난 경우의 처리
    console.error(error);
    return res.json({ isSuccess: false });
  }
});

let collection;
app.listen(3000, async () => {
  console.log('server started');
  const mongoClient = await mongodbConnection();
  collection = mongoClient.db().collection('post');
  console.log('mongodb connected');
});
