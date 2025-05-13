# Scheduo 프론트엔드 스타일 가이드

## 소개

이 스타일 가이드는 Scheduo에서 개발되는 React 및 TypeScript 코드의 코딩 컨벤션을 정의합니다.
모든 팀원이 일관된 스타일로 코드를 작성하여 가독성, 유지보수성, 협업 효율성을 높이는 것을 목표로 합니다.

## 리뷰 언어 정책

- ✅ 한글 사용: 모든 코멘트, 제안, 설명은 한글로 작성
- ❌ 영어 사용 금지: 리뷰 시 영어 사용은 절대 불허
- 📝 예외 상황: 영어 기술 용어는 허용하되, 설명은 반드시 한글로 작성

## 주요 원칙

- **가독성 (Readability):** 코드는 모든 팀원이 쉽게 이해할 수 있어야 합니다.
- **유지보수성 (Maintainability):** 코드는 쉽게 수정하고 확장할 수 있어야 합니다.
- **일관성 (Consistency):** 모든 프로젝트에서 일관된 스타일을 준수하면 협업을 개선하고 오류를 줄일 수 있습니다.
- **성능 (Performance):** 가독성이 최우선이지만 코드 효율성도 고려해야 합니다.
- **중복 최소화 (Minimizing Duplication):** 코드 중복을 최소화하여 유지보수성을 높입니다. Biome의 린팅 규칙을 활용하여 중복 코드를 감지하고 개선합니다.

## 스타일 가이드라인

### 1. 줄 길이 (Line Length)

- 한 줄의 최대 길이는 **120자**입니다.
  - 최신 개발 환경 및 넓은 모니터를 고려하여 가독성을 해치지 않는 선에서 유연성을 확보합니다.
  - Biome 포매터가 이 규칙을 자동으로 적용합니다.

### 2. 들여쓰기 (Indentation)

- 들여쓰기는 **스페이스 2개**를 사용합니다.
  - Biome 포매터가 이 규칙을 자동으로 적용합니다.

### 3. 모듈 가져오기 (Imports)

- **그룹화하여 가져오기:**
  1.  React 및 라이브러리 기본 `import` (예: `import React from 'react';`)
  2.  Third-party 라이브러리 `import` (예: `import { useQuery } from '@tanstack/react-query';`)
  3.  FSD 아키텍처에 따른 내부 모듈 `import` (절대 경로 또는 alias 사용 권장)
      - `pages`
      - `widgets`
      - `features`
      - `entities`
      - `shared/ui`, `shared/lib`, `shared/api` 등
  4.  상대 경로 `import` (동일 모듈 내 파일, 스타일 시트, 이미지 등)
- **절대 경로 사용 권장:** `tsconfig.json`의 `baseUrl` 및 `paths` 설정을 활용하여 명확한 절대 경로를 사용합니다. (예: `@/shared/ui/Button`)
- **그룹 내 알파벳 순 정렬:** Biome이 자동으로 정렬하도록 설정합니다.
- **React import 방식 (React 19)**: `useState`, `useEffect`, `createContext` 등 필요한 React Hooks를 직접 import합니다. `React` 객체 자체를 사용하는 경우 (예: `React.createElement` 또는 레거시 클래스 컴포넌트)에만 `import React from 'react';`를 사용합니다.

### 4. 네이밍 컨벤션 (Naming Conventions)

- **변수 (Variables):** `camelCase` (예: `userName`, `totalCount`)
- **상수 (Constants):** `UPPER_SNAKE_CASE` (예: `MAX_USERS`, `API_ENDPOINT`)
  - 특히 전역적으로 사용되거나, 설정 값, 또는 변경되지 않는 중요한 값을 나타낼 때 사용합니다.
- **함수 (Functions):** `camelCase` (예: `calculateTotal()`, `processUserData()`)
- **React 컴포넌트 (React Components):** `PascalCase` (예: `UserProfile`, `OrderForm`)
  - 파일 이름도 컴포넌트 이름과 동일하게 `PascalCase.tsx` (또는 `.jsx`)로 작성합니다. (예: `UserProfile.tsx`)
- **타입/인터페이스 (Types/Interfaces):** `PascalCase` (예: `UserProps`, `ApiOptions`)
  - 타입과 인터페이스 이름에 T나 I 접두사를 사용하지 않는 것을 원칙으로 합니다.
  - 타입과 인터페이스의 의미를 명확하게 나타내는 명사 형태의 이름을 사용합니다.
  - 필요하다면 (예: 제네릭 타입 매개변수와 혼동될 수 있는 경우 등 극히 제한적인 상황에서) 접두사 사용을 고려할 수 있지만, 일반적인 경우에는 지양합니다.
