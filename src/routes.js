import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import ListOfUsers from './pages/listofusers'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={ListOfUsers} />
        </BrowserRouter>
    );
}
