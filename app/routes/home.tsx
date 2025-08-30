import type { Route } from "./+types/home";
import ToDoList from "../components/to-do-list.jsx";
import Tasks from "../components/tasks.jsx";
import Streak from "../components/streak.jsx";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
      <>
          <div className="flex items-center gap-10 justify-start">
            <div className="bg-[#0A0A0A] w-[416px] h-screen rounded-tr-[20px] rounded-br-[20px] p-10 flex flex-col items-start">
                <>
                <img src="public/finallogo.svg" alt=""/>
                <div className="flex flex-col items-start gap-14">
                    <a className="text-[18px] flex items-center gap-6 font-medium mt-[65px] cursor-pointer">
                        <img src="public/home_sign.svg" alt=""/>
                        <h4>Home</h4>
                    </a>
                </div>
                </>
                <div className="text-[18px] flex items-center gap-5 font-bold mt-auto">
                    <img src="public/user.svg" alt=""/>
                    <h3>Yerzhuman Aibar</h3>
                </div>
            </div>
              <div className="flex flex-col gap-10">
                  <h1 className="text-[45px] font-medium">Welcome back, <strong>Aibar</strong>! 👋</h1>
                  <div className="grid grid-cols-2 gap-2">
                    <ToDoList/>
                    <Tasks/>
                    <Streak/>
                  </div>
              </div>
          </div>
      </>
  );
}
