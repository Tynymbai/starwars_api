import React, { Component } from 'react';
import './item-details.css';
import Spinner from '../spinner';

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}:</span>
            <span>{item[field]}</span>
        </li>
    );
};

export { Record };

export default class ItemDetails extends Component {
    state = {
        item: null,
        image: null,
        loading: true,
        error: false,
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        const { itemId, getData, getImageUrl } = this.props;

        // Обновляем данные только если изменились входные параметры
        if (
            itemId !== prevProps.itemId ||
            getData !== prevProps.getData ||
            getImageUrl !== prevProps.getImageUrl
        ) {
            this.setState({ loading: true, error: false }); // Сбрасываем состояние перед обновлением
            this.updateItem();
        }
    }

    updateItem = () => {
        const { itemId, getData, getImageUrl } = this.props;

        if (!itemId) {
            this.setState({ item: null, image: null, loading: false });
            return;
        }

        getData(itemId)
            .then((item) => {
                if (!item) {
                    throw new Error(`Item with ID ${itemId} not found`);
                }
                this.setState({
                    item,
                    image: getImageUrl(item),
                    loading: false,
                });
            })
            .catch((err) => {
                console.error('Error fetching item:', err);
                this.setState({ error: true, loading: false });
            });
    };

    render() {
        const { item, image, loading, error } = this.state;

        // Если ID не указан
        if (!this.props.itemId) {
            return <span>Select an item from a list</span>;
        }

        // Пока загружаются данные
        if (loading) {
            return <Spinner />;
        }

        // Если возникла ошибка
        if (error) {
            return <span>Error loading item details</span>;
        }

        // Если данные успешно загружены
        return (
            <div className="item-details card">
                {item && (
                    <ItemDetailsView
                        item={item}
                        image={image}
                        context={this.props.children}
                    />
                )}
            </div>
        );
    }
}

const ItemDetailsView = ({ item, image, context }) => {
    if (!item) {
        return <p>No details available</p>;
    }

    const { name, type } = item;

    return (
        <>
            <img className="item-image" alt={`~-~${type}~-~`} src={image} />
            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {React.Children.map(context, (child) =>
                        React.cloneElement(child, { item })
                    )}
                </ul>
            </div>
        </>
    );
};
