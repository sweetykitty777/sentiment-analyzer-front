import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ExitIcon } from "@radix-ui/react-icons";

import { Link } from "@tanstack/react-router";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-screen-lg mx-auto">
        <header className="flex justify-between items-center">
          <span className="max-w-min font-bold leading-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Sentiment Analyzer
          </span>
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
          <div className="text-sm font-semibold flex items-center gap-3">
            Olga Schavochkina
            <button>
              <ExitIcon className="h-4 w-4" />
            </button>
          </div>
        </header>
      </div>
    </div>
  );
}
