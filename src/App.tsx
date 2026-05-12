import { useEffect, useState } from 'react'
import './App.css'

type Language = 'es' | 'en' | 'pt'

const whatsappLink = 'https://wa.me/34620973303'
const videoUrl = 'https://www.youtube.com/embed/04VJdXBc7zY?list=PLOnAJ-Q0falO6W63OXnvWlQwHv7Fe56Y7&index=5'

const sliderImages = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
]

const COUNTER_STORAGE_KEY = 'flinboChallengeCreatorCount'
const COUNTER_TIME_KEY = 'flinboChallengeLastUpdate'
const FIFTEEN_MINUTES = 15 * 60 * 1000

const translations = {
  es: {
    flag: '🇪🇸',
    brand: 'Flinbo',
    navRules: 'Reglas',
    navPromote: 'Promocionar',
    navFaq: 'FAQ',
    cta: 'Quiero participar',

    heroBadge: 'Desafío oficial Flinbo',
    heroTitle: 'Vende $30 y recibe $30 extra.',
    heroText:
      'Tienes 15 días para vender tu contenido en Flinbo y alcanzar la meta del desafío. Si llegas a $30 en ventas válidas, Flinbo te paga $30 extra.',
    heroButton: 'Entrar al desafío',
    heroSecondButton: 'Ver cómo funciona',

    liveText: 'creadoras participando',
    liveSubtext: 'Súmate antes de que cierre la próxima ronda',
    liveProgress: 'Ronda activa',

    tutorialBadge: 'Tutorial',
    tutorialTitle: 'Crea juegos que sumen más ingresos.',
    tutorialText:
      'En este video te contamos qué tiene un buen juego en Flinbo: cómo hacerlo más atractivo, cómo llamar la atención de tus fans y cómo dejar claro qué van a encontrar cuando entren.',
    playVideo: 'Ver tutorial',
    videoTitle: 'Tutorial del desafío',
    close: 'Cerrar',

    howTitle: 'Cómo funciona',
    howText:
      'Te registras, creas tus juegos, promocionas tu perfil y empiezas a vender dentro de Flinbo.',
    stepsTitle: 'Pasos para participar',
    stepOneTitle: 'Contáctanos',
    stepOneText:
      'Escríbenos por WhatsApp y registrate para participar. El desafío empieza cuando el equipo de Flinbo te confirma tu fecha de inicio.',
    stepTwoTitle: 'Crea tus juegos',
    stepTwoText:
      'Durante el reto debes crear 2 juegos con acciones claras y fáciles de entender.',
    stepThreeTitle: 'Promociona tu perfil',
    stepThreeText:
      'Comparte tu link, habla con tus fans y lleva usuarios interesados a tus videos en Flinbo.',
    stepFourTitle: 'Llega a $30',
    stepFourText:
      'Las ventas pueden venir de cualquier contenido que tengas en Flinbo. Si llegas a $30 válidos, ganas $30 extra.',

    rulesTitle: 'Reglas',
    rulesText:
      'Para recibir el bonus, tienes que cumplir las condiciones del desafío.',
    rules: [
      'El desafío dura 15 días desde la fecha de inicio confirmada por Flinbo.',
      'Debes vender al menos $30 dentro de Flinbo.',
      'Las ventas pueden venir de cualquier contenido de tu perfil, no solo del juego.',
      'Debes crear 2 juegos durante el reto.',
      'Debes publicar al menos 1 historia anunciando tu contenido en Flinbo.',
      'Debes promocionar tu link y llevar usuarios o fans a tus videos.',
      'Flinbo revisará las ventas para prevenir fraude, compras propias o actividad sospechosa.',
    ],

    recommendationsTitle: 'Cómo vender más',
    recommendationsText:
      'No necesitas explicar demasiado. Necesitas mover bien tu contenido y hacer que tus fans entren al link.',
    recommendations: [
      {
        title: 'Usa el reto como motivo',
        text: 'Di algo como: “Estoy en un desafío, ayúdame a llegar a la meta en Flinbo”.',
      },
      {
        title: 'Publica más de una vez',
        text: 'Una historia no alcanza. Recomendamos mínimo 3 historias por semana con mensajes diferentes.',
      },
      {
        title: 'Muestra un preview',
        text: 'No enseñes todo. Deja curiosidad y lleva el contenido completo al link.',
      },
      {
        title: 'Habla por mensaje directo',
        text: 'Escribe a fans que ya interactúan contigo. Un mensaje personal puede vender mucho.',
      },
      {
        title: 'Deja el link fácil',
        text: 'Pon Flinbo en tu bio, Linktree, post fijado o donde tengas más tráfico.',
      },
      {
        title: 'Crea urgencia',
        text: 'Usa frases simples: “solo hoy”, “nuevo contenido”, “ayúdame a completar el reto”.',
      },
    ],

    promoteTitle: 'Dónde promocionar',
    promoteText:
      'El objetivo es llevar fans reales a Flinbo. Usa los canales donde ya tienes atención.',
    channels: [
      { name: 'Instagram', text: 'Historias, close friends, link en bio y recordatorios.' },
      { name: 'X / Twitter', text: 'Posts cortos, previews, post fijado y link directo.' },
      { name: 'Telegram', text: 'Grupos, comunidad, mensajes directos y avisos de contenido nuevo.' },
      { name: 'Reddit', text: 'Comunidades donde tu contenido encaje y pueda atraer nuevos fans.' },
      { name: 'Mensajes directos', text: 'Fans que ya te conocen son los más fáciles de convertir.' },
      { name: 'Link in bio', text: 'Linktree, Beacons, Instagram, X o cualquier bio principal.' },
    ],

    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Cuánto dura el desafío?', a: 'Dura 15 días desde la fecha de inicio que Flinbo te confirma por WhatsApp.' },
      { q: '¿Las ventas tienen que venir del juego?', a: 'No. Pueden venir del juego o de cualquier contenido que tengas en Flinbo.' },
      { q: '¿Qué pasa si llego a $30?', a: 'Si las ventas son válidas, Flinbo te paga $30 extra.' },
      { q: '¿Puedo comprar mi propio contenido?', a: 'No. Flinbo revisará las ventas para prevenir fraude, compras propias o actividad sospechosa.' },
      { q: '¿Tengo que publicar en redes?', a: 'Sí. Mínimo 1 historia, aunque recomendamos 3 historias por semana para vender mejor.' },
    ],

    finalTitle: '¿Querés ser parte del próximo desafío Flinbo?',
    finalText:
      'Escríbenos por WhatsApp, confirma tu participación y empieza a crear.',
    footer: 'Flinbo Challenge',
  },

  en: {
    flag: '🇺🇸',
    brand: 'Flinbo',
    navRules: 'Rules',
    navPromote: 'Promote',
    navFaq: 'FAQ',
    cta: 'Join now',

    heroBadge: 'Official Flinbo Challenge',
    heroTitle: 'Sell $30 and get $30 extra.',
    heroText:
      'You have 15 days to sell your content on Flinbo and reach the challenge goal. If you hit $30 in valid sales, Flinbo pays you $30 extra.',
    heroButton: 'Join the challenge',
    heroSecondButton: 'See how it works',

    liveText: 'creators participating',
    liveSubtext: 'Join before the next round closes',
    liveProgress: 'Active round',

    tutorialBadge: 'Tutorial',
    tutorialTitle: 'Create games that bring more income.',
    tutorialText:
      'In this video, we show you what makes a good Flinbo game: how to make it more attractive, how to catch your fans’ attention and how to make clear what they will find inside.',
    playVideo: 'Watch tutorial',
    videoTitle: 'Challenge tutorial',
    close: 'Close',

    howTitle: 'How it works',
    howText:
      'You register, create your games, promote your profile and start selling inside Flinbo.',
    stepsTitle: 'Steps to participate',
    stepOneTitle: 'Contact us',
    stepOneText:
      'Message us on WhatsApp and register to participate. The challenge starts when the Flinbo team confirms your start date.',
    stepTwoTitle: 'Create your games',
    stepTwoText:
      'During the challenge, create 2 games with clear actions your fans can understand.',
    stepThreeTitle: 'Promote your profile',
    stepThreeText:
      'Share your link, talk to your fans and bring interested users to your videos on Flinbo.',
    stepFourTitle: 'Reach $30',
    stepFourText:
      'Sales can come from any content on your Flinbo profile. If you reach $30 in valid sales, you get $30 extra.',

    rulesTitle: 'Rules',
    rulesText:
      'To receive the bonus, you need to follow the challenge conditions.',
    rules: [
      'The challenge lasts 15 days from the start date confirmed by Flinbo.',
      'You must sell at least $30 inside Flinbo.',
      'Sales can come from any content on your profile, not only the game.',
      'You must create 2 games during the challenge.',
      'You must post at least 1 story announcing your content on Flinbo.',
      'You must promote your link and bring users or fans to your videos.',
      'Flinbo will review sales to prevent fraud, self-purchases or suspicious activity.',
    ],

    recommendationsTitle: 'How to sell more',
    recommendationsText:
      'You do not need to overexplain. You need to promote well and make your fans click your link.',
    recommendations: [
      { title: 'Use the challenge as a reason', text: 'Say: “I am in a challenge, help me reach my goal on Flinbo”.' },
      { title: 'Post more than once', text: 'One story is not enough. We recommend at least 3 stories per week with different messages.' },
      { title: 'Show a preview', text: 'Do not show everything. Create curiosity and send people to the link.' },
      { title: 'Use direct messages', text: 'Fans who already interact with you are easier to convert.' },
      { title: 'Make the link easy', text: 'Add Flinbo to your bio, Linktree, pinned post or main traffic source.' },
      { title: 'Create urgency', text: 'Use simple phrases like “today only”, “new content” or “help me complete the challenge”.' },
    ],

    promoteTitle: 'Where to promote',
    promoteText:
      'The goal is to bring real fans to Flinbo. Use the channels where you already have attention.',
    channels: [
      { name: 'Instagram', text: 'Stories, close friends, bio link and reminders.' },
      { name: 'X / Twitter', text: 'Short posts, previews, pinned post and direct link.' },
      { name: 'Telegram', text: 'Groups, community, direct messages and new-content alerts.' },
      { name: 'Reddit', text: 'Communities where your content fits and can attract new fans.' },
      { name: 'Direct messages', text: 'Fans who already know you are the easiest to convert.' },
      { name: 'Link in bio', text: 'Linktree, Beacons, Instagram, X or your main bio.' },
    ],

    faqTitle: 'FAQ',
    faqs: [
      { q: 'How long does it last?', a: 'It lasts 15 days from the start date confirmed by Flinbo on WhatsApp.' },
      { q: 'Do sales need to come from the game?', a: 'No. Sales can come from the game or any content on your Flinbo profile.' },
      { q: 'What happens if I reach $30?', a: 'If sales are valid, Flinbo pays you $30 extra.' },
      { q: 'Can I buy my own content?', a: 'No. Flinbo will review sales to prevent fraud, self-purchases or suspicious activity.' },
      { q: 'Do I need to post on socials?', a: 'Yes. At least 1 story is required, but we recommend 3 stories per week.' },
    ],

    finalTitle: 'Want to be part of the next Flinbo Challenge?',
    finalText:
      'Message us on WhatsApp, confirm your participation and start creating.',
    footer: 'Flinbo Challenge',
  },

  pt: {
    flag: '🇧🇷',
    brand: 'Flinbo',
    navRules: 'Regras',
    navPromote: 'Promover',
    navFaq: 'FAQ',
    cta: 'Quero participar',

    heroBadge: 'Desafio oficial Flinbo',
    heroTitle: 'Venda $30 e receba $30 extra.',
    heroText:
      'Você tem 15 dias para vender seu conteúdo na Flinbo e alcançar a meta do desafio. Se chegar a $30 em vendas válidas, a Flinbo te paga $30 extra.',
    heroButton: 'Entrar no desafio',
    heroSecondButton: 'Ver como funciona',

    liveText: 'criadoras participando',
    liveSubtext: 'Entre antes da próxima rodada fechar',
    liveProgress: 'Rodada ativa',

    tutorialBadge: 'Tutorial',
    tutorialTitle: 'Crie jogos que gerem mais ganhos.',
    tutorialText:
      'Neste vídeo, mostramos o que um bom jogo na Flinbo precisa ter: como deixá-lo mais atrativo, chamar a atenção dos seus fãs e deixar claro o que eles vão encontrar.',
    playVideo: 'Ver tutorial',
    videoTitle: 'Tutorial do desafio',
    close: 'Fechar',

    howTitle: 'Como funciona',
    howText:
      'Você se registra, cria seus jogos, promove seu perfil e começa a vender dentro da Flinbo.',
    stepsTitle: 'Passos para participar',
    stepOneTitle: 'Entre em contato',
    stepOneText:
      'Fale conosco pelo WhatsApp e registre-se para participar. O desafio começa quando a equipe da Flinbo confirma sua data de início.',
    stepTwoTitle: 'Crie seus jogos',
    stepTwoText:
      'Durante o desafio, crie 2 jogos com ações claras que seus fãs entendam rápido.',
    stepThreeTitle: 'Promova seu perfil',
    stepThreeText:
      'Compartilhe seu link, fale com seus fãs e leve usuários interessados aos seus vídeos na Flinbo.',
    stepFourTitle: 'Chegue a $30',
    stepFourText:
      'As vendas podem vir de qualquer conteúdo seu na Flinbo. Se chegar a $30 válidos, ganha $30 extra.',

    rulesTitle: 'Regras',
    rulesText:
      'Para receber o bônus, você precisa cumprir as condições do desafio.',
    rules: [
      'O desafio dura 15 dias desde a data de início confirmada pela Flinbo.',
      'Você precisa vender pelo menos $30 dentro da Flinbo.',
      'As vendas podem vir de qualquer conteúdo do seu perfil, não só do jogo.',
      'Você precisa criar 2 jogos durante o desafio.',
      'Você precisa publicar pelo menos 1 story anunciando seu conteúdo na Flinbo.',
      'Você precisa promover seu link e levar usuários ou fãs aos seus vídeos.',
      'A Flinbo revisará as vendas para prevenir fraude, compras próprias ou atividade suspeita.',
    ],

    recommendationsTitle: 'Como vender mais',
    recommendationsText:
      'Você não precisa explicar demais. Precisa divulgar bem e fazer seus fãs entrarem no link.',
    recommendations: [
      { title: 'Use o desafio como motivo', text: 'Diga: “estou em um desafio, me ajuda a chegar na meta na Flinbo”.' },
      { title: 'Publique mais de uma vez', text: 'Um story não basta. Recomendamos pelo menos 3 stories por semana com mensagens diferentes.' },
      { title: 'Mostre um preview', text: 'Não mostre tudo. Crie curiosidade e leve as pessoas para o link.' },
      { title: 'Use mensagens diretas', text: 'Fãs que já interagem com você são mais fáceis de converter.' },
      { title: 'Deixe o link fácil', text: 'Coloque a Flinbo na bio, Linktree, post fixado ou principal fonte de tráfego.' },
      { title: 'Crie urgência', text: 'Use frases simples como “só hoje”, “conteúdo novo” ou “me ajuda no desafio”.' },
    ],

    promoteTitle: 'Onde promover',
    promoteText:
      'O objetivo é levar fãs reais para a Flinbo. Use os canais onde você já tem atenção.',
    channels: [
      { name: 'Instagram', text: 'Stories, close friends, link na bio e lembretes.' },
      { name: 'X / Twitter', text: 'Posts curtos, previews, post fixado e link direto.' },
      { name: 'Telegram', text: 'Grupos, comunidade, mensagens diretas e avisos de conteúdo novo.' },
      { name: 'Reddit', text: 'Comunidades onde seu conteúdo encaixa e pode atrair novos fãs.' },
      { name: 'Mensagens diretas', text: 'Fãs que já te conhecem são os mais fáceis de converter.' },
      { name: 'Link in bio', text: 'Linktree, Beacons, Instagram, X ou sua bio principal.' },
    ],

    faqTitle: 'Perguntas frequentes',
    faqs: [
      { q: 'Quanto tempo dura?', a: 'Dura 15 dias desde a data de início confirmada pela Flinbo no WhatsApp.' },
      { q: 'As vendas precisam vir do jogo?', a: 'Não. Podem vir do jogo ou de qualquer conteúdo seu na Flinbo.' },
      { q: 'O que acontece se eu chegar a $30?', a: 'Se as vendas forem válidas, a Flinbo te paga $30 extra.' },
      { q: 'Posso comprar meu próprio conteúdo?', a: 'Não. A Flinbo revisará as vendas para prevenir fraude, compras próprias ou atividade suspeita.' },
      { q: 'Preciso publicar nas redes?', a: 'Sim. Pelo menos 1 story é obrigatório, mas recomendamos 3 stories por semana.' },
    ],

    finalTitle: 'Quer fazer parte do próximo desafio Flinbo?',
    finalText:
      'Fale com a gente no WhatsApp, confirme sua participação e comece a criar.',
    footer: 'Flinbo Challenge',
  },
}

