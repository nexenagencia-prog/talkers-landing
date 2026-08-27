function normalizeHref(href){
  if(!href) return '#';
  if(href==='casting'||href==='#casting') return '/casting';
  return href;
}
export default function SiteHeader({settings,nav=[]}){
  return <header className="talkers-header"><div className="header-inner"><a className="brand" href="/#top">{settings?.logo_url?<img src={settings.logo_url} alt={settings.brand_name||'Talkers'}/>:<span className="brand-mark">{(settings?.brand_name||'TALKERS').slice(0,1)}</span>}</a><nav className="navlinks">{nav.map(n=><a key={n.id||n.label} href={normalizeHref(n.href)}>{n.label}</a>)}</nav>{settings?.header_button_label&&<a className="navbtn" href={settings.header_button_href||'#contato'}>{settings.header_button_label}<span>→</span></a>}</div></header>
}
