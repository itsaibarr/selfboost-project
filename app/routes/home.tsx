import type { Route } from "./+types/home";
import Progress from "../components/today-progress-bar.jsx";
import ToDoList from "../components/to-do-list.jsx";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
      <div>
          <Progress/>
          <ToDoList/>
      </div>
  );
}
