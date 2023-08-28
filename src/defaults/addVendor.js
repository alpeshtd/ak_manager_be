import { commonApiRequest, getVendor } from "api/api";
import React from "react";

import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { formatTimestampToDate } from "utils/utils";

function createData(arr) {
  let tempData = {};
  arr.forEach((arrItem) => {
    tempData = {
      ...tempData,
      [arrItem[0]]: {
        label: arrItem[1],
        dataKey: arrItem[2],
        sx: arrItem[3],
        align: arrItem[4]
      }
    };
  });
  return tempData;
}

const getDataString = `{
  id
  name
  mobile
  mail
  address
  purchases {
    id
  }
  changeLog
  performedById {
    id
    firstName
  }
  performedT
}`

const ADD_VENDOR_DATA = {
  mainCardTitle: 'All Vendors',
  tableTitle: 'Vendors',
  slug: 'elements/vendor',
  dbKey: 'vendor',
  storePath: ['elements', 'vendors'],
  label: 'Vendor',
  fields: {
    name: {
      type: 'text',
      placeHolder: 'Name',
      label: 'Name*',
      required: true,
      value: ''
    },
    mobile: {
      type: 'text',
      placeHolder: 'mobile',
      label: 'Mobile*',
      required: true,
      value: ''
    },
    mail: {
      type: 'text',
      placeHolder: 'Mail',
      label: 'Mail',
      required: false,
      value: ''
    },
    address: {
      type: 'text',
      placeHolder: 'Address',
      label: 'Address',
      required: false,
      value: ''
    }
  },
  tableHeading: createData([
    ['name', 'Name', 'name', { paddingLeft: '24px' }],
    ['address', 'Address', 'address'],
    ['mail', 'Mail', 'mail'],
    ['mobile', 'Mobile', 'mobile'],
    ['actions', 'Actions', 'actions', {}, 'center']
  ]),
  getDispatchType: 'VENDORS_FETCH_REQUESTED',
  getQuery: `query Vendors {
    vendors ${getDataString}
  }`,
  getSingleReq: (payload) => getVendor(payload),
  getSingleQuery: `query Vendor($id: ID!){
    vendor(id: $id) ${getDataString}
  }`,
  addNewQuery: `mutation AddVendor($name: String!, $mobile: String, $mail: String, $address: String, $changeLog: [String], $performedById: String, $performedT: String) {
    addVendor(name: $name, mobile: $mobile, mail: $mail, address: $address, changeLog: $changeLog, performedById: $performedById, performedT: $performedT) {
      id
      name
    }
  }`,
  updateQuery: `mutation UpdateVendor($id: ID!, $name: String, $mobile: String, $mail: String, $address: String, $changeLog: [String], $performedById: String, $performedT: String) {
    updateVendor(id: $id, name: $name, mobile: $mobile, mail: $mail, address: $address, changeLog: $changeLog, performedById: $performedById, performedT: $performedT) {
      id
      name
    }
  }`,
  deleteQuery: `mutation DeleteVendor($id: ID!) {
    deleteVendor(id: $id) {
      id
      name
    }
  }`,
  detailsTableQuery: `query VendorTransactions($id: ID) {
    vendorTransactions(id: $id) {
      name
      vendorPurchases {
        id
        item
        quantity
        purchaseRate
        totalAmount
        purchaseT
      }
      vendorExpenses {
        id
        amount
        expenseT
        description
      }
    }
  }`,
  detailsTableReq: (payload) => commonApiRequest(payload),
  formatDetailsTableData: ({ vendorTransactions }) => {
    const total = {
      purchase: 0,
      expense: 0
    };
    const tempPurchase = vendorTransactions[0].vendorPurchases.map((purchase) => {
      total.purchase += +purchase.totalAmount;
      return {
        type: 'purchase',
        details: purchase.item,
        // description:income.description,
        purchaseAmount: purchase.totalAmount,
        expenseAmount: null,
        time: purchase.purchaseT
      };
    });
    const tempExp = vendorTransactions[0].vendorExpenses.map((exp) => {
      total.expense += exp.amount;
      return {
        type: 'expense',
        details: exp.description,
        // description: uti.description,
        purchaseAmount: null,
        expenseAmount: exp.amount,
        time: exp.expenseT
      };
    });
    const concatArray = [...tempPurchase, ...tempExp].sort((a, b) => {
      return b.time - a.time;
    });
    const render = (
      <Grid container spacing={gridSpacing}>
        <Grid item lg={3} md={3} sm={4} xs={6}>
          <div style={{ fontWeight: 700 }}>Total Purchase</div>
          <div>{total.purchase}</div>
        </Grid>
        <Grid item lg={3} md={3} sm={4} xs={6}>
          <div style={{ fontWeight: 700 }}>Total Paid</div>
          <div>{total.expense}</div>
        </Grid>
        <Grid item lg={3} md={3} sm={4} xs={6}>
          <div style={{ fontWeight: 700 }}>Remaining Amount</div>
          <div>{total.purchase - total.expense}</div>
        </Grid>
      </Grid>
    );
    const columns = ['Date', 'Details', 'Purchase', 'Paid'];
    const rows = concatArray.map((ca) => [formatTimestampToDate(ca.time), ca.details, ca.purchaseAmount, ca.expenseAmount]);
    return { rows, columns, render };
  }
};

export default ADD_VENDOR_DATA;
