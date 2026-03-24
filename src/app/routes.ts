import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/landing-page";
import { LaunchpadPage } from "./pages/launchpad-page";
import { DashboardPage } from "./pages/dashboard-page";
import { AIChatPage } from "./pages/ai-chat-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/launchpad",
    Component: LaunchpadPage,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
  },
  {
    path: "/ai-chat",
    Component: AIChatPage,
  },
]);