import { Grid } from "@mui/material";
import AllOrders from "@/admin/src/components/AllOrders";

const OrdersAdmin = () => {  
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <AllOrders />
      </Grid>
    </Grid>
  )
}

export default OrdersAdmin
