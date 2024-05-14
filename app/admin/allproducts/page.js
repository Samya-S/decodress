import { Grid } from "@mui/material";
import AllProducts from "@/admin/src/components/AllProducts";

const AllProductsAdmin = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <AllProducts />
      </Grid>
    </Grid>
  )
}

export default AllProductsAdmin
