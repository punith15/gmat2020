import React from 'react'

export default function ViewSolutionsButton(props: any) {
    return (<button className="view-solutions-button" type='button' onClick={ () => props.showSolutions() }>View Solutions</button>)
}

