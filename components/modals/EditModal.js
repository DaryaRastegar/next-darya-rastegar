import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./EditModal.module.css";
import { useUpdateProduct } from "../../services/mutation";
import { removeCookie } from "../../utils/cookie";
import { useRouter } from "next/router";

function EditModal({ setIsDisplay ,editForm}) {
  const router = useRouter();
    const [form, setForm] = useState({
        id: editForm.id || "",
        name: editForm.name || "",
        quantity: editForm.quantity || "",
        price: editForm.price || "",
      });

    const queryClient = useQueryClient();
    const { mutate } = useUpdateProduct()

    const changeHandler = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };
    
    const addHandler = (e) => {
        e.preventDefault();

        mutate(form, {
            onSuccess: (data) => {
              console.log(data)
              queryClient.invalidateQueries({
                queryKey: ["products"],
              });
              setIsDisplay(false);
            },
            onError: (err) => {
                console.error(err)
                if(err.response.status === 401 || err.response.status === 403) {
                  removeCookie();
                  router.push("/login")
                }
            }
          });
      };
  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <form onSubmit={addHandler} className={styles.form}>
          <h3>Creat New Product </h3>
          <label htmlFor="name">Edit Products</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={form.name}
            onChange={changeHandler}
          />

          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={changeHandler}
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            value={form.price}
            onChange={changeHandler}
          />
          <div>
            <button onClick={() => setIsDisplay(null)}>Cancle</button>
            <button type="submit">Add Edition</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
