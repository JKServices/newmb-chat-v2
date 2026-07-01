import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { makeLocalReply } from '@/lib/localReply';

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    const safeQuestion = String(question || '').slice(0, 300);
    if (!safeQuestion.trim()) return NextResponse.json({ answer: makeLocalReply('') });

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ answer: makeLocalReply(safeQuestion), source: 'local' });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-nano',
      messages: [
        { role: 'system', content: '너는 NEWMB라는 가상의 축구 밈 패러디 캐릭터다. 실존 인물 행세 금지. 실제 발언처럼 인용 금지. 답변은 영어 단어 1개, 빈 줄, 한국어 2~3줄. 총 5줄 이내. 코믹하지만 욕설/비하 금지. 질문이 축구가 아니어도 축구에 비유해라.' },
        { role: 'user', content: safeQuestion }
      ],
      temperature: 0.9,
      max_tokens: 120
    });
    const answer = completion.choices[0]?.message?.content?.trim() || makeLocalReply(safeQuestion);
    return NextResponse.json({ answer, source: 'openai' });
  } catch {
    return NextResponse.json({ answer: makeLocalReply('error'), source: 'fallback' });
  }
}
