import React from 'react';

const Transactions = (props) => {
  const arr = props.data;
  return (
    <table className="table table-bordered table-sm table-hover blockchain-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {arr.map((obj, i) => {
          let { item, qty, score } = obj;
          return (
            <tr key={i}>
              <td>{item}</td>
              <td>{qty}</td>
              <td>{score}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Transactions;