- **모듈/파일 (Modules/Files):**
  - 컴포넌트 파일: `PascalCase.tsx`
  - 일반적인 TypeScript 파일 (유틸리티, 서비스 등): `camelCase.ts`
  - FSD의 slice 및 segment 폴더명: `kebab-case` (예: `user-profile`, `order-details`)
- **CSS 클래스 (CSS Classes - Tailwind):** Tailwind CSS의 유틸리티 클래스를 우선 사용합니다. 커스텀 클래스가 필요한 경우 `kebab-case`를 사용합니다. (예: `custom-button-style`)

### 5. 주석 및 TSDoc (Comments and TSDoc)

- 모든 React 컴포넌트, 복잡한 함수, 공개 API 모듈에는 **TSDoc** 스타일의 주석을 작성합니다.
- **첫 줄:** 객체의 목적을 간결하게 요약합니다.
- **자세한 설명:** 필요한 경우 매개변수(`@param`), 반환 값(`@returns`), 제네릭 타입 매개변수(`@typeParam`), 상속된 문서(`@inheritDoc`) 및 컴포넌트의 주요 동작 방식에 대한 설명을 포함합니다.
- **코드의 "왜"를 설명:** 단순한 코드의 동작보다는 해당 코드가 작성된 이유나 배경을 설명하는 데 중점을 둡니다.
- **명확하고 간결한 문장:** 완전한 문장으로 작성하고, 첫 글자는 대문자로 시작하며 적절한 구두점을 사용합니다.

```typescript
/**
 * 지정된 사용자의 프로필 정보를 비동기적으로 가져옵니다.
 * Tanstack Query를 사용하여 데이터를 캐싱하고 관리합니다.
 *
 * @param userId 가져올 사용자의 고유 ID
 * @returns 사용자 정보 객체를 포함하는 Query 결과 객체.
 * 데이터 로딩 중, 성공, 실패 상태를 포함합니다.
 * @example
 * const { data: userProfile, isLoading } = useUserProfileQuery('user123');
 */
function useUserProfileQuery(userId: string) {
  // ...
}

/**
 * @typeParam T - 처리할 데이터의 타입
 * @param data - 처리할 데이터 배열
 * @returns 각 요소를 대문자로 변환한 새로운 배열
 */
function toUpperArray<T extends string>(data: T[]): string[] {
  return data.map((item) => item.toUpperCase());
}

interface User {
  /** 사용자의 고유 식별자 */
  id: string;
  name: string;
  email: string;
}
```

### 6. 타입 명시 (Type Hints)

- TypeScript를 적극적으로 활용하여 모든 변수, 함수 매개변수, 반환 값에 타입을 명시합니다.
- 명확성을 위해 가능한 구체적인 타입을 사용합니다. `any` 타입의 사용은 최소화하고, 불가피할 경우 그 이유를 주석으로 남깁니다.
- `shadcn/ui` 컴포넌트 사용 시, 제공되는 타입을 적극 활용하거나 확장하여 사용합니다.

### 7. 컴포넌트 선언 (Component Declaration)

React 컴포넌트는 화살표 함수 (=>) 를 사용하여 선언하는 것을 권장합니다. props의 타입은 TypeScript 인터페이스나 type alias를 사용하여 명시합니다. React.FC는 암시적인 children prop 및 제네릭 타입 추론의 어려움 등으로 인해 사용을 지양합니다.

```typescript
import { useState, useEffect } from "react"; // React Hooks 직접 import

interface MyComponentProps {
  message: string;
}

/**
 * 메시지를 표시하는 간단한 컴포넌트입니다.
 * @param message 표시할 메시지 문자열
 * @returns 메시지를 담은 React 엘리먼트
 */
const MyComponent = ({ message }: MyComponentProps): React.ReactElement => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component unmounted");
    };
  }, []);

  return (
    <div>
      <p>{message}</p>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
};

export default MyComponent;
```

### 8. 폴더 구조 (Folder Structure - Feature-Sliced Design)

