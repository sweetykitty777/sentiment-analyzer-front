import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ExitIcon } from "@radix-ui/react-icons";

import { Link } from "@tanstack/react-router";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useAuth } from "react-oidc-context";

function Auth() {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div className="flex items-center gap-3 text-sm font-semibold">
        <div className="hidden sm:inline-block">
          {auth.user?.profile.email}
        </div>
        <button onClick={() => void auth.removeUser()}>
            <ExitIcon className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}
export default function Navbar() {
  return (
    <div className="bg-white shadow-sm">
      <div className="mx-auto max-w-screen-lg">
        <header className="mx-5 flex items-center justify-between">
          <span className="hidden max-w-min bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text font-bold leading-4 text-transparent sm:block">
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
          <div>
            <Auth />
          </div>
        </header>
      </div>
    </div>
  );
}
