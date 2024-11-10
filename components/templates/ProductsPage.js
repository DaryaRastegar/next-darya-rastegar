import { useQuery ,keepPreviousData} from "@tanstack/react-query";
import ProductsTable from "../modules/ProductsTable";
import { useGetProducts } from "../../services/queries";
import { useState } from "react";
import Search from "../modules/Search";

import styles from "./ProductsPage.module.css"
import AddProduct from "../modules/AddProduct";
import AddModale from "../modals/AddModale";
import DeleteModal from "../modals/DeleteModal";
import EditModal from "../modals/EditModal";
import PaginationPage from "../modules/PaginationPage";


function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search,setSearch] = useState("");
  const [addModule,setAddModule] = useState(null);
  const [isShow,setIsShow] = useState(null);
  const [id,setId] =useState("");
  const [isDisplay,setIsDisplay] = useState(null);
  const [editForm,setEditForm] = useState({
    id: "",
    name:"",
    quantit:"",
    price:""
  })

  const {isLoading, data, error,isPlaceholderData, refetch}= useGetProducts(page,search)

  const checkPageStatus = () => {
    const count = data?.data?.data?.length;
    if(page > 1 && count === 1) setPage(prev => prev - 1);
  }

  if(isLoading) return <p>....loading </p>


  return <div className={styles.container}>
    <Search
      search={search}
      setSearch={setSearch}
      refetch={refetch} 
    />
    <AddProduct  setAddModule={setAddModule}/>
    <ProductsTable 
      products={data?.data?.data}
      setIsShow={setIsShow}
      setId={setId}
      setIsDisplay={setIsDisplay}
      id={id}
      setEditForm={setEditForm}
    />
    {!!addModule && (<AddModale setAddModule={setAddModule}/>)}
    {!!isShow && (
      <DeleteModal
        setIsShow={setIsShow}
        id={id}
        checkPageStatus={checkPageStatus}
      />
    )}
    {!!isDisplay && (<EditModal setIsDisplay={setIsDisplay} editForm={editForm}/>)}
    <PaginationPage
      page={page}
      totalPage={data?.data?.totalPages || 1}
      setPage={setPage}
      refetch={refetch}
    />
  </div>;
}

export default ProductsPage;
