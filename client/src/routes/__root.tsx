import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ToastProvider } from "@/contexts/ToastContext";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { Button } from "@/components/ui/button";

export const Route = createRootRoute({
  component: () => (
    <ToastProvider>
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 w-screen border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex justify-between h-14 items-center gap-4 px-4">
            <Link
              to="/"
              className="flex flex-1 items-center gap-2 text-primary transition-colors hover:text-primary/80"
            >
              AI-Chat
            </Link>
            <p className="font-bold">Your Custom AI Assistant</p>
            <div className="flex-1 flex justify-end">
              <Button type="button" variant={"danger"}>
                Clear Chat
              </Button>
            </div>
          </div>
        </header>

        <main className="py-4">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
      <TanStackRouterDevtools />
    </ToastProvider>
  ),
});
