"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var numeral = require('numeral');


var Calc = React.createClass({
    handleClick: function() {
        var num1, num2, op, res;

        if (this.refs.num1 !== null && this.refs.numOne !== null) {
            if (!_.isNaN(numeral(this.refs.num1.value)) && !_.isNaN(numeral(this.refs.num2.value))) {
                num1 = numeral(this.refs.num1.value);
                num2 = numeral(this.refs.num2.value);

                if (num1.value() !== null && num2.value() !== null) {
                    if (this.refs.op !== null) {
                        op = this.refs.op.value;
                        if (op.length>0) {
                            switch(op) {
                                case '+':
                                    // operator +
                                    res = num1.add(num2.value()).value();
                                    break;
                                case '-':
                                    // operator -
                                    res = num1.subtract(num2.value()).value();
                                    break;
                                case '*':
                                    // operator *
                                    res = num1.multiply(num2.value()).value();
                                    break;
                                case '/':
                                    // operator /, let's divide
                                    res = num1.divide(num2.value()).value();
                                    break;
                                case '%':
                                    // reminder of division
                                    res = num1.value() % num2.value();
                                    break;

                                case 'H':
                                    // highest prime between num1 and num2
                                    var primes = getPrimes(num2.value());
                                    res = _.max(primes);

                                    break;
                                default:
                                    alert("ERROR: Wrong operator!", op);
                            }
                        } else {
                            alert("ERROR:: Operator missing!");
                        }
                    }
                    if (!_.isUndefined(res)) {
                        alert("Result: "+res);
                    }
                } else {
                    alert("ERROR: One or both number values missing");
                }

            } else {
                alert("ERROR: one of the numbers entered is NaN!");
            }
        }

        function getPrimes(max) {
            var sieve = [], i, j, primes = [];
            for (i = 2; i <= max; ++i) {
                if (!sieve[i]) {
                    // i has not been marked -- it is prime
                    primes.push(i);
                    for (j = i << 1; j <= max; j += i) {
                        sieve[j] = true;
                    }
                }
            }
            return primes;
        }

    },
    render: function() {
        return (
            <div>
                <h1>ReactCalc app</h1>
                Available operators:
                <ul>
                    <li>+ add</li>
                    <li>- subtract</li>
                    <li>* multiply</li>
                    <li>/ divide</li>
                    <li>% remainder</li>
                    <li>H highest prime</li>
                </ul>
                <table>
                    <tbody>
                        <tr>
                            <td>num1</td>
                            <td>op</td>
                            <td>num2</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><input ref="num1" type="number" size="5" /></td>
                            <td><input ref="op" type="text" size="2" /></td>
                            <td><input ref="num2" type="number" size="5" /></td>
                            <td><button onClick={this.handleClick}>Calculate!</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
});

ReactDOM.render(<Calc />, document.getElementById('app'));