// eslint-disable-next-line no-undef
module.exports = {
  types: [
    { value: 'feat', name: 'feat:\tfeature를 추가하는 경우' },
    { value: 'fix', name: 'fix:\t코드를 수정하는 경우' },
    { value: 'docs', name: 'docs:\t문서를 추가하거나 수정하는 경우' },
    { value: 'refactor', name: 'refactor:\t(버그나 기능 추가 X) 코드를 리팩토링하는 경우' },
    { value: 'design', name: 'design:\tCSS 등 사용자 UI 디자인 변경' },
    {
      value: 'style',
      name: 'style:\t코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우',
    },
    {
      value: 'test',
      name: 'test:\t(프로덕션 코드 변경 X) 테스트를 추가하거나 테스트 리팩토링하는 경우',
    },
    {
      value: 'chore',
      name: 'chore:\t빌드 태스크 업데이트, 패키지 매니저를 설정하는 경우',
    },
    {
      value: 'init',
      name: 'init:\t프로젝트 초기 생성',
    },
    {
      value: 'rename',
      name: 'rename:\t파일 혹은 폴더명 수정하거나 옮기는 경우',
    },
    {
      value: 'remove',
      name: 'remove:\t파일을 삭제하는 작업만 수행하는 경우',
    },
    {
      value: 'docs',
      name: 'docs:\t문서를 추가하거나 수정하는 경우',
    },
  ],
  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body'],
  subjectLimit: 100,
};
