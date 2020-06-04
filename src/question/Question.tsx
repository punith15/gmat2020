import React from 'react';
import ReactHtmlParser from 'react-html-parser';


export default function Question(props: any){
    return (
        <div  >
            {ReactHtmlParser(props.question)}
        </div>
    );
}