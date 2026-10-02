"use client"

import { Listbox, ListboxButton, ListboxOption, ListboxOptions,Label,Input  } from '@headlessui/react'
import { useContext, useState } from 'react'
import { CategoryContext } from "../context/context"
import AddCatDialog from './AddCatDialog';
import AlertDialog from './AlertDialog';


type ChildProps = {
  onAddAccounting: (accounting: AddAccounting) => void;
};
export default function SubForm(
    {onAddAccounting}: ChildProps
){
    const CategoriesContext =  useContext(CategoryContext);
    const categories = CategoriesContext?.categories ?? [];
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [price,setPrice] = useState(0)
    const [name,setName] = useState("")
    const [message,setMessage] = useState("")
    const [isOpenalert,setIsOpenalert] = useState(false);
    function createAccounting(){
        if(!name){
            setMessage("請填入名稱");
            setIsOpenalert(true);
            return 
        }
        if(price == 0 ){
            setMessage("單筆紀錄金額不該為0");
            setIsOpenalert(true);
            return 
        }
        if(selectedCategory === null){
            setMessage("請選擇分類");
            setIsOpenalert(true);
            return 
        }
        const accountCategory = selectedCategory ?? categories[0] ?? null;
        const accounting : AddAccounting= {
            price:price,
            categoryId: accountCategory.id,
            name:name,
            date:new Date()
        }
        console.log("accounting",accounting);
        onAddAccounting(accounting);
    }
    function handlePrice(e: React.ChangeEvent<HTMLInputElement>){
        const inputValue = e.target.value;

        // 2. 使用正規表達式只保留數字（0-9）
        let cleanValue = inputValue.replace(/[^0-9]/g, '');

        // 3. 確保開頭不能為 0（因為是正整數，必須從 1 開始）
        if (cleanValue.startsWith('0')) {
        cleanValue = cleanValue.replace(/^0+/, '');
        }

        setPrice(Number(cleanValue));
    }

    return(
        <>
        <div className="flex flex-row bg-zinc-800 gap-4 w-full justify-around p-2 rounded-xl">
            <Input type="text" inputMode="numeric"  name="price" value={price} onChange={handlePrice} className="rounded-lg text-md border-2 border-zinc-600 py-1.5 px-2 w-2/12" placeholder="金額" />
            <Listbox value={selectedCategory} onChange={setSelectedCategory} >
                <Label className="w-1/12 text-nowrap text-center flex items-center ">分類：</Label>
                <ListboxButton className={`text-lg p-2 border-2 rounded-lg text-nowrap w-2/12 ${selectedCategory?.ispaid ? "text-red-400" : "text-green-300"}`}>{selectedCategory?.name ?? "未選擇"}</ListboxButton>
                <ListboxOptions anchor="bottom" className="rounded-b-md bg-zinc-500 w-1/12 rounded-xl opacity-85">
                    {categories.map((category) => (
                        <ListboxOption key={category.id} value={category} className={`data-focus:bg-zinc-700 font-semibold flex justify-center text-lg p-2 cursor-pointer ${category.ispaid? "text-red-400" : "text-green-300"}`}>
                        {category.name}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
            <AddCatDialog/>
            <Input type="text" name="name" id="" onChange={(e)=>setName(e.target.value)} className="rounded-lg text-md border-2 border-zinc-600 py-1.5 px-2 w-5/12" placeholder="輸入收支名稱" />
            <button onClick={() => createAccounting() } className="flex w-2/12  font-semibold items-center justify-center gap-1 rounded-xl bg-amber-500 px-2 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5">
                送出
            </button>
        </div>
        <AlertDialog showMessage={message} isOpen={isOpenalert} onClose={() => setIsOpenalert(false)}></AlertDialog>
        </>
    )
}