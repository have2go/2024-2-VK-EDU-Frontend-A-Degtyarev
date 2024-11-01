import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./NotFound.scss";

export const NotFound = () => {
    return (
        <>
        <Helmet>
            <title>404</title>
        </Helmet>
            <div className="not-found">
                <h1 className="not-found__title">Страница не найдена</h1>
                <Link className="not-found__link" to={"/"}>
                    На главную
                </Link>
            </div>
        </>
    );
};
