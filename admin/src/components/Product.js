"use client"
import { Grid, IconButton, Stack, TableCell, TableRow, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useState } from 'react';
import BaseCard from './baseCard/BaseCard';
import { ToastContainer, toast } from 'react-toastify';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: '70rem',
    maxHeight: '90vh',
    overflow: 'auto',
    bgcolor: 'background.paper',
    scrollbarWidth: 'none',
    borderRadius: 8,
    boxShadow: 24,
    p: 4,
};

const Product = (props) => {
    const { product } = props;
    const [modalOpen, setModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState(product);

    const editProduct = () => {
        setModalOpen(true);
        // console.log("Edit product: ", product);
    }

    const handleOnChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("New product: ", newProduct);

        const res = await fetch("/api/editProduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        })
        const data = await res.json()
        // console.log("Data: ", data);

        if (data.body.success) {
            toast.success("Product edited successfully!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => { setModalOpen(false); /* window.location.reload(); */ }
            })
            setNewProduct(data.body.data);
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
        <>
            <TableRow key={newProduct.slug}>
                <TableCell>
                    <Typography
                        sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                        }}
                    >
                        <a href={`/product/${newProduct.slug}`} target="_blank">{newProduct.title}</a>
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography>
                        {/* eslint-disable-next-line */}
                        <img src={newProduct.img} style={{ height: '80px', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="h6"                >
                        {newProduct.category}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="h6">
                        {(newProduct.size) ? newProduct.size : '–'}/{(newProduct.color) ? newProduct.color.charAt(0).toUpperCase() + newProduct.color.slice(1) : '–'}
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography variant="h6">₹{newProduct.price}</Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography
                        variant="h6"
                        color={newProduct.availableQty <= 0 ? "red" : ""}
                        fontWeight={newProduct.availableQty <= 0 ? "bold" : ""}
                    >
                        {newProduct.availableQty}
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <IconButton color="dark" size="small" onClick={editProduct}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                </TableCell>
            </TableRow>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalOpen}
                onClose={() => { setModalOpen(false) }}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={modalOpen}>
                    <Box sx={modalStyle}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} lg={12}>
                                <BaseCard title="Edit product">
                                    <Stack spacing={3}>
                                        <TextField
                                            onChange={handleOnChange}
                                            value={newProduct.title}
                                            id="title"
                                            label="Title"
                                            variant="outlined"
                                        />
                                        {/* <TextField onChange={handleOnChange} value={newProduct.slug} id="slug" label="Slug" variant="outlined" /> */}
                                        <TextField onChange={handleOnChange} value={newProduct.category} id="category" label="Category" variant="outlined" disabled />
                                        <TextField onChange={handleOnChange} value={newProduct.size} id="size" label="Size" variant="outlined" disabled />
                                        <TextField onChange={handleOnChange} value={newProduct.color} id="color" label="Color" variant="outlined" disabled />
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
                        </Grid>
                    </Box>
                </Fade>
            </Modal>

            <Box sx={{
                whiteSpace: "wrap",
                textAlign: "left",
                fontSize: "15px",
            }}>
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
            </Box>
        </>

    )
}

export default Product
