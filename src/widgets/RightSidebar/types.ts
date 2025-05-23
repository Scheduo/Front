// TODO: Particaipant의 role 변경 요망
// TODO: 도메인 타입을 entities 레이어로 이동

/**
 * 캘린더 참여자 정보를 정의하는 타입입니다.
 * 캘린더에 참여하는 멤버와 그들의 역할을 나타냅니다.
 */
export type Participant = {
  /** 참여자의 멤버 고유 식별자 */
  memberId: number;
  /** 참여자의 역할 (예: "owner", "editor", "viewer") */
  role: string;
};

/**
 * 캘린더 정보를 정의하는 타입입니다.
 * 일정이 속한 캘린더의 기본 정보와 참여자 목록을 나타냅니다.
 */
export type Calendar = {
  /** 캘린더의 고유 식별자 */
  id: number;
  /** 캘린더의 이름 (예: "개인일정", "업무일정") */
  name: string;
  /** 캘린더에 참여하는 멤버들의 목록 */
  participants: Participant[];
};

/**
 * 개별 일정 항목의 구조를 정의하는 타입입니다.
 * 일정 목록 표시, 생성, 수정 등에서 사용되는 핵심 데이터 모델입니다.
 */
export type ScheduleItem = {
  /** 일정의 고유 식별자 */
  id: number;
  /** 일정의 제목 */
  title: string;
  /** 일정이 진행될 장소 */
  location: string;
  /** 일정 시작 시간 (예: "14:00", "오후 2시") */
  startTime: string;
  /** 일정 종료 시간 (예: "15:30", "오후 3시 30분") */
  endTime: string;
  /** 하루종일 일정 여부 */
  isAllDAy: boolean;
  /** 일정이 속한 캘린더 정보 */
  calendar: Calendar;
};
