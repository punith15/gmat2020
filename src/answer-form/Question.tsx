import React from 'react';
import ReactHtmlParser from 'react-html-parser';


export default function Question(props: any){
    return (
        <React.Fragment>
            <h1>
                Question 1 of 200
            </h1>
            <p className="question">
                {ReactHtmlParser(props.question)}
            </p>
        </React.Fragment>
        
    );
}