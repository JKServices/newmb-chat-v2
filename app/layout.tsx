import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NEWMB.chat - 축구 밈 답변 생성기',
  description: '짧고 웃긴 축구 감독풍 패러디 답변과 공유용 짤을 만드는 웹사이트입니다.',
  openGraph: { title: 'NEWMB.chat', description: '축구 밈 답변 생성기', type: 'website' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body>{children}</body></html>;
}
