import { useEffect, useState } from 'react'
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

const translations = {
  es: {
    flag: '🇪🇸',
    brand: 'Flinbo',
    navRules: 'Reglas',
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
    tutorialTitle: 'Crea contenido que sume más ingresos.',
    tutorialText:
      'En estos videos te contamos cómo potenciar tu contenido en Flinbo: cómo hacerlo más atractivo, cómo llamar la atención de tus fans y cómo dejar claro qué van a encontrar cuando entren.',
    videoTitle: 'Tutorial del desafío',
    close: 'Cerrar',

    howTitle: 'Cómo funciona',
    howText: 'Te registras, subes contenido nuevo y empiezas a vender dentro de Flinbo.',
    stepsTitle: 'Pasos para participar',
    stepOneTitle: 'Contáctanos',
    stepOneText:
      'Escríbenos por WhatsApp y registrate para participar. El desafío empieza cuando el equipo de Flinbo te confirma tu fecha de inicio.',
    stepTwoTitle: 'Crea contenido',
    stepTwoText:
      'Durante el desafío tienes que subir 2 contenidos nuevos a nuestra plataforma, en cualquiera de nuestros formatos.',
    stepThreeTitle: 'Llega a $30',
    stepThreeText:
      'Las ventas pueden venir de cualquier contenido que tengas en Flinbo. Si llegas a $30 válidos, ganas $30 extra.',

    rulesTitle: 'Reglas',
    rulesText: 'Para recibir el bonus, tienes que cumplir las condiciones del desafío.',
    rules: [
      'El desafío dura 15 días desde la fecha de inicio confirmada por Flinbo.',
      'Debes vender al menos $30 dentro de Flinbo.',
      'Las ventas pueden venir de cualquier contenido de tu perfil.',
      'Debes subir 2 contenidos nuevos en cualquier formato a nuestra plataforma.',
    ],

    termsButton: 'Términos y condiciones aquí',
    termsTitle: 'Términos y condiciones',
    termsText:
      'Para participar del desafío, la creadora debe subir 2 contenidos nuevos en cualquier formato disponible en la plataforma, cumplir las reglas del desafío y alcanzar al menos $30 en ventas válidas. Una vez finalizado el desafío y verificado el cumplimiento de las condiciones, Flinbo pagará el bonus de $30. El pago podrá realizarse dentro de los 30 días hábiles siguientes a la finalización del desafío. Flinbo revisará las ventas para prevenir fraude, compras propias o actividad sospechosa.',

    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Cuánto dura el desafío?', a: 'Dura 15 días desde la fecha de inicio que Flinbo te confirma por WhatsApp.' },
      { q: '¿Las ventas tienen que venir del contenido nuevo que publiquemos?', a: 'No. Pueden venir de cualquier contenido que tengas en la plataforma.' },
      { q: '¿Qué pasa si llego a $30?', a: 'Si las ventas son válidas, Flinbo te paga $30 extra.' },
      { q: '¿Qué pasa si no cumplo el desafío?', a: 'Te quedas con lo que ganaste, pero Flinbo no te paga los $30 extra.' },
    ],

    finalTitle: '¿Querés ser parte del próximo desafío Flinbo?',
    finalText: 'Escríbenos por WhatsApp, confirma tu participación y empieza a crear.',
    footer: 'Flinbo Challenge',
  },

  en: {
    flag: '🇺🇸',
    brand: 'Flinbo',
    navRules: 'Rules',
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
    tutorialTitle: 'Create content that brings more income.',
    tutorialText:
      "In these videos we show you how to boost your content on Flinbo: how to make it more attractive, how to catch your fans' attention and how to make clear what they'll find when they come in.",
    videoTitle: 'Challenge tutorial',
    close: 'Close',

    howTitle: 'How it works',
    howText: 'You register, upload new content and start selling inside Flinbo.',
    stepsTitle: 'Steps to participate',
    stepOneTitle: 'Contact us',
    stepOneText:
      'Message us on WhatsApp and register to participate. The challenge starts when the Flinbo team confirms your start date.',
    stepTwoTitle: 'Create content',
    stepTwoText:
      'During the challenge you need to upload 2 new pieces of content to our platform, in any of our formats.',
    stepThreeTitle: 'Reach $30',
    stepThreeText:
      'Sales can come from any content on your Flinbo profile. If you reach $30 in valid sales, you get $30 extra.',

    rulesTitle: 'Rules',
    rulesText: 'To receive the bonus, you need to follow the challenge conditions.',
    rules: [
      'The challenge lasts 15 days from the start date confirmed by Flinbo.',
      'You must sell at least $30 inside Flinbo.',
      'Sales can come from any content on your profile.',
      'You must upload 2 new pieces of content in any format to our platform.',
    ],

    termsButton: 'Terms and conditions here',
    termsTitle: 'Terms and conditions',
    termsText:
      'To participate in the challenge, the creator must upload 2 new pieces of content in any format available on the platform, comply with the challenge rules and reach at least $30 in valid sales. Once the challenge ends and compliance with the conditions is verified, Flinbo will pay the $30 bonus. Payment may be made within 30 business days following the end of the challenge. Flinbo will review sales to prevent fraud, self-purchases or suspicious activity.',

    faqTitle: 'FAQ',
    faqs: [
      { q: 'How long does it last?', a: 'It lasts 15 days from the start date confirmed by Flinbo on WhatsApp.' },
      { q: 'Do sales need to come from the new content we publish?', a: 'No. They can come from any content you have on the platform.' },
      { q: 'What happens if I reach $30?', a: 'If sales are valid, Flinbo pays you $30 extra.' },
      { q: 'What happens if I do not complete the challenge?', a: 'You keep what you earned, but Flinbo does not pay the extra $30.' },
    ],

    finalTitle: 'Want to be part of the next Flinbo Challenge?',
    finalText: 'Message us on WhatsApp, confirm your participation and start creating.',
    footer: 'Flinbo Challenge',
  },

  pt: {
    flag: '🇧🇷',
    brand: 'Flinbo',
    navRules: 'Regras',
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
    tutorialTitle: 'Crie conteúdo que gere mais ganhos.',
    tutorialText:
      'Nestes vídeos contamos como potencializar seu conteúdo na Flinbo: como deixá-lo mais atrativo, como chamar a atenção dos seus fãs e como deixar claro o que vão encontrar quando entrarem.',
    videoTitle: 'Tutorial do desafio',
    close: 'Fechar',

    howTitle: 'Como funciona',
    howText: 'Você se registra, sobe conteúdo novo e começa a vender dentro da Flinbo.',
    stepsTitle: 'Passos para participar',
    stepOneTitle: 'Entre em contato',
    stepOneText:
      'Fale conosco pelo WhatsApp e registre-se para participar. O desafio começa quando a equipe da Flinbo confirma sua data de início.',
    stepTwoTitle: 'Crie conteúdo',
    stepTwoText:
      'Durante o desafio, você precisa subir 2 conteúdos novos na nossa plataforma, em qualquer um dos nossos formatos.',
    stepThreeTitle: 'Chegue a $30',
    stepThreeText:
      'As vendas podem vir de qualquer conteúdo seu na Flinbo. Se chegar a $30 válidos, ganha $30 extra.',

    rulesTitle: 'Regras',
    rulesText: 'Para receber o bônus, você precisa cumprir as condições do desafio.',
    rules: [
      'O desafio dura 15 dias desde a data de início confirmada pela Flinbo.',
      'Você precisa vender pelo menos $30 dentro da Flinbo.',
      'As vendas podem vir de qualquer conteúdo do seu perfil.',
      'Você precisa subir 2 conteúdos novos em qualquer formato na nossa plataforma.',
    ],

    termsButton: 'Termos e condições aqui',
    termsTitle: 'Termos e condições',
    termsText:
      'Para participar do desafio, a criadora deve subir 2 conteúdos novos em qualquer formato disponível na plataforma, cumprir as regras do desafio e alcançar pelo menos $30 em vendas válidas. Uma vez finalizado o desafio e verificado o cumprimento das condições, a Flinbo pagará o bônus de $30. O pagamento poderá ser realizado dentro de 30 dias úteis após o término do desafio. A Flinbo revisará as vendas para prevenir fraude, compras próprias ou atividade suspeita.',

    faqTitle: 'Perguntas frequentes',
    faqs: [
      { q: 'Quanto tempo dura?', a: 'Dura 15 dias desde a data de início confirmada pela Flinbo no WhatsApp.' },
      { q: 'As vendas precisam vir do conteúdo novo que publicamos?', a: 'Não. Podem vir de qualquer conteúdo que você tem na plataforma.' },
      { q: 'O que acontece se eu chegar a $30?', a: 'Se as vendas forem válidas, a Flinbo te paga $30 extra.' },
      { q: 'O que acontece se eu não cumprir o desafio?', a: 'Você fica com o que ganhou, mas a Flinbo não te paga os $30 extra.' },
    ],

    finalTitle: 'Quer fazer parte do próximo desafio Flinbo?',
    finalText: 'Fale com a gente no WhatsApp, confirme sua participação e comece a criar.',
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
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null)
  const [isTermsOpen, setIsTermsOpen] = useState(false)
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
          <img src={flinboLogo} alt="Flinbo" className="logoImage" />
        </a>

        <nav className="desktopNav">
          <a href="#rules">{t.navRules}</a>
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
        </div>
      </section>

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

      {activeVideoUrl && (
        <div className="modalOverlay" onClick={() => setActiveVideoUrl(null)}>
          <div className="videoModal" onClick={(event) => event.stopPropagation()}>
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

      {isTermsOpen && (
        <div className="modalOverlay" onClick={() => setIsTermsOpen(false)}>
          <div className="termsModal" onClick={(event) => event.stopPropagation()}>
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
