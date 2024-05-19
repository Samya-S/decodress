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
import Product from "./Product";

const AllProducts = async (props) => {
  const { shrink } = props;

  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/getProducts`, { cache: "no-store" })
  const data = await res.json()
  const products = await data.body.data;

  return (
    <BaseCard title="All Products">
      <TableContainer
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
