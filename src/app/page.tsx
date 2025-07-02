export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Selamat Datang di{" "}
              <span className="text-primary">Lumina</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Temukan produk terbaik dengan kualitas premium dan harga terjangkau. 
              Belanja mudah, aman, dan terpercaya.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Mulai Belanja
              </button>
              <button className="border border-border px-8 py-3 rounded-lg font-medium hover:bg-accent transition-colors">
                Lihat Katalog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Kategori Populer</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Elektronik", emoji: "📱" },
              { name: "Fashion", emoji: "👕" },
              { name: "Rumah & Hidup", emoji: "🏠" },
              { name: "Olahraga", emoji: "⚽" },
            ].map((category) => (
              <div
                key={category.name}
                className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-4xl mb-4">{category.emoji}</div>
                <h3 className="font-semibold">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Content */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Navbar Responsive Telah Siap!</h3>
          <p className="text-muted-foreground mb-8">
            Navbar ini sudah dilengkapi dengan fitur pencarian, menu kategori, dan ikon keranjang belanja.
            Coba resize browser atau buka di mobile untuk melihat tampilan responsif.
          </p>
          <div className="bg-card border border-border rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="font-semibold mb-4">Fitur Navbar:</h4>
            <ul className="text-left space-y-2 text-sm">
              <li>✅ Logo dan branding Lumina</li>
              <li>✅ Menu kategori dengan dropdown (Desktop)</li>
              <li>✅ Search bar dengan icon (Desktop dan Mobile)</li>
              <li>✅ Shopping bag icon</li>
              <li>✅ Mobile hamburger menu</li>
              <li>✅ Responsive design</li>
              <li>✅ Tema neutral dengan shadcn components</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
