import React, { Component } from 'react';
import Question from './question/Question';
import AnswerBox from './answers/AnswerBox';
import './App.css';


const sampleObj = {
    "question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    "answers": [
        {
            "letter": "A",
            "answer": "1/5"
        },
        {
            "letter": "B",
            "answer": "3/10"
        },
        {
            "letter": "C",
            "answer": "2/5"
        },
        {
            "letter": "D",
            "answer": "1/2"
        },
        {
            "letter": "E",
            "answer": "7/10"
        }
    ],
    "correctAnswer": "B",
    "categories": [
        "Difficulty: 700-Level",
        "Geometry",
        "Probability",
        "Source: Other - Please specify"
    ]
};

const sampleObj2 = {
    "question": "In the figure above, angle PTQ = angle QRS = 70º, PT = 4, PR = 12, and the shaded region has an area of 48.  What is the length of QW?",
    "answers": [
        {
            "letter": "A",
            "answer": "(2sqrt{2})"
        },
        {
            "letter": "B",
            "answer": "3"
        },
        {
            "letter": "C",
            "answer": "(sqrt{10})"
        },
        {
            "letter": "D",
            "answer": "3.2"
        },
        {
            "letter": "E",
            "answer": "3.5"
        }
    ],
    "correctAnswer": "B",
    "categories": [
        "Difficulty: 700-Level",
        "Geometry",
        "Probability"
    ]
}

export default class App extends React.Component {

    // constructor(props: any){
    //     super(props);
    //     this.state = {
    //         question: sampleObj
    //     }
    // }

    render() {
        return (
            <div className="middle-container">
                <Question question={sampleObj.question} />
                <AnswerBox answers={sampleObj.answers}/>
            </div>
        );

    }
}