function getSavedCreatorCount() {
  const savedCount = Number(localStorage.getItem(COUNTER_STORAGE_KEY))
  const savedTime = Number(localStorage.getItem(COUNTER_TIME_KEY))
  const now = Date.now()

  if (!savedCount || !savedTime) {
    localStorage.setItem(COUNTER_STORAGE_KEY, '60')
    localStorage.setItem(COUNTER_TIME_KEY, String(now))
    return 60
  }

  const passedSteps = Math.floor((now - savedTime) / FIFTEEN_MINUTES)

  if (passedSteps > 0) {
    const updatedCount = savedCount + passedSteps * 2
    localStorage.setItem(COUNTER_STORAGE_KEY, String(updatedCount))
    localStorage.setItem(COUNTER_TIME_KEY, String(savedTime + passedSteps * FIFTEEN_MINUTES))
    return updatedCount
  }

  return savedCount
}

function App() {
  const [language, setLanguage] = useState<Language>('es')
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [creatorCount, setCreatorCount] = useState(getSavedCreatorCount)

  const t = translations[language]

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % sliderImages.length)
    }, 3500)

    return () => window.clearInterval(slideTimer)
  }, [])

  useEffect(() => {
    const countTimer = window.setInterval(() => {
      setCreatorCount((current) => {
        const updated = current + 2
        localStorage.setItem(COUNTER_STORAGE_KEY, String(updated))
        localStorage.setItem(COUNTER_TIME_KEY, String(Date.now()))
        return updated
      })
    }, FIFTEEN_MINUTES)

    return () => window.clearInterval(countTimer)
  }, [])

  return (
    <main className="page">
      <div className="backgroundGlow glowOne" />
      <div className="backgroundGlow glowTwo" />

      <header className="header">
        <a href="#" className="brand">
          <span className="brandIcon">✦</span>
          {t.brand}
        </a>

        <nav className="desktopNav">
          <a href="#rules">{t.navRules}</a>
          <a href="#promote">{t.navPromote}</a>
          <a href="#faq">{t.navFaq}</a>
        </nav>

        <div className="headerActions">
          <select
            className="languageSelect"
            value={language}
            onChange={(event) => setLanguage(event.target.value as Language)}
          >
            <option value="es">🇪🇸 ES</option>
            <option value="en">🇺🇸 EN</option>
            <option value="pt">🇧🇷 PT</option>
          </select>

          <a className="smallCta" href={whatsappLink} target="_blank" rel="noreferrer">
            {t.cta}
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="heroContent">
          <div className="heroCopy">
            <div className="pill">
              <span>{t.flag}</span>
              {t.heroBadge}
            </div>

            <h1>{t.heroTitle}</h1>

            <p className="heroText">{t.heroText}</p>

            <div className="heroButtons">
              <a className="primaryButton" href={whatsappLink} target="_blank" rel="noreferrer">
                {t.heroButton}
              </a>

              <a className="secondaryButton" href="#how">
                {t.heroSecondButton}
              </a>
            </div>
          </div>

          <div className="heroVisual">
            <div className="imageSlider">
              {sliderImages.map((image, index) => (
                <div
                  className={`slideImage ${index === activeSlide ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${image})` }}
                  key={image}
                />
              ))}

              <div className="sliderOverlay" />
            </div>

            <div className="liveCard">
              <div className="liveTop">
                <span>{t.liveProgress}</span>
                <strong>+{creatorCount}</strong>
              </div>

              <h3>{t.liveText}</h3>
              <p>{t.liveSubtext}</p>

              <div className="liveProgressTrack">
                <div className="liveProgressFill" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section tutorialSection" id="tutorial">
        <div className="sectionHeader">
          <span className="sectionBadge">{t.tutorialBadge}</span>
          <h2>{t.tutorialTitle}</h2>
          <p>{t.tutorialText}</p>
        </div>

        <button className="videoCard" onClick={() => setIsVideoOpen(true)}>
          <div className="videoPreview">
            <span className="playButton">▶</span>
          </div>

          <div>
            <strong>{t.playVideo}</strong>
            <small>{t.videoTitle}</small>
          </div>
        </button>
      </section>

      <section className="section" id="how">
        <div className="sectionHeader">
          <span className="sectionBadge">01</span>
          <h2>{t.howTitle}</h2>
          <p>{t.howText}</p>
        </div>

        <div className="sectionMiniTitle">{t.stepsTitle}</div>

        <div className="stepsGrid">
          <article className="stepCard">
            <span>01</span>
            <h3>{t.stepOneTitle}</h3>
            <p>{t.stepOneText}</p>
          </article>

          <article className="stepCard">
            <span>02</span>
            <h3>{t.stepTwoTitle}</h3>
            <p>{t.stepTwoText}</p>
          </article>

          <article className="stepCard">
            <span>03</span>
            <h3>{t.stepThreeTitle}</h3>
            <p>{t.stepThreeText}</p>
          </article>

          <article className="stepCard">
            <span>04</span>
            <h3>{t.stepFourTitle}</h3>
            <p>{t.stepFourText}</p>
          </article>
        </div>
      </section>

      <section className="section rulesSection" id="rules">
        <div className="sectionHeader">
          <span className="sectionBadge">02</span>
          <h2>{t.rulesTitle}</h2>
          <p>{t.rulesText}</p>
        </div>

        <div className="rulesList">
          {t.rules.map((rule) => (
            <div className="ruleItem" key={rule}>
              <span>✓</span>
              <p>{rule}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section recommendationsSection">
        <div className="sectionHeader">
          <span className="sectionBadge">03</span>
          <h2>{t.recommendationsTitle}</h2>
          <p>{t.recommendationsText}</p>
        </div>

        <div className="recommendationsGrid">
          {t.recommendations.map((item) => (
            <article className="recommendationCard" key={item.title}>
              <div className="cardIcon">✦</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section promoteSection" id="promote">
        <div className="sectionHeader">
          <span className="sectionBadge">04</span>
          <h2>{t.promoteTitle}</h2>
          <p>{t.promoteText}</p>
        </div>

        <div className="channelsGrid">
          {t.channels.map((channel) => (
            <article className="channelCard" key={channel.name}>
              <h3>{channel.name}</h3>
              <p>{channel.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section faqSection" id="faq">
        <div className="sectionHeader">
          <span className="sectionBadge">FAQ</span>
          <h2>{t.faqTitle}</h2>
        </div>

        <div className="faqList">
          {t.faqs.map((faq) => (
            <details className="faqItem" key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="finalCta">
        <div>
          <span className="sectionBadge">Flinbo</span>
          <h2>{t.finalTitle}</h2>
          <p>{t.finalText}</p>
        </div>

        <a className="primaryButton bigButton" href={whatsappLink} target="_blank" rel="noreferrer">
          {t.cta}
        </a>
      </section>

      <footer className="footer">
        <span>{t.footer}</span>
        <span>© 2026</span>
      </footer>

      {isVideoOpen && (
        <div className="modalOverlay" onClick={() => setIsVideoOpen(false)}>
          <div className="videoModal" onClick={(event) => event.stopPropagation()}>
            <div className="modalHeader">
              <h3>{t.videoTitle}</h3>
              <button onClick={() => setIsVideoOpen(false)}>{t.close}</button>
            </div>

            <iframe
              src={videoUrl}
              title={t.videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  )
}

export default App