"use client"

import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import BaseCard from "./baseCard/BaseCard";
import Product from "./Product";

const AllProducts = (props) => {
  const { shrink } = props;
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [rerenderKey, setRerenderKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/getProducts`, { cache: "no-store" })
      const data = await res.json()
      setAllProducts(data.body.data)
      setProducts(data.body.data)
    }
    fetchData()
  }, []);

  useEffect(() => {
    if (sortBy === 'price') products.sort((a, b) => a.price - b.price);
    if (sortBy === 'quantity') products.sort((a, b) => a.availableQty - b.availableQty);
    if (sortBy === 'updatedAt') products.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    if (sortBy === 'createdAt') products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === 'title') products.sort((a, b) => a.title.localeCompare(b.title));
    setRerenderKey(prev => prev + 1);
  }, [sortBy, products]);

  useEffect(() => {
    if (category !== 'all') {
      setProducts(allProducts.filter(product => product.category === category));
    }
    else {
      setProducts(allProducts);
    }
  }, [category, allProducts]);

  return (
    <BaseCard title="All Products">
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
        <FormControl sx={{ minWidth: '130px', textAlign: 'center' }} size="small">
          <InputLabel id="category">Category</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Category">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="tshirt">T-Shirt</MenuItem>
            <MenuItem value="hoodie">Hoodie</MenuItem>
            <MenuItem value="mug">Mug</MenuItem>
            <MenuItem value="sticker">Sticker</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: '130px', textAlign: 'center' }} size="small">
          <InputLabel id="category">Sort by</InputLabel>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort by">
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="quantity">Quantity</MenuItem>
            <MenuItem value="createdAt">Created at</MenuItem>
            <MenuItem value="updatedAt">Updated at</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer key={rerenderKey}
        sx={{
          maxHeight: shrink ? "400px" : "",
        }}
      >
        <Table
          stickyHeader
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Title (Click to view product)
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  Image
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Category
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Size/Colour
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Price
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Available Quantity
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Edit
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <Product key={product.slug} product={product} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default AllProducts;
