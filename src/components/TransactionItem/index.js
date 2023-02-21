import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {title, amount, type, id} = transactionDetails

  const onClickDelete = () => {
    deleteTransaction(id)
  }

  return (
    <li className="table-row">
      <p className="transaction-text">{title}</p>
      <p className="transaction-text">{amount}</p>
      <p className="transaction-text">{type}</p>
      <div className="delete-container">
        <button
          type="button"
          onClick={onClickDelete}
          className="delete-button"
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            className="delete-img"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
