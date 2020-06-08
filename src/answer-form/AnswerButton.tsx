import React from 'react'

export default function AnswerButton(props: any) {
    return (
        <button className="answer-submit-button" type='button' disabled={props.isOneButtonSelected}
            onClick={() => props.onSubmitButtonClicked()}>Submit</button>)
}

