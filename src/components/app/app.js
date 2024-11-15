import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import { ErrorIndicator, NotFoundIndicator } from "../errors";
import ErrorBoundary from "../error-boundary";

import { SwapiServiceProvider } from '../swapi-service-context';
import SwapiService from "../../services/swapi-service";
import { PeoplePage, PlanetsPage, StarshipsPage, LoginPage, SecretPage, WelcomePage } from "../pages";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StarshipDetails from "../sw-components/starship-details";

export default class App extends Component {
    state = {
        selectedItem: null,
        hasError: false,
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        });
    };

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        const { isLoggedIn, swapiService } = this.state;

        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header />
                            <RandomPlanet />
                            <Routes>
                                {/* Главная страница */}
                                <Route path="/" element={<WelcomePage />} />

                                {/* Люди */}
                                <Route path="/people" element={<PeoplePage />} />
                                <Route path="/people/:id" element={<PeoplePage />} />

                                {/* Планеты */}
                                <Route path="/planets" element={<PlanetsPage />} />
                                <Route path="/planets/:id" element={<PlanetsPage />} />

                                {/* Звездолёты */}
                                <Route path="/starships" element={<StarshipsPage />} />
                                <Route
                                    path="/starships/:id"
                                    element={
                                        <StarshipDetails
                                            itemId={window.location.pathname.split('/').pop()} // Получение ID из URL
                                        />
                                    }
                                />

                                {/* Страницы логина и секрета */}
                                <Route
                                    path="/login"
                                    element={
                                        <LoginPage
                                            isLoggedIn={isLoggedIn}
                                            onLogin={this.onLogin}
                                        />
                                    }
                                />
                                <Route
                                    path="/secret"
                                    element={
                                        <SecretPage isLoggedIn={isLoggedIn} />
                                    }
                                />

                                {/* 404 */}
                                <Route path="*" element={<NotFoundIndicator />} />
                            </Routes>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    }
}
