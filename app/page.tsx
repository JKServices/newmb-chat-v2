'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const samples = ['감독님 저 취업 떨어졌어요','Fight 뜻이 뭔가요?','회사에서 억까 당했어요','책임은 누가 집니까?','소개팅 망했습니다','VAR 어떻게 생각하세요?'];

export default function HomePage(){
  const [question,setQuestion]=useState('');
  const [answer,setAnswer]=useState('Reset\n\n오늘 경기는 아직 끝나지 않았습니다.\n다음 플레이 준비하세요.\n폼은 돌아옵니다.');
  const [loading,setLoading]=useState(false);
  const [nick,setNick]=useState('나');
  const posterRef=useRef<HTMLDivElement>(null);
  const kakaoRef=useRef<HTMLDivElement>(null);

  async function ask(q?:string){
    const text=(q ?? question).trim();
    if(!text) return;
    setQuestion(text); setLoading(true);
    try{
      const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:text})});
      const data=await res.json();
      setAnswer(data.answer);
    }catch{ setAnswer('Recover\n\n서버가 잠깐 흔들렸습니다.\n그래도 경기는 계속됩니다.\n다시 시도하세요.'); }
    setLoading(false);
  }

  async function saveImage(ref:React.RefObject<HTMLDivElement | null>, name:string){
    if(!ref.current) return;
    const canvas=await html2canvas(ref.current,{backgroundColor:null,scale:2});
    const link=document.createElement('a');
    link.download=name;
    link.href=canvas.toDataURL('image/png');
    link.click();
  }

  async function copyText(){
    await navigator.clipboard.writeText(`${question}\n\n${answer}\n\nnewmb.chat`);
    alert('복사했습니다.');
  }

  const lines=answer.split('\n').filter(Boolean);
  const keyword=lines[0]||'Reset';
  const body=lines.slice(1).join('\n');

  return <main className="wrap">
    <section className="hero">
      <div className="brand">NEWMB<span className="dot">.</span>chat</div>
      <p className="sub">축구 감독풍 밈 답변과 공유용 짤을 만드는 비공식 패러디 서비스입니다.</p>
      <div className="nav"><a href="/about">About</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
    </section>

    <div className="grid">
      <section className="card">
        <h2>질문하기</h2>
        <p className="notice">실존 인물의 공식 발언이 아니라 AI/로컬 템플릿으로 생성되는 패러디 답변입니다.</p>
        <input value={nick} onChange={e=>setNick(e.target.value)} placeholder="닉네임" maxLength={16}/>
        <div style={{height:10}} />
        <textarea value={question} onChange={e=>setQuestion(e.target.value)} placeholder="예: 감독님 저 취업 떨어졌어요" maxLength={300}/>
        <div style={{height:12}} />
        <div className="row"><button onClick={()=>ask()} disabled={loading}>{loading?'전술 짜는 중...':'ASK'}</button><button className="secondary" onClick={()=>{const s=samples[Math.floor(Math.random()*samples.length)];ask(s)}}>랜덤 질문</button><button className="secondary" onClick={copyText}>텍스트 복사</button></div>
        <div style={{height:20}} />
        <div className="answer"><div className="keyword">{keyword}</div><div className="redline" />{body}</div>
        <div style={{height:20}} />
        <div className="ad">AdSense 자리</div>
      </section>

      <aside className="card">
        <h2>짤 저장</h2>
        <div ref={posterRef} className="poster">
          <div><div className="big">{keyword}</div><div className="redline" /><div className="txt">{body}</div></div>
          <div className="wm">NEWMB.chat · 비공식 패러디</div>
        </div>
        <div style={{height:12}} />
        <button onClick={()=>saveImage(posterRef,'newmb-poster.png')}>포스터 저장</button>
        <div style={{height:22}} />
        <div ref={kakaoRef} className="kakao">
          <b>NEWMB.chat</b>
          <div className="bubble-me">{question || '감독님 저 취업 떨어졌어요'}</div>
          <div className="bubble-ai"><b>{keyword}</b>\n\n{body}</div>
          <small>newmb.chat</small>
        </div>
        <div style={{height:12}} />
        <button onClick={()=>saveImage(kakaoRef,'newmb-kakao.png')}>카톡 스타일 저장</button>
      </aside>
    </div>

    <section className="card" style={{marginTop:18}}>
      <h2>인기 질문</h2>
      {samples.map(s=><button key={s} className="pill" onClick={()=>ask(s)}>{s}</button>)}
    </section>

    <footer className="footer">© NEWMB.chat. 비공식 패러디 서비스이며 특정 실존 인물, 단체, 기관의 공식 서비스가 아닙니다.</footer>
  </main>
}
