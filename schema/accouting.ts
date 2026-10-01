type Accounting  = {
    id: string
    price: number
    categoryId: string 
    name: string
    date: Date
}
type AddAccounting  = {
    price: number
    categoryId: string  
    name: string
    date: Date
}
type UpdateAccounting  = {
    price: number
    categoryId: string 
    name: string
    date: Date
}
type Category  =  {
  id: string
  name: string
  ispaid:boolean
}

type AddCategory  =  {
  name: string
  ispaid:boolean
}

type TableRowProps = {
    data: Accounting
    dropRow: (id:string|null) => void;
    editRow:(editData:UpdateAccounting,rowId:string) =>void;
}