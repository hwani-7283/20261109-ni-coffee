import { useEffect, useState } from "react";

const assetPath = "/assets";

const slides = [
  {
    image: `${assetPath}/97bb8.png`,
    alt: "햇살이 비치는 HN COFFEE 매장 전경",
    className: "hero-slide--original",
  },
  {
    image: `${assetPath}/360ec.png`,
    alt: "창가 테이블 위 커피와 들꽃",
    className: "hero-slide--story",
    eyebrow: "A SLOW MOMENT",
    title: "햇살 아래 잠시 쉬어가는 시간",
  },
  {
    image: `${assetPath}/5d6dd.png`,
    alt: "따뜻한 분위기의 HN COFFEE 실내",
    className: "hero-slide--space",
    eyebrow: "OUR SPACE",
    title: "커피와 공간이 전하는 온기",
  },
];

const menuCards = [
  {
    image: `${assetPath}/a590e.png`,
    alt: "좋은 커피가 만드는 더 나은 하루",
    title: "좋은 커피가 만드는 더 나은 하루",
    description: "매일 정성스럽게 내린 HN COFFEE의 시그니처 커피를 만나보세요.",
  },
  {
    image: `${assetPath}/5d6dd.png`,
    alt: "커피와 있는 곳, 그리고 사람",
    title: "커피와 있는 곳, 그리고 사람",
    description: "나무와 햇살이 어우러진 공간에서 일상의 여유를 누려보세요.",
  },
  {
    image: `${assetPath}/32c96.png`,
    alt: "지금 HN COFFEE에서 특별한 혜택",
    title: "지금, HN COFFEE에서",
    description: "HN COFFEE가 준비한 계절의 이야기와 새로운 소식을 확인해 보세요.",
  },
];

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "MENU", href: "#menu" },
  { label: "store", href: "#store" },
  { label: "ABOUT", href: "#about" },
  { label: "EVENT", href: "#event" },
];

type MenuCard = (typeof menuCards)[number];

// 상단 내비게이션: 데스크톱 메뉴와 모바일 햄버거 메뉴가 같은 링크를 공유합니다.
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#home" aria-label="HN COFFEE 홈">
          <span className="brand-mark">HN</span>
          <span className="brand-name">COFFEE</span>
        </a>

        <nav className="desktop-nav" aria-label="주요 메뉴">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-menu"
        className={`mobile-nav ${isMenuOpen ? "is-open" : ""}`}
        aria-label="모바일 메뉴"
      >
        {navItems.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

// 히어로 슬라이더: 자동 재생되며 번호 버튼과 이전/다음 버튼으로 직접 이동할 수 있습니다.
function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const moveSlide = (direction: number) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <section id="home" className="hero" aria-label="HN COFFEE 주요 소식">
      <div className="hero-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <article
            className={`hero-slide ${slide.className}`}
            key={slide.alt}
            aria-hidden={activeSlide !== index}
          >
            <img src={slide.image} alt={slide.alt} />
            {index !== 0 && (
              <div className="hero-message">
                <span>{slide.eyebrow}</span>
                <h2>{slide.title}</h2>
                <a href="#about">
                  VIEW MORE <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="hero-controls">
        <div className="hero-dots" aria-label="슬라이드 선택">
          {slides.map((_, index) => (
            <button
              type="button"
              key={index}
              className={activeSlide === index ? "is-active" : ""}
              aria-label={`${index + 1}번 슬라이드 보기`}
              aria-current={activeSlide === index}
              onClick={() => setActiveSlide(index)}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <div className="hero-arrows">
          <button type="button" aria-label="이전 슬라이드" onClick={() => moveSlide(-1)}>
            ←
          </button>
          <button type="button" aria-label="다음 슬라이드" onClick={() => moveSlide(1)}>
            →
          </button>
        </div>
      </div>
    </section>
  );
}

// 카드 팝업: 선택한 소식의 제목과 설명을 보여주며 배경이나 닫기 버튼으로 닫을 수 있습니다.
function DetailModal({ card, onClose }: { card: MenuCard; onClose: () => void }) {
  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", closeWithEscape);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" aria-label="팝업 닫기" onClick={onClose}>
          ×
        </button>
        <img src={card.image} alt="" />
        <div className="modal-copy">
          <span>HN COFFEE</span>
          <h2 id="modal-title">{card.title}</h2>
          <p>{card.description}</p>
          <a href="#store" onClick={onClose}>
            매장 안내 보기 <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}

function BrandStory() {
  return (
    <>
      <section id="about" className="brand-note content-shell">
        <span className="section-kicker">WELCOME TO HN COFFEE</span>
        <h1>머무는 순간이 좋아지는 공간</h1>
        <p>
          좋은 커피와 자연스러운 공간, 그리고 느긋한 시간.
          <br />
          HN COFFEE는 매일의 작은 순간을 다정하게 채웁니다.
        </p>
      </section>

      <section id="menu" className="signature content-shell">
        <div className="signature-heading">
          <div>
            <h2>천천히 즐기는 한 잔</h2>
            <span>HN HAND DRIP</span>
          </div>
          <p>
            가장 좋은 재료로 정성스럽게 준비합니다.
            <br />
            <small>향이 머무는 깊고 부드러운 커피</small>
          </p>
        </div>
      </section>
    </>
  );
}

function App() {
  const [selectedCard, setSelectedCard] = useState<MenuCard | null>(null);

  return (
    <div className="site">
      <Header />
      <main>
        <HeroSlider />
        <BrandStory />

        <section id="event" className="menu-grid content-shell" aria-label="HN COFFEE 소식">
          {menuCards.map((card, index) => (
            <button
              className="menu-card"
              type="button"
              key={card.title}
              onClick={() => setSelectedCard(card)}
            >
              <img src={card.image} alt={card.alt} />
              {index === 2 && (
                <img
                  className="cup-handle"
                  src={`${assetPath}/d3c10.svg`}
                  alt=""
                  aria-hidden="true"
                />
              )}
              <span className="sr-only">{card.title} 자세히 보기</span>
            </button>
          ))}
        </section>

        <section className="story-image" aria-label="햇살이 머무는 HN COFFEE의 공간">
          <img src={`${assetPath}/360ec.png`} alt="햇살이 비치는 테이블 위 커피와 흰 들꽃" />
        </section>
      </main>

      <footer id="store" className="site-footer">
        <div className="footer-top content-shell">
          <a className="footer-brand" href="#home">
            <small>COFFEE</small>
            <strong>HN</strong>
          </a>
          <nav aria-label="하단 메뉴">
            <a href="#home">HOME</a>
            <a href="#about">OUR STORY</a>
            <a href="#menu">MENU</a>
            <a href="#store">SPACE</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              INSTAGRAM
            </a>
          </nav>
          <div className="footer-invitation">
            <span>COME AND STAY A WHILE</span>
            <p>가까운 곳에서 만나는 작은 여유, HN COFFEE</p>
          </div>
        </div>
        <div className="footer-center content-shell">
          <h2>Your everyday, a little more special.</h2>
          <a href="https://maps.google.com/?q=HN+COFFEE" target="_blank" rel="noreferrer">
            FIND OUR STORE <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="footer-bottom content-shell">
          <span>© 2026 HN COFFEE. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>

      {selectedCard && <DetailModal card={selectedCard} onClose={() => setSelectedCard(null)} />}
    </div>
  );
}

export default App;
