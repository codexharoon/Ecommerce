import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";

const Navbar = async () => {
  const categories = await getCategories();
  return (
    <header className="border-b">
      <Container>
        <div className="flex items-center h-16 px-4 sm:px-6 lg:px-8">
          <Link href={"/"}>
            <p className="font-bold text-xl">Code x Store</p>
          </Link>

          <MainNav data={categories} />

          <NavbarActions />
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
