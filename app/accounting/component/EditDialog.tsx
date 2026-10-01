"use client"
import { Dialog, DialogPanel, DialogTitle,Listbox, ListboxButton, ListboxOption, ListboxOptions,Label,Input,Field } from '@headlessui/react'
import Image from "next/image";
import { useContext, useState } from 'react'
import { CategoryContext } from '../context/context';

type EditDiaprops ={
    rowData:Accounting
    editedData:(editData:UpdateAccounting,rowId:string) => void
}
export default function EditDialog({rowData,editedData}:EditDiaprops){
    const [isOpen,setIsOpen] = useState(false);
    
    const CategoriesContext =  useContext(CategoryContext);
    const categories = CategoriesContext?.categories ?? [];
    const [selectedCategory, setSelectedCategory] = useState(categories.find((x)=> x.id == rowData.categoryId) ?? categories[0])
    const [price,setPrice] = useState(rowData.price)
    const [name,setName] = useState(rowData.name)
    const [date,seteDate] = useState(rowData.date)

    function createData(){
        const updatedata :UpdateAccounting= {
            price:price,
            categoryId:selectedCategory.id,
            name:name,
            date:date
        }
        editedData(updatedata,rowData.id);
    }
    return(
    <>
      <button onClick={() => setIsOpen(true) } className="flex items-center justify-center gap-1 rounded-sm bg-green-100 p-0.5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] ">
            <Image
            width="24" height="24" 
            src="/edit.png" 
            alt="edit"/>
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
            <DialogTitle className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-zinc-50">更新紀錄</DialogTitle>
            <Field className="w-full">
              <div className='py-2'>
               <Label className="w-1/12 text-nowrap text-center flex items-center pb-2">金額：</Label>
               <Input type="number" name="price" defaultValue={price} onChange={(event) => setPrice(Number(event.target.value))} className="rounded-lg text-md border-2 border-zinc-600 py-1.5 px-2 w-full" placeholder="金額" />
              </div>
              <div className='py-2'>
                <Listbox value={selectedCategory} onChange={setSelectedCategory} >
                <Label className="w-1/12 text-nowrap text-center flex items-center pb-2">分類：</Label>
                <ListboxButton  className={`text-lg p-2 border-2 rounded-lg text-nowrap w-full ${selectedCategory?.ispaid ? "text-red-400" : "text-green-300"}`}>{selectedCategory.name}</ListboxButton>
                <ListboxOptions anchor="bottom" className="rounded-b-md bg-zinc-500 w-2/12 rounded-xl opacity-85">
                      {categories.map((category) => (
                          <ListboxOption key={category.id} value={category} className={`data-focus:bg-zinc-700 font-semibold flex justify-center text-lg p-2 cursor-pointer ${category.ispaid? "text-red-400" : "text-green-300"}`}>
                          {category.name}
                          </ListboxOption>
                      ))}
                  </ListboxOptions>
                </Listbox>
              </div>
              <div className='py-2'>
                <Label className="w-1/12 text-nowrap text-center flex items-center pb-2">名稱：</Label>
                <Input type="text" name="name" id="" defaultValue={name} onChange={(e)=>setName(e.target.value)} className="rounded-lg text-md border-2 border-zinc-600 py-1.5 px-2 w-full" placeholder="輸入收支名稱" />
              </div>
              <div className='py-2'>
                <Label className="w-1/12 text-nowrap text-center flex items-center pb-2">日期：</Label>
              <Input type="date" name="name" id="" defaultValue={date instanceof Date ? date.toISOString().slice(0, 10) : date} onChange={(e)=>seteDate(new Date(`${e.target.value}T00:00:00`))} className="rounded-lg text-md border-2 border-zinc-600 py-1.5 px-2 w-full" placeholder="輸入收支名稱" />
              </div>
              
              
            </Field>
            
            <div className="flex gap-4 justify-between">
              <button onClick={() => {createData();setIsOpen(false)} } className="flex h-12 w-xl  font-semibold items-center justify-center gap-1 rounded-xl bg-foreground px-2 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5">
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