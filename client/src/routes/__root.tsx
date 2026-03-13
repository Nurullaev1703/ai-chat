import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ToastProvider } from "@/contexts/ToastContext";
import { ChatProvider, useChat } from "@/contexts/ChatContext";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const RootComponent = () => {
  const { clearHistory, messages } = useChat();

  return (
    <div className="min-h-screen flex flex-col pt-14">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex justify-between h-14 items-center gap-4 px-4 md:px-8">
          <Link
            to="/"
            className="flex flex-1 items-center gap-2 text-primary font-bold transition-all hover:scale-105 active:scale-95"
          >
            <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
              <span className="text-primary text-xs">AI</span>
            </div>
            AI-Chat
          </Link>

          <p className="hidden md:block text-xs font-medium text-white/40 uppercase tracking-widest">
            Neural Assistant v1.0
          </p>

          <div className="flex-1 flex justify-end">
            {messages.length > 0 && (
              <Button 
                onClick={clearHistory}
                variant="ghost" 
                size="sm"
                className="text-white/20 hover:text-error hover:bg-error/10 transition-all gap-2 rounded-full"
              >
                <Trash2 size={14} />
                <span className="text-xs font-medium">Clear history</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
      <ToastContainer />
      <TanStackRouterDevtools />
    </div>
  );
};

export const Route = createRootRoute({
  component: () => (
    <ToastProvider>
      <ChatProvider>
        <RootComponent />
      </ChatProvider>
    </ToastProvider>
  ),
});
