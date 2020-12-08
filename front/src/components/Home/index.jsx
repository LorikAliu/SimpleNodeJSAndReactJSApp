import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../Header/";

function Home() {
    const { user: currentUser, isLoggedIn } = useSelector((state) => state.auth);

    if (!isLoggedIn) {
        return <Redirect to={"/login"} />;
    }

    return (
        <>
            <Header />
            <div>
                Home
            </div>
        </>
    )
}

export default Home;