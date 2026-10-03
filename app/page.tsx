import LoginForm from "./component/LoginForm"


export default function Home() {

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-200 dark:bg-zinc-800 ">
      <main className="flex flex-1 w-full max-w-6xl flex-col justify-between py-32 px-8 bg-zinc-300 dark:bg-zinc-900 items-start rounded-xl">

        <div className="flex flex-col gap-2   sm:items-start text-left  w-full">
          <h1 className="text-4xl font-semibold leading-10 tracking-tight text-amber-500 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-100 w-full px-4 py-2 rounded-xl">
            記帳本
          </h1>
          <h2 className=" max-w-2xl text-xl font-bold text-gray-600 dark:text-gray-400 bg-zinc-200 dark:bg-zinc-900 w-full px-4 py-2 rounded-xl">
            記錄 生活中的柴米油鹽醬醋茶
          </h2>
        </div>
        <LoginForm />
      </main>
    </div>
  );
}