- 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 따릅니다.
- 주요 레이어는 다음과 같습니다:
  - `app`: 애플리케이션 전체 설정 (라우터, 스토어 초기화, 전역 스타일 등)
  - `pages`: 각 페이지 컴포넌트
  - `widgets`: 여러 feature나 entity를 조합하는 독립적인 UI 블록
  - `features`: 사용자 스토리와 관련된 기능 단위 (예: 사용자 인증, 주문하기)
  - `entities`: 핵심 비즈니스 엔티티 (예: User, Product, Order)
  - `shared`: 프로젝트 전반에서 재사용되는 로직이나 UI
    - `ui`: 재사용 가능한 UI 컴포넌트 (원자 컴포넌트, UI 키트)
    - `lib`: 유틸리티 함수, 헬퍼 함수, 커스텀 훅 등
    - `api`: 외부 API와의 통신을 담당하는 로직 (fetch 함수, API 클라이언트 설정 등)
    - `config`: 환경 변수, 상수 등 프로젝트 설정
    - `assets`: 이미지, 폰트 등 정적 자원
    - `styles`: 전역 스타일, 테마 관련 스타일
    - `types`: 애플리케이션 전역에서 사용되는 타입 정의 및 인터페이스
- **공개 API**
  - 각 Slice (`feature`, `entity` 등)와 Segment는 공개 API를 가집니다.
  - 공개 API는 해당 폴더의 `index.ts` 파일을 의미하며, 이 파일을 통해 외부로 필요한 기능만 명시적으로 export합니다.
  - 규칙:
    - `app` Slice와 Segment는 공개 API (`index.ts` 파일)에 정의된 Slice 기능과 컴포넌트만 사용해야 합니다.
    - 공개 API에 정의되지 않은 Slice 또는 Segment의 내부 부분은 격리된 것으로 간주되며, 해당 Slice 또는 Segment 내부에서만 접근할 수 있습니다.
    - 주의: 컴포넌트 파일 (`*.tsx`, `*.jsx`) 자체에서는 외부로 직접 `export default` 하는 것을 지양하고, 필요한 경우 해당 컴포넌트를 공개 API (`index.ts`)를 통해 export해야 합니다.
  - 목적:
    - Slice 및 Segment의 내부 구현 세부 사항을 숨기고 응집도를 높입니다.
    - 외부 레이어와의 의존성을 명확하게 관리하고, 변경 시 영향을 최소화합니다.
    - `import` 및 `export` 경로를 `index.ts` 파일로 집중시켜 유지보수성을 향상시킵니다.

### 9. 상태 관리 (State Management)

- **Zustand:** 전역 클라이언트 상태 관리에 사용합니다.
  - 스토어는 관심사별로 분리하여 간결하게 유지합니다.
  - 액션과 상태를 명확히 구분하여 정의합니다.
- **Tanstack Query (React Query):** 서버 상태 및 비동기 데이터 관리에 사용합니다.
  - `queryKey`는 명확하고 일관된 규칙으로 정의합니다.
  - `queryFn`, `mutationFn`을 명확하게 작성합니다.
  - 데이터 캐싱, `staleTime`, `cacheTime` 등을 적절히 활용하여 API 호출을 최적화합니다.
  - 로딩 상태, 에러 상태를 UI에 적절히 반영합니다.

### 10. 스타일링 (Styling)

- **Tailwind CSS:** 스타일링은 Tailwind CSS 유틸리티 클래스를 우선적으로 사용합니다.

  - HTML/JSX 구조 내에서 직접 스타일을 적용하여 가독성과 유지보수성을 높입니다.
  - **Tailwind CSS v4.0부터는 CSS-first 설정을 도입하여 프로젝트 설정을 JavaScript 파일 대신 CSS 파일에서 관리합니다.** 더 이상 `tailwind.config.js` 파일을 사용하지 않습니다.
  - **테마 설정:** `@theme` 키워드를 사용하여 폰트, 색상, 간격, breakpoints 등 디자인 토큰을 CSS 변수로 직접 정의합니다.

    ```css
    @import "tailwindcss";

    @theme {
      --font-display: "Satoshi", "sans-serif";
      --breakpoint-3xl: 1920px;
      --color-primary-500: oklch(0.8 0.15 50);
      --spacing: 0.25rem;
      /* ... */
    }
    ```

  - **CSS 변수 활용:** `@theme` 내에 정의된 디자인 토큰은 CSS 변수 형태로 자동 생성되어 CSS 내에서 `var(--token-name)`과 같이 참조하여 사용할 수 있습니다.
  - **동적 유틸리티 값 및 Variants:** Tailwind CSS v4.0은 많은 유틸리티와 Variants에서 임의의 값을 별도의 설정 없이 바로 사용할 수 있도록 개선되었습니다. 예를 들어, `grid-cols-15`, `opacity-75 data-current:opacity-100`, `mt-8` 등 다양한 값을 즉시 적용할 수 있습니다.

