export default function SiteHeader({settings, nav}){
  const t=settings?.theme_json||{};
  return <div className="shell" style={{'--cms-bg':t.bg||undefined,'--cms-ink':t.ink||undefined,'--cms-radius':t.radius?`${t.radius}px`:undefined}}><nav className="nav"><a className="brand" href="#top">{settings?.logo_url?<img src={settings.logo_url} alt={settings.brand_name||'Logo'} style={{height:26}}/>:(settings?.brand_name||'BRAND')}</a><div className="navlinks">{nav.map(n=><a key={n.id} href={n.href}>{n.label}</a>)}</div>{settings?.header_button_label&&<a className="navbtn" href={settings.header_button_href||'#'}>{settings.header_button_label}</a>}</nav></div>
}
