"use client"
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import {useState } from 'react'

import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase/initialize"
import { setbasicCats, setRigisterData } from '../firebase/firebase';

export default function RigiesterDialog(){
    const authErrorMessage: Record<string, string> = {
      "auth/invalid-email": "Email 格式不正確",
      "auth/missing-password":"未填入密碼",
      "auth/email-already-in-use": "此 Email 已經註冊",
      "auth/user-not-found": "帳號或密碼錯誤",
      "auth/wrong-password": "帳號或密碼錯誤",
      "auth/invalid-credential": "帳號或密碼錯誤",
      "auth/weak-password": "密碼強度不足 ,請填入至少六個位元",
      "auth/user-disabled": "此帳號已被停用",
      "auth/too-many-requests": "嘗試次數過多，請稍後再試",
      "auth/operation-not-allowed": "此登入方式目前無法使用",
      "auth/network-request-failed": "網路連線發生問題",
    };
    const [isOpen,setIsOpen] = useState(false);
    const [email,setEmail]= useState("");
    const [password,setPassword] = useState('');
    const [alertText,setAlertText] = useState('');

    function sendRigister(){
      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential) =>{
         const user = userCredential.user;
         console.log(user);
         setRigisterData(user);
         setbasicCats(user.uid);
         setIsOpen(false);
         
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
        setAlertText(authErrorMessage[errorCode]);
      });
    }

    return(
    <>
      <a
        className="text-gray-500 flex items-end hover:text-gray-800 hover:dark:text-gray-200 hover:underline hover:cursor-pointer" 
        onClick={() => {setIsOpen(true);setAlertText("");}}
      >
        沒有帳戶？建立新帳戶
      </a>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} 
      className="
      relative 
      z-1000
      "
      >
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-xl shadow-xl bg-zinc-300 dark:bg-zinc-800 p-8 backdrop-blur-xs">
            <DialogTitle className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-zinc-900 dark:text-zinc-100">註冊新帳號</DialogTitle>
            <Description className="text-zinc-900 dark:text-zinc-100">註冊新帳號，以記錄你所有的資訊</Description>
            <form action="" className=" flex flex-col gap-3 mb-4 ">
              <div className="py-1 gap-1  flex flex-col">
                <label htmlFor="" className="text-md font-medium text-zinc-900 dark:text-zinc-100">電子信箱：</label>
                <input type="email" name="" id="" onChange={(event) => setEmail(event.target.value)} className="rounded-lg text-lg border-2 border-zinc-600 py-1.5 px-2 w-full text-zinc-900 dark:text-zinc-100" />
              </div>
              <div className="py-1 gap-1  flex flex-col">
                <label htmlFor="" className="text-md font-medium text-zinc-900 dark:text-zinc-100">密碼：</label>
                <input type="password" name="" id=""  onChange={(event) => setPassword(event.target.value)} className="rounded-lg text-xl border-2 border-zinc-600 py-1.5 px-2 w-full text-zinc-900 dark:text-zinc-100" />
              </div>
            </form>
            <span className="text-rose-600">{alertText}</span>
            <div className="flex gap-4 justify-between pt-2">
              <button onClick={() => {sendRigister();} } className="flex h-12 w-xl font-semibold items-center justify-center gap-1 rounded-xl bg-amber-500 text-zinc-900  px-2 transition-colors hover:bg-zinc-600  dark:hover:bg-zinc-500 hover:text-amber-500 md:w-39.5">
                註冊新帳號
              </button>
              <button onClick={() => setIsOpen(false)} className='flex h-12 w-xl  font-semibold items-center justify-center gap-1 rounded-xl  px-2 transition-colors text-zinc-900 hover:text-zinc-100 bg-zinc-200  hover:bg-zinc-600 dark:hover:bg-zinc-500 dark:hover:text-zinc-100 md:w-39.5'>
                關閉頁面
                </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
    
    )
}