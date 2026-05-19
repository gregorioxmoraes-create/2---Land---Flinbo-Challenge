import { useEffect, useRef, useState } from 'react'
import type { ComponentType } from 'react'
import './App.css'
import heroSlide1 from './assets/hero/hero-slide-1.jpg'
import heroSlide2 from './assets/hero/hero-slide-2.jpg'
import heroSlide3 from './assets/hero/hero-slide-3.jpg'
import heroSlide4 from './assets/hero/hero-slide-4.jpg'
import flinboLogo from './assets/logo/flinbo-logo.png'

type Language = 'es' | 'en' | 'pt'

const whatsappLink = 'https://wa.me/34620973303'
const sliderImages = [heroSlide1, heroSlide2, heroSlide3, heroSlide4]
const tutorialVideos = [
  {
    embedUrl: 'https://www.youtube.com/embed/QRMrw3hrLIg',
    thumbnail: 'https://img.youtube.com/vi/QRMrw3hrLIg/maxresdefault.jpg',
  },
  {
    embedUrl: 'https://www.youtube.com/embed/KL9X-n6mYNk',
    thumbnail: 'https://img.youtube.com/vi/KL9X-n6mYNk/maxresdefault.jpg',
  },
]

const COUNTER_STORAGE_KEY = 'flinboChallengeCreatorCount'
const COUNTER_TIME_KEY = 'flinboChallengeLastUpdate'
const FIFTEEN_MINUTES = 15 * 60 * 1000

function FlagES() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" style={{ display: 'block', flexShrink: 0, borderRadius: '3px' }}>
      <rect width="20" height="14" fill="#C60B1E" />
      <rect y="3.5" width="20" height="7" fill="#FFC400" />
    </svg>
  )
}

function FlagUS() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" style={{ display: 'block', flexShrink: 0, borderRadius: '3px' }}>
      <rect width="20" height="14" fill="#B22234" />
      <rect y="1.077" width="20" height="1.077" fill="white" />
      <rect y="3.231" width="20" height="1.077" fill="white" />
      <rect y="5.385" width="20" height="1.077" fill="white" />
      <rect y="7.538" width="20" height="1.077" fill="white" />
      <rect y="9.692" width="20" height="1.077" fill="white" />
      <rect y="11.846" width="20" height="1.077" fill="white" />
      <rect width="8" height="7.538" fill="#3C3B6E" />
    </svg>
  )
}

function FlagBR() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" style={{ display: 'block', flexShrink: 0, borderRadius: '3px' }}>
      <rect width="20" height="14" fill="#009C3B" />
      <polygon points="10,1.5 18.5,7 10,12.5 1.5,7" fill="#FFDF00" />
      <circle cx="10" cy="7" r="2.8" fill="#002776" />
    </svg>
  )
}

type LangOption = { value: Language; Flag: ComponentType; code: string }

const langOptions: LangOption[] = [
  { value: 'es', Flag: FlagES, code: 'ES' },
  { value: 'en', Flag: FlagUS, code: 'EN' },
  { value: 'pt', Flag: FlagBR, code: 'PT' },
]

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

