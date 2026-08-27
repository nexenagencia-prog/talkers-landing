'use client';
import { useEffect, useState } from 'react';

const blankByKind = {
  hero:{eyebrow:'Seção',title:'Novo título',text:'Novo texto',image_url:'',image_position:'center',theme:'dark',min_height:1080,buttons:[],feature_kicker:'',feature_title:'',feature_text:''},
  cards:{eyebrow:'Seção',title:'Novo título',text:'Novo texto',theme:'light',min_height:1080,buttons:[],cards:[]},
  statement:{eyebrow:'Seção',title:'Novo título',text:'Novo texto',theme:'light',min_height:1080},
  media:{eyebrow:'Seção',title:'Novo título',text:'Novo texto',image_url:'',video_url:'',audio_url:'',poster_url:'',video_autoplay:false,video_muted:true,audio_autoplay:false,theme:'light',min_height:1080,quote_kicker:'',quote_name:'',quote_text:''},
  stats:{eyebrow:'Números',title:'Resultados',theme:'light',min_height:1080,items:[]},
  split:{eyebrow:'Seção',title:'Novo título',text:'Novo texto',image_url:'',image_position:'center',theme:'light',min_height:1080,buttons:[]},
  faq:{eyebrow:'FAQ',title:'Common Questions',text:'',theme:'light',min_height:1080,items:[]},
};
const blankSection={id:null,slug:'nova-secao',kind:'split',sort_order:50,enabled:true,content:blankByKind.split};

export default function AdminClient({authenticated,initialData=null,initialError=null}){
 const [auth,setAuth]=useState(authenticated),[password,setPassword]=useState(''),[data,setData]=useState(initialData),[msg,setMsg]=useState(initialError||''),[uploading,setUploading]=useState(false);
 async function login(e){
   e.preventDefault();
   setMsg('Entrando...');
   try{
     const r=await fetch('/api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password}),credentials:'same-origin'});
     if(r.ok){location.reload();return;}
     setMsg('Senha inválida');
   }catch(e){setMsg('Não foi possível entrar. Tente novamente.');}
 }
 async function api(action,payload={}){
   setMsg('Salvando...');
   try{
     const r=await fetch('/api/cms',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action,...payload}),credentials:'same-origin'});
     const j=await r.json().catch(()=>({}));
     if(!r.ok){setMsg(j.error||'Erro ao salvar');if(r.status===401)setAuth(false);return;}
     setMsg('Salvo com sucesso');
     location.reload();
   }catch(e){setMsg('Erro de conexão ao salvar');}
 }
 async function upload(file){if(!file)return null;setUploading(true);const f=new FormData();f.append('file',file);const r=await fetch('/api/upload',{method:'POST',body:f});const j=await r.json();setUploading(false);if(!r.ok){setMsg(j.error||'Erro no upload');return null}setMsg('Upload concluído');return j.url;}
 if(!auth)return <div className="login"><form className="loginbox" onSubmit={login}><h1>CMS</h1><p className="small">Entre com a senha configurada em ADMIN_PASSWORD na Vercel.</p><F label="Senha" type="password" value={password} onChange={setPassword}/><button>Entrar</button>{msg&&<p>{msg}</p>}</form></div>;
 if(!data)return <div className="admin"><div className="panel"><h2>CMS</h2><p>{msg||'Não foi possível carregar os dados do CMS.'}</p><button onClick={()=>location.reload()}>Tentar novamente</button></div></div>;
 return <div className="admin"><div className="adminbar"><h1>CMS completo</h1><a href="/" target="_blank"><button className="secondary">Ver site</button></a><button className="secondary" onClick={async()=>{await fetch('/api/logout',{method:'POST'});location.reload()}}>Sair</button></div>{msg&&<p>{msg}</p>}
  <SettingsPanel settings={data.settings||{}} save={x=>api('save_settings',{data:x})} upload={upload} uploading={uploading}/>
  <NavPanel nav={data.nav||[]} save={x=>api('save_nav',{data:x})} del={id=>api('delete_nav',{id})}/>
  <SectionsPanel sections={data.sections||[]} save={x=>api('save_section',{data:x})} del={id=>api('delete_section',{id})} upload={upload} uploading={uploading}/>
 </div>
}

