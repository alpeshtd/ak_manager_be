const {statsTypeDefs, statsQueryDefs} = require('./statsTypeDefs')

const typeDefs = `
  type Purchase {
    id: ID,
    item: String,
    quantity: Float,
    purchaseRate: Float,
    totalAmount: Float,
    vendorId: Vendor,
    purchaseT: String,
    description: String,
    performedById: User,
    performedT: String,
    transactionType: String,
    changeLog: [String]
  }

  type Expense {
    id: ID
    amount: Float,
    expenseT: String,
    vendorId: Vendor,
    paymentMode: Access,
    description: String,
    performedById: User,
    performedT: String,
    changeLog: [String]
  }

  type Stock {
    id: ID,
    type: String!,
    quantity: Float,
    rate: Float!,
    unit: String!,
    changeLog: [String],
    performedById: User,
    performedT: String,
  }

  type Utilization {
    id: ID,
    item: String,
    quantity: Float,
    rate: Float,
    utilizationT: String,
    orderId: Order,
    performedById: User,
    performedT: String,
    description: String,
    changeLog: [String],
  }

  type Income {
    id: ID,
    amount: Float,
    transactionType: String,
    orderId: Order,
    incomeT: String,
    performedById: User,
    performedT: String,
    description: String,
    paymentMode: Access,
    changeLog: [String]
  }

  type User {
    id: ID,
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    mail: String,
    mobile: String,
    userRoleId: UserRole,
    changeLog: [String],
    performedById: User,
    performedT: String,
  }

  type Access {
    label: String,
    id: String,
    value: String,
  }

  input AccessInput {
    label: String,
    id: String,
    value: String,
  }

  type UserRole {
    id: ID,
    name: String!,
    access: [Access],
    changeLog: [String],
    performedById: User,
    performedT: String,
  }

  type Customer {
    id: ID,
    name: String!,
    mobile: String,
    mail: String,
    address: String,
    orders: [Order],
    changeLog: [String],
    performedById: User,
    performedT: String,
  }

  type Order {
    id: ID,
    estimated: Float,
    name: String!,
    customer: Customer,
    orderT: String,
    performedById: User,
    performedT: String,
    changeLog: [String],
    description: String,
    status: Access
  }

  type Vendor {
    id: ID,
    name: String!,
    mobile: String,
    mail: String,
    address: String,
    purchases: [Purchase],
    changeLog: [String],
    performedById: User,
    performedT: String,
  }

  type Employee {
    id: ID,
    name: String,
    address: String,
    mobile: String,
    joiningT: String,
    position: String,
    perDay: Int,
    performedById: User,
    performedT: String,
    changeLog: [String]
  }

  ${statsTypeDefs}

  type Query {
    purchases: [Purchase],
    purchase(id: ID!): Purchase,
    expenses: [Expense],
    expense(id: ID!): Expense,
    stocks: [Stock],
    stock(id: ID!): Stock,
    utilizations: [Utilization],
    utilization(id: ID!): Utilization,
    incomes: [Income],
    income(id: ID!): Income,
    users: [User],
    user(id: ID!): User,
    userRoles: [UserRole],
    userRole(id: ID!): UserRole,
    customers: [Customer],
    customer(id: ID!): Customer,
    orders: [Order],
    order(id: ID!): Order,
    vendors: [Vendor],
    vendor(id: ID!): Vendor,
    employees: [Employee],
    employee(id: ID!): Employee,
    ${statsQueryDefs}
  }

  # Mutation
  type Mutation {
    addPurchase(
        quantity: Float!,
        item: String,
        purchaseRate: Float!,
        totalAmount: Float!,
        vendorId: String,
        purchaseT: String,
        description: String,
        performedById: String,
        performedT: String,
        transactionType: String,
        changeLog: [String]
    ): Purchase
    updatePurchase(
        id: ID!,
        item: String,
        quantity: Float,
        purchaseRate: Float,
        totalAmount: Float,
        vendorId: String,
        purchaseT: String,
        description: String,
        performedById: String,
        performedT: String,
        transactionType: String,
        changeLog: [String]
    ): Purchase
    deletePurchase( id: ID!): Purchase
    addExpense(
      amount: Float,
      expenseT: String,
      vendorId: String,
      paymentMode: AccessInput,
      description: String,
      performedById: String,
      performedT: String,
      changeLog: [String]
    ): Expense
    updateExpense(
      id: ID!,
      amount: Float,
      expenseT: String,
      vendorId: String,
      paymentMode: AccessInput,
      description: String,
      performedById: String,
      performedT: String,
      changeLog: [String]
    ): Expense
    deleteExpense( id: ID!): Expense
    addStock(
        type: String,
        quantity: Float,
        unit: String,
        rate: Float,
        changeLog: [String],
        performedById: String,
        performedT: String,
    ): Stock
    updateStock(
        id: ID!
        type: String
        quantity: Float,
        unit: String,
        rate: Float,
        changeLog: [String],
        performedById: String,
        performedT: String,
    ): Stock
    deleteStock( id: ID!): Stock
    addUtilization(
        item: String,
        quantity: Float,
        rate: Float,
        utilizationT: String,
        orderId: String,
        performedById: String,
        performedT: String,
        description: String,
        changeLog: [String],
    ): Utilization
    updateUtilization(
        id: ID!,
        item: String,
        quantity: Float,
        rate: Float,
        utilizationT: String,
        orderId: String,
        performedById: String,
        performedT: String,
        description: String,
        changeLog: [String],
    ): Utilization
    deleteUtilization(id: ID!) : Utilization
    addIncome(
        amount: Float!,
        transactionType: String,
        orderId: String,
        incomeT: String,
        performedById: String,
        performedT: String,
        description: String,
        paymentMode: AccessInput,
        changeLog: [String]
    ): Income
    updateIncome(
        id: ID!,
        amount: Float,
        transactionType: String,
        orderId: String,
        incomeT: String,
        performedById: String,
        performedT: String,
        description: String,
        paymentMode: AccessInput,
        changeLog: [String]
    ): Income
    deleteIncome( id: ID!): Income
    addUser(
        userName: String!,
        password: String!,
        firstName: String!,
        lastName: String!,
        mail: String,
        mobile: String,
        userRoleId: String!,
        changeLog: [String],
        performedById: String,
        performedT: String,
    ): User
    updateUser(
        id: ID!,
        userName: String,
        password: String,
        firstName: String,
        lastName: String,
        mail: String,
        mobile: String,
        userRoleId: String,
        changeLog: [String],
        performedById: String,
        performedT: String,
    ): User
    deleteUser(id: ID!): User
    addUserRole(
        name: String!,
        access: [AccessInput],
        changeLog: [String],
        performedById: String,
        performedT: String,
    ): UserRole
    updateUserRole(
        id: ID!,
        name: String,
        access: [AccessInput],
        changeLog: [String],
        performedById: String,
        performedT: String,
    ): UserRole
    deleteUserRole(id: ID!): UserRole,
    addCustomer(
        name: String!,
        mobile: String,
        mail: String,
        address: String,
        changeLog: [String],
        performedById: String,
        performedT: String,
    ): Customer
    updateCustomer(
        id: ID!,
        name: String,
        mobile: String,
        mail: String,
        address: String,
        changeLog: [String],
        performedById: String,
        performedT: String,
    ): Customer
    deleteCustomer(id: ID!): Customer
    addOrder(
        name: String!,
        estimated: Float,
        customer: String,
        orderT: String,
        performedById: String,
        performedT: String,
        changeLog: [String],
        description: String
        status: AccessInput
    ): Order
    updateOrder(
        id: ID!,
        name: String,
        estimated: Float,
        customer: String,
        orderT: String,
        performedById: String,
        performedT: String,
        changeLog: [String],
        description: String,
        status: AccessInput
    ): Order
    deleteOrder(id: ID!): Order
    addVendor(
        name: String!,
        mobile: String,
        mail: String,
        address: String,
        changeLog: [String],
        performedById: String,
        performedT: String,
    ): Vendor
    updateVendor(
        id: ID!,
        name: String,
        mobile: String,
        mail: String,
        address: String,
        changeLog: [String],
        performedById: String,
        performedT: String,
    ): Vendor
    deleteVendor(id: ID!): Vendor
    addEmployee(
        name: String,
        address: String,
        mobile: String,
        joiningT: String,
        position: String,
        perDay: Int,
        performedById: String,
        performedT: String,
        changeLog: [String]
    ): Employee
    updateEmployee(
        id: ID,
        name: String,
        address: String,
        mobile: String,
        joiningT: String,
        position: String,
        perDay: Int,
        performedById: String,
        performedT: String,
        changeLog: [String]
    ): Employee
    deleteEmployee(id: ID!): Employee
  }
`;

module.exports = { typeDefs };
