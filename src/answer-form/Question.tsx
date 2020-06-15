import React from 'react';
import ReactHtmlParser from 'react-html-parser';


export default function Question(props: any){
    return (
        <p className="question">
            {ReactHtmlParser(props.question)}
        </p>
    );
}