function SettingsPanel({settings,save,upload,uploading}){
 const [x,setX]=useState(settings);useEffect(()=>setX(settings),[settings]);
 const theme=x.theme_json||{};
 return <div className="panel"><h2>Configurações gerais</h2><p className="small">Marca, logo, favicon, botão do topo, rodapé e cores globais.</p>
 <div className="row"><F label="Nome da marca" value={x.brand_name} onChange={v=>setX({...x,brand_name:v})}/><MediaField label="Logo" value={x.logo_url} accept="image/*" upload={upload} onChange={v=>setX({...x,logo_url:v})}/><MediaField label="Favicon" value={x.favicon_url} accept="image/*" upload={upload} onChange={v=>setX({...x,favicon_url:v})}/><F label="Botão do topo" value={x.header_button_label} onChange={v=>setX({...x,header_button_label:v})}/><F label="Link do botão" value={x.header_button_href} onChange={v=>setX({...x,header_button_href:v})}/><F label="Cor de fundo" type="color" value={theme.bg||'#f4f4f2'} onChange={v=>setX({...x,theme_json:{...theme,bg:v}})}/><F label="Cor principal" type="color" value={theme.ink||'#0b0b0b'} onChange={v=>setX({...x,theme_json:{...theme,ink:v}})}/><F label="Raio dos cards (px)" type="number" value={theme.radius??28} onChange={v=>setX({...x,theme_json:{...theme,radius:+v}})}/></div>
 <F area label="Texto do rodapé" value={x.footer_text} onChange={v=>setX({...x,footer_text:v})}/>
 <div className="toolbar"><button onClick={()=>save(x)}>Salvar configurações</button>{uploading&&<span>Enviando...</span>}</div></div>
}

function NavPanel({nav,save,del}){const [items,setItems]=useState(nav);useEffect(()=>setItems(nav),[nav]);return <div className="panel"><div className="toolbar"><h2 style={{marginRight:'auto'}}>Menus</h2><button onClick={()=>setItems([...items,{label:'Novo menu',href:'#',sort_order:99,enabled:true}])}>+ Menu</button></div>{items.map((n,i)=><div className="row itembox" key={n.id||`new${i}`}><F label="Texto do menu" value={n.label} onChange={v=>upd(setItems,items,i,{...n,label:v})}/><F label="Link" value={n.href} onChange={v=>upd(setItems,items,i,{...n,href:v})}/><F label="Ordem" type="number" value={n.sort_order} onChange={v=>upd(setItems,items,i,{...n,sort_order:+v})}/><div className="toolbar"><label><input type="checkbox" checked={n.enabled!==false} onChange={e=>upd(setItems,items,i,{...n,enabled:e.target.checked})}/> Ativo</label><button onClick={()=>save(items[i])}>Salvar</button>{n.id&&<button className="danger" onClick={()=>del(n.id)}>Excluir</button>}</div></div>)}</div>}

function SectionsPanel({sections,save,del,upload,uploading}){
 const [items,setItems]=useState(sections);useEffect(()=>setItems(sections),[sections]);
 function add(){setItems([...items,JSON.parse(JSON.stringify(blankSection))])}
 return <div className="panel"><div className="toolbar"><h2 style={{marginRight:'auto'}}>Seções da página</h2><button onClick={add}>+ Nova seção</button></div><p className="small">Agora cada campo é editado individualmente. Não é necessário mexer em JSON.</p><div className="sectionslist">{items.map((s,i)=><SectionEditor key={s.id||`new${i}`} item={s} onChange={v=>upd(setItems,items,i,v)} save={save} del={del} upload={upload} uploading={uploading}/>)}</div></div>
}

function SectionEditor({item,onChange,save,del,upload,uploading}){
 const c=item.content||{};
 const setC=(patch)=>onChange({...item,content:{...c,...patch}});
 function changeKind(kind){onChange({...item,kind,content:{...(blankByKind[kind]||blankByKind.split),...c}})}
 return <details className="sectionedit" open={!item.id}><summary><b>{c.title||item.slug||'Nova seção'}</b><span>{item.kind} • ordem {item.sort_order}</span></summary>
  <div className="row topfields"><F label="Slug / âncora" value={item.slug} onChange={v=>onChange({...item,slug:v})}/><Select label="Tipo" value={item.kind} options={['hero','cards','statement','media','stats','split','faq']} onChange={changeKind}/><F label="Ordem" type="number" value={item.sort_order} onChange={v=>onChange({...item,sort_order:+v})}/><div className="field"><label>Status</label><label className="check"><input type="checkbox" checked={item.enabled!==false} onChange={e=>onChange({...item,enabled:e.target.checked})}/> Publicada</label></div></div>
  <CommonFields c={c} setC={setC}/>
  {(item.kind==='hero'||item.kind==='split'||item.kind==='cards'||item.kind==='media')&&<MediaSpecific kind={item.kind} c={c} setC={setC} upload={upload}/>} 
  {(item.kind==='hero'||item.kind==='split'||item.kind==='cards')&&<ButtonsEditor items={c.buttons||[]} onChange={buttons=>setC({buttons})}/>} 
  {item.kind==='hero'&&<div className="subpanel"><h3>Card de destaque da Hero</h3><div className="row"><F label="Kicker" value={c.feature_kicker} onChange={v=>setC({feature_kicker:v})}/><F label="Título" value={c.feature_title} onChange={v=>setC({feature_title:v})}/><F area label="Texto" value={c.feature_text} onChange={v=>setC({feature_text:v})}/></div></div>}
  {item.kind==='cards'&&<CardsEditor items={c.cards||[]} onChange={cards=>setC({cards})} upload={upload}/>} 
  {item.kind==='media'&&<QuoteEditor c={c} setC={setC}/>} 
  {item.kind==='stats'&&<StatsEditor items={c.items||[]} onChange={items=>setC({items})}/>} 
  {item.kind==='faq'&&<FaqEditor items={c.items||[]} onChange={items=>setC({items})}/>} 
  <div className="toolbar savebar"><button onClick={()=>save(item)}>Salvar seção</button>{item.id&&<button className="danger" onClick={()=>del(item.id)}>Excluir seção</button>}{uploading&&<span>Enviando mídia...</span>}</div>
 </details>
}

