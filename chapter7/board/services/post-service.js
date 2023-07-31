const paginator = require('../utils/paginator');
const { ObjectId } = require('mongodb');

async function writePost(collection, post) {
  // 생성일시, 조회수
  post.hits = 0;
  post.createdDt = new Date().toISOString(); // ISO 포맷으로 날짜 저장
  return await collection.insertOne(post); // mongodb에 post 저장 후 결과 반환
}

async function list(collection, page, search) {
  const perPage = 10;
  // title이 search 와 일치하는지 확인
  const query = { title: new RegExp(search, 'i') };
  const cursor = collection
    .find(query, {
      limit: perPage,
      skip: (page - 1) * perPage,
    })
    .sort({
      createdDt: -1, // 역순
    });

  const totalCount = await collection.count(query);
  const posts = await cursor.toArray();

  const paginatorObj = paginator({ totalCount, page, perPage: perPage });
  return [posts, paginatorObj];
}

const projectionOption = {
  projection: {
    // 프로젝션(투영) 결괏값에서 일부만 가져올 때 사용
    password: 0,
    'comments.password': 0,
  },
};

async function getDetailPost(collection, id) {
  return await collection.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $inc: { hits: 1 } },
    projectionOption
  );
}

async function getPostByIdAndPassword(collection, { id, password }) {
  const result = await collection.findOne(
    { _id: ObjectId(id), password: password },
    projectionOption
  );
  console.log('🍋 >>>>', result);
  return result;
}

async function getPostById(collection, id) {
  return await collection.findOne({ _id: ObjectId(id) }, projectionOption);
}

async function updatePost(collection, id, post) {
  const toUpdatePost = {
    $set: {
      ...post,
    },
  };

  return await collection.updateOne({ _id: ObjectId(id) }, toUpdatePost);
}

module.exports = {
  list,
  writePost,
  getDetailPost,
  getPostById,
  getPostByIdAndPassword,
  updatePost,
};
