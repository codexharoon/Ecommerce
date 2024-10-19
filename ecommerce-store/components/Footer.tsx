const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto py-10">
        <p className="text-center text-sm text-black">
          &copy; {new Date().getFullYear()} &middot; Code x Store | All Rights
          Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
