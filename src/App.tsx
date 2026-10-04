import { useState, type ReactNode } from "react";

type Page =
  | "home"
  | "priorities"
  | "courses"
  | "course"
  | "agenda"
  | "activity"
  | "success"
  | "notifications"
  | "profile";

type IconName =
  | "home"
  | "book"
  | "calendar"
  | "bell"
  | "user"
  | "clock"
  | "arrow"
  | "check"
  | "play"
  | "search"
  | "more"
  | "chevron"
  | "trend"
  | "sun"
  | "settings"
  | "help"
  | "logout";

const iconPaths: Record<IconName, ReactNode> = {
  home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  arrow: <><path d="m15 18-6-6 6-6"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  play: <path d="m9 7 8 5-8 5z"/>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  trend: <><path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-2.12 2.12-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V20h-3v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06-2.12-2.12.06-.06A1.65 1.65 0 0 0 7.2 15a1.65 1.65 0 0 0-1.51-1H5.6v-3h.09A1.65 1.65 0 0 0 7.2 10a1.65 1.65 0 0 0-.33-1.82l-.06-.06L8.93 6l.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V4.8h3v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06 2.12 2.12-.06.06A1.65 1.65 0 0 0 19.4 10c.13.6.65 1 1.26 1h.09v3h-.09c-.61 0-1.13.4-1.26 1Z"/></>,
  help: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.6 2.6 0 1 1 3.1 2.55c-.6.16-.6.75-.6 1.45M12 17h.01"/></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3"/><path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"/></>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

function Button({ children, onClick, variant = "primary", icon, className = "" }: { children: ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "ghost"; icon?: IconName; className?: string }) {
  return <button type="button" className={`button button-${variant} ${className}`} onClick={onClick}>{icon && <Icon name={icon} size={18}/>}<span>{children}</span></button>;
}

const navItems: { id: Page; label: string; icon: IconName }[] = [
  { id: "home", label: "Início", icon: "home" },
  { id: "courses", label: "Disciplinas", icon: "book" },
  { id: "agenda", label: "Agenda", icon: "calendar" },
  { id: "notifications", label: "Avisos", icon: "bell" },
  { id: "profile", label: "Perfil", icon: "user" },
];

function Sidebar({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => setPage("home")} aria-label="Ir para o início">
        <span className="brand-mark">N</span><span>NEXA</span>
      </button>
      <nav className="side-nav" aria-label="Navegação principal">
        {navItems.map((item) => (
          <button key={item.id} className={`nav-item ${page === item.id || (item.id === "courses" && page === "course") ? "active" : ""}`} onClick={() => setPage(item.id)}>
            <Icon name={item.icon}/><span>{item.label}</span>{item.id === "notifications" && <span className="nav-dot">3</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-help">
        <span className="help-icon"><Icon name="help"/></span>
        <strong>Precisa de ajuda?</strong>
        <p>Acesse nossa central de suporte.</p>
        <button>Falar com suporte</button>
      </div>
      <button className="user-chip" onClick={() => setPage("profile")}>
        <span className="avatar">CB</span><span><strong>Clara Benfica</strong><small>Graduação</small></span><Icon name="more"/>
      </button>
    </aside>
  );
}

function Topbar({ title, setPage }: { title?: string; setPage: (page: Page) => void }) {
  return (
    <header className="topbar">
      <div className="mobile-brand"><span className="brand-mark">N</span><strong>NEXA</strong></div>
      {title && <strong className="topbar-title">{title}</strong>}
      <div className="top-actions">
        <button className="icon-button search-button" aria-label="Pesquisar"><Icon name="search"/></button>
        <button className="icon-button notification-button" onClick={() => setPage("notifications")} aria-label="Notificações"><Icon name="bell"/><span/></button>
        <button className="top-avatar" onClick={() => setPage("profile")} aria-label="Abrir perfil">CB</button>
      </div>
    </header>
  );
}

function BottomNav({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {navItems.map((item) => (
        <button key={item.id} onClick={() => setPage(item.id)} className={page === item.id || (item.id === "courses" && page === "course") ? "active" : ""}>
          <Icon name={item.icon}/><span>{item.label}</span>
          {item.id === "notifications" && <i/>}
        </button>
      ))}
    </nav>
  );
}

function Progress({ value, light = false }: { value: number; light?: boolean }) {
  return <div className={`progress ${light ? "light" : ""}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${value}%` }}/></div>;
}

function SectionTitle({ children, action, onAction }: { children: ReactNode; action?: string; onAction?: () => void }) {
  return <div className="section-title"><h2>{children}</h2>{action && <button onClick={onAction}>{action}<Icon name="chevron" size={16}/></button>}</div>;
}

function Home({ setPage, completed }: { setPage: (page: Page) => void; completed: boolean }) {
  return (
    <div className="page home-page">
      <div className="welcome-row">
        <div><span className="eyebrow">TERÇA-FEIRA, 13 DE OUTUBRO</span><h1>Olá, Clara <span className="wave">Olá</span></h1><p>{completed ? "Tudo certo por hoje. Bom trabalho!" : "Vamos organizar seu dia de estudos?"}</p></div>
        <Button variant="secondary" icon="calendar" onClick={() => setPage("agenda")}>Ver agenda</Button>
      </div>

      <section>
        <SectionTitle action="Ver todas" onAction={() => setPage("priorities")}>Hoje</SectionTitle>
        {!completed ? (
          <button className="priority-card" onClick={() => setPage("activity")}>
            <div className="priority-copy">
              <span className="status-pill attention"><Icon name="clock" size={15}/> PRAZO HOJE</span>
              <p>Comunicação Assertiva</p>
              <h3>Questionário — Unidade 2</h3>
              <span className="deadline"><Icon name="clock" size={18}/> Encerra hoje às 23:59</span>
            </div>
            <div className="priority-action"><span>Continuar atividade</span><span className="round-arrow"><Icon name="chevron"/></span></div>
          </button>
        ) : (
          <div className="empty-today"><span><Icon name="check" size={24}/></span><div><h3>Você concluiu as prioridades de hoje</h3><p>Aproveite para revisar seus conteúdos ou planejar a semana.</p></div></div>
        )}
      </section>

      <section>
        <SectionTitle>Continue estudando</SectionTitle>
        <div className="study-grid">
          <button className="study-card featured" onClick={() => setPage("course")}>
            <div className="course-symbol"><Icon name="trend" size={25}/></div>
            <div className="study-copy"><span>ECONOMIA</span><h3>Unidade I — Fundamentos</h3><p>Conceitos básicos de economia</p><div className="progress-row"><Progress value={completed ? 72 : 68} light/><small>{completed ? 72 : 68}%</small></div></div>
            <span className="play-button"><Icon name="play"/></span>
          </button>
          <button className="study-card" onClick={() => setPage("course")}>
            <div className="course-symbol coral"><Icon name="book" size={24}/></div>
            <div className="study-copy"><span>GESTÃO DE PROJETOS</span><h3>Módulo 3 — Planejamento</h3><p>Você parou em “Cronogramas”</p><div className="progress-row"><Progress value={42}/><small>42%</small></div></div>
            <span className="play-button pale"><Icon name="play"/></span>
          </button>
        </div>
      </section>

      <section className="deadlines-section">
        <SectionTitle action="Ver agenda" onAction={() => setPage("agenda")}>Próximos prazos</SectionTitle>
        <div className="deadline-list">
          <button onClick={() => setPage("activity")}><span className="date-box"><strong>15</strong><small>OUT</small></span><span className="deadline-content"><small>PROJETO INTERDISCIPLINAR</small><strong>Entrega da primeira etapa</strong><span><Icon name="clock" size={15}/> Quinta-feira, 23:59</span></span><span className="status-pill neutral">EM 2 DIAS</span><Icon name="chevron"/></button>
          <button onClick={() => setPage("activity")}><span className="date-box"><strong>18</strong><small>OUT</small></span><span className="deadline-content"><small>ECONOMIA</small><strong>Questionário — Unidade I</strong><span><Icon name="clock" size={15}/> Domingo, 23:59</span></span><span className="status-pill neutral">EM 5 DIAS</span><Icon name="chevron"/></button>
          <button onClick={() => setPage("activity")}><span className="date-box"><strong>22</strong><small>OUT</small></span><span className="deadline-content"><small>COMUNICAÇÃO ASSERTIVA</small><strong>Avaliação online</strong><span><Icon name="clock" size={15}/> Quinta-feira, 20:00</span></span><span className="status-pill neutral">EM 9 DIAS</span><Icon name="chevron"/></button>
        </div>
      </section>
    </div>
  );
}

const courses = [
  { title: "Economia", subtitle: "Prof. Eduardo Mello", progress: 68, tone: "navy", code: "EC" },
  { title: "Comunicação Assertiva", subtitle: "Profa. Ana Ribeiro", progress: 44, tone: "teal", code: "CA" },
  { title: "Gestão de Projetos", subtitle: "Prof. Lucas Moura", progress: 42, tone: "coral", code: "GP" },
  { title: "Projeto Interdisciplinar", subtitle: "Profa. Marina Luz", progress: 31, tone: "violet", code: "PI" },
];

function Courses({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <div className="page">
      <div className="page-heading"><div><span className="eyebrow">PERÍODO 2025.2</span><h1>Minhas disciplinas</h1><p>Acompanhe conteúdos, atividades e o seu progresso.</p></div><label className="search-field"><Icon name="search"/><input placeholder="Pesquisar disciplinas" aria-label="Pesquisar disciplinas"/></label></div>
      <div className="course-grid">
        {courses.map((course) => <button className="course-card" key={course.title} onClick={() => setPage("course")}><span className={`course-cover ${course.tone}`}>{course.code}</span><span className="course-body"><small>DISCIPLINA</small><strong>{course.title}</strong><span>{course.subtitle}</span><span className="course-progress"><span><Progress value={course.progress}/><small>{course.progress}% concluído</small></span><Icon name="chevron"/></span></span></button>)}
      </div>
    </div>
  );
}

function Course({ setPage, completed }: { setPage: (page: Page) => void; completed: boolean }) {
  const progress = completed ? 72 : 68;
  return (
    <div className="page">
      <button className="back-link" onClick={() => setPage("courses")}><Icon name="arrow"/> Voltar para disciplinas</button>
      <div className="course-hero">
        <div><span className="eyebrow light-text">DISCIPLINA</span><h1>Economia</h1><p>Prof. Eduardo Mello · Terças e quintas</p></div>
        <div className="hero-progress"><strong>{progress}%</strong><span>concluído</span><Progress value={progress} light/></div>
      </div>
      <div className="course-layout">
        <div>
          <SectionTitle>Continue de onde parou</SectionTitle>
          <button className="resume-card" onClick={() => setPage("activity")}><span className="resume-icon"><Icon name="play"/></span><span><small>UNIDADE I</small><strong>Fatores de produção</strong><p>8 minutos restantes</p></span><span className="round-arrow"><Icon name="chevron"/></span></button>
          <SectionTitle>Conteúdos</SectionTitle>
          <div className="content-list">
            {["Introdução à economia", "Escassez e escolhas", "Fatores de produção", "Sistemas econômicos"].map((item, i) => <button key={item}><span className={`content-status ${i < 2 ? "done" : i === 2 ? "current" : ""}`}>{i < 2 ? <Icon name="check" size={15}/> : i + 1}</span><span><strong>{item}</strong><small>{i < 2 ? "Concluído" : i === 2 ? "Em andamento · 12 min" : "15 min"}</small></span><Icon name="chevron"/></button>)}
          </div>
        </div>
        <aside className="activity-panel"><SectionTitle>Atividades</SectionTitle><button onClick={() => setPage("activity")}><span className="status-pill neutral">PRÓXIMO</span><strong>Questionário — Unidade I</strong><small><Icon name="clock" size={15}/> Prazo 18 out · 23:59</small><Icon name="chevron"/></button></aside>
      </div>
    </div>
  );
}

function Agenda({ setPage }: { setPage: (page: Page) => void }) {
  const days = [
    { day: "SEG", date: "12", items: [{ time: "10:00", title: "Material Unidade I", course: "Economia" }] },
    { day: "TER", date: "13", active: true, items: [{ time: "23:59", title: "Questionário Unidade 2", course: "Comunicação Assertiva", urgent: true }] },
    { day: "QUA", date: "14", items: [] },
    { day: "QUI", date: "15", items: [{ time: "23:59", title: "Entrega da primeira etapa", course: "Projeto Interdisciplinar" }] },
    { day: "SEX", date: "16", items: [] },
  ];
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">13–18 DE OUTUBRO</span><h1>Minha semana</h1><p>Visualize compromissos e prazos em um só lugar.</p></div><div className="segmented"><button className="active">Semana</button><button>Lista</button></div></div><div className="calendar-toolbar"><button aria-label="Semana anterior"><Icon name="arrow"/></button><strong>Outubro 2025</strong><button aria-label="Próxima semana"><Icon name="chevron"/></button></div><div className="week-grid">{days.map((day) => <div className={`day-column ${day.active ? "active" : ""}`} key={day.date}><div className="day-heading"><small>{day.day}</small><strong>{day.date}</strong>{day.active && <span>HOJE</span>}</div><div className="day-content">{day.items.length ? day.items.map((item) => <button key={item.title} className={item.urgent ? "urgent" : ""} onClick={() => setPage("activity")}><small>{item.time}</small><strong>{item.title}</strong><span>{item.course}</span></button>) : <div className="no-items"><span>—</span><small>Sem atividades</small></div>}</div></div>)}</div></div>;
}

function Activity({ setPage, complete }: { setPage: (page: Page) => void; complete: () => void }) {
  return <div className="page activity-page"><button className="back-link" onClick={() => setPage("home")}><Icon name="arrow"/> Voltar para início</button><div className="activity-layout"><main className="activity-main"><span className="status-pill attention"><Icon name="clock" size={15}/> PRAZO HOJE</span><span className="eyebrow">COMUNICAÇÃO ASSERTIVA</span><h1>Questionário — Unidade 2</h1><p className="lead">Revise os conceitos de comunicação verbal e não verbal antes de iniciar.</p><div className="activity-meta"><span><Icon name="clock"/><span><small>ESTIMATIVA</small><strong>15 minutos</strong></span></span><span><Icon name="calendar"/><span><small>PRAZO</small><strong>Hoje, 23:59</strong></span></span><span><Icon name="trend"/><span><small>TENTATIVAS</small><strong>1 de 2</strong></span></span></div><div className="instructions"><h2>Antes de começar</h2><ul><li>O questionário contém 8 questões de múltipla escolha.</li><li>Seu progresso é salvo automaticamente.</li><li>Após o envio, você poderá revisar suas respostas.</li></ul></div></main><aside className="start-card"><div className="activity-illustration"><span><Icon name="book" size={32}/></span></div><span className="status-pill progress-status">● EM ANDAMENTO</span><h3>Pronta para continuar?</h3><p>Você respondeu 3 de 8 questões.</p><Progress value={38}/><small>38% concluído</small><Button onClick={complete}>Continuar atividade <Icon name="chevron" size={18}/></Button><span className="save-note">Seu progresso foi salvo às 14:32</span></aside></div></div>;
}

function Success({ setPage, progress }: { setPage: (page: Page) => void; progress: number }) {
  return <div className="success-page"><div className="success-card"><div className="success-check"><Icon name="check" size={36}/></div><span className="eyebrow">ENVIO CONFIRMADO</span><h1>Atividade concluída!</h1><p>Seu envio foi registrado com sucesso. Você deu mais um passo no seu progresso.</p><div className="success-detail"><span className="course-symbol"><Icon name="trend"/></span><span><small>COMUNICAÇÃO ASSERTIVA</small><strong>Questionário — Unidade 2</strong></span><span className="success-progress"><small>PROGRESSO</small><strong>68% <Icon name="chevron" size={16}/> {progress}%</strong></span></div><Button onClick={() => setPage("home")}>Voltar para o início</Button><button className="text-button" onClick={() => setPage("course")}>Ver disciplina</button></div><p className="success-quote">“Progresso é a soma de pequenos esforços repetidos.”</p></div>;
}

function SimplePage({ page, setPage }: { page: "notifications" | "profile" | "priorities"; setPage: (page: Page) => void }) {
  if (page === "priorities") return <div className="page"><button className="back-link" onClick={() => setPage("home")}><Icon name="arrow"/> Voltar</button><div className="page-heading"><div><span className="eyebrow">ORGANIZE SEU DIA</span><h1>Todas as prioridades</h1><p>Ordenadas por prazo e impacto na sua semana.</p></div></div><div className="deadline-list expanded"><button onClick={() => setPage("activity")}><span className="date-box urgent-date"><strong>13</strong><small>OUT</small></span><span className="deadline-content"><small>COMUNICAÇÃO ASSERTIVA</small><strong>Questionário — Unidade 2</strong><span><Icon name="clock" size={15}/> Hoje, 23:59</span></span><span className="status-pill attention">PRAZO HOJE</span><Icon name="chevron"/></button></div></div>;
  if (page === "notifications") return <div className="page"><div className="page-heading"><div><span className="eyebrow">CENTRAL DE AVISOS</span><h1>Notificações</h1><p>Atualizações importantes da sua vida acadêmica.</p></div><Button variant="secondary">Marcar como lidas</Button></div><div className="notification-list">{["Novo material disponível em Economia", "Lembrete: atividade vence hoje", "Seu feedback foi publicado"].map((text, i) => <button key={text} onClick={() => i === 1 && setPage("activity")}><span className={`notification-icon n${i}`}><Icon name={i === 0 ? "book" : i === 1 ? "clock" : "check"}/></span><span><strong>{text}</strong><p>{i === 0 ? "A Unidade I recebeu um novo conteúdo complementar." : i === 1 ? "Questionário — Unidade 2 encerra às 23:59." : "Confira os comentários da professora na sua entrega."}</p><small>{i === 0 ? "Há 25 min" : i === 1 ? "Há 2 horas" : "Ontem"}</small></span>{i < 2 && <i/>}</button>)}</div></div>;
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">MINHA CONTA</span><h1>Perfil e preferências</h1><p>Gerencie sua experiência no NEXA.</p></div></div><div className="profile-header"><span className="large-avatar">CB</span><span><h2>Clara Benfica</h2><p>clara.benfica@aluno.edu.br</p><small>Graduação · 2025.2</small></span><Button variant="secondary">Editar perfil</Button></div><div className="settings-list">{[{i:"sun" as IconName,t:"Acessibilidade",d:"Contraste, tamanho do texto e movimento"},{i:"bell" as IconName,t:"Notificações",d:"Prazos, avisos e lembretes"},{i:"settings" as IconName,t:"Preferências",d:"Idioma, tema e calendário"}].map(item => <button key={item.t}><span><Icon name={item.i}/></span><span><strong>{item.t}</strong><small>{item.d}</small></span><Icon name="chevron"/></button>)}</div><button className="logout"><Icon name="logout"/> Sair da conta</button></div>;
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [completed, setCompleted] = useState(false);
  const complete = () => { setCompleted(true); setPage("success"); };
  const title = page === "home" ? undefined : page === "courses" ? "Disciplinas" : page === "agenda" ? "Agenda" : undefined;
  return (
    <div className="app-shell">
      {page !== "success" && <Sidebar page={page} setPage={setPage}/>}
      <div className={`app-main ${page === "success" ? "full" : ""}`}>
        {page !== "success" && <Topbar title={title} setPage={setPage}/>}
        {page === "home" && <Home setPage={setPage} completed={completed}/>}
        {page === "courses" && <Courses setPage={setPage}/>}
        {page === "course" && <Course setPage={setPage} completed={completed}/>}
        {page === "agenda" && <Agenda setPage={setPage}/>}
        {page === "activity" && <Activity setPage={setPage} complete={complete}/>}
        {page === "success" && <Success setPage={setPage} progress={72}/>}
        {(page === "notifications" || page === "profile" || page === "priorities") && <SimplePage page={page} setPage={setPage}/>}
      </div>
      {page !== "success" && <BottomNav page={page} setPage={setPage}/>}
    </div>
  );
}
