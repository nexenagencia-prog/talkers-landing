'use client';
import { useState } from 'react';
import CastingGrid from './CastingGrid';

function Buttons({items=[]}){return <div className="actions">{items.filter(Boolean).map((b,i)=><a key={i} className={`btn ${b.style==='alt'?'alt':''}`} href={b.href||'#'}>{b.label||'Saiba mais'} <span>↗</span></a>)}</div>}
function Icon({name='spark'}){
  const paths={
    target:<><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M15 9l5-5M17 4h3v3"/></>,
    spark:<><path d="M12 2l1.6 5.1L19 9l-5.4 1.9L12 16l-1.6-5.1L5 9l5.4-1.9L12 2z"/><path d="M5 15l.8 2.6L8.5 19l-2.7.9L5 22l-.8-2.1L1.5 19l2.7-1.4L5 15z"/></>,
    phone:<><rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M10 18h4"/></>,
    people:<><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.5 20c.3-4 2.3-6 5.5-6s5.2 2 5.5 6M14 15c3.5-.2 5.5 1.4 6 4.5"/></>,
    arrow:<><path d="M5 12h14M14 7l5 5-5 5"/></>,
    check:<><circle cx="12" cy="12" r="9"/><path d="M8 12l2.5 2.5L16 9"/></>
  };
  return <svg className="line-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]||paths.spark}</svg>
}

