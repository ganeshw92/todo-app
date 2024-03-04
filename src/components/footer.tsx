import React from "react";
import { Link } from "react-router-dom";

interface footerProps {
    clearTodos: () => void,
    itemsLeft:number
}

const Footer = ({clearTodos, itemsLeft}: footerProps) => {
    const remainingItems = itemsLeft > 1 ? `${itemsLeft} Items left` : `${itemsLeft} Item left`;

    return (
        <div className="todo-footer flx just-space-bet">
            <div className="footer-btn count"><strong>{remainingItems}</strong></div>
            <div className="flx">
                <div className="footer-btn"><Link to="/">All</Link></div>
                <div className="footer-btn"><Link to="/active">Active</Link></div>
                <div className="footer-btn"><Link to="/completed">Completed</Link></div>
            </div>
            <div className="footer-btn btn-clr">
                <button className="btn" name="clear" onClick={clearTodos}>Clear Completed</button>
            </div>
        </div>
    )
}

export default Footer