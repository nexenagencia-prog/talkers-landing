import SiteHeader from '../components/SiteHeader';
import TalkersFooter from '../components/TalkersFooter';
import CastingGrid from '../components/CastingGrid';
import {supabaseAdmin} from '../lib/supabase';
import {TALKERS_SETTINGS,TALKERS_NAV} from '../lib/talkersDefaults';
export const dynamic='force-dynamic';
const defaultSpeakers=[
{name:'Theo Becker',category:'Ator e palestrante',role:'Atuação, disciplina e reinvenção',short:'Superação • Disciplina • Novos começos',bio:'Ator brasileiro conhecido por sua trajetória na televisão. Temas de palestra e condições de contratação devem ser confirmados diretamente com a equipe.',tags:['Superação','Disciplina','Carreira'],image_url:''},
{name:'Tathi Deândhela',category:'Empreendedora e palestrante',role:'Liderança e desenvolvimento',short:'Negócios • Liderança • Desenvolvimento',bio:'Empreendedora e palestrante com atuação em educação e desenvolvimento profissional.',tags:['Liderança','Negócios'],image_url:''},
{name:'Eduardo Heluany',category:'Palestrante',role:'Casting Talkers',short:'Conheça o perfil e solicite informações',bio:'Consulte temas, portfólio e disponibilidade com a equipe Talkers.',tags:['Palestras'],image_url:''},
{name:'Márcio Giacobelli',category:'Palestrante',role:'Casting Talkers',short:'Conheça o perfil e solicite informações',bio:'Consulte temas, portfólio e disponibilidade com a equipe Talkers.',tags:['Palestras'],image_url:''},
{name:'Fernando Freitas',category:'Palestrante',role:'Casting Talkers',short:'Conheça o perfil e solicite informações',bio:'Consulte temas, portfólio e disponibilidade com a equipe Talkers.',tags:['Palestras'],image_url:''},
{name:'Jeannine Beckenstein',category:'Palestrante',role:'Casting Talkers',short:'Conheça o perfil e solicite informações',bio:'Consulte temas, portfólio e disponibilidade com a equipe Talkers.',tags:['Palestras'],image_url:''},
{name:'Túlio Milman',category:'Comunicador',role:'Casting Talkers',short:'Comunicação e perspectivas',bio:'Consulte temas, portfólio e disponibilidade com a equipe Talkers.',tags:['Comunicação'],image_url:''},
{name:'Arnaldo Gutierro',category:'Palestrante',role:'Casting Talkers',short:'Conheça o perfil e solicite informações',bio:'Consulte temas, portfólio e disponibilidade com a equipe Talkers.',tags:['Palestras'],image_url:''},
{name:'Rodrigo Cardoso',category:'Palestrante',role:'Casting Talkers',short:'Conheça o perfil e solicite informações',bio:'Consulte temas, portfólio e disponibilidade com a equipe Talkers.',tags:['Palestras'],image_url:''},
{name:'Fernando Miranda',category:'Palestrante',role:'Casting Talkers',short:'Conheça o perfil e solicite informações',bio:'Consulte temas, portfólio e disponibilidade com a equipe Talkers.',tags:['Palestras'],image_url:''},
{name:'Tucco',category:'Palestrante',role:'Casting Talkers',short:'Conheça o perfil e solicite informações',bio:'Consulte temas, portfólio e disponibilidade com a equipe Talkers.',tags:['Palestras'],image_url:''}
];
async function getData(){
const sb=supabaseAdmin();if(!sb)return {settings:TALKERS_SETTINGS,nav:TALKERS_NAV,speakers:defaultSpeakers};
try{const [{data:settings},{data:nav},{data:sections}]=await Promise.all([sb.from('site_settings').select('*').limit(1).maybeSingle(),sb.from('nav_items').select('*').eq('enabled',true).order('sort_order'),sb.from('sections').select('*').eq('slug','casting').eq('enabled',true)]);
const cms=(sections||[]).flatMap(x=>x.content?.speakers||[]);
const merged=defaultSpeakers.map(s=>{const old=cms.find(x=>x.name?.toLowerCase()===s.name.toLowerCase());return {...s,...old,image_url:old?.image_url||s.image_url}});
for(const s of cms)if(s.name&&!merged.some(x=>x.name.toLowerCase()===s.name.toLowerCase()))merged.push(s);
return {settings:settings||TALKERS_SETTINGS,nav:nav?.length?nav:TALKERS_NAV,speakers:merged};
}catch{return {settings:TALKERS_SETTINGS,nav:TALKERS_NAV,speakers:defaultSpeakers}}}
export default async function Page(){
const {settings,nav,speakers}=await getData();
return <main className="site talkers-site refined-site">
<SiteHeader settings={settings} nav={nav}/>
<section id="top" className="refined-hero"><div className="refined-hero-content"><div className="refined-overline">TALKERS · CURADORIA DE PALESTRANTES</div><h1>As vozes certas.<br/><span>Para momentos que importam.</span></h1><p>Conectamos grandes histórias, ideias e pessoas a eventos que merecem ser lembrados.</p><div className="refined-actions"><a href="#casting" className="refined-button">Conheça nossos palestrantes <span>↗</span></a><a href="#sobre" className="refined-link">Descubra a Talkers ↓</a></div></div><div className="refined-side">TALKERS / BRASIL</div></section>
<section id="sobre" className="refined-about"><div className="refined-overline">01 — NOSSA ESSÊNCIA</div><div className="refined-about-grid"><h2>Mais do que nomes.<br/>Conexões que <i>transformam.</i></h2><div><p>Um evento memorável começa com a escolha de quem tem algo relevante a dizer. Nossa curadoria aproxima sua audiência das vozes que fazem sentido para cada momento.</p><a href="#casting" className="refined-link">Explore o casting ↗</a></div></div></section>
<section id="casting" className="refined-casting"><div className="refined-overline">02 — NOSSO CASTING</div><div className="refined-casting-head"><div><h2>Grandes vozes.<br/><i>Histórias reais.</i></h2><p>Explore os perfis e clique para conhecer mais sobre cada profissional.</p></div><span>PALESTRANTES SELECIONADOS</span></div><CastingGrid speakers={speakers}/><p className="refined-disclaimer">Fotografias e informações profissionais são exibidas quando disponíveis no acervo oficial. Confirme os detalhes com a equipe antes da contratação.</p></section>
<section className="refined-method" id="como-funciona"><div className="refined-overline">03 — NOSSA CURADORIA</div><h2>Da primeira conversa<br/>ao grande palco.</h2><div className="refined-method-grid">{[['01','Briefing','Entendemos o público, a ocasião e o resultado esperado.'],['02','Curadoria','Selecionamos profissionais alinhados à proposta.'],['03','Conexão','Acompanhamos os próximos passos da contratação.']].map(x=><div key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div></section>
<section className="refined-contact" id="contato"><div className="refined-overline">04 — VAMOS CONVERSAR?</div><h2>Seu próximo evento<br/>merece a voz certa.</h2><a className="refined-button" href="mailto:contato@talkers.com.br?subject=Solicita%C3%A7%C3%A3o%20de%20palestrante">Solicitar proposta ↗</a></section>
<TalkersFooter settings={settings} nav={nav}/></main>}
