const statsTypeDefs = `
  type orderData {
    id: String
    name: String,
    totalUtilization: Int,
    totalIncome: Int
  }
  type orderProfitStats {
    ordersData: [orderData],
  }
  type OrderStats {
    total: Int,
    completed: Int,
    inProgress: Int,
    inPipeline: Int,
    pending: Int,
    rejected: Int,
  }
  type IncomeExpenseStats {
    totalIncome: Int,
    totalExpense: Int,
    estimatedIncome: Int,
  }
  type orderTransactions {
    id: ID,
    estimated: Float,
    name: String,
    description: String,
    orderUtilizations: [Utilization],
    orderIncomes: [Income]
  }
  type vendorTransactions {
    name: String,
    vendorPurchases: [Purchase],
    vendorExpenses: [Expense]
  }
`;

const statsQueryDefs = `
    orderProfitStats(fromT: String, toT: String): orderProfitStats,
    orderStats(fromT: String, toT: String): OrderStats,
    incomeExpenseStats(fromT: String, toT: String): IncomeExpenseStats,
    orderTransactions(id: ID): [orderTransactions],
    vendorTransactions(id: ID): [vendorTransactions],
`

module.exports = { statsTypeDefs, statsQueryDefs };