const translations = {
  es: {
    navRules: 'Reglas',
    navFaq: 'FAQ',
    cta: 'Quiero participar',

    heroBadge: 'Flinboost — Desafío oficial',
    heroTitle: 'Vende $30 y recibe $80 total.',
    heroText:
      'Tienes 15 días para alcanzar la meta del Flinboost. Llega a $30 en ventas válidas y recibe $50 extra — $80 en total.',
    heroButton: 'Entrar al Flinboost',
    heroSecondButton: 'Ver cómo funciona',

    liveProgress: 'Flinboost activo',
    liveText: 'creadoras participando',
    liveSubtext: 'Súmate antes de que cierre la próxima ronda',

    howTitle: 'Cómo funciona',
    howText: 'Te registras y empiezas a vender dentro de Flinboost.',
    stepsTitle: 'Pasos para participar',
    stepOneTitle: 'Contáctanos',
    stepOneText:
      'Escríbenos por WhatsApp y regístrate para participar. El Flinboost empieza cuando el equipo de Flinbo te confirma tu fecha de inicio.',
    stepTwoTitle: 'Impulsa tu perfil',
    stepTwoText:
      'Comparte tu link en tus redes, habla con tus fans y aumenta tu visibilidad para maximizar tus ventas en Flinboost.',
    stepThreeTitle: 'Llega a $30',
    stepThreeText:
      'Las ventas pueden venir de cualquier contenido que tengas en Flinbo. Si llegas a $30 válidos, recibes $50 extra — $80 en total.',

    rulesTitle: 'Reglas',
    rulesText: 'Para recibir el bonus del Flinboost, tienes que cumplir las siguientes condiciones.',
    rules: [
      'El Flinboost dura 15 días desde la fecha de inicio confirmada por Flinbo.',
      'Debes vender al menos $30 dentro de Flinbo.',
      'Las ventas pueden venir de cualquier contenido de tu perfil.',
      'Al alcanzar $30 en ventas válidas, recibes $50 extra — $80 en total.',
    ],

    termsButton: 'Términos y condiciones aquí',
    termsTitle: 'Términos y condiciones',
    termsText:
      'Para participar del Flinboost, la creadora debe alcanzar al menos $30 en ventas válidas durante los 15 días del desafío. Una vez finalizado el Flinboost y verificado el cumplimiento de las condiciones, Flinbo pagará el bonus de $50 extra (total $80). El pago podrá realizarse dentro de los 30 días hábiles siguientes a la finalización del desafío. Flinbo revisará las ventas para prevenir fraude, compras propias o actividad sospechosa.',

    tutorialBadge: 'Academy',
    tutorialTitle: 'Potencia tus ventas en el Flinboost.',
    tutorialText:
      'En estos videos te contamos cómo potenciar tu contenido en Flinbo: cómo hacerlo más atractivo, cómo llamar la atención de tus fans y cómo maximizar tus ventas.',
    videoTitle: 'Tutorial Flinboost',
    close: 'Cerrar',

    tipsTitle: '5 formas de vender más',
    tips: [
      'Publica en tus redes sociales',
      'Habla por DM con tus fans',
      'Agrega tu link de Flinbo en Linktree',
      'Comparte tus mejores contenidos de la plataforma',
      'Más visibilidad = más ventas',
    ],

    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Cuánto dura el Flinboost?',
        a: 'Dura 15 días desde la fecha de inicio que Flinbo te confirma por WhatsApp.',
      },
      {
        q: '¿Las ventas tienen que venir de un contenido específico?',
        a: 'No. Pueden venir de cualquier contenido que tengas en la plataforma.',
      },
      {
        q: '¿Cuánto recibo si llego a $30?',
        a: 'Si las ventas son válidas, recibes $50 extra — $80 en total.',
      },
      {
        q: '¿Qué pasa si no cumplo el desafío?',
        a: 'Te quedas con lo que ganaste, pero no recibes el bonus de $50 extra del Flinboost.',
      },
    ],

    finalTitle: '¿Quieres ser parte del Flinboost?',
    finalText: 'Escríbenos por WhatsApp, confirma tu participación y empieza a vender.',

    banner1Badge: 'FLINBOOST ACTIVO',
    banner1Title: 'Vende $30 y recibe $80',
    banner1Sub: 'Vende $30 válidos y el Flinboost te suma $50 extra — $80 en total.',
    banner1Cta: 'Quiero participar',

    banner2Badge: 'FLINBOOST ACTIVO',
    banner2TitlePre: 'Ya hay',
    banner2TitlePost: 'creadoras en el Flinboost',
    banner2Sub: 'Tu contenido ya puede estar generando ventas ahora mismo.',
    banner2Highlight: 'Solo necesitas llegar a $30 en ventas válidas.',
    banner2Cta: 'Entrar al Flinboost',

    footer: 'Flinboost',
  },

  en: {
    navRules: 'Rules',
    navFaq: 'FAQ',
    cta: 'Join now',

    heroBadge: 'Flinboost — Official Challenge',
    heroTitle: 'Sell $30 and get $80 total.',
    heroText:
      'You have 15 days to hit the Flinboost goal. Reach $30 in valid sales and receive $50 extra — $80 total.',
    heroButton: 'Join the Flinboost',
    heroSecondButton: 'See how it works',

    liveProgress: 'Flinboost active',
    liveText: 'creators participating',
    liveSubtext: 'Join before the next round closes',

    howTitle: 'How it works',
    howText: 'You register and start selling inside Flinboost.',
    stepsTitle: 'Steps to participate',
    stepOneTitle: 'Contact us',
    stepOneText:
      'Message us on WhatsApp and register to participate. The Flinboost starts when the Flinbo team confirms your start date.',
    stepTwoTitle: 'Boost your profile',
    stepTwoText:
      'Share your link on social media, talk to your fans and increase your visibility to maximize your Flinboost sales.',
    stepThreeTitle: 'Reach $30',
    stepThreeText:
      'Sales can come from any content on your Flinbo profile. If you reach $30 in valid sales, you get $50 extra — $80 total.',

    rulesTitle: 'Rules',
    rulesText: 'To receive the Flinboost bonus, you need to meet the following conditions.',
    rules: [
      'The Flinboost lasts 15 days from the start date confirmed by Flinbo.',
      'You must sell at least $30 inside Flinbo.',
      'Sales can come from any content on your profile.',
      'Reaching $30 in valid sales earns you $50 extra — $80 total.',
    ],

    termsButton: 'Terms and conditions here',
    termsTitle: 'Terms and conditions',
    termsText:
      'To participate in the Flinboost, the creator must reach at least $30 in valid sales within the 15-day challenge period. Once the Flinboost ends and compliance with the conditions is verified, Flinbo will pay the $50 extra bonus (total $80). Payment may be made within 30 business days following the end of the challenge. Flinbo will review sales to prevent fraud, self-purchases or suspicious activity.',

    tutorialBadge: 'Academy',
    tutorialTitle: 'Power up your sales in the Flinboost.',
    tutorialText:
      "In these videos we show you how to boost your content on Flinbo: how to make it more attractive, how to catch your fans' attention and how to maximize your sales.",
    videoTitle: 'Flinboost Tutorial',
    close: 'Close',

    tipsTitle: '5 ways to sell more',
    tips: [
      'Post on your social media',
      'DM your fans directly',
      'Add your Flinbo link on Linktree',
      'Share your best content from the platform',
      'More visibility = more sales',
    ],

    faqTitle: 'FAQ',
    faqs: [
      {
        q: 'How long does the Flinboost last?',
        a: 'It lasts 15 days from the start date confirmed by Flinbo on WhatsApp.',
      },
      {
        q: 'Do sales need to come from specific content?',
        a: 'No. They can come from any content you have on the platform.',
      },
      {
        q: 'How much do I get if I reach $30?',
        a: 'If sales are valid, you receive $50 extra — $80 total.',
      },
      {
        q: 'What happens if I do not complete the challenge?',
        a: "You keep what you earned, but you don't receive the $50 extra Flinboost bonus.",
      },
    ],

    finalTitle: 'Want to be part of the Flinboost?',
    finalText: 'Message us on WhatsApp, confirm your participation and start selling.',

    banner1Badge: 'FLINBOOST ACTIVE',
    banner1Title: 'Sell $30 and get $80',
    banner1Sub: 'Sell $30 in valid sales and the Flinboost adds $50 extra — $80 total.',
    banner1Cta: 'Join now',

    banner2Badge: 'FLINBOOST ACTIVE',
    banner2TitlePre: 'Already',
    banner2TitlePost: 'creators in the Flinboost',
    banner2Sub: 'Your content can already be generating sales right now.',
    banner2Highlight: 'You just need to reach $30 in valid sales.',
    banner2Cta: 'Join the Flinboost',

    footer: 'Flinboost',
  },

  pt: {
    navRules: 'Regras',
    navFaq: 'FAQ',
    cta: 'Quero participar',

    heroBadge: 'Flinboost — Desafio oficial',
    heroTitle: 'Venda $30 e receba $80 no total.',
    heroText:
      'Você tem 15 dias para alcançar a meta do Flinboost. Chegue a $30 em vendas válidas e receba $50 extra — $80 no total.',
    heroButton: 'Entrar no Flinboost',
    heroSecondButton: 'Ver como funciona',

    liveProgress: 'Flinboost ativo',
    liveText: 'criadoras participando',
    liveSubtext: 'Entre antes da próxima rodada fechar',

    howTitle: 'Como funciona',
    howText: 'Você se registra e começa a vender dentro do Flinboost.',
    stepsTitle: 'Passos para participar',
    stepOneTitle: 'Entre em contato',
    stepOneText:
      'Fale conosco pelo WhatsApp e registre-se para participar. O Flinboost começa quando a equipe da Flinbo confirma sua data de início.',
    stepTwoTitle: 'Impulsione seu perfil',
    stepTwoText:
      'Compartilhe seu link nas redes, fale com seus fãs e aumente sua visibilidade para maximizar suas vendas no Flinboost.',
    stepThreeTitle: 'Chegue a $30',
    stepThreeText:
      'As vendas podem vir de qualquer conteúdo seu na Flinbo. Se chegar a $30 válidos, recebe $50 extra — $80 no total.',

    rulesTitle: 'Regras',
    rulesText: 'Para receber o bônus do Flinboost, você precisa cumprir as seguintes condições.',
    rules: [
      'O Flinboost dura 15 dias desde a data de início confirmada pela Flinbo.',
      'Você precisa vender pelo menos $30 dentro da Flinbo.',
      'As vendas podem vir de qualquer conteúdo do seu perfil.',
      'Ao chegar a $30 em vendas válidas, você recebe $50 extra — $80 no total.',
    ],

    termsButton: 'Termos e condições aqui',
    termsTitle: 'Termos e condições',
    termsText:
      'Para participar do Flinboost, a criadora deve alcançar pelo menos $30 em vendas válidas durante os 15 dias do desafio. Uma vez finalizado o Flinboost e verificado o cumprimento das condições, a Flinbo pagará o bônus de $50 extra (total $80). O pagamento poderá ser realizado dentro de 30 dias úteis após o término do desafio. A Flinbo revisará as vendas para prevenir fraude, compras próprias ou atividade suspeita.',

    tutorialBadge: 'Academy',
    tutorialTitle: 'Potencialize suas vendas no Flinboost.',
    tutorialText:
      'Nestes vídeos mostramos como potencializar seu conteúdo na Flinbo: como deixá-lo mais atrativo, como chamar a atenção dos seus fãs e como maximizar suas vendas.',
    videoTitle: 'Tutorial Flinboost',
    close: 'Fechar',

    tipsTitle: '5 formas de vender mais',
    tips: [
      'Publique nas suas redes sociais',
      'Fale por DM com seus fãs',
      'Adicione seu link da Flinbo no Linktree',
      'Compartilhe seus melhores conteúdos da plataforma',
      'Mais visibilidade = mais vendas',
    ],

    faqTitle: 'Perguntas frequentes',
    faqs: [
      {
        q: 'Quanto tempo dura o Flinboost?',
        a: 'Dura 15 dias desde a data de início confirmada pela Flinbo no WhatsApp.',
      },
      {
        q: 'As vendas precisam vir de um conteúdo específico?',
        a: 'Não. Podem vir de qualquer conteúdo que você tem na plataforma.',
      },
      {
        q: 'Quanto recebo se chegar a $30?',
        a: 'Se as vendas forem válidas, você recebe $50 extra — $80 no total.',
      },
      {
        q: 'O que acontece se eu não cumprir o desafio?',
        a: 'Você fica com o que ganhou, mas não recebe o bônus de $50 extra do Flinboost.',
      },
    ],

    finalTitle: 'Quer fazer parte do Flinboost?',
    finalText: 'Fale com a gente no WhatsApp, confirme sua participação e comece a vender.',

    banner1Badge: 'FLINBOOST ATIVO',
    banner1Title: 'Venda $30 e receba $80',
    banner1Sub: 'Venda $30 em vendas válidas e o Flinboost soma $50 extra — $80 no total.',
    banner1Cta: 'Quero participar',

    banner2Badge: 'FLINBOOST ATIVO',
    banner2TitlePre: 'Já são',
    banner2TitlePost: 'criadoras no Flinboost',
    banner2Sub: 'Seu conteúdo já pode estar gerando vendas agora mesmo.',
    banner2Highlight: 'Você só precisa chegar a $30 em vendas válidas.',
    banner2Cta: 'Entrar no Flinboost',

    footer: 'Flinboost',
  },
}

