import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Dashboard from "~/dashboard/page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  // return <Welcome />;
  return <Dashboard />
}
