import Card from 'react-bootstrap/Card';
import React from 'react';
import Button from'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { APP_CONTEXT } from '../App';
import {motion} from "framer-motion"

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
  const onsetSelectedTeaClick = () => {
    const {id, personalID, price:price, name:name, description:description, original_name:original_name, tea_type:tea_type, imageUrl:imageUrl} = props;
    props.setSelectedTea({id, personalID, price, name, description, original_name, tea_type, imageUrl});
  }

  return (
    <motion.div
    class="w-25 p-3 mx-5"
    whileHover={{ scale: [null, 1.1, 1.1] }}
      transition={{ duration: 0.3 }}>
    <Card onClick={onsetSelectedTeaClick}
    style={{ width: '18rem',
    margin: '16px' }}>
      <Card.Body>
        <Card.Title>{props.name} ({props.original_name})</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.tea_type}</Card.Subtitle>
        <Card.Text>
          {props.description}
        </Card.Text>
        <Card.Link variant="primary" href={props.imageUrl}>View tea image</Card.Link>
        <motion.button style={{
          marginLeft: '10px',
        }}
        onClick={onAddToOverlayClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        >
          {
            context.isAdded(props.personalID) ? "Added": "Add to overlay"
          }
        </motion.button>

        <motion.button style={{
          marginLeft: '4px',
          marginTop: '8px',
        }}
        onClick={onAddToFavouritesClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        >
          {
            context.isAddedToFavourites(props.personalID) ? "In Favourites": "Add to favourites"
          }
        </motion.button>
        <Card.Text>
          Price: {Number(props.price)}$
        </Card.Text>
      </Card.Body>
    </Card>
    </motion.div>
  );
}

export default TeaCard