- **shadcn/ui:** UI 컴포넌트는 shadcn/ui를 기반으로 하며, 필요한 경우 **Tailwind CSS v4.0의 CSS-first 설정 방식** 및 컴포넌트 자체를 커스터마이징하여 사용합니다. shadcn/ui 컴포넌트의 스타일 변수를 `@theme` 내에서 재정의하거나, 필요한 커스텀 스타일을 추가합니다.
- **커스텀 CSS 최소화:** 불가피하게 커스텀 CSS가 필요한 경우, 해당 컴포넌트와 가장 가까운 곳에 위치시키거나 FSD의 `shared/ui/styles` 또는 `app/styles` 폴더 내에 용도에 맞게 작성합니다.
  - CSS Module 사용을 고려할 수 있습니다.
- Biome은 Tailwind CSS 클래스 순서를 자동으로 정렬하도록 설정할 수 있습니다.

## 11. 접근성(A11y)

접근성은 모든 사용자가 애플리케이션을 효과적으로 사용할 수 있도록 하는 중요한 요소입니다.
Scheduo는 WCAG 2.1 AA 수준을 준수하여 포용적인 사용자 경험을 제공합니다.

### 핵심 원칙

- **시맨틱 HTML 사용:** `<div onClick={...}>` 대신 `<button>`, 제목은 적절한 계층의 `<h1>~<h6>` 등 의미에 맞는 요소 사용
- **키보드 접근성:** 모든 상호작용은 키보드만으로 가능해야 함
- **적절한 ARIA 속성:** 시맨틱 HTML로 불충분할 때만 사용 (`aria-label`, `aria-expanded` 등)
- **색상 대비:** 텍스트는 4.5:1, 큰 텍스트는 3:1 이상의 대비 제공
- **포커스 관리:** 모달, 드롭다운 등 UI 요소의 열림/닫힘 시 적절한 포커스 관리

### 검토 포인트

- 모든 이미지에 적절한 `alt` 속성 제공
- 폼 요소는 명확한 레이블과 연결 (`<label for="id">`)
- 에러 메시지는 시각적으로만 전달하지 않고 프로그래밍 방식으로 연결
- 색상만으로 정보를 전달하지 말고 항상 텍스트나 아이콘 함께 제공
- 키보드 트랩 현상 방지 (모달 내에서만 포커스 순환 등)

## 12. 성능 최적화

성능은 사용자 경험의 핵심 요소입니다. 아래 가이드라인을 따라 최적화된 애플리케이션을 구축합니다.

### 렌더링 최적화

- **메모이제이션 적절히 사용:**

  - `useMemo`: 계산 비용이 큰 연산이나 객체/배열 생성 시만 사용
  - `useCallback`: 자식 컴포넌트로 전달되는 함수나 의존성 배열에 포함되는 함수에 사용
  - `React.memo`: 부모가 자주 렌더링되지만 자식 props는 거의 변경되지 않을 때 사용
  - 단순 계산이나 작은 객체에는 메모이제이션 불필요 (오버헤드 발생)

- **상태 업데이트 최적화:**
  - 상태 업데이트는 최소한으로 사용 (불필요한 리렌더링 방지)
  - 관련 상태는 단일 객체로 관리 (`useState` 여러 개 대신 하나의 객체 사용)
  - `useTransition`/`useDeferredValue`: React 18에서 무거운 UI 업데이트 시 사용

### 코드 분할 및 지연 로딩

- **라우트 기반 코드 분할:** 각 페이지를 별도 청크로 분할 (`React.lazy`, `Suspense` 활용)
- **컴포넌트 지연 로딩:** 초기에 필요없는 무거운 컴포넌트나 라이브러리는 지연 로딩
- **조건부 임포트:** 특정 조건에서만 필요한 모듈은 동적 임포트 활용

### 데이터 관리 최적화

- **Tanstack Query 최적화:**

  - 적절한 `staleTime`, `cacheTime` 설정으로 네트워크 요청 최소화
  - 체계적인 쿼리 키 구조화로 캐싱 효율 극대화
  - 필요한 경우에만 `refetchOnWindowFocus`, `refetchOnMount` 활성화

- **Zustand 최적화:**
  - 상태 정규화: 중첩보다 정규화된 상태 구조 사용
  - 선택적 구독: 필요한 상태만 구독하여 불필요한 렌더링 방지
  - 액션 최적화: 상태 업데이트 로직은 스토어 내에 정의

### 리소스 최적화

- **이미지:** 적절한 크기/포맷 사용, 지연 로딩(`loading="lazy"`) 적용
- **폰트:** 필요한 글리프만 로드, `font-display: swap` 사용
- **CSS:** 사용하지 않는 스타일 제거, Critical CSS 인라인

### 번들 최적화

