"use client"

import {
  Grid,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import BaseCard from "@/admin/src/components/baseCard/BaseCard";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const AddProductAdmin = () => {
  const [newProduct, setNewProduct] = useState({ title: "", category: "", size: "", color: "", img: "", description: "", price: "", availableQty: "" })

  const handleOnChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.id]: e.target.value })
  }

  const handleSubmit = async () => {
    const res = await fetch("/api/addProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([newProduct]),
    })
    const data = await res.json()

    if (data.body.success) {
      toast.success("Product added successfully!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } else {
      toast.error(data.body.error, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Add a product">
          <Stack spacing={3}>
            <TextField
              onChange={handleOnChange}
              value={newProduct.title}
              id="title"
              label="Title"
              variant="outlined"
            />
            {/* <TextField onChange={handleOnChange} value={newProduct.slug} id="slug" label="Slug" variant="outlined" /> */}
            <TextField onChange={handleOnChange} value={newProduct.category} id="category" label="Category" variant="outlined" />
            <TextField onChange={handleOnChange} value={newProduct.size} id="size" label="Size" variant="outlined" />
            <TextField onChange={handleOnChange} value={newProduct.color} id="color" label="Color" variant="outlined" />
            <TextField onChange={handleOnChange} value={newProduct.img} id="img" label="Image URL" variant="outlined" />
            <TextField
              onChange={handleOnChange}
              value={newProduct.description}
              id="description"
              label="Description"
              multiline
              rows={4}
            />
            <TextField onChange={handleOnChange} value={newProduct.price} id="price" label="Price" variant="outlined" />
            <TextField onChange={handleOnChange} value={newProduct.availableQty} id="availableQty" label="Available Quantity" variant="outlined" />
          </Stack>
          <br />
          <Button onClick={handleSubmit} variant="contained" mt={2}>
            Submit
          </Button>
        </BaseCard>
      </Grid>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Grid>
  );
}

export default AddProductAdmin
