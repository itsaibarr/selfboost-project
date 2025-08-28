import type { Route } from "./+types/home";
import ToDoList from "../components/to-do-list.jsx";
import Tasks from "../components/tasks.jsx";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
      <div>
          <ToDoList/>
          <Tasks/>
      </div>
  );
}