- **트리 쉐이킹 활용:** 전체 라이브러리 대신 필요한 함수만 임포트
- **번들 분석:** 정기적으로 번들 크기 분석 및 최적화
- **사용하지 않는 코드 제거:** 데드 코드 제거로 번들 크기 축소

## 개발 도구 (Tooling)

- **코드 포매터 및 린터 (Code Formatter & Linter):** **Biome**을 사용합니다.
  - 프로젝트 루트에 있는 `biome.json` 파일을 통해 모든 팀원이 동일한 포맷팅 및 린팅 규칙을 적용받습니다.
  - **커밋 전 Biome 검사를 통과하도록 강제합니다.** 이를 위해 **Husky**를 사용하여 `pre-commit` 훅에 스크립트를 설정했습니다. (자세한 내용은 프로젝트의 `.husky/pre-commit` 파일 참조)
- **커밋 메시지 자동화:** **Commitizen**과 **cz-customizable**을 사용하여 일관된 커밋 메시지 작성을 자동화합니다.
  - `pnpm commit` 또는 `npm run commit` 명령어를 통해 커밋 메시지 작성 시 선택지를 제공합니다. (커밋 메시지 형식은 프로젝트 루트의 `.cz-config.cjs` 파일 참조)
- **버전 관리 (Version Control):** Git을 사용합니다.

## 코드 리뷰 가이드라인 (For Gemini Code Assist)

- **리뷰 언어:** 모든 코드 리뷰 코멘트는 **한글**로 작성합니다.
- **핵심 원칙 준수 여부 확인:** 위에 명시된 "주요 원칙" (가독성, 유지보수성, 일관성, 성능, 중복 최소화)을 기준으로 코드를 평가합니다.
- **스타일 가이드라인 준수 여부:** 본 문서의 "스타일 가이드라인" 각 항목을 기준으로 코드 스타일을 확인하고, 불일치 시 수정을 제안합니다.
- **FSD 아키텍처 준수:** 모듈의 위치, 레이어 간 의존성 규칙이 FSD 원칙에 맞는지 확인합니다.
- **TypeScript 활용도:** 타입 정의의 적절성, `any` 타입의 남용 여부, 타입 추론의 효율성 등을 검토합니다.
- **React Best Practices:** 컴포넌트 분리, props 전달 방식, 훅(Hook) 사용 규칙, 상태 관리 로직의 적절성 등을 확인합니다.
- **Zustand 및 Tanstack Query 사용법:** 각 라이브러리의 사용 목적에 맞게 올바르게 사용되었는지, 키 관리, 데이터 흐름 등이 명확한지 검토합니다.
- **Tailwind CSS 및 shadcn/ui 활용:** 유틸리티 우선 접근 방식이 잘 적용되었는지, 불필요한 커스텀 스타일이 최소화되었는지 확인합니다.
- **단순 제안보다는 이유 설명:** "이렇게 바꾸세요" 보다는 "이러이러한 이유로 이렇게 변경하는 것이 더 좋겠습니다" 와 같이 이유를 함께 설명하여 팀원의 이해를 돕습니다.
- **긍정적이고 건설적인 피드백:** 개선점에 초점을 맞추되, 긍정적이고 건설적인 방식으로 피드백을 전달합니다.

## 예시 코드 (React Component with TypeScript & JSDoc)

```typescript
// src/features/user-profile/ui/UserProfileCard.tsx
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"; // shadcn/ui 컴포넌트 예시
import type { User } from "@/entities/user/model/types"; // FSD 엔티티 타입 예시

interface UserProfileCardProps {
  /** 표시할 사용자 정보 객체 */
  user: User;
  /** 카드에 적용할 추가적인 Tailwind CSS 클래스 */
  className?: string;
}

/**
 * 사용자 프로필 정보를 카드 형태로 표시하는 컴포넌트입니다.
 * 아바타, 사용자 이름, 이메일 정보를 보여줍니다.
 *
 * @param user - 표시할 사용자 정보 객체
 * @param className - 카드 컨테이너에 적용될 추가 Tailwind CSS 클래스
 * @returns 사용자 프로필 카드 JSX 요소
 */
function UserProfileCard({
  user,
  className = "",
}: UserProfileCardProps): React.ReactElement {
  if (!user) {
    return <p className="text-red-500">사용자 정보를 불러올 수 없습니다.</p>;
  }

  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm p-6 ${className}`}
      data-testid={`user-profile-card-${user.id}`}
    >
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={user.avatarUrl} alt={`${user.name}의 아바타`} />
          <AvatarFallback>
            {user.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
      {user.bio && (
        <p className="mt-4 text-sm text-muted-foreground">{user.bio}</p>
      )}
    </div>
  );
}

export default UserProfileCard;
```
