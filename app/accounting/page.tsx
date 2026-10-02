"use client"

import { useEffect, useState } from "react";
import SubForm from "./component/SubForm";
import Table from "./component/Table";
import CategoryProvider from "./context/context";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase/initialize";
import { useRouter } from "next/navigation";
import { add_accounting, dele_accounting, get_accounting, update_accounting } from "../firebase/firebase";

export default function Accounting() {
  const router = useRouter();

  const [tableData, setTableData] = useState<Accounting[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function updateRow(userUid:string,rowId:string ,updateData: UpdateAccounting) {
    update_accounting(userUid,rowId,updateData);
    setTableData(await get_accounting(userUid));
  }

  async function deleteRow(userUid:string , id: string | null) {
    if (id === null) {
        return;
    }
    dele_accounting(userUid,id);
    setTableData(await get_accounting(userUid));
  
  }
  async function addRow(userUid:string , data:AddAccounting) {
    add_accounting(userUid,data);
    setTableData(await get_accounting(userUid));
  
  }
  async function logout() {
  try {
      await signOut(auth);
      console.log("登出成功");
    } catch (error) {
      console.error("登出失敗:", error);
    }
  }
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });

  return unsubscribe;
  }, []);

  useEffect(() => {
    async function loadAccounting() {
      try {
        if (!user) {
          return;
        }
        const data = await get_accounting(user.uid);
        setTableData(data);
      } catch (error) {
        console.error("Failed to load accounting:", error);
      }
    }

    loadAccounting();
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }
  return (
    <CategoryProvider>
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-gray-950 ">
        <main className="flex flex-1 w-full max-w-3xl flex-col py-32 px-8 bg-white dark:bg-gray-950 items-start">

          <div className="flex flex-col gap-2 sm:items-start text-left w-full">
            <div className="bg-zinc-800 w-full flex flex-row items-center ">
              <h1 className="text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50   p-2 rounded-xl">
                {user.email} 的記帳本
              </h1>
              <button 
              className="flex font-semibold h-9 w-12 items-center justify-center gap-1 rounded-xl bg-foreground px-2 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
              onClick={logout}
              >
                登出
              </button>
            </div>
            <h2 className=" max-w-2xl text-xl font-bold text-gray-400 bg-zinc-900 w-full p-2 rounded-xl">
            </h2>
          </div>
          <div className="w-full ">
            <Table tableData={tableData} editRow={(i,id)=>updateRow(user.uid,id,i)} dropRow={(i)=>deleteRow(user.uid,i)}/>
          </div>
          <div className="w-full mt-auto">
              <SubForm onAddAccounting={(data) =>
                addRow(user.uid,data)} />
          </div>
        </main>
      </div>
  </CategoryProvider>
  );
}
