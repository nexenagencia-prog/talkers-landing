import SiteHeader from '../components/SiteHeader';
import TalkersFooter from '../components/TalkersFooter';
import CastingGrid from '../components/CastingGrid';
import {TALKERS_SETTINGS,TALKERS_NAV} from '../lib/talkersDefaults';
import {supabaseAdmin} from '../lib/supabase';
export const dynamic='force-dynamic';
const cast=[
{name:'Theo Becker',category:'Ator e palestrante',role:'Ator • Superação, disciplina e recomeços',short:'Atuação, reinvenção e superação',bio:'Ator brasileiro conhecido por sua trajetória na televisão, Theo Becker construiu uma carreira marcada por personagens, desafios e reinvenções. Sua história reúne experiências no entretenimento, no fisiculturismo e na busca por novos caminhos, trazendo reflexões sobre superação, disciplina e recomeços.',tags:['Superação','Disciplina','Recomeços'],image_url:'/theo-becker.png',href:'mailto:contato@talkers.com.br?subject=Contrata%C3%A7%C3%A3o%20Theo%20Becker'},
{name:'Tathi Deândhela',category:'Empreendedora e palestrante',role:'Educação, liderança e produtividade',short:'Conhecimento que transforma',bio:'Empreendedora e palestrante com atuação em desenvolvimento profissional, educação e negócios.',tags:['Liderança','Educação','Produtividade']},
{name:'Eduardo Heluany',category:'Palestrante',role:'Casting Talkers',short:'Ideias e experiências para eventos',bio:'Conheça o perfil, os temas e a disponibilidade com a curadoria Talkers.'},
{name:'Márcio Giacobelli',category:'Palestrante',role:'Casting Talkers',short:'Conteúdo e impacto',bio:'Consulte temas, repertório e disponibilidade com a equipe Talkers.'},
{name:'Fernando Freitas',category:'Palestrante',role:'Casting Talkers',short:'Conexão e repertório',bio:'Consulte temas, repertório e disponibilidade com a equipe Talkers.'},
{name:'Jeannine Beckenstein',category:'Palestrante',role:'Casting Talkers',short:'Ideias que inspiram',bio:'Consulte temas, repertório e disponibilidade com a equipe Talkers.'},
{name:'Túlio Milman',category:'Comunicador',role:'Comunicação e atualidades',short:'Perspectivas e comunicação',bio:'Consulte temas, repertório e disponibilidade com a equipe Talkers.'},
{name:'Arnaldo Gutierro',category:'Palestrante',role:'Casting Talkers',short:'Experiência e conteúdo',bio:'Consulte temas, repertório e disponibilidade com a equipe Talkers.'},
{name:'Rodrigo Cardoso',category:'Palestrante',role:'Casting Talkers',short:'Motivação e resultados',bio:'Consulte temas, repertório e disponibilidade com a equipe Talkers.'},
{name:'Fernando Miranda',category:'Palestrante',role:'Casting Talkers',short:'Repertório e visão',bio:'Consulte temas, repertório e disponibilidade com a equipe Talkers.'},
{name:'Tucco',category:'Palestrante',role:'Casting Talkers',short:'Conexão e impacto',bio:'Consulte temas, repertório e disponibilidade com a equipe Talkers.'}
];
export default async function Page(){
let settings=TALKERS_SETTINGS;let nav=TALKERS_NAV;
try{const sb=supabaseAdmin();if(sb){const [s,n]=await Promise.all([sb.from('site_settings').select('*').limit(1).maybeSingle(),sb.from('nav_items').select('*').eq('enabled',true).order('sort_order')]);settings=s.data||settings;nav=n.data?.length?n.data:nav;}}catch{}
return <main className="site talkers-site talkers-refresh">
<SiteHeader settings={settings} nav={nav}/>
<section id="top" className="refresh-hero"><div className="refresh-wrap"><div className="eyebrow">TALKERS · CURADORIA DE PALESTRANTES</div><h1>Grandes vozes.<br/><span>Grandes impactos.</span></h1><p>Conectamos ideias extraordinárias às pessoas certas. Uma curadoria feita para transformar eventos em experiências memoráveis.</p><div className="actions"><a className="btn" href="#casting">Conheça os palestrantes <span>↗</span></a><a className="btn alt" href="#sobre">Nossa essência ↓</a></div></div><div className="refresh-hero-foot">PESSOAS · IDEIAS · TRANSFORMAÇÃO</div></section>
<section id="sobre" className="refresh-about refresh-wrap"><div className="eyebrow">01 / SOBRE NÓS</div><div className="refresh-about-grid"><h2>O palco certo.<br/>A voz certa.</h2><p>Mais do que conectar nomes a eventos, aproximamos histórias, conhecimento e públicos. Uma seleção criteriosa para cada momento.</p></div></section>
<section id="casting" className="refresh-casting"><div className="refresh-wrap"><div className="eyebrow">02 / CASTING</div><div className="refresh-casting-head"><div><h2>As vozes da <span>Talkers.</span></h2><p>Toque em um palestrante para conhecer sua trajetória e solicitar informações de contratação.</p></div><a href="/casting">Ver todos ↗</a></div><CastingGrid speakers={cast}/><p className="refresh-disclaimer">Fotografias oficiais dos palestrantes estão em atualização. A presença de nomes nesta página segue as referências fornecidas e deve ser confirmada com a agência.</p></div></section>
<section id="processo" className="refresh-process refresh-wrap"><div className="eyebrow">03 / NOSSA CURADORIA</div><h2>Do briefing ao palco.<br/>Tudo começa com uma boa conversa.</h2><div className="refresh-steps">{[['01','Entendemos o contexto','Objetivos, audiência e mensagem.'],['02','Escolhemos a voz','Curadoria de nomes e repertórios.'],['03','Criamos a conexão','Alinhamento para uma experiência relevante.']].map(x=><div key={x[0]}><small>{x[0]}</small><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div></section>
<section id="contato" className="refresh-contact"><div className="refresh-wrap"><div className="eyebrow">PRÓXIMO EVENTO</div><h2>Uma grande mensagem<br/>merece o palco certo.</h2><a className="btn" href="mailto:contato@talkers.com.br?subject=Solicitar%20palestrante">Solicitar uma proposta ↗</a></div></section>
<TalkersFooter settings={settings} nav={nav}/></main>}
