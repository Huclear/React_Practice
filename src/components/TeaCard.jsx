import Card from 'react-bootstrap/Card';
import React from 'react';
import Button from'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { APP_CONTEXT } from '../App';

const TeaCard = (props) => {

  const context = React.useContext(APP_CONTEXT); 

  const onAddToOverlayClick = () => {
    const {id, personalID, price:price, name:name, description:description, original_name:original_name, tea_type:tea_type, imageUrl:imageUrl} = props;
    props.onAdd({id, personalID, price, name, description, original_name, tea_type, imageUrl});
  }
  const onAddToFavouritesClick = () => {
    const {id, personalID, price:price, name:name, description:description, original_name:original_name, tea_type:tea_type, imageUrl:imageUrl} = props;
    props.onAddToFavourites({id, personalID, price, name, description, original_name, tea_type, imageUrl});
  }

  return (
    <Card style={{ width: '18rem',
    margin: '16px' }}>
      <Card.Body>
        <Card.Title>{props.name} ({props.original_name})</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.tea_type}</Card.Subtitle>
        <Card.Text>
          {props.description}
        </Card.Text>
        <Card.Link variant="primary" href={props.imageUrl}>View tea image</Card.Link>
        <Button style={{
          marginLeft: '10px',
        }}
        onClick={onAddToOverlayClick}
        >
          {
            context.isAdded(props.personalID) ? "Added": "Add to overlay"
          }
        </Button>
        <Button style={{
          marginLeft: '4px',
          marginTop: '8px',
        }}
        onClick={onAddToFavouritesClick}
        >
          {
            context.isAddedToFavourites(props.personalID) ? "In Favourites": "Add to favourites"
          }
        </Button>
        <Card.Text>
          Price: {Number(props.price)}$
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TeaCard