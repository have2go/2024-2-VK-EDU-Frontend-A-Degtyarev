import React from "react";
import { Link } from "react-router-dom";
import './NotFound.scss'

export const NotFound = () => {
    return (
        <div className="not-found">
            <h1 className="not-found__title">Страница не найдена</h1>
            <Link className="not-found__link" to={"/"}>
                На главную
            </Link>
        </div>
    );
};
