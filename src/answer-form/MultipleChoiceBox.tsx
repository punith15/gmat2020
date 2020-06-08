import React from 'react';

function getCssClass(obj: any, correctLetter: string, selected: boolean, submitted: boolean){

    if (obj.letter === correctLetter && submitted ){ // always show correct answer once submittewd
        return "answer-box answer-correct";
    }

    if (selected &&  submitted && obj.letter !== correctLetter){ // submitted & wrong answer & user selected it
        return "answer-box answer-incorrect";
    }

    if (obj.selected) {
        return  "answer-box answer-selected"; // checkbox ticked
    }

    return "answer-box"; //default
    
}

export default function MultipleChoiceBox(props: any) {
    return (
        <form className="answer-form">
            <ul>
                {props.answers.map((value: any, index: number) => {
                    return (
                    <li className={ getCssClass(value, props.correctLetter, value.selected, props.submitButtonClicked) } key={value.letter} id={value.letter}
                     onClick={() => {props.updateSelectedAnswer(index)}}>
                        <input id={"input" + value.letter} className="answer-textbox" type="radio" checked={value.selected}  readOnly/>
                        <span className="answer-letter"><b>{value.letter})</b></span>
                        {value.answer}
                    </li>)
                })
                }
            </ul>
        </form>
    )
}