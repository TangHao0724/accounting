"use client"
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import Image from "next/image";

type alertprops = {
    showMessage:string;
    isOpen: boolean;
    onClose: () => void;
}
export default function AlertDialog({showMessage ,isOpen,onClose}:alertprops){
    return(
    <>
      <div
        className="pointer-events-none fixed inset-0 z-999 grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300"
      >
      </div>
      <Dialog open={isOpen} onClose={onClose} 
      className="
      relative 
      z-1000
      "
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-xl shadow-xl bg-zinc-800 p-8 backdrop-blur-xs">
            <DialogTitle className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-rose-400">注意！</DialogTitle>
            <Description>{showMessage}</Description>
            <div className="flex gap-4 justify-between">
              <button onClick={onClose } className="flex h-12 w-xl  font-semibold items-center justify-center gap-1 rounded-xl bg-foreground px-2 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5">
                確定
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
    
    )
}