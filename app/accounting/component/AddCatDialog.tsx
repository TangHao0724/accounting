"use client"
import { Description, Dialog, DialogPanel, DialogTitle,Input,Checkbox,Label,Field  } from '@headlessui/react'
import { useContext, useState } from 'react'
import { CategoryContext } from "../context/context"
import {auth} from "../../firebase/initialize"
import { useRouter } from "next/navigation";
import { add_cat, get_cat } from '@/app/firebase/firebase'

export default function AddCatDialog(){
  const router = useRouter();
    const user = auth.currentUser;
    if(!user){
      router.replace("/");
      throw new Error("User is not logged in");
    }
    const uid = user.uid;
    const [isOpen,setIsOpen] = useState(false);
    const CategoriesContext =  useContext(CategoryContext);
    const setCategories = CategoriesContext?.setCategories;

    const [name,setName] = useState("");
    const [enabled, setEnabled] = useState(true)

    async function addCat() {
        if (!setCategories) return;
        
        const newCat: AddCategory ={
            name:name,
            ispaid:enabled
        } 
        await add_cat(uid,newCat);
        setCategories(await get_cat(uid));
        setIsOpen(false);
    }
    return(
    <>
    <button onClick={() => setIsOpen(true)} className="flex w-1/12  font-semibold items-center justify-center gap-1 rounded-xl bg-foreground px-2 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5">
        添加分類 + 
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
            <DialogTitle className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-zinc-50">新增分類標籤</DialogTitle>
            <Description>若勾選支出，會在結算時扣除總計。</Description>
            
            <Field>
              <div className='py-2'>
                <Label className="w-1/12 text-nowrap text-center flex items-center pb-2 ">名稱：</Label>
              <Input type="text" name="name" id="" onChange={(e)=>setName(e.target.value)} className="rounded-lg text-md border-2 border-zinc-600 py-1.5 px-2 w-5/12" placeholder="輸入名稱" />
              </div>
              <div className='py-2' >
                <Label className="w-1/12 text-nowrap text-center flex items-center pb-2 ">是否為支出：</Label>
                <Checkbox
                  checked={enabled}
                  onChange={setEnabled}
                  className="group block size-4 rounded border border-zinc-100 bg-zinc-300 data-checked:bg-zinc-700"
                  >
                  {/* Checkmark icon */}
                  <svg className="stroke-white opacity-0 group-data-checked:opacity-100" viewBox="0 0 14 14" fill="none">
                      <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
              </Checkbox>
              </div>
            </Field>
            <div className="flex gap-4 justify-between">
              <button onClick={() => addCat() } className="flex h-12 w-xl  font-semibold items-center justify-center gap-1 rounded-xl bg-foreground px-2 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5">
                確定
              </button>
              <button onClick={() => setIsOpen(false)} className='hover:cursor-pointer hover:underline text-gray-400 flex items-end'>關閉頁面</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
    
    )
}