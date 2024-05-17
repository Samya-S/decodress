import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import BaseCard from "./baseCard/BaseCard";

const AllProducts = async (props) => {
  const { shrink } = props;

  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/getProducts`, { cache: "no-store" })
  const data = await res.json()
  const products = await data.body.data;

  return (
    <BaseCard title="All Products">
      <TableContainer
        sx={{
          maxHeight: shrink ? "400px":"",
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
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.slug}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    <a href={`/product/${product.slug}`} target="_blank">{product.title}</a>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {/* eslint-disable-next-line */}
                    <img src={product.img} style={{ height: '80px', marginLeft: 'auto', marginRight: 'auto' }} />
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6"                >
                    {product.category}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {product.size}/{product.color.charAt(0).toUpperCase() + product.color.slice(1)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">₹{product.price}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="h6"
                    color={product.availableQty <= 0 ? "red" : ""}
                    fontWeight={product.availableQty <= 0 ? "bold" : ""}
                  >
                    {product.availableQty}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default AllProducts;
