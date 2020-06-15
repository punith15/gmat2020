import React from 'react'

export default function AnswerButton(props: any) {
    return (
        <button className="answer-submit-button" type='button' disabled={props.doDisable}
            onClick={() => props.onSubmitButtonClicked()}>Submit</button>)
}

