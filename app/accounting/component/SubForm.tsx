"use client"

import { Listbox, ListboxButton, ListboxOption, ListboxOptions,Input  } from '@headlessui/react'
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
        <div className="flex flex-row border border-zinc-400 bg-zinc-200 dark:bg-zinc-900 gap-4 w-full justify-around p-2 rounded-xl">
            <Input type="text" inputMode="numeric"  name="price" value={price} onChange={handlePrice} className="w-2/12 rounded-lg text-md border-2 border-zinc-600 py-1.5 px-2 text-zinc-900 dark:text-zinc-100" placeholder="金額" />
            <div className='w-2/12 flex flex-row'>
                <Listbox value={selectedCategory} onChange={setSelectedCategory} >
                    <ListboxButton className={`w-8/12 cursor-pointer text-lg p-2 border-2 rounded-l-lg text-nowrap ${selectedCategory == null ? "text-zinc-600" : selectedCategory.ispaid ? "text-red-500" : "text-green-500"}`}>{selectedCategory?.name ?? "請選擇分類"}</ListboxButton>
                    <ListboxOptions anchor="bottom" className="rounded-lg bg-zinc-300 border border-zinc-900 dark:border-zinc-100 w-1/12 ">
                        {categories.map((category) => (
                            <ListboxOption key={category.id} value={category} className={`data-focus:bg-zinc-800  font-semibold flex justify-center text-lg p-2 cursor-pointer ${category.ispaid? "text-red-400" : "text-green-500"}`}>
                            {category.name}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </Listbox>
                <AddCatDialog/>
            </div>
             <Input type="text" name="name" id="" onChange={(e)=>setName(e.target.value)} className="w-6/12 rounded-lg text-md border-2 border-zinc-600 text-zinc-900 dark:text-zinc-100 py-1.5 px-2 " placeholder="輸入收支名稱" />
            <button onClick={() => createAccounting() } className="w-1/12 flex font-semibold items-center justify-center gap-1 rounded-xl bg-amber-500  text-zinc-900  px-2 transition-colors hover:bg-zinc-700  dark:hover:bg-zinc-600 hover:text-amber-500">
                送出
            </button>
        </div>
        <AlertDialog showMessage={message} isOpen={isOpenalert} onClose={() => setIsOpenalert(false)}></AlertDialog>
        </>
    )
}