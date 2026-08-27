'use client';
import { useEffect, useState } from 'react';

const IconArrow = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>;
const IconClose = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>;

export default function CastingGrid({ speakers=[] }){
  const [active,setActive]=useState(null);
  useEffect(()=>{
    const onKey=(e)=>e.key==='Escape'&&setActive(null);
    window.addEventListener('keydown',onKey);
    document.body.style.overflow=active?'hidden':'';
    return ()=>{window.removeEventListener('keydown',onKey);document.body.style.overflow=''};
  },[active]);

  return <>
    <div className="casting-grid">
      {speakers.map((s,i)=><button className="speaker-card" key={s.id||i} onClick={()=>setActive(s)} aria-label={`Abrir perfil de ${s.name}`}>
        <div className="speaker-photo" style={{backgroundImage:`url(${s.image_url||''})`}}>
          <div className="speaker-topline"><span>{s.category||'Talkers'}</span><span className="speaker-index">{String(i+1).padStart(2,'0')}</span></div>
          <div className="speaker-bottom">
            <div><h3>{s.name}</h3><p>{s.short||s.role||'Palestrante Talkers'}</p></div>
            <span className="round-icon"><IconArrow/></span>
          </div>
        </div>
      </button>)}
    </div>
    {active&&<div className="speaker-modal" role="dialog" aria-modal="true" onMouseDown={(e)=>e.target===e.currentTarget&&setActive(null)}>
      <div className="speaker-modal-card">
        <button className="modal-close" onClick={()=>setActive(null)} aria-label="Fechar"><IconClose/></button>
        <div className="modal-photo" style={{backgroundImage:`url(${active.image_url||''})`}}/>
        <div className="modal-copy">
          <div className="eyebrow">{active.category||'Casting Talkers'}</div>
          <h2>{active.name}</h2>
          <p className="modal-role">{active.role||active.short}</p>
          <p>{active.bio||active.description||'Uma voz selecionada pela curadoria Talkers para eventos que exigem repertório, presença e aderência ao contexto.'}</p>
          <div className="speaker-tags">{(active.tags||['Estratégia','Repertório','Impacto']).map((t,i)=><span key={i}>{t}</span>)}</div>
          <a className="btn casting-cta" href={active.href||'/#contato'}>Consultar disponibilidade <IconArrow/></a>
        </div>
      </div>
    </div>}
  </>
}
