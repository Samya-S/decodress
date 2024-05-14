import { Grid } from "@mui/material";
import BlogCard from "@/admin/src/components/dashboard/BlogCard";
import SalesOverview from "@/admin/src/components/dashboard/SalesOverview";
import DailyActivity from "@/admin/src/components/dashboard/DailyActivity";
import AllProducts from "@/admin/src/components/AllProducts";
import AllOrders from "@/admin/src/components/AllOrders";

export default function Index() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SalesOverview />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={4}>
        <DailyActivity />
      </Grid>
      <Grid item xs={12} lg={8}>
        <AllProducts shrink={true} />
      </Grid>
      <Grid item xs={12} lg={12}>
        <AllOrders shrink={true} />
      </Grid>
      <Grid item xs={12} lg={12}>
        <BlogCard />
      </Grid>
    </Grid>
  );
}