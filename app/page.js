import Head from 'next/head';
import Carousel from '../components/Carousel';

export default function Carousel() {
  return (
    <div>
      Carousel Placeholder - 3D Magic Coming Soon!
    </div>
  );
}
    <div>
      <Head>
        <title>GOSHEESH - NLi10 NFT Collection</title>
        <meta name="description" content="333 unique animated NFTs capturing magical transformation" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="NFT, GOSHEESH, NLi10, digital art, crypto collectibles, animated NFT" />
        <meta name="author" content="GOSHEESH" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flowfun.xyz/collection/67c61e137d9c5bb5fbaf7b17/token" />
        <meta property="og:title" content="GOSHEESH NLi10 MINT - Cosmic NFT Collection" />
        <meta property="og:description" content="333 unique animated NFTs. Mythical creatures, cosmic sweaters, and a musical journey." />
        <meta property="og:image" content="https://github.com/GOSHEESHNLI10/GOSHESHLANDING/blob/main/og-image.jpg?raw=true" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://flowfun.xyz/collection/67c61e137d9c5bb5fbaf7b17/token" />
        <meta name="twitter:title" content="GOSHEESH NLi10 MINT - Cosmic NFT Collection" />
        <meta name="twitter:description" content="333 unique animated NFTs. Mythical creatures, cosmic sweaters, and a musical journey." />
        <meta name="twitter:image" content="https://github.com/GOSHEESHNLI10/GOSHESHLANDING/blob/main/og-image.jpg?raw=true" />
        <link rel="canonical" href="https://flowfun.xyz/collection/67c61e137d9c5bb5fbaf7b17/token" />
        <meta name="theme-color" content="#1A1A1A" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Bungee&family=Bungee+Shade&family=Montserrat:wght@300;400;600;700;800&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="container">
        <header>
          <div className="logo">GOSHEESH</div>
          <div className="subtitle">
            <span className="nli10">NL<span className="i">i</span><span className="num">10</span></span> MINT
          </div>
        </header>
        <section className="hero">
          <h1>YOUR TICKET TO THE <span className="nli10">NL<span className="i">i</span><span className="num">10</span></span> MINT</h1>
          <p className="tagline">THERE WILL BE SWEATERS, EVERYONE DOESN'T GET ONE GOSHEESH</p>
        </section>
        <section className="mint-action">
          <a href="https://flowfun.xyz/collection/67c61e137d9c5bb5fbaf7b17/token" className="mint-button" target="_blank">
            MINT NOW
            <span className="mint-icon"><i className="fas fa-bolt"></i></span>
          </a>
          <p className="mint-info">333 Unique NFTs • Limited Time Only</p>
        </section>
        <section className="email-capture">
          <form id="email-capture-form">
            <div className="email-input-group">
              <input type="email" className="email-input" placeholder="Enter your email for updates" required />
              <button type="submit" className="email-submit">SUBSCRIBE</button>
            </div>
          </form>
        </section>
        <section className="payment-options">
          <div className="payment-header">
            <h3>SELECT PAYMENT METHOD</h3>
          </div>
          <div className="payment-buttons">
            <a href="https://paypal.me/NODRINKSONTHEPIANO" className="payment-button paypal" target="_blank">
              <i className="fab fa-paypal"></i>
              PayPal
            </a>
            <a href="https://venmo.com/NODRINKSONTHEPIANO" className="payment-button venmo" target="_blank">
              <i className="fab fa-venmo"></i>
              Venmo
            </a>
          </div>
        </section>
        <section className="carousel-container">
          <Carousel />
          <div className="lore-display"></div>
          <div className="carousel-controls">
            <button className="prev-btn"><i className="fas fa-chevron-left"></i></button>
            <button className="next-btn"><i className="fas fa-chevron-right"></i></button>
          </div>
        </section>
        <section className="nft-info">
          <div className="info-card sapphire">
            <h3>COLLECTION</h3>
            <p>333 unique animated NFTs, each capturing a moment of magical transformation and awakening</p>
          </div>
          <div className="info-card emerald">
            <h3>JOURNEY</h3>
            <p>Experience a complete musical odyssey, with each NFT playing one quarter of a harmonious whole</p>
          </div>
          <div className="info-card gold">
            <h3>TRAITS</h3>
            <p>Discover diverse elemental backgrounds, mystical eyes, and cosmic sweaters that evolve through the collection</p>
          </div>
        </section>
        <footer>
          <p>© 2025 GOSHEESH. All rights reserved.</p>
          <div className="social-links">
            <a href="https://x.com/GOSHEESHNLi10" className="social-icon" target="_blank"><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com/gosheeshnli10/profilecard/?igsh=ZzllbjNyd3ozcG5h" className="social-icon" target="_blank"><i className="fab fa-instagram"></i></a>
          </div>
        </footer>
      </div>
    </div>
  );
}