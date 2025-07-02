const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-8 mt-16">
      <div className="container mx-auto px-6 text-center">
        <p className="text-lg mb-4">
          &copy; {new Date().getFullYear()} Toko Anda. Hak Cipta Dilindungi.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            className="text-muted-foreground hover:text-background transition-colors duration-200"
          >
            Kebijakan Privasi
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-background transition-colors duration-200"
          >
            Syarat & Ketentuan
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
