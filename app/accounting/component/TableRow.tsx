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
        <tr className="text-center py-2">
            <th scope="row" className={targetCat?.ispaid ? "text-rose-400":"text-green-400"}>{data.price}</th>
            <td className={targetCat?.ispaid ? "text-rose-400":"text-green-400"}>{targetCat?.name}</td>
            <td className="text-start">{data.name}</td>
            <td>{data.date.toDateString()}</td>
            <td className="flex flex-row gap-1 items-center justify-center">
                <EditDialog rowData={data} editedData={(i,rowId)=> editRow(i,rowId)}/>
                <DeleDialog isdele={(i)=> dropRow(isdrop(i))}/>
            </td>
        </tr>
    )
}