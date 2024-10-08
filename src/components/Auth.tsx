import { ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "react-oidc-context";
import { Button } from "./ui/button";

export default function Auth() {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing in...</div>;
    case "signoutRedirect":
      return <div>Signing out...</div>;
  }

  if (auth.isLoading) {
    return <Loader />;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  const handleLogout = () => {
    auth.removeUser();
    auth.signoutRedirect({
      id_token_hint: auth.user?.id_token,
      post_logout_redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
      redirectTarget: "self",
    });
    auth.clearStaleState();
  };

  if (auth.isAuthenticated) {
    return (
      <>
        <span className="hidden sm:inline-block">
          {auth.user?.profile.email}
        </span>
        <button onClick={handleLogout}>
          <ExitIcon className="h-4 w-4" />
        </button>
      </>
    );
  } else {
    return (
      <Button
        onClick={() => void auth.signinRedirect({ redirectTarget: "self" })}
        variant="outline"
      >
        Log in
      </Button>
    );
  }
}

function Loader() {
  return (
    <svg
      className="-ml-1 mr-3 h-5 w-5 animate-spin text-black"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
