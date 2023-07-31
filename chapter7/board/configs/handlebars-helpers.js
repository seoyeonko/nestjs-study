// 핸들바 장점: 자유도 높음
// each, if 기본적인 함수는 제공, 그 외는 커스텀 헬퍼 함수 구현해 사용
module.exports = {
  lengthOfList: (list = []) => list.length, // 리스트 길이 반환
  eq: (val1, val2) => val1 === val2, // 두 값 비교
  dateString: (isoString) => new Date(isoString).toLocaleDateString(), // ISO 날짜 문자열에서 날짜만 반환.toLocaleDateString()
};
