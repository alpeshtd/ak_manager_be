import ADD_CUSTOMER_DATA from './addCustomers';
import ADD_EMPLOYEE_DATA from './addEmployees';
import ADD_EXPENSE_DATA from './addExpenses';
import ADD_INCOME_DATA from './addIncomes';
import ADD_ORDER_DATA from './addOrderFields';
import ADD_PURCHASE_DATA from './addPurchases';
import ADD_STOCK_DATA from './addStock';
import ADD_USER_DATA from './addUser';
import ADD_USER_ROLE_DATA from './addUserRole';
import ADD_UTILIZATION_DATA from './addUtilization';
import ADD_VENDOR_DATA from './addVendor';

const allDefaultData = {
  'overview/order': ADD_ORDER_DATA,
  'overview/utilization': ADD_UTILIZATION_DATA,
  'overview/purchase': ADD_PURCHASE_DATA,
  'overview/income': ADD_INCOME_DATA,

  'elements/userRole': ADD_USER_ROLE_DATA,
  'elements/user': ADD_USER_DATA,
  'elements/vendor': ADD_VENDOR_DATA,
  'elements/customer': ADD_CUSTOMER_DATA,
  'elements/stock': ADD_STOCK_DATA,
  'elements/employee': ADD_EMPLOYEE_DATA,
  'overview/expense': ADD_EXPENSE_DATA
};

export default allDefaultData;
