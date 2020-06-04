import React from 'react';
import './Answers.css';

export default function AnswerBox(props: any) {

    return (
        <span className="answer-letter">
            <b>{props.letter}) </b>
        </span>
    )
}