function App() {
  const [language, setLanguage] = useState<Language>('es')
  const [langOpen, setLangOpen] = useState(false)
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null)
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [creatorCount, setCreatorCount] = useState(getSavedCreatorCount)
  const langRef = useRef<HTMLDivElement>(null)

  const t = translations[language]
  const currentLangOption = langOptions.find((o) => o.value === language)!
  const { Flag: CurrentFlag } = currentLangOption

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

      {/* ── Header ── */}
      <header className="header">
        <a href="#" className="brand">
          <img src={flinboLogo} alt="Flinbo" className="logoImage" />
        </a>

        <nav className="desktopNav">
          <a href="#rules">{t.navRules}</a>
          <a href="#faq">{t.navFaq}</a>
        </nav>

        <div className="headerActions">
          <div className="langDropdown" ref={langRef}>
            <button
              className="langDropdownTrigger"
              onClick={() => setLangOpen((prev) => !prev)}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              <CurrentFlag />
              <span className="langCode">{currentLangOption.code}</span>
              <span className={`langDropdownArrow${langOpen ? ' open' : ''}`}>▾</span>
            </button>
            {langOpen && (
              <div className="langDropdownMenu" role="listbox">
                {langOptions.map(({ value, Flag, code }) => (
                  <button
                    key={value}
                    className={`langDropdownItem${value === language ? ' active' : ''}`}
                    role="option"
                    aria-selected={value === language}
                    onClick={() => { setLanguage(value); setLangOpen(false) }}
                  >
                    <Flag />
                    <span>{code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a className="smallCta" href={whatsappLink} target="_blank" rel="noreferrer">
            {t.cta}
          </a>
        </div>
      </header>

      {/* ── 1. Hero ── */}
      <section className="hero">
        <div className="heroContent">
          <div className="heroCopy">
            <div className="pill">{t.heroBadge}</div>
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
                  key={index}
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
              <p className="liveSubtext">{t.liveSubtext}</p>
              <div className="liveProgressTrack">
                <div className="liveProgressFill" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Cómo funciona ── */}
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
        </div>
      </section>

      {/* ── Banner 1 ── */}
      <div className="bannerWrapper">
        <div className="banner1">
          <div className="banner1Inner">
            <div className="b1OrbA" />
            <div className="b1OrbB" />
            <div className="b1Shimmer" />
            <div className="b1Left">
              <span className="bannerBadge">{t.banner1Badge}</span>
              <h2 className="b1Title">{t.banner1Title}</h2>
              <p className="b1Sub">{t.banner1Sub}</p>
            </div>
            <a className="primaryButton ctaPulse" href={whatsappLink} target="_blank" rel="noreferrer">
              {t.banner1Cta}
            </a>
          </div>
        </div>
      </div>

      {/* ── 3. Reglas ── */}
      <section className="section rulesSection" id="rules">
        <div className="sectionHeader">
          <span className="sectionBadge">02</span>
          <h2>{t.rulesTitle}</h2>
          <p>{t.rulesText}</p>
        </div>

        <div className="rulesColumn">
          <div className="rulesList">
            {t.rules.map((rule) => (
              <div className="ruleItem" key={rule}>
                <span>✓</span>
                <p>{rule}</p>
              </div>
            ))}
          </div>
          <button className="termsButton" onClick={() => setIsTermsOpen(true)}>
            {t.termsButton}
          </button>
        </div>
      </section>

      {/* ── 4. Tutorial + Tips ── */}
      <section className="section tutorialSection" id="tutorial">
        <div className="sectionHeader">
          <span className="sectionBadge">{t.tutorialBadge}</span>
          <h2>{t.tutorialTitle}</h2>
          <p>{t.tutorialText}</p>
        </div>

        <div className="videoCarousel">
          {tutorialVideos.map((video) => (
            <button
              key={video.embedUrl}
              className="videoCarouselItem"
              onClick={() => setActiveVideoUrl(video.embedUrl)}
            >
              <div className="videoThumbnailWrapper">
                <img src={video.thumbnail} alt="Tutorial" className="videoThumbnailImg" />
                <div className="videoThumbnailOverlay" />
                <span className="playButton">▶</span>
              </div>
            </button>
          ))}
        </div>

        <div className="tipsSectionInner">
          <div className="sectionMiniTitle">{t.tipsTitle}</div>
          <div className="tipsGrid">
            {t.tips.map((tip, i) => (
              <div className="tipCard" key={i}>
                <span className="tipNumber">{String(i + 1).padStart(2, '0')}</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Banner 2 ── */}
      <div className="bannerWrapper">
        <div className="banner2">
          <div className="banner2Inner">
            <div className="b2OrbA" />
            <div className="b2OrbB" />
            <span className="bannerBadge bannerBadgePink">{t.banner2Badge}</span>
            <h2 className="b2Title">
              {t.banner2TitlePre} <span className="b2Count">+{creatorCount}</span> {t.banner2TitlePost}
            </h2>
            <p className="b2Sub">{t.banner2Sub}</p>
            <p className="b2Highlight">{t.banner2Highlight}</p>
            <a className="primaryButton ctaPulse b2Cta" href={whatsappLink} target="_blank" rel="noreferrer">
              {t.banner2Cta}
            </a>
          </div>
        </div>
      </div>

      {/* ── 5. FAQ ── */}
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

      {/* ── 6. Final CTA ── */}
      <section className="finalCta">
        <div>
          <span className="sectionBadge">Flinboost</span>
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

      {/* ── Video modal ── */}
      {activeVideoUrl && (
        <div className="modalOverlay" onClick={() => setActiveVideoUrl(null)}>
          <div className="videoModal" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>{t.videoTitle}</h3>
              <button onClick={() => setActiveVideoUrl(null)}>{t.close}</button>
            </div>
            <iframe
              src={activeVideoUrl}
              title={t.videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ── Terms modal ── */}
      {isTermsOpen && (
        <div className="modalOverlay" onClick={() => setIsTermsOpen(false)}>
          <div className="termsModal" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>{t.termsTitle}</h3>
              <button onClick={() => setIsTermsOpen(false)}>{t.close}</button>
            </div>
            <p className="termsModalText">{t.termsText}</p>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
