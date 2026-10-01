"use client"
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase/initialize"
import { setbasicCats, setRigisterData } from '../firebase/firebase';

export default function RigiesterDialog(){
    const [isOpen,setIsOpen] = useState(false);
    const [email,setEmail]= useState("");
    const [password,setPassword] = useState('');

    function sendRigister(){
      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential) =>{
         const user = userCredential.user;
         console.log(user);
         setRigisterData(user);
         setbasicCats(user.uid);
         
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
      });
    }
    return(
    <>
      <a
        className="text-gray-400 flex items-end hover:text-gray-200 hover:underline hover:cursor-pointer" 
        onClick={() => setIsOpen(true)}
      >
        沒有帳戶？建立新帳戶
      </a>
      <div
        className="pointer-events-none fixed inset-0 z-999 grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300"
      >
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} 
      className="
      relative 
      z-1000
      "
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-xl shadow-xl bg-zinc-800 p-8 backdrop-blur-xs">
            <DialogTitle className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-zinc-50">註冊新帳號</DialogTitle>
            <Description>註冊新帳號，以記錄你所有的資訊</Description>
            <form action="" className="gap-3 mb-2">
              <div className="py-1 gap-1  flex flex-col">
                <label htmlFor="" className="text-md ">電子信箱：</label>
                <input type="email" name="" id="" onChange={(event) => setEmail(event.target.value)} className="rounded-lg text-lg border-2 border-zinc-600 py-1.5 px-2 w-full" />
              </div>
              <div className="py-1 gap-1  flex flex-col">
                <label htmlFor="" className="text-md ">密碼：</label>
                <input type="password" name="" id=""  onChange={(event) => setPassword(event.target.value)} className="rounded-lg text-xl border-2 border-zinc-600 py-1.5 px-2 w-full" />
              </div>
            </form>
            <div className="flex gap-4 justify-between">
              <button onClick={() => {sendRigister();setIsOpen(false)} } className="flex h-12 w-xl  font-semibold items-center justify-center gap-1 rounded-xl bg-foreground px-2 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5">
                註冊新帳號
              </button>
              <button onClick={() => setIsOpen(false)} className='hover:cursor-pointer hover:underline text-gray-400 flex items-end'>關閉頁面</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
    
    )
}