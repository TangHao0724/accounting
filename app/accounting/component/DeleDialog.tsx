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
            <DialogTitle className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-zinc-50">刪除這筆紀錄嗎？</DialogTitle>
            <Description>刪除紀錄後，並不會留下任何痕跡。</Description>
            <div className="flex gap-4 justify-between">
              <button onClick={() => dele() } className="flex h-12 w-xl  font-semibold items-center justify-center gap-1 rounded-xl bg-foreground px-2 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5">
                確定
              </button>
              <button onClick={() => notDele()} className='hover:cursor-pointer hover:underline text-gray-400 flex items-end'>關閉頁面</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
    
    )
}