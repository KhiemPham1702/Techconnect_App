
import { db, collection, addDoc, getDoc, getDocs, query, doc } from '../DAL/Database'

const q = query(collection(db, "Techconnect"));
const myProducts = getDocs(q);

export { myProducts, doc, getDocs};