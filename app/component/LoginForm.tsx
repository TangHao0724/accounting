"use client"
import Image from "next/image";
import RigiesterDialog from "./RigiesterDialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase/initialize"


export default function LoginForm(){
      const authErrorMessage: Record<string, string> = {
        "auth/invalid-email": "Email 格式不正確",
        "auth/missing-password":"未填入密碼",
        "auth/email-already-in-use": "此 Email 已經註冊",
        "auth/user-not-found": "帳號或密碼錯誤",
        "auth/wrong-password": "帳號或密碼錯誤",
        "auth/invalid-credential": "帳號或密碼錯誤",
        "auth/user-disabled": "此帳號已被停用",
        "auth/too-many-requests": "嘗試次數過多，請稍後再試",
        "auth/operation-not-allowed": "此登入方式目前無法使用",
        "auth/network-request-failed": "網路連線發生問題",
      };
      const [email,setEmail]= useState("");
      const [password,setPassword] = useState('');
      const [alertText,setAlertText] = useState('');
      const router = useRouter();
     function login(){
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) =>{
            const user = userCredential.user;
            console.log(user);
            router.replace("/accounting");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            setAlertText(authErrorMessage[errorCode]);
          });
      }
    return(
        <div className="flex flex-col w-full md:w-md items-start justify-around py-6 px-4 rounded-xl gap-3 border border-zinc-400 bg-zinc-200 dark:bg-zinc-900 ">
          <h1 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-zinc-900 dark:text-zinc-100">
            登入
          </h1>
          <form action="" className=" flex flex-col gap-5 mb-2">
            <div className="py-1 gap-1  flex flex-col">
              <label htmlFor="" className="text-md font-medium text-zinc-900 dark:text-zinc-100">電子信箱：</label>
              <input type="email" name="" id=""  onChange={(e)=> setEmail(e.target.value)} className="rounded-lg text-lg font-sans border border-zinc-600 py-1.5 px-2 w-full text-zinc-900 dark:text-zinc-100" />
            </div>
            <div className="py-1 gap-1  flex flex-col">
              <label htmlFor="" className="text-md font-medium text-zinc-900 dark:text-zinc-100">密碼：</label>
              <input type="password" name="" id="" onChange={(e)=> setPassword(e.target.value)} className="rounded-lg text-xl border border-zinc-600 py-1.5 px-2 w-full text-zinc-900 dark:text-zinc-100" />
            </div>
          </form>
          <span className="text-rose-600">{alertText}</span>
          <hr className="w-full md:w-sm my-1 border-zinc-500 border-b"></hr>
          <div className="flex flex-col gap-4 text-lg font-medium sm:flex-row">
            <button
              className="flex h-12 w-full items-center justify-center  gap-2 rounded-xl bg-amber-500 px-2 text-zinc-900 transition-colors hover:bg-zinc-700 hover:text-amber-500 dark:hover:bg-zinc-500 md:w-39.5"
              onClick={login} 
            >
              登入
              <Image
              width="24" height="24" 
              src="/arrowRight.png" 
              alt="forward"/>
            </button>
            <RigiesterDialog />
          </div>
        </div>
    );
} 