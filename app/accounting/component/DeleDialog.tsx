"use client"
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import Image from "next/image";

type delediaprops = {
    isdele:(isdele:boolean) => void;
}
export default function DeleDialog({isdele}:delediaprops){
    const [isOpen,setIsOpen] = useState(false);
    function dele() {
        setIsOpen(false);
        isdele(true);
    }
    function notDele() {
        setIsOpen(false);
        isdele(false);
    }
    return(
    <>
    <button onClick={() => setIsOpen(true) } className="flex items-center justify-center gap-1 rounded-sm bg-red-200 p-0.5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] ">
        <Image
            width="24" height="24" 
            src="/remove.png" 
            alt="remove"/>
    </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} 
      className="
      relative 
      z-1000
      "
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-xl shadow-xl bg-zinc-300 dark:bg-zinc-800 p-8 backdrop-blur-lg">
            <DialogTitle className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-zinc-900 dark:text-zinc-100">刪除這筆紀錄嗎？</DialogTitle>
            <Description className="text-zinc-900 dark:text-zinc-100">刪除後，不會留下任何紀錄。</Description>
            <div className="flex gap-4 justify-between">
              <button onClick={() => dele() } className="flex h-12 w-xl  font-semibold items-center justify-center gap-1 rounded-xl bg-foreground text-background  bg-amber-500 text-zinc-900  px-2 transition-colors hover:bg-zinc-600  dark:hover:bg-zinc-500 hover:text-amber-500 md:w-39.5">
                確定
              </button>
              <button onClick={() => notDele()} className='flex h-12 w-xl  font-semibold items-center justify-center gap-1 rounded-xl  px-2 transition-colors text-zinc-900 bg-zinc-200 hover:bg-zinc-600 hover:text-zinc-100 dark:hover:bg-zinc-500 dark:hover:text-zinc-100 md:w-39.5'>關閉頁面</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
    
    )
}