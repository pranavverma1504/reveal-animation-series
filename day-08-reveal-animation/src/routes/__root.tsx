import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "../styles.css?url";
export const Route = createRootRouteWithContext<{queryClient: QueryClient}>()({
  head: () => ({meta: [{charSet:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"}], links:[{rel:"stylesheet",href:appCss}]}),
  shellComponent: Shell,
  component: Root,
});
function Shell({children}:{children: ReactNode}) { return <html lang="en"><head><HeadContent /></head><body>{children}<Scripts /></body></html>; }
function Root() { const {queryClient}=Route.useRouteContext(); return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>; }
