const keywords = ['Reset','Forward','Pressure','Recover','Review','Discipline','Accountability','Focus','Fight','Balance'];

const templates = [
  '오늘 경기는 흔들렸습니다.\n핑계는 짧게, 훈련은 길게.\n책임은 벤치가 집니다.',
  '앞으로 가야 합니다.\n뒤에서 설명만 하면\n골은 안 들어갑니다.',
  '압박은 상대만 하는 게 아닙니다.\n내 멘탈도 압박합니다.\n버티는 쪽이 이깁니다.',
  '한 번 졌다고 시즌 끝 아닙니다.\n다음 경기 준비하세요.\n폼은 돌아옵니다.',
  'VAR처럼 인생도 돌려보고 싶죠.\n근데 판정은 나왔습니다.\n다음 플레이 가세요.',
  '억까는 있을 수 있습니다.\n하지만 패스미스는 기록에 남습니다.\n국룰입니다.',
  '상황은 여러 가지였습니다.\n그래도 마지막 책임은 제가 집니다.\n그러니까 다음 질문 주세요.',
  '댓글은 골을 넣지 않습니다.\n뛰는 사람이 넣습니다.\n집중하세요.',
  '싸우라는 건 축구를 하라는 뜻입니다.\n심판이랑 싸우면 집에 갑니다.\n그건 전술이 아닙니다.',
  '쉬어야 할 땐 쉽니다.\n뛸 땐 뜁니다.\n그게 밸런스입니다.'
];

export function makeLocalReply(question: string) {
  const q = question.toLowerCase();
  let i = Math.floor(Math.random() * keywords.length);
  if (q.includes('책임') || q.includes('남탓') || q.includes('핑계')) i = 6;
  if (q.includes('fight') || q.includes('싸')) i = 8;
  if (q.includes('var')) i = 4;
  if (q.includes('퇴사') || q.includes('헤어') || q.includes('떨어')) i = 3;
  return `${keywords[i]}\n\n${templates[i]}`;
}
