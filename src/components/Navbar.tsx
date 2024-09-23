import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Link } from "@tanstack/react-router";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Auth from "./Auth";

export default function Navbar() {
  return (
    <div className="bg-white shadow-sm">
      <div className="mx-auto max-w-screen-lg">
        <header className="mx-5 flex items-center justify-between">
          <Link
            className="my-2 hidden max-w-min bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text p-1 font-bold leading-4 text-transparent sm:block"
            to="/"
          >
            Sentiment Analyzer
          </Link>
          <Menu />
          <div>
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Auth />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

function Menu() {
  return (
    <NavigationMenu className="py-3">
      <NavigationMenuList className="gap-3">
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Check Text
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/uploads">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              My Uploads
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
