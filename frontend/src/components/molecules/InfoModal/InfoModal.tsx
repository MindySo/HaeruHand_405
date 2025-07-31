import { Text } from '../../atoms';

export const InfoModal = () => {
  <div className="modalWindow">
    {/* 1. 모달 창 헤더 */}
    <div className="header">
      {/* 1-1. 창 제목 */}
      <header>
        <Text>채집 안내서</Text>
      </header>

      {/* 1-2. 닫기 버튼 */}
      <div className="closeModal">x</div>
    </div>

    {/* 2. 모달 창 내부 (헤더 아래) 박스 */}
    <div className="boxInWindow">
      {/* 2-1. 토글 버튼 */}
      <div className="toggleButton">
        {/* 채집 금지 구역 || 사용 가능 도구 */}
        <div>채집 금지 구역</div>
        <div>사용 가능 도구</div>
      </div>

      {/* 2-2. 소제목 */}
      <div className="smallTitle">
        {/* 채집 금지 구역 || 사용 가능 도구 */}
        <div>채집 금지 구역</div>
        <div>사용 가능 도구</div>
      </div>

      {/* 2-3. 목록 */}
      <div className="list">
        {/* 채집 금지 구역 || 사용 가능 도구 */}
        <div>채집 금지 구역</div>
        <div>사용 가능 도구</div>
      </div>
    </div>
  </div>;

  return InfoModal;
};
