import React from "react";
import { Link } from "@tanstack/react-router";
import { Ghost, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NotFound: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[calc(100vh-8rem)] animate-in fade-in zoom-in duration-700">
      <div className="relative mb-8">
        <div className="size-24 bg-primary/10 rounded-3xl flex items-center justify-center border border-primary/20 shadow-[0_0_30px_rgba(var(--color-primary),0.1)]">
          <Ghost className="text-primary size-12" />
        </div>
        <div className="absolute -top-2 -right-2 bg-error text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-background">
          404
        </div>
      </div>

      <h1 className="text-4xl font-bold text-white mb-3 text-center">
        Здесь пусто...
      </h1>
      <p className="text-white/40 text-center max-w-sm mb-12 leading-relaxed">
        Похоже, эта ветка нейронной сети ведет в никуда. Страница, которую вы ищете, не существует или была перемещена.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
        <Link to="/" className="w-full">
          <Button className="w-full gap-2 h-12 rounded-2xl">
            <Home size={18} />
            На главную
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          onClick={() => window.history.back()}
          className="w-full gap-2 h-12 rounded-2xl text-white/60 hover:text-white"
        >
          <ArrowLeft size={18} />
          Назад
        </Button>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-8 opacity-20 filter grayscale">
         <div className="size-1 bg-white rounded-full"></div>
         <div className="size-1 bg-white rounded-full"></div>
         <div className="size-1 bg-white rounded-full"></div>
      </div>
    </div>
  );
};
