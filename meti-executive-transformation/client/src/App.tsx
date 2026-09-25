import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import VideoExplainer from "./pages/VideoExplainer";
import Checkout from "./pages/Checkout";
import VideoRecorder from "./pages/VideoRecorder";
import CaseWorkspace from "./pages/CaseWorkspace";
import AssessorReview from "./pages/AssessorReview";
import AdminPanel from "./pages/AdminPanel";
import CandidateProfile from "./pages/CandidateProfile";
import Assessment from "./pages/Assessment";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/video" component={VideoExplainer} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={CandidateProfile} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/app" component={Home} />
      <Route path="/assessment" component={Assessment} />
      <Route path="/studio" component={VideoRecorder} />
      <Route path="/case" component={CaseWorkspace} />
      <Route path="/evaluator" component={AssessorReview} />
      <Route path="/assessor" component={AssessorReview} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
