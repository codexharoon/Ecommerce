import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";

const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex items-center h-16 px-4">
        <div>Store Switcher</div>

        <MainNav className="mx-6" />

        <div className="ml-auto">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
