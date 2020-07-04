import React from 'react';
import './SideBar.css'

interface ISideBarProps {
    questionArr: any[],
    activeQuestion: any;
    onSidebarClick: any
}
export default function SideBar(props: ISideBarProps){
    if (props == null || props.questionArr == null) {
        return <div className="sidebar">Loading!!</div>
    }
    return (
        <div  className="sidebar">
            {props.questionArr.map((item: any, index: number) => {
                return (
                    <div key={item.title} className={item.title === props.activeQuestion.title ? "sidebar-selected-li" : "sidebar-li"}
                    onClick={() => {props.onSidebarClick(index)}}>
                        {item.title}
                    </div>
                    )
            })}
        </div>
    );
}