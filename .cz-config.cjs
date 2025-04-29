module.exports = {
	types: [
		{ value: ":sparkles: [Feat]", name: "✨ Feat: 새로운 기능 추가" },
		{ value: ":bug: [Fix]", name: "🐛 Fix: 버그 수정" },
		{ value: ":memo: [Docs]", name: "📝 Docs: 문서 수정" },
		{
			value: ":art: [Style]",
			name: "🎨 Style: 코드 스타일 변경 (포매팅, 세미콜론 등)",
		},
		{
			value: ":lipstick: [Design]",
			name: "💄 Design: 사용자 UI 디자인 변경 (CSS 등)",
		},
		{
			value: ":white_check_mark: [Test]",
			name: "✅ Test: 테스트 코드, 리팩토링 테스트 코드 추가",
		},
		{ value: ":recycle: [Refactor]", name: "♻️  Refactor: 코드 리팩토링" },
		{ value: ":construction: [Build]", name: "🚧 Build: 빌드 파일 수정" },
		{ value: ":globe_with_meridians: [Ci]", name: "🌐 Ci: CI 설정 파일 수정" },
		{
			value: ":wrench: [Chore]",
			name: "🔧 Chore: 빌드 업무 수정, 패키지 매니저 수정, 기타 잡다한 것",
		},
	],
	messages: {
		type: "커밋할 타입을 선택하세요",
		scope: "",
		subject: "커밋 메시지를 입력하세요(필수):\n",
		body: '변경에 대한 자세한 설명을 작성하세요 (선택사항). "|"로 줄바꿈이 가능합니다:\n',
		footer: "",
		confirmCommit: "이대로 커밋할까요?",
	},
	allowCustomScopes: false,
	skipQuestions: ["scope", "footer"],
	subjectLimit: 50,
	upperCaseSubject: true,
};
