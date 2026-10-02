import { User } from "firebase/auth";
import {auth,db} from "../firebase/initialize"
import { collection,getDoc, getDocs,addDoc,updateDoc ,setDoc,doc,deleteDoc, query, orderBy} from "firebase/firestore"; 

export async function setbasicCats(userUid:string){
    const cats:AddCategory[]= [
        { name: '薪水',ispaid:false },
        { name: '三餐',ispaid:true },
        { name: '交通',ispaid:true },
        { name: '娛樂',ispaid:true },
        { name: '其他',ispaid:true },
    ]
    try{
        for (const i of cats) {
            const docRef = await addDoc(collection(db,`users/${userUid}/categories`),i)
            console.log("Document written with ID: ", docRef.id);
        }
        }catch (e) {
    console.error("Error setting basic categories: ", e);
    }
}
export async function setRigisterData(user:User){
    const uid = user.uid
    try{
        await setDoc(doc(db,"users",uid),{
            email: user.email
        })
    }catch (e) {
    console.error("Error setting register data: ", e);
    }
}
// 獲取accounting
export async function get_accounting(userUid:string){

    try{
        const q = query(
        collection(db, `users/${userUid}/accounting`),
        orderBy("date", "desc")
        );
       const querySnapshot  =  await getDocs(q);
       const accountings:Accounting[] = querySnapshot.docs.map((i)=>{
            const data = i.data();
            return{
                id:i.id,
                price:Number(data.price),
                categoryId:String(data.categoryId),
                name:String(data.name),
                date:data.date.toDate(),
            }
       })
       return accountings;
    }
    catch (e) {
        console.error("Error get_accounting document: ", e);
        throw e;
    }
}
// 寫入accounting
export async function add_accounting(userUid:string,data:AddAccounting){

    try{
        await addDoc(collection(db,`users/${userUid}/accounting`),data)
    }
    catch (e) {
        console.error("Error add_accounting document: ", e);
        throw e;
    }
}
// 更新accounting
export async function update_accounting(userUid:string,rowId:string,updateData:UpdateAccounting){
    try{
        await updateDoc(doc(db,`users/${userUid}/accounting`,rowId),updateData)
    }
    catch (e) {
        console.error("Error update_accounting document: ", e);
        throw e;
    }
}
// 刪除accounting
export async function dele_accounting(userUid:string,rowId:string){
    try{
        await deleteDoc(doc(db,`users/${userUid}/accounting`,rowId))
    }
    catch (e) {
        console.error("Error dele_accounting document: ", e);
        throw e;
    }
}
// 新增cat
export async function add_cat(userUid:string,data:AddCategory){

    try{
        await addDoc(collection(db,`users/${userUid}/categories`),data)
    }
    catch (e) {
    console.error("Error add_cat document: ", e);
    throw e;
    }
}
// 獲取cat
export async function get_cat(userUid:string){

    try{
       const querySnapshot  =  await getDocs(collection(db,`users/${userUid}/categories`))
       const cats: Category[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
            id: doc.id,
            name: data.name,
            ispaid: data.ispaid,
        };
        });

        return cats;
    } catch (error) {
        console.error("Error get_cat categories:", error);
        throw error;
    }
}