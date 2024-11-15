import React from "react";
import { useNavigate } from "react-router-dom";
import { StarshipList } from "../sw-components";
import Row from "../row";
import StarshipIntro from "../starship-intro";

const StarshipsPage = () => {
    const navigate = useNavigate(); // Используем useNavigate вместо history.push

    return (
        <Row
            left={<StarshipList onItemSelected={(itemId) => navigate(`/starships/${itemId}`)} />}
            right={<StarshipIntro />}
        />
    );
};

export default StarshipsPage;
