'use client';
import { useState } from 'react';

function Buttons({ items=[] }) { return <div className="actions">{items.filter(Boolean).map((b,i)=><a key={i} className={`btn ${b.style==='alt'?'alt':''}`} href={b.href||'#'}>{b.label||'Saiba mais'} <span>↗</span></a>)}</div> }

export default function SectionRenderer({ section }) {
  const c = section.content || {};
  const kind = section.kind || 'split';
  const cls = `section ${c.theme==='dark'?'dark':'light'} ${kind==='hero'?'hero':''} ${kind==='statement'?'statement':''}`;
  const style={minHeight:c.min_height?`${c.min_height}px`:undefined,paddingTop:c.padding_y?`${c.padding_y}px`:undefined,paddingBottom:c.padding_y?`${c.padding_y}px`:undefined,backgroundColor:c.background_color||undefined,color:c.text_color||undefined};
  const bgStyle={backgroundImage:c.image_url?`url(${c.image_url})`:undefined,backgroundPosition:c.image_position||'center'};

  if (kind === 'hero') return <section id={section.slug} className={cls} style={style}>
    {c.image_url && <div className="hero-bg" style={bgStyle}/>}<div className="section-inner"><div className="eyebrow">{c.eyebrow}</div><h1 className="h1">{c.title}</h1>{c.text&&<p className="lead">{c.text}</p>}<Buttons items={c.buttons}/>{c.feature_title&&<div className="hero-card"><div className="small">{c.feature_kicker}</div><h3>{c.feature_title}</h3><div>{c.feature_text}</div></div>}</div>
  </section>;

  if (kind === 'cards') return <section id={section.slug} className={cls} style={style}><div className="section-inner grid2"><div><div className="eyebrow">{c.eyebrow}</div><h2 className="h2">{c.title}</h2>{c.text&&<p className="lead">{c.text}</p>}<Buttons items={c.buttons}/></div><div className="cards">{(c.cards||[]).map((x,i)=><div className="card" key={i} style={{backgroundImage:`url(${x.image_url||''})`}}><div className="small">{x.kicker}</div><h3>{x.title}</h3><p>{x.text}</p>{x.button_label&&<a className="btn alt" href={x.button_href||'#'}>{x.button_label} ↗</a>}</div>)}</div></div></section>;

  if (kind === 'statement') return <section id={section.slug} className={cls} style={style}><div className="section-inner"><div className="statement-box"><div className="eyebrow">{c.eyebrow}</div><h2 className="h2">{c.title}</h2>{c.text&&<p className="lead">{c.text}</p>}</div></div></section>;

  if (kind === 'media') return <section id={section.slug} className={cls} style={style}><div className="section-inner"><div className="eyebrow">{c.eyebrow}</div><h2 className="h2">{c.title}</h2>{c.text&&<p className="lead">{c.text}</p>}<div className="mediawrap"><div className="media" style={bgStyle}>{c.video_url?<video className="media-video" src={c.video_url} poster={c.poster_url||undefined} controls autoPlay={!!c.video_autoplay} muted={c.video_muted!==false} loop playsInline/>:c.audio_url?<audio controls autoPlay={!!c.audio_autoplay} src={c.audio_url} className="media-audio"/>:<button className="play">▶</button>}</div><div className="quote"><div className="small">{c.quote_kicker}</div><strong>{c.quote_name}</strong><p>{c.quote_text}</p></div></div></div></section>;

  if (kind === 'stats') return <section id={section.slug} className={cls} style={style}><div className="section-inner"><div className="eyebrow">{c.eyebrow}</div>{c.title&&<h2 className="h2">{c.title}</h2>}{c.text&&<p className="lead">{c.text}</p>}<div className="stats">{(c.items||[]).map((x,i)=><div className="stat" key={i}><span>{x.text}</span><b>{x.value}</b></div>)}</div></div></section>;

  if (kind === 'faq') return <section id={section.slug} className={cls} style={style}><div className="section-inner"><div className="faq"><div className="eyebrow" style={{textAlign:'center'}}>{c.eyebrow}</div><h2 className="h2">{c.title}</h2>{c.text&&<p className="lead faqlead">{c.text}</p>}{(c.items||[]).map((x,i)=><FaqItem key={i} item={x}/>)}</div></div></section>;

  return <section id={section.slug} className={cls} style={style}><div className="section-inner grid2"><div><div className="eyebrow">{c.eyebrow}</div><h2 className="h2">{c.title}</h2>{c.text&&<p className="lead">{c.text}</p>}<Buttons items={c.buttons}/></div><div className="splitimg" style={bgStyle}/></div></section>;
}
function FaqItem({item}){const [open,setOpen]=useState(false);return <div className="faqitem"><button className="faqbtn" onClick={()=>setOpen(!open)}><span>{item.question}</span><span>{open?'×':'+'}</span></button>{open&&<div className="faqans">{item.answer}</div>}</div>}