function CommonFields({c,setC}){return <div className="subpanel"><h3>Conteúdo e aparência</h3><div className="row"><F label="Etiqueta / eyebrow" value={c.eyebrow} onChange={v=>setC({eyebrow:v})}/><Select label="Tema" value={c.theme||'light'} options={['light','dark']} onChange={v=>setC({theme:v})}/><F label="Altura mínima desktop (px)" type="number" value={c.min_height??1080} onChange={v=>setC({min_height:+v})}/><F label="Padding vertical (px)" type="number" value={c.padding_y??54} onChange={v=>setC({padding_y:+v})}/><F label="Cor de fundo opcional" type="color" value={c.background_color||'#f7f7f5'} onChange={v=>setC({background_color:v})}/><F label="Cor do texto opcional" type="color" value={c.text_color||'#0b0b0b'} onChange={v=>setC({text_color:v})}/></div><F label="Título" value={c.title} onChange={v=>setC({title:v})}/><F area label="Texto / subtítulo" value={c.text} onChange={v=>setC({text:v})}/></div>}

function MediaSpecific({kind,c,setC,upload}){return <div className="subpanel"><h3>Mídia</h3><div className="row"><MediaField label="Imagem principal" value={c.image_url} accept="image/*" upload={upload} onChange={v=>setC({image_url:v})}/><Select label="Posição da imagem" value={c.image_position||'center'} options={['center','top','bottom','left','right']} onChange={v=>setC({image_position:v})}/>{kind==='media'&&<><MediaField label="Vídeo" value={c.video_url} accept="video/*" upload={upload} onChange={v=>setC({video_url:v})}/><MediaField label="Áudio" value={c.audio_url} accept="audio/*" upload={upload} onChange={v=>setC({audio_url:v})}/><MediaField label="Poster do vídeo" value={c.poster_url} accept="image/*" upload={upload} onChange={v=>setC({poster_url:v})}/><div className="field"><label>Reprodução</label><label className="check"><input type="checkbox" checked={!!c.video_autoplay} onChange={e=>setC({video_autoplay:e.target.checked})}/> Vídeo automático</label><label className="check"><input type="checkbox" checked={c.video_muted!==false} onChange={e=>setC({video_muted:e.target.checked})}/> Vídeo sem som</label><label className="check"><input type="checkbox" checked={!!c.audio_autoplay} onChange={e=>setC({audio_autoplay:e.target.checked})}/> Áudio automático</label></div></>}</div></div>}

function ButtonsEditor({items,onChange}){return <Repeater title="Botões" addLabel="+ Botão" onAdd={()=>onChange([...items,{label:'Novo botão',href:'#',style:'default'}])}>{items.map((b,i)=><div className="itembox" key={i}><div className="row"><F label="Texto" value={b.label} onChange={v=>arrPatch(items,onChange,i,{...b,label:v})}/><F label="Link" value={b.href} onChange={v=>arrPatch(items,onChange,i,{...b,href:v})}/><Select label="Estilo" value={b.style||'default'} options={['default','alt']} onChange={v=>arrPatch(items,onChange,i,{...b,style:v})}/></div><ItemActions i={i} items={items} onChange={onChange}/></div>)}</Repeater>}

