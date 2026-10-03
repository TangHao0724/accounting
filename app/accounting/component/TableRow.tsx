"use client"
import DeleDialog from "./DeleDialog";
import EditDialog from "./EditDialog";
import { useContext } from 'react'
import { CategoryContext } from "../context/context"

export default function TableRow({data,dropRow,editRow}:TableRowProps){
    function isdrop(isdele:boolean){
        return isdele == true ? data.id : null; 
    }
    const CategoriesContext =  useContext(CategoryContext);
    const categories = CategoriesContext?.categories ?? [];
    const targetCat = categories.find((x)=> x.id === data.categoryId);
    return(
        <tr className="text-center py-2 text-lg font-sans h-10 border-b border-zinc-400 dark:border-zinc-100">
            <th scope="row" className={`${targetCat?.ispaid ? "text-rose-500":"text-green-500"}`}>{data.price}</th>
            <td scope="row" className={targetCat?.ispaid ? "text-rose-500":"text-green-500"}>{targetCat?.name}</td>
            <td scope="row" >{data.name}</td>
            <td scope="row" >{data.date.toLocaleDateString()}</td>
            <td scope="row">
                <div className="flex flex-row gap-1 items-center-safe justify-center">
                    <EditDialog rowData={data} editedData={(i,rowId)=> editRow(i,rowId)}/>
                    <DeleDialog isdele={(i)=> dropRow(isdrop(i))}/>
                </div>
            </td>
        </tr>
    )
}