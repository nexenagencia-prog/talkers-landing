export default function TalkersFooter({settings,nav=[]}){
  const t=settings?.theme_json||{};
  const social=[
    ['in',t.linkedin_url],['ig',t.instagram_url],['▶',t.youtube_url]
  ].filter(([,href])=>href);
  return <footer id="footer" className="talkers-footer">
    <div className="footer-grid">
      <div className="footer-brand">
        <a className="footer-logo" href="#top">{settings?.logo_url?<img src={settings.logo_url} alt={settings.brand_name||'Talkers'}/>:<span>{settings?.brand_name||'TALKERS'}</span>}</a>
        <p>{t.footer_tagline||settings?.footer_text||'Curadoria premium de palestrantes.'}</p>
        <div className="footer-socials">{social.map(([label,href])=><a key={label} href={href||'#'} target="_blank" rel="noreferrer">{label}</a>)}</div>
      </div>
      <div><h4>{t.footer_nav_title||'Navegação'}</h4>{nav.map(n=><a key={n.id||n.label} href={n.href||'#'}>{n.label}</a>)}</div>
      <div><h4>{t.footer_company_title||'Para empresas'}</h4><a href="#servicos">Soluções</a><a href="#casting">Casting</a><a href="#empresas">Curadoria</a><a href="#contato">Fale com a Talkers</a></div>
      <div><h4>{t.footer_resources_title||'Recursos'}</h4><a href="#recursos">FAQ</a><a href="/casting">Palestrantes</a><a href="#sobre">Sobre</a></div>
      <div><h4>{t.footer_contact_title||'Contato'}</h4>{t.contact_email&&<a href={`mailto:${t.contact_email}`}>{t.contact_email}</a>}{t.contact_phone&&<a href={t.whatsapp_url||'#'}>{t.contact_phone}</a>}{t.contact_city&&<span>{t.contact_city}</span>}</div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {settings?.brand_name||'Talkers'}. Todos os direitos reservados.</span><span>Política de Privacidade · Termos de Uso</span></div>
  </footer>
}
