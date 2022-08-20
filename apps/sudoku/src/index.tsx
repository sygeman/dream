import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Routes, Route, Router } from "@solidjs/router";
import "@unocss/reset/tailwind.css";
import "uno.css";
import './index.css'

const IndexPage = lazy(() => import("./pages/index"));
const GamePage = lazy(() => import("./pages/game"));

render(
  () => (
    <Router>
      <Routes>
        <Route path="/" component={IndexPage} />
        <Route path="/game/:id" component={GamePage} />
      </Routes>
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
