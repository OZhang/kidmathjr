import Expo from 'expo';
import React,{Component} from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Question from './Question';

class App extends React.Component {
    constructor() {
        super();
        var newQuestions = App.makeQuestions();
        this.state = {questions: newQuestions};

    }

    static multiplication() {
        do {
            var num1 = Math.ceil(Math.random() * 1000);
            var num2 = Math.ceil(Math.random() * 1000);
            var result = num1 * num2;
        } while (result > 1000 || num2 < 10 || num1 === 1 || num2 === 1);
        return String('   ' + num1).slice(-3) + " * " + String('   ' + num2).slice(-3);
    }

    static division() {
        do {
            var num1 = Math.ceil(Math.random() * 1000);
            var num2 = Math.ceil(Math.random() * 10);

        } while (num1 % num2 !== 0 || num1 === 1 || num2 === 1);
        return String('   ' + num1).slice(-3) + " / " + String('   ' + num2).slice(-3);
    }

    static addition(num1) {
        do {
            var num2 = Math.ceil(Math.random() * 1000);
            var result = eval(num1) + num2;
        } while (result > 1000);
        var question;
        if (Math.random() > 0.5)
        {
            question = String('   ' + num2).slice(-3) + " + " + num1.toString().replace("/", "÷").replace("*", "×");
        }
        else
        {
            question = num1.toString().replace("/", "÷").replace("*", "×") + " + " + String('   ' + num2).slice(-3) ;
        }
        return [question, result];
    }

    static subtraction(num1) {
        do {
            var num2 = Math.ceil(Math.random() * 1000);
            var result;
            var question;
            if (Math.random() > 0.5)
            {
                question = String('   ' + num2).slice(-3) + " - " + num1.toString().replace("/", "÷").replace("*", "×");
                result= num2 - eval(num1);
            }
            else
            {
                question =num1.toString().replace("/", "÷").replace("*", "×") + " - " + String('   ' + num2).slice(-3);
                result = eval(num1) - num2;
            }
        } while (result < 0);

        return [question,result];
    }

    reload= () =>{
        var newQuestions = App.makeQuestions();
        this.setState({
            questions : newQuestions
        });
    }

    static makeQuestions() {
        var randomQuestions = [];
        for (var i = 0; i < 20; i++) {
            var num1;
            if (Math.random() > 0.5) {
                num1 = App.multiplication();
            } else {
                num1 = App.division();
            }
            if (Math.random() > 0.5) {
                num1 = App.addition(num1);
            } else {
                num1 = App.subtraction(num1);
            }
            randomQuestions.push({
                id: i,
                question: num1,
            })
        }

        return randomQuestions;
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <Question questions={this.state.questions} reload={this.reload}/>
            </View>
        );
    }
}

Expo.registerRootComponent(App);
