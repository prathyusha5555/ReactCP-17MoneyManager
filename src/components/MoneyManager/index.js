import {Component} from 'react'

import './index.css'

import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionsList: [],
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const filteredTransactionsList = transactionsList.filter(
      each => each.id !== id,
    )
    this.setState({transactionsList: filteredTransactionsList})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeTypeInput = event => {
    this.setState({optionId: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onClickAddButton = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      each => each.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
      id: v4(),
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getBalanceAmount = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    let expensesAmount = 0
    let balanceAmount = 0
    transactionsList.forEach(each => {
      if (each.type === 'Income') {
        incomeAmount += each.amount
      } else {
        expensesAmount += each.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  getExpensesAmount = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0
    transactionsList.forEach(each => {
      if (each.type === transactionTypeOptions[1].displayText) {
        expensesAmount += each.amount
      }
    })
    return expensesAmount
  }

  getIncomeAmount = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      }
    })
    return incomeAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionsList} = this.state
    const balanceAmount = this.getBalanceAmount()
    const incomeAmount = this.getIncomeAmount()
    const expensesAmount = this.getExpensesAmount()
    console.log(balanceAmount)
    console.log(incomeAmount)
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="header-container">
            <h1 className="heading">Hi,Rechard</h1>
            <p className="header-content">
              Welcome back to your
              <span className="money-manager-text">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
          <div className="transaction-details">
            <form className="transaction-form">
              <h1 className="transaction-header">Add Transaction</h1>
              <label className="input-label" htmlFor="title">
                Title
              </label>
              <input
                className="input"
                id="title"
                type="text"
                onChange={this.onChangeTitleInput}
                value={titleInput}
              />
              <label className="input-label" htmlFor="amount">
                Amount
              </label>
              <input
                className="input"
                id="amount"
                type="text"
                onChange={this.onChangeAmountInput}
                value={amountInput}
              />
              <label className="input-label" htmlFor="select">
                Type
              </label>
              <select
                id="select"
                value={optionId}
                className="input"
                onChange={this.onChangeTypeInput}
              >
                {transactionTypeOptions.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
              <button
                className="button"
                type="submit"
                onClick={this.onClickAddButton}
              >
                Add
              </button>
            </form>
            <div className="history-transactions">
              <h1 className="transaction-header">History</h1>
              <div className="transactions-table-container">
                <ul className="transactions-table">
                  <li className="table-header">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                  </li>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
