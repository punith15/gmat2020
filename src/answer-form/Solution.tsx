import React from 'react';
import ReactHtmlParser from 'react-html-parser';


export default function Solution(props: any){
    console.log(props.solution)
    return (
        <React.Fragment>            
            <div className="solution">
                <h1 className="answerHeader">Answer 1 of 5</h1>
                <p >
                    {ReactHtmlParser(props.solution.post)}                
                </p>
            </div>
        </React.Fragment>
        
    );
}