import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Link } from "@tanstack/react-router";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Auth from "./Auth";
import { useAuth } from "react-oidc-context";

export default function Navbar() {
  const auth = useAuth();

  return (
    <div className="bg-white shadow-sm">
      <div className="mx-auto max-w-screen-lg">
        <header className="mx-5 flex items-center justify-between">
          <Link
            className="hidden max-w-min bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text my-4 font-bold leading-4 text-transparent sm:block"
            to="/"
          >
            Sentiment Analyzer
          </Link>
          <NavigationMenu className="py-3">
            <NavigationMenuList className="gap-3">
              {auth.isAuthenticated && (
                <>
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Check Text
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link to="/uploads">
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        My Uploads
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div>
            <Auth />
          </div>
        </header>
      </div>
    </div>
  );
}
