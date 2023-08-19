import axios from 'axios';
import allDefaultData from 'defaults/defaultIndex';
import { store } from 'store';

const APIURL = 'https://comanager.onrender.com/'

const api = ({ method = 'POST', url = '', setheaders = {}, reqPayload = {} } = {}) => {
  const appState = store;
  return new Promise((resolve, reject) => {
    const headers = {
      'content-type': 'application/json',
      Authorization: appState.token,
      ...setheaders
    };

    axios({
      method: method,
      headers,
      url: url || APIURL + 'graphql',
      data: reqPayload,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data) {
          resolve(res.data.data);
        } else {
          reject('No data');
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getUserRoles = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getUserRole = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getUsers = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getUser = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getVendors = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getVendor = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getCustomers = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getCustomer = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getStocks = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getStock = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getUtilizations = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getUtilization = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getPurchase = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getPurchaseSingle = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getIncome = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getIncomeSingle = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getOrders = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getOrder = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getEmployees = (reqPayload = {}) => {
  return api({ reqPayload });
};

export const getEmployee = (reqPayload = {}) => {
  return api({ reqPayload });
};

// Add APIs
export const addDataCommon = (reqPayload = {}) => {
  return api({ reqPayload });
};

// Update APIs
export const updateDataCommon = (reqPayload = {}) => {
  return api({ reqPayload });
};

// Delete API

export const deleteDocument = (id, page) => {
  const defaultData = allDefaultData[page];
  const finalPayload = {
    query: defaultData.deleteQuery,
    variables: {
      id: id
    }
  };
  return api({ reqPayload: finalPayload });
};

// App API
export const getNotifications = (reqPayload = {}) => {
  return api({ method: 'GET', url: APIURL + 'notification/getNotifications', reqPayload });
}

export const updateNotifications = (reqPayload = {}) => {
  return api({ method: 'POST', url: APIURL + 'notification/updateNotification', reqPayload });
}

export const performLogin = (reqPayload = {}) => {
  return api({ method: 'POST', url: APIURL + 'auth/login', reqPayload });
};

export const getLoggedUser = (reqPayload = {}) => {
  return api({ method: 'GET', url: APIURL + 'auth/getUser', reqPayload });
}; 

export const performLogout = (reqPayload = {}) => {
  return api({ method: 'POST', url: APIURL + 'auth/logout', reqPayload });
};
