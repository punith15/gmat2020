import React, { Component } from 'react';
import { mockApi } from '../api/MongoAPI';
import SideBar from '../bars/SideBar';
import './Containers.css';
import AnswerButton from '../answer-form/AnswerButton';
import Question from '../answer-form/Question';
import Solution from '../answer-form/Solution';
import '../answer-form/Answers.css';
import ViewSolutionsButton from '../answer-form/ViewSolutionsButton';
import MultipleChoiceBox from '../answer-form/MultipleChoiceBox';
// import image from '../../public/grayuser.png';





interface IContainerProps {

}

interface IContainerState {
    submitButtonClicked: boolean,
    questionArr: any[];
    activeQuestion: any;
    currentQuestionIndex: number;
    activeSolution: any;
    
}


export default class Container extends React.Component<IContainerProps, IContainerState>{

    constructor(props: any) {
        super(props);
        this.state = {
            submitButtonClicked: false,
            questionArr: [],
            activeQuestion: {},
            currentQuestionIndex: 0,
            activeSolution: {}
        };
    }

    componentDidMount = () => {
        mockApi()
            .then((res) => {
                // response is an array of "question" objects, which contain question, correct answer, solutions, etc.
                const defaultObj = res[0];
                defaultObj.answers.forEach((value: any) => {
                    value.selected = false;
                });

                this.setState({submitButtonClicked: false, 
                    questionArr: res,
                    activeQuestion: res[0],
                    currentQuestionIndex: 0
                 });
            })
            .catch((error) => {
                console.log('Error getting questions', error);
            })

    };

    onSidebarClick = (index: number) => {
        if (index < 0 || index >= this.state.questionArr.length){
            return;
        }
        this.state.activeQuestion.answers.forEach((value: any) => {
            value.selected = false;
        });
        if (this.state.currentQuestionIndex !== index){
            this.setState({
                submitButtonClicked: false,
                activeQuestion: this.state.questionArr[index],                
                currentQuestionIndex: index
            })
        }
    }


    updateSelectedAnswer = (index: number) => {
        if (this.state.submitButtonClicked === false) {
            const newAnswer = this.state.activeQuestion.answers.map((item: any, i: number) => {
                if (i === index) {
                    item.selected = !item.selected;
                    return item;
                } else {
                    item.selected = false;
                    return item;    
                }
            })
            const activeQuestionToSet = Object.assign({}, this.state.activeQuestion);
            activeQuestionToSet.answers = newAnswer;
            this.setState({ activeQuestion: activeQuestionToSet });
        }
    }


    onSubmitButtonClicked = () => {
        this.setState({ submitButtonClicked: true });
    }

    shouldDisableSubmit = () => {
        return this.state.activeQuestion.answers ? this.state.activeQuestion.answers.every((current : any) =>  current.selected === false || current.selected === undefined) : false;        
    }

    onPreviousButtonClick = () => {
        this.onSidebarClick(this.state.currentQuestionIndex - 1)
    }

    onForwardButtonClick = () => {
        this.onSidebarClick(this.state.currentQuestionIndex + 1)
    }

    onViewSolutionsButtonClicked = () => {
        this.setState({
            activeSolution: this.state.activeQuestion.userAnswers[0]            
        })
    }


    render() {
        return (
            <div className="fullscreen">
                <div className="topbar">
                    <div className="top-left-button">                        
                        <a className="top-left-previous">&#8249;</a>
                    </div>
                    <div className="top-middle-bar"/>
                    <div className="top-right-button1"/>
                    <div className="top-right-button2">
                        <img className="avatar" src={process.env.PUBLIC_URL + '/grayuser.png'} alt="logo"></img>
                        <span className="userfullname">Elle Roh</span>
                    </div>
                </div>

                {/* everything under the topBar */}
                <div className="flex-container">

                    {/* Forward and back buttons */}
                    <a className="sidebutton previous" onClick={this.onPreviousButtonClick}>&#8249;</a>
                    <a className="sidebutton next" onClick={this.onForwardButtonClick}>&#8250;</a>

                    <SideBar questionArr={this.state.questionArr} onSidebarClick={this.onSidebarClick} activeQuestion={this.state.activeQuestion} />

                    {/* main square question/answer/solution centered column */}
                    <div id="Training" className="centered-column">
                        <Question question={this.state.activeQuestion.question} />
                        <MultipleChoiceBox answers={this.state.activeQuestion.answers ? this.state.activeQuestion.answers : []}
                            correctLetter={this.state.activeQuestion.correctLetter} updateSelectedAnswer={this.updateSelectedAnswer}
                            submitButtonClicked={this.state.submitButtonClicked}
                        />
                        <form className="flex-buttons-container">
                            <AnswerButton onSubmitButtonClicked={this.onSubmitButtonClicked} doDisable={this.shouldDisableSubmit()} />
                            <ViewSolutionsButton className="flex-buttons-container-right" showSolutions={this.onViewSolutionsButtonClicked} />
                        </form>                        
                        <Solution solution={this.state.activeSolution}/>
                    </div>

                </div>
            </div>
        )
    }
}

