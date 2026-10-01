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
    <div className="w-full">
        <table className="w-full">
            <thead>
            <tr className="h-12 border-b-2">
                <th>金額</th>
                <th>類型</th>
                <th>名稱</th>
                <th>時間</th>
                <th></th>
            </tr>
            </thead>
        </table>

        <div className="max-h-150 overflow-y-auto">
            <table className="w-full">
            <tbody>
                {tableData.map((i) => (
                <TableRow
                    data={i}
                    key={i.id}
                    dropRow={dropRow}
                    editRow={editRow}
                />
                ))}
            </tbody>
            </table>
        </div>

        <table className="w-full">
            <tfoot className="border-t-2">
            <tr>
                <th
                scope="row"
                className={totalAmount < 0 ? "text-rose-400" : "text-green-400"}
                >
                {totalAmount}
                </th>
                <th
                scope="row"
                className={totalAmount < 0 ? "text-rose-400" : "text-green-400"}
                >
                總計/元
                </th>
                <th />
                <th />
                <th>總計筆數：{tableData.length}</th>
            </tr>
            </tfoot>
        </table>
    </div>
    )
}