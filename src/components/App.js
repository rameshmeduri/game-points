import React, { Component } from 'react';
import Transactions from './Transactions';

const unitPoints = {
  A: {
    points: 50,
    bonusFor: 3
  },
  B: {
    points: 30,
    bonusFor: 2
  },
  C: {
    points: 20
  },
  D: {
    points: 15
  }
};

class App extends Component {
  state = {
    selectedItems: [],
    itemBonus: { A: 0, B: 0, C: 0, D: 0 },
    totalBonus: 0,
    totalScore: 0
  };

  reset = (e) => {
    this.setState({
      selectedItems: [],
      itemBonus: { A: 0, B: 0, C: 0, D: 0 },
      totalBonus: 0,
      totalScore: 0
    });
  };

  addItem = (e) => {
    const item = e.target.getAttribute('data-item');
    const points = unitPoints[item].points;
    const bonusFor = unitPoints[item].bonusFor;
    let arr = this.state.selectedItems;
    let itemArr;
    if (arr && arr.length) {
      itemArr = this.state.selectedItems.concat();
    } else {
      itemArr = [];
    }

    let filtered = itemArr.filter((obj) => obj && obj.item === item);
    if (filtered && filtered.length) {
      //update old item
      let obj = filtered[0];
      let bonus;
      let qty = obj.qty + 1;
      obj.qty = qty;

      let cond = obj.qty % bonusFor === 0;
      if (cond) {
        let times = Number.parseInt(obj.qty / bonusFor);
        bonus = points * times;
        obj.score = obj.qty * points + bonus;
        let bonusObj = {
          ...this.state.itemBonus,
          [item]: bonus
        };
        let totalBonus = 0;
        Object.keys(bonusObj).forEach((key) => {
          totalBonus += bonusObj[key];
        });
        this.setState({
          itemBonus: bonusObj,
          totalBonus: totalBonus
        });
      } else {
        obj.score = obj.score + points;
      }
    } else {
      //add new item
      itemArr.push({ item: item, qty: 1, score: points });
    }

    let totalScore = 0;
    itemArr.forEach((obj) => {
      totalScore += obj.score;
    });

    this.setState({
      selectedItems: itemArr,
      totalScore: totalScore
    });
  };

  render() {
    let { selectedItems, totalBonus, totalScore } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="border">Kahoot Points</h1>
            <div className="border">
              <h4 className="text-center">Items</h4>
              <div className="row">
                <div className="col item" onClick={this.addItem} data-item="A">
                  A
                </div>
                <div className="col item" onClick={this.addItem} data-item="B">
                  B
                </div>
                <div className="col item" onClick={this.addItem} data-item="C">
                  c
                </div>
                <div className="col item" onClick={this.addItem} data-item="D">
                  D
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h1 className="border">Player Items</h1>
            <div className="border">
              <Transactions data={selectedItems} />
            </div>
            <div className="border">
              <h6>Bonuses : {totalBonus}</h6>
              <div className="row">
                <div className="col">
                  <h6>Total : {totalScore}</h6>
                </div>
                <div className="col text-right">
                  <button 
                  type="button" 
                  className="btn btn-outline-dark btn-sm"
                  onClick={this.reset}
                  >New Game</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
