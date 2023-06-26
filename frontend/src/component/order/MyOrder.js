import React, { Fragment, useEffect } from "react";
// import { DataGrid } from "@material-ui/data-grid";
import { DataGrid } from "@mui/x-data-grid";

import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../redux/actions/myOrderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MetaData from "../layout/Header/Metadata";
import Typography from "@mui/material/Typography";
import LaunchIcon from "@mui/icons-material/Launch";
const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      // valueGetter: (params) => {
      //   console.log();
      //   // return params.row.find((item) => item.name === "Farbe").option;
      // },
      // cellClassName: (params: GridCellParams<number>) =>
      // clsx('super-app', {
      //   negative: params.value < 0,
      //   positive: params.value > 0,
      // }),
      // cellContentName: (params) => {

      //   return params.row.status === "Delivered"
      //     ? "greenColor"
      //     : "redColor";
      // },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      // valueGetter: (params) => {
      //   console.log("params")
      //   console.log(params)
      //   return params.row.find((item) => item.name === "Farbe").option;

      // }

      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      // console.log("item")
      // console.log(item)
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.ordetStatus,
        amount: item.totalPrise,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {/* <MetaData title={`${user.name} - Orders`} /> */}

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
