"use client"
import Image from "next/image";
import RigiesterDialog from "./RigiesterDialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase/initialize"


export default function LoginForm(){
      const [email,setEmail]= useState("");
      const [password,setPassword] = useState('');
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
            console.log(errorCode,errorMessage);
          });
      }
    return(
        <div className="flex flex-col w-full md:w-md items-start justify-around bg-zinc-900  py-6 px-4 rounded-xl gap-3  ">
          <h1 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            登入
          </h1>
          <form action="" className="gap-3 mb-2">
            <div className="py-1 gap-1  flex flex-col">
              <label htmlFor="" className="text-md ">電子信箱：</label>
              <input type="email" name="" id=""  onChange={(e)=> setEmail(e.target.value)} className="rounded-lg text-lg border-2 border-zinc-600 py-1.5 px-2 w-full" />
            </div>
            <div className="py-1 gap-1  flex flex-col">
              <label htmlFor="" className="text-md ">密碼：</label>
              <input type="password" name="" id="" onChange={(e)=> setPassword(e.target.value)} className="rounded-lg text-xl border-2 border-zinc-600 py-1.5 px-2 w-full" />
            </div>
          </form>
          <hr className="w-full md:w-sm my-1 border-zinc-500 border-b-2"></hr>
          <div className="flex flex-col gap-4 text-lg font-medium sm:flex-row">
            <button
              className="flex h-12 w-full items-center justify-center  gap-2 rounded-xl bg-foreground px-2 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5"
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