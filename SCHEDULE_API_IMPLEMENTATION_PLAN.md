# 일정 관리 API 연동 구현 계획서

## 개요

일정 생성, 특정 날짜 일정 조회, 월별 일정 조회 API를 연동하여 일정 관리 기능을 구현합니다.

## 1. 현재 코드베이스 분석 결과 (2024-08-22 업데이트)

### ✅ 완료된 작업 (커밋: 156ea2c, aa88cc0)

- `@entities/schedule/model/types.ts`: Schedule 타입 정의 완료
- `@entities/schedule/api/types.ts`: InputScheduleRequest 타입 정의 완료
- `@entities/schedule/api/api.ts`: 빈 API 함수 골격 생성 완료
- `@entities/schedule/api/index.ts`: 내보내기 설정 완료
- `@entities/schedule/index.ts`: 엔티티 진입점 설정 완료

### 🔍 현재 상태 분석

#### Schedule 엔티티 구조 현황
```
src/entities/schedule/
├── api/
│   ├── api.ts          ✅ 빈 함수들 정의됨 (구현 필요)
│   ├── index.ts        ✅ 완료
│   └── types.ts        ✅ InputScheduleRequest 타입 정의됨
├── model/
│   ├── types.ts        ✅ Schedule 타입 정의 완료
│   └── index.ts        ✅ 완료
└── index.ts            ✅ 완료
```

#### 기존 Schedule 타입 (model/types.ts)
- 완성도 높은 타입 정의 (id, title, isAllDay, dates, times, location, category, memo, notification, recurrence, calendar)
- NotificationTime, RecurrenceRule enum 정의 완료
- ScheduleCalendar 참조를 통한 캘린더 연결

### 🎯 기존 타입과 API 스펙 간 차이점 분석

- **시간 형식**: 기존 `startDate`/`endDate` + `startTime`/`endTime` vs API `startDateTime`/`endDateTime` 
- **카테고리**: 기존 `string` vs API `{name, color}` 객체
- **전체 일정**: 기존 `isAllDay` vs API `allDay`
- **알림**: 기존 `notificationTime` vs API 미정의

## 2. 구현 계획

### 2.1 타입 정의 및 인터페이스 설계

#### API 응답 전용 타입 추가 (`@entities/schedule/api/types.ts`)

```typescript
// 카테고리 타입
interface ScheduleCategory {
  name: string;
  color:
    | "RED"
    | "BLUE"
    | "GREEN"
    | "YELLOW"
    | "PURPLE"
    | "ORANGE"
    | "PINK"
    | "GRAY";
}

// 특정 날짜 일정 조회 응답
interface DailyScheduleResponse {
  id: number;
  title: string;
  startDateTime: string; // "2025-05-21T10:00:00"
  endDateTime: string; // "2025-05-21T11:00:00"
  category: ScheduleCategory;
  allDay: boolean;
}

// 월별 일정 조회 응답
interface MonthlyScheduleResponse {
  id: number;
  title: string;
  startDate: string; // yyyy-mm-dd
  endDate: string;
  category: ScheduleCategory;
}

// 일정 생성 요청
interface CreateScheduleRequest {
  title: string;
  participants: Array<{
    memberId: number;
    role: CalendarRole;
  }>;
}

// API 응답 래퍼
interface ApiResponse<T> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}
```

### 2.2 API 함수 구현 (`@entities/schedule/api/api.ts`)

#### 구현할 API 함수들

1. **일정 생성**: `createSchedule(calendarId: number, request: CreateScheduleRequest)`
2. **특정 날짜 일정 조회**: `getSchedulesByDate(calendarId: number, date: string)`
3. **월별 일정 조회**: `getSchedulesByMonth(calendarId: number, date: string)`

#### 구현 방식

- Axios 인스턴스 활용 (`@shared/api/axios.ts`)
- 중앙집중식 에러 처리 활용 (인터셉터에서 처리)
- TypeScript 타입 안정성 보장

### 2.3 TanStack Query 훅 구현

#### 구현할 훅들

1. **`useCreateSchedule`**: 일정 생성 뮤테이션
2. **`useDailySchedules`**: 특정 날짜 일정 조회 쿼리
3. **`useMonthlySchedules`**: 월별 일정 조회 쿼리

#### 쿼리 키 구조

```typescript
// 단순한 구조로 시작 (YAGNI 원칙)
const scheduleKeys = {
  daily: (calendarId: number, date: string) => [
    "schedules",
    "daily",
    calendarId,
    date,
  ],
  monthly: (calendarId: number, date: string) => [
    "schedules",
    "monthly",
    calendarId,
    date,
  ],
};
```

#### 구현 위치

- `@entities/schedule/api/` 디렉토리에 `hooks.ts` 파일 생성

## 3. 구현 우선순위 및 진행 상태

### ✅ 완료된 단계
- **0단계**: Schedule 엔티티 기본 구조 생성 (커밋: 156ea2c, aa88cc0)
  - 폴더 구조 및 기본 파일 생성
  - Schedule 도메인 타입 정의
  - InputScheduleRequest 타입 정의

### 🚧 다음 구현 단계

1. **1단계**: API 응답 타입 정의 및 API 함수 구현 (미완료)
   - [ ] API 응답 전용 타입들을 `api/types.ts`에 추가
   - [ ] `api/api.ts`의 빈 함수들에 실제 API 호출 로직 구현
   
2. **2단계**: TanStack Query 훅 구현 (미완료)
   - [ ] `api/hooks.ts` 파일 생성
   - [ ] useCreateSchedule, useDailySchedules, useMonthlySchedules 훅 구현
   
3. **3단계**: 기존 컴포넌트와 연동 테스트 (미완료)

## 4. 주의사항

### 타입 변환

- API 응답과 기존 Schedule 타입 간 변환 함수 필요시 추가 구현
- 현재는 API 응답 타입을 별도로 관리하여 혼동 방지

### 에러 처리

- 중앙집중식 에러 처리 활용 (Axios 인터셉터)
- 컴포넌트에서 개별 에러 처리 불필요

### YAGNI 원칙 준수

- 현재 필요한 기능만 구현
- 추가 기능은 요구사항 발생시 구현

## 5. 파일 구조 현황

```
src/entities/schedule/
├── api/
│   ├── api.ts          ✅ 빈 함수 골격 (구현 필요)
│   ├── hooks.ts        ❌ 미생성 (TanStack Query 훅들)
│   ├── types.ts        ✅ InputScheduleRequest (API 응답 타입 추가 필요)
│   └── index.ts        ✅ 완료
├── model/
│   ├── types.ts        ✅ Schedule 타입 완료
│   └── index.ts        ✅ 완료
└── index.ts            ✅ 완료
```

## 6. 다음 단계 요약

현재 Schedule 엔티티의 기본 구조는 완성되었고, 다음 작업이 필요합니다:

1. **API 응답 타입 추가**: `api/types.ts`에 DailyScheduleResponse, MonthlyScheduleResponse 등 추가
2. **API 함수 구현**: `api/api.ts`의 빈 함수들에 실제 HTTP 요청 로직 구현  
3. **TanStack Query 훅**: `api/hooks.ts` 파일 생성 및 쿼리/뮤테이션 훅 구현

이 계획에 따라 단계적으로 구현을 진행하여 안정적이고 유지보수 가능한 일정 관리 API 연동을 완성합니다.
