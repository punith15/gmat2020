import React, {Component} from 'react';
import './Answers.css';

export default function AnswerBox(props: any) {
    return (
        <div className="answer-container">
            <ul>
                {props.answers.map((value: any) => {
                    return (
                    <li className="answer-box" key={value.letter} id={value.letter}>
                        <input className="answer-textbox" type="checkbox" onChange={() => console.log('selected: ', value.letter)}></input>
                        <span className="answer-letter"><b>{value.letter})</b></span>
                        {value.answer}
                    </li>)
                })
                }
            </ul>
        </div>
    )
}

// export default class AnswerBox extends React.Component {
//     constructor(props: any){
//         super(props);
//     }

//     render(){
//         return(
//             <div>hello</div>
//         )   
//     }
// }