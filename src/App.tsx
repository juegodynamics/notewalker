import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainView from './view/MainView';
import DetailView from './view/DetailView';
import {Note} from 'types';
import {mockNotes} from 'data/notes';

const App: React.FC = () => {
    const notes: Note[] = mockNotes;

    return (
        <Router>
            <Routes>
                <Route
                    path="/notewalker"
                    element={<MainView notes={notes} />}
                />
                <Route
                    path="/notewalker/note/:id"
                    element={<DetailView notes={notes} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