export default function SectionRenderer({section,settings}){
  const c=section.content||{};
  const kind=section.kind||'split';
  const cls=`section section-space ${c.theme==='dark'?'dark':'light'} ${kind==='hero'?'hero':''}`;
  const style={minHeight:c.min_height?`${c.min_height}px`:undefined,paddingTop:c.padding_y?`${c.padding_y}px`:undefined,paddingBottom:c.padding_y?`${c.padding_y}px`:undefined,backgroundColor:c.background_color||undefined,color:c.text_color||undefined};
  const bgStyle={backgroundImage:c.image_url?`url(${c.image_url})`:undefined,backgroundPosition:c.image_position||'center','--hero-mobile-position':c.image_position_mobile||'right center'};

  if(kind==='hero') return <section id={section.slug} className={`${cls} ${section.slug==='top'?'talkers-hero':''}`} style={style}>
    {c.image_url&&<div className="hero-bg" style={bgStyle}/>}<div className="hero-shade"/><div className="section-inner hero-inner"><div className="eyebrow">{c.eyebrow}</div><h1 className="h1">{c.title}</h1>{c.text&&<p className="lead">{c.text}</p>}<Buttons items={c.buttons}/>{c.feature_title&&<div className="hero-card">{c.feature_image_url&&<div className="hero-card-thumb" style={{backgroundImage:`url(${c.feature_image_url})`}}/>}<div><div className="small">{c.feature_kicker}</div><h3>{c.feature_title}</h3><p>{c.feature_text}</p></div><span className="circle-arrow">→</span></div>}</div>
  </section>;

  if(kind==='cards') return <section id={section.slug} className={`${cls} editorial-cards`} style={style}><div className="section-inner editorial-grid"><div className="editorial-copy"><div className="eyebrow">{c.eyebrow}</div><p className="microcopy">{c.text}</p><h2 className="h2">{c.title}</h2><Buttons items={c.buttons}/></div><div className="cards talkers-cards">{(c.cards||[]).map((x,i)=><article className="card talkers-card" key={i} style={{backgroundImage:`url(${x.image_url||''})`}}><div className="card-overlay"/><div className="card-content"><div className="small">{x.kicker}</div><h3>{x.title}</h3><p>{x.text}</p>{x.button_label&&<a className="mini-link" href={x.button_href||'#'}>{x.button_label}<span>→</span></a>}</div><div className="card-index">{String(i+1).padStart(2,'0')}</div></article>)}</div></div></section>;

  if(kind === 'features') return <section id={section.slug} className={`${cls} feature-section`} style={style}><div className="section-inner feature-layout">
    <div className="milestone-card"><div className="small">{c.milestone_kicker}</div><strong>{c.milestone_value}</strong><h3>{c.milestone_label}</h3><div className="counter-art"><span>{String(c.milestone_value||'100').slice(0,3)}</span></div></div>
    <div className="feature-content"><div className="eyebrow">{c.eyebrow}</div><h2 className="h2 compact">{c.title}</h2><div className="feature-grid">{(c.items||[]).map((x,i)=><div className="feature-item" key={i}><div className="icon-box"><Icon name={x.icon}/></div><h3>{x.title}</h3><p>{x.text}</p></div>)}</div></div>
  </div></section>;

  if(kind === 'testimonials') return <section id={section.slug} className={`${cls} testimonial-section`} style={style}><div className="section-inner"><div className="section-heading side-heading"><div><div className="eyebrow">{c.eyebrow}</div><h2 className="h2 compact">{c.title}</h2></div><div className="arrow-pair"><button>←</button><button>→</button></div></div><div className="testimonial-grid">{(c.items||[]).map((x,i)=><article key={i} className={`testimonial-card ${x.featured?'featured':''}`}><div className="stars">{x.rating||'★★★★★'}</div><blockquote>“{x.quote}”</blockquote><div className="testimonial-person">{x.image_url?<img src={x.image_url} alt=""/>:<span className="avatar-fallback">{(x.name||'T').slice(0,1)}</span>}<div><strong>{x.name}</strong><small>{x.role}</small></div></div></article>)}</div></div></section>;

  if(kind === 'brandstrip'){
    const t=settings?.theme_json||{};
    return <section id={section.slug} className={`${cls} brandstrip-section`} style={style}><div className="section-inner brandstrip"><div className="brand-pills">{(c.words||[]).map((w,i)=><span key={i} className={i===1?'accent':i===2?'black':''}>{w}</span>)}</div><div className="brand-copy"><h2>{c.title}</h2><p>{c.text}</p><small>{c.social_label}</small><div className="brand-socials"><a href={t.instagram_url||'#'}>ig</a><a href={t.linkedin_url||'#'}>in</a><a href={t.youtube_url||'#'}>▶</a></div>{c.button_label&&<a className="outline-link" href={c.button_href||'#'}>{c.button_label}<span>→</span></a>}</div></div></section>;
  }

  if(kind === 'services') return <section id={section.slug} className={`${cls} services-section`} style={style}><div className="section-inner"><div className="center-heading"><div className="eyebrow">{c.eyebrow}</div><h2 className="h2 compact">{c.title}</h2></div><div className="service-grid">{(c.cards||[]).map((x,i)=><article className="service-card" key={i} style={{backgroundImage:x.image_url?`linear-gradient(180deg,rgba(70,0,0,.1),rgba(26,0,0,.72)),url(${x.image_url})`:undefined}}><div className="service-kicker">{x.kicker}</div><h3>{x.title}</h3><p>{x.text}</p><span className="service-arrow">→</span></article>)}</div></div></section>;

  if(kind === 'growth') return <section id={section.slug} className={`${cls} growth-section`} style={style}><div className="section-inner"><div className="growth-panel"><div className="growth-copy"><div className="eyebrow">{c.eyebrow}</div><h2>{c.title}</h2><p>{c.text}</p></div><div className="growth-metrics">{(c.items||[]).map((x,i)=><div key={i}><strong>{x.value}</strong><span>{x.text}</span></div>)}</div></div></div></section>;

  if(kind === 'connection') return <section id={section.slug} className={`${cls} connection-section`} style={style}><div className="section-inner"><div className="connection-panel"><div className="connection-main"><div className="connection-copy"><div className="connection-kicker">{c.eyebrow}<span>{c.badge||'01'}</span></div><h2>{c.title}</h2><p>{c.text}</p></div><div className="plane-art" aria-hidden="true"><img src="/plane-talkers.png" alt="" /></div></div><div className="connection-bottom"><div className="connection-stats">{(c.items||[]).map((x,i)=><div className="connection-stat" key={i}><span>{x.label}</span><strong>{x.value}</strong></div>)}</div><div className="connection-brief"><h3>{c.brief_title}</h3><p>{c.brief_text}</p></div></div></div></div></section>;

  if(kind === 'casting') return <section id={section.slug} className={`${cls} casting-home`} style={style}><div className="section-inner"><div className="section-heading side-heading"><div><div className="eyebrow">{c.eyebrow}</div><h2 className="h2 compact">{c.title}</h2><p className="casting-home-text">{c.text}</p></div>{c.button_label&&<a className="outline-link" href={c.button_href||'/casting'}>{c.button_label}<span>→</span></a>}</div><CastingGrid speakers={c.speakers||[]}/></div></section>;

  if(kind === 'cta') return <section id={section.slug} className={`${cls} cta-section`} style={style}><div className="section-inner"><div className="cta-panel"><div><div className="eyebrow">{c.eyebrow}</div><h2>{c.title}</h2>{c.text&&<p>{c.text}</p>}</div><a className="cta-button" href={c.button_href||'#'}>{c.button_label||'Fale com a Talkers'}<span>{c.button_icon==='whatsapp'?'◉':'→'}</span></a></div></div></section>;

  if(kind === 'statement') return <section id={section.slug} className={cls} style={style}><div className="section-inner"><div className="statement-box"><div className="eyebrow">{c.eyebrow}</div><h2 className="h2">{c.title}</h2>{c.text&&<p className="lead">{c.text}</p>}</div></div></section>;
  if(kind === 'media') return <section id={section.slug} className={cls} style={style}><div className="section-inner"><div className="eyebrow">{c.eyebrow}</div><h2 className="h2">{c.title}</h2>{c.text&&<p className="lead">{c.text}</p>}<div className="mediawrap"><div className="media" style={bgStyle}>{c.video_url?<video className="media-video" src={c.video_url} poster={c.poster_url||undefined} controls autoPlay={!!c.video_autoplay} muted={c.video_muted!==false} loop playsInline/>:c.audio_url?<audio controls autoPlay={!!c.audio_autoplay} src={c.audio_url} className="media-audio"/>:<button className="play">▶</button>}</div><div className="quote"><div className="small">{c.quote_kicker}</div><strong>{c.quote_name}</strong><p>{c.quote_text}</p></div></div></div></section>;
  if(kind === 'stats') return <section id={section.slug} className={cls} style={style}><div className="section-inner"><div className="eyebrow">{c.eyebrow}</div>{c.title&&<h2 className="h2">{c.title}</h2>}{c.text&&<p className="lead">{c.text}</p>}<div className="stats">{(c.items||[]).map((x,i)=><div className="stat" key={i}><span>{x.text}</span><b>{x.value}</b></div>)}</div></div></section>;
  if(kind === 'faq') return <section id={section.slug} className={`${cls} faq-section`} style={style}><div className="section-inner"><div className="faq"><div className="eyebrow" style={{textAlign:'center'}}>{c.eyebrow}</div><h2 className="h2 compact">{c.title}</h2>{c.text&&<p className="lead faqlead">{c.text}</p>}{(c.items||[]).map((x,i)=><FaqItem key={i} item={x}/>)}</div></div></section>;
  return <section id={section.slug} className={cls} style={style}><div className="section-inner grid2"><div><div className="eyebrow">{c.eyebrow}</div><h2 className="h2">{c.title}</h2>{c.text&&<p className="lead">{c.text}</p>}<Buttons items={c.buttons}/></div><div className="splitimg" style={bgStyle}/></div></section>;
}
function FaqItem({item}){const [open,setOpen]=useState(false);return <div className="faqitem"><button className="faqbtn" onClick={()=>setOpen(!open)}><span>{item.question}</span><span>{open?'×':'+'}</span></button>{open&&<div className="faqans">{item.answer}</div>}</div>}