function CardsEditor({items,onChange,upload}){return <Repeater title="Cards" addLabel="+ Card" onAdd={()=>onChange([...items,{kicker:'',title:'Novo card',text:'',image_url:'',button_label:'Saiba mais',button_href:'#'}])}>{items.map((x,i)=><div className="itembox" key={i}><div className="row"><F label="Kicker" value={x.kicker} onChange={v=>arrPatch(items,onChange,i,{...x,kicker:v})}/><F label="Título" value={x.title} onChange={v=>arrPatch(items,onChange,i,{...x,title:v})}/><MediaField label="Imagem" value={x.image_url} accept="image/*" upload={upload} onChange={v=>arrPatch(items,onChange,i,{...x,image_url:v})}/><F label="Texto do botão" value={x.button_label} onChange={v=>arrPatch(items,onChange,i,{...x,button_label:v})}/><F label="Link do botão" value={x.button_href} onChange={v=>arrPatch(items,onChange,i,{...x,button_href:v})}/></div><F area label="Texto" value={x.text} onChange={v=>arrPatch(items,onChange,i,{...x,text:v})}/><ItemActions i={i} items={items} onChange={onChange}/></div>)}</Repeater>}

function QuoteEditor({c,setC}){return <div className="subpanel"><h3>Depoimento / card lateral</h3><div className="row"><F label="Etiqueta" value={c.quote_kicker} onChange={v=>setC({quote_kicker:v})}/><F label="Nome" value={c.quote_name} onChange={v=>setC({quote_name:v})}/></div><F area label="Texto" value={c.quote_text} onChange={v=>setC({quote_text:v})}/></div>}

function StatsEditor({items,onChange}){return <Repeater title="Números / indicadores" addLabel="+ Indicador" onAdd={()=>onChange([...items,{text:'Descrição',value:'0+'}])}>{items.map((x,i)=><div className="itembox" key={i}><div className="row"><F label="Descrição" value={x.text} onChange={v=>arrPatch(items,onChange,i,{...x,text:v})}/><F label="Número / valor" value={x.value} onChange={v=>arrPatch(items,onChange,i,{...x,value:v})}/></div><ItemActions i={i} items={items} onChange={onChange}/></div>)}</Repeater>}

function FaqEditor({items,onChange}){return <Repeater title="Perguntas e respostas" addLabel="+ Pergunta" onAdd={()=>onChange([...items,{question:'Nova pergunta',answer:'Nova resposta'}])}>{items.map((x,i)=><div className="itembox" key={i}><F label="Pergunta" value={x.question} onChange={v=>arrPatch(items,onChange,i,{...x,question:v})}/><F area label="Resposta" value={x.answer} onChange={v=>arrPatch(items,onChange,i,{...x,answer:v})}/><ItemActions i={i} items={items} onChange={onChange}/></div>)}</Repeater>}

function Repeater({title,addLabel,onAdd,children}){return <div className="subpanel"><div className="toolbar"><h3 style={{marginRight:'auto'}}>{title}</h3><button className="secondary" onClick={onAdd}>{addLabel}</button></div>{children}</div>}
function ItemActions({i,items,onChange}){return <div className="toolbar"><button className="secondary" disabled={i===0} onClick={()=>move(items,onChange,i,-1)}>↑</button><button className="secondary" disabled={i===items.length-1} onClick={()=>move(items,onChange,i,1)}>↓</button><button className="danger" onClick={()=>onChange(items.filter((_,j)=>j!==i))}>Remover</button></div>}
function MediaField({label,value='',accept,upload,onChange}){return <div className="field"><label>{label}</label><input value={value||''} placeholder="URL ou envie um arquivo" onChange={e=>onChange(e.target.value)}/><input className="fileinput" type="file" accept={accept} onChange={async e=>{const u=await upload(e.target.files?.[0]);if(u)onChange(u)}}/></div>}
function Select({label,value,options,onChange}){return <div className="field"><label>{label}</label><select value={value||options[0]} onChange={e=>onChange(e.target.value)}>{options.map(o=><option key={o} value={o}>{o}</option>)}</select></div>}
function F({label,value='',onChange,area=false,type='text'}){return <div className="field"><label>{label}</label>{area?<textarea value={value||''} onChange={e=>onChange(e.target.value)}/>:<input type={type} value={value??''} onChange={e=>onChange(e.target.value)}/>}</div>}
function upd(setter,items,i,value){const a=[...items];a[i]=value;setter(a)}
function arrPatch(items,onChange,i,value){const a=[...items];a[i]=value;onChange(a)}
function move(items,onChange,i,dir){const j=i+dir;if(j<0||j>=items.length)return;const a=[...items];[a[i],a[j]]=[a[j],a[i]];onChange(a)}
