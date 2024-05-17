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

const AllOrders = async (props) => {
  const { shrink } = props;

  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/getAllUsersOrders`, { cache: "no-store" });
  const data = await res.json();
  const orders = await data.orders;

  if (!orders) {
    return (
      <BaseCard title="All Orders">
        <Typography variant="h3" color="error" align="center">
          No orders found.
        </Typography>
      </BaseCard>
    );
  }

  return (
    <BaseCard title="All Orders">
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
                  Order Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  User Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Items
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Amount
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Payment Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Delivery Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {order.orderId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{order.userId}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    {order.products.map((item) => (
                      <li key={item.itemCode}>
                        {item.name} - {item.category.charAt(0).toUpperCase() + item.category.slice(1)} ({item.size}/{item.color}): {item.quantity}
                      </li>
                    ))}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">₹{order.amount}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {order.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {order.deliveryStatus}
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

export default AllOrders;
