// 게시글의 데이터를 나타내는 타입
// ts: 데이터만 가지고 있는 타입 선언시 클래스보다 인터페이스를 주로 사용
export interface PostDto {
  id: string;
  title: string;
  content: string;
  name: string;
  createDt: Date;
  updateDt?: Date;
}
