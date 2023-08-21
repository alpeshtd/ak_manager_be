import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserRoles, getVendors, getUsers, getCustomers, getStocks, getUtilizations, getPurchase, getIncome, getOrders, getEmployees, getNotifications, performLogin, getLoggedUser, getExpenses, getUtilizationsStats, commonApiRequest } from 'api/api';

function* doLogin(action) {
  try {
    const login = yield call(performLogin, action.payload);
    yield put({ type: 'USER_LOGIN_SUCCEEDED', login: login });
  } catch (e) {
    yield put({ type: 'USER_LOGIN_FAILED', message: e.message });
  }
}

function* fetchLoggedUser(action) {
  try {
    const user = yield call(getLoggedUser, action.payload);
    yield put({ type: 'USER_LOGIN_SUCCEEDED', login: user });
  } catch (e) {
    yield put({ type: 'USER_LOGIN_FAILED', message: e.message });
  }
}

function* fetchUserRole(action) {
  try {
    const user = yield call(getUserRoles, action.payload);
    yield put({ type: 'USER_ROLE_FETCH_SUCCEEDED', userRoles: user.userRoles });
  } catch (e) {
    yield put({ type: 'USER_ROLE_FETCH_FAILED', message: e.message });
  }
}

function* fetchUsers(action) {
  try {
    const user = yield call(getUsers, action.payload);
    yield put({ type: 'USERS_FETCH_SUCCEEDED', users: user.users });
  } catch (e) {
    yield put({ type: 'USERS_FETCH_FAILED', message: e.message });
  }
}

function* fetchVendors(action) {
  try {
    const user = yield call(getVendors, action.payload);
    yield put({ type: 'VENDORS_FETCH_SUCCEEDED', vendors: user.vendors });
  } catch (e) {
    yield put({ type: 'VENDORS_FETCH_FAILED', message: e.message });
  }
}

function* fetchCustomers(action) {
  try {
    const customer = yield call(getCustomers, action.payload);
    yield put({ type: 'CUSTOMERS_FETCH_SUCCEEDED', customers: customer.customers });
  } catch (e) {
    yield put({ type: 'CUSTOMERS_FETCH_FAILED', message: e.message });
  }
}

function* fetchStocks(action) {
  try {
    const stock = yield call(getStocks, action.payload);
    yield put({ type: 'STOCKS_FETCH_SUCCEEDED', stocks: stock.stocks });
  } catch (e) {
    yield put({ type: 'STOCKS_FETCH_FAILED', message: e.message });
  }
}

function* fetchUtilizations(action) {
  try {
    const utilization = yield call(getUtilizations, action.payload);
    yield put({ type: 'UTILIZATIONS_FETCH_SUCCEEDED', utilizations: utilization.utilizations });
  } catch (e) {
    yield put({ type: 'UTILIZATIONS_FETCH_FAILED', message: e.message });
  }
}

function* fetchPurchases(action) {
  try {
    const purchase = yield call(getPurchase, action.payload);
    yield put({ type: 'PURCHASES_FETCH_SUCCEEDED', purchases: purchase.purchases });
  } catch (e) {
    yield put({ type: 'PURCHASES_FETCH_FAILED', message: e.message });
  }
}

function* fetchExpenses(action) {
  try {
    const expense = yield call(getExpenses, action.payload);
    yield put({ type: 'EXPENSES_FETCH_SUCCEEDED', expenses: expense.expenses });
  } catch (e) {
    yield put({ type: 'EXPENSES_FETCH_FAILED', message: e.message });
  }
}

function* fetchIncomes(action) {
  try {
    const income = yield call(getIncome, action.payload);
    yield put({ type: 'INCOME_FETCH_SUCCEEDED', incomes: income.incomes });
  } catch (e) {
    yield put({ type: 'INCOME_FETCH_FAILED', message: e.message });
  }
}

function* fetchOrders(action) {
  try {
    const order = yield call(getOrders, action.payload);
    yield put({ type: 'ORDERS_FETCH_SUCCEEDED', orders: order.orders });
  } catch (e) {
    yield put({ type: 'ORDERS_FETCH_FAILED', message: e.message });
  }
}

function* fetchEmployees(action) {
  try {
    const employee = yield call(getEmployees, action.payload);
    yield put({ type: 'EMPLOYEES_FETCH_SUCCEEDED', employees: employee.employees });
  } catch (e) {
    yield put({ type: 'EMPLOYEES_FETCH_FAILED', message: e.message });
  }
}

function* fetchNotifications(action) {
  try {
    const notification = yield call(getNotifications, action.payload);
    yield put({ type: 'NOTIFICATIONS_FETCH_SUCCEEDED', notifications: notification });
  } catch (e) {
    yield put({ type: 'NOTIFICATIONS_FETCH_FAILED', message: e.message });
  }
}

function* fetchUtilizationsStats(action) {
  try {
    const utiStats = yield call(getUtilizationsStats, action.payload);
    yield put({ type: 'UTILIZATIONS_STATS_FETCH_SUCCEEDED', utilizationsStats: utiStats.utilizationStats });
  } catch (e) {
    yield put({ type: 'UTILIZATIONS_STATS_FETCH_FAILED', message: e.message });
  }
}

function* fetchOrdersStats(action) {
  try {
    const ordersStats = yield call(commonApiRequest, action.payload);
    yield put({ type: 'ORDERS_STATS_FETCH_SUCCEEDED', ordersStats: ordersStats.orderStats });
  } catch (e) {
    yield put({ type: 'UTILIZATIONS_STATS_FETCH_FAILED', message: e.message });
  }
}

function* fetchIncomeExpenseStats(action) {
  try {
    const stats = yield call(commonApiRequest, action.payload);
    yield put({ type: 'INCOME_EXPENSE_STATS_FETCH_SUCCEEDED', incomeExpenseStats: stats.incomeExpenseStats });
  } catch (e) {
    yield put({ type: 'UTILIZATIONS_STATS_FETCH_FAILED', message: e.message });
  }
}

function* mySaga() {
  yield takeLatest('USER_ROLE_FETCH_REQUESTED', fetchUserRole);
  yield takeLatest('USERS_FETCH_REQUESTED', fetchUsers);
  yield takeLatest('VENDORS_FETCH_REQUESTED', fetchVendors);
  yield takeLatest('CUSTOMERS_FETCH_REQUESTED', fetchCustomers);
  yield takeLatest('STOCKS_FETCH_REQUESTED', fetchStocks);
  yield takeLatest('UTILIZATIONS_FETCH_REQUESTED', fetchUtilizations);
  yield takeLatest('PURCHASES_FETCH_REQUESTED', fetchPurchases);
  yield takeLatest('EXPENSES_FETCH_REQUESTED', fetchExpenses);
  yield takeLatest('INCOMES_FETCH_REQUESTED', fetchIncomes);
  yield takeLatest('ORDERS_FETCH_REQUESTED', fetchOrders);
  yield takeLatest('EMPLOYEES_FETCH_REQUESTED', fetchEmployees);
  yield takeLatest('NOTIFICATIONS_FETCH_REQUESTED', fetchNotifications);
  yield takeLatest('USER_FETCH_REQUESTED', fetchLoggedUser);
  yield takeLatest('USER_LOGIN_INIT', doLogin);
  yield takeLatest('UTILIZATIONS_STATS_FETCH_REQUESTED', fetchUtilizationsStats);
  yield takeLatest('ORDERS_STATS_FETCH_REQUESTED', fetchOrdersStats);
  yield takeLatest('INCOME_EXPENSE_STATS_FETCH_REQUESTED', fetchIncomeExpenseStats);
}

export default mySaga;
