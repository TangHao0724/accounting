"use client"
import TableRow from "./TableRow";
import { useContext } from 'react'
import { CategoryContext } from "../context/context"


type TableProps = {
    tableData: Accounting[];
    dropRow: (id:string|null) => void;
    editRow:(editData:UpdateAccounting,rowId:string) =>void;
};
export default function Table({tableData,dropRow,editRow}:TableProps){
    const CategoriesContext =  useContext(CategoryContext);
    const categories = CategoriesContext?.categories ?? [];
    const totalAmount = tableData.reduce(
        (total, item) =>
            total + (categories.find((x)=> x.id === item.categoryId)?.ispaid ? -item.price : item.price),
            0
    );

    return(
    <div className="w-full max-h-200 overflow-y-auto rounded-xl">
        <table className="w-full ">
            <thead className="sticky top-0 text-zinc-900 bg-zinc-400 dark:bg-zinc-400" >
            <tr className="h-12 text-lg p-4">
                <th className="w-2/12">金額</th>
                <th className="w-2/12">類型</th>
                <th className="w-4/12">名稱</th>
                <th className="w-2/12">時間</th>
                <th className="w-2/12">選項</th>
            </tr>
            </thead>
            <tbody className=" text-zinc-900 dark:text-zinc-200 py-4 bg-zinc-100 dark:bg-zinc-600">
            {tableData.map((i) => (
                <TableRow
                data={i}
                key={i.id}
                dropRow={dropRow}
                editRow={editRow}
                />
            ))}
            </tbody>

            <tfoot className="sticky bottom-0 text-zinc-800 bg-zinc-400 dark:bg-zinc-400">
            <tr className="h-12 text-lg p-4 font-sans">
                <th
                className={`${totalAmount < 0 ? "text-rose-400" : "text-green-800"}`}
                >
                總計/元：{totalAmount}
                </th>
                <th/>
                <th />
                <th />
                <th>
                總筆數：{tableData.length}
                </th>
            </tr>
            </tfoot>
        </table>
    </div>
    )
}