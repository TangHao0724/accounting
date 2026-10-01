import LoginForm from "./component/LoginForm"


export default function Home() {

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-gray-950 ">
      <main className="flex flex-1 w-full max-w-3xl flex-col justify-around py-32 px-8 bg-white dark:bg-gray-950 items-start">

        <div className="flex flex-col gap-2   sm:items-start text-left  w-full">
          <h1 className="text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 bg-zinc-800 w-full p-2 rounded-xl">
            記帳本
          </h1>
          <h2 className=" max-w-2xl text-xl font-bold text-gray-400 bg-zinc-900 w-full p-2 rounded-xl">
            記錄 生活中的柴米油鹽醬醋茶
          </h2>
        </div>
        <LoginForm />
        
      </main>
    </div>
  );
}
