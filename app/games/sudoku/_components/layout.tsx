import { Component, JSX } from "solid-js";
import { GITHUB_LINK } from "../constants";

export const Layout: Component<{ children?: JSX.Element }> = (props) => (
  <div class="flex relative items-center justify-center h-screen bg-slate-900 text-white">
    <a
      class="absolute right-4 top-2 text-slate-400 font-medium"
      target="blank"
      href={GITHUB_LINK}
    >
      Github
    </a>
    {props.children}
  </div>
);
