import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PersonDetails, PersonList } from "../sw-components";
import Row from "../row";

const PeoplePage = () => {
    const navigate = useNavigate(); // Используем для переходов
    const { id } = useParams();    // Извлекаем id из URL

    return (
        <Row
            left={<PersonList onItemSelected={(id) => navigate(`/people/${id}`)} />}
            right={<PersonDetails itemId={id} />}
        />
    );
};

export default PeoplePage;
