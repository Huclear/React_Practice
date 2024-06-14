import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from'react-bootstrap/Button';

const TeaFavourites = (props) => {
  return (
    <div>

        <div>
            <h1 style={{alignContent: 'center', width: '100%'}}>
                Favourites
            </h1>
        </div>
        {
        (props.favouriteItems.length > 0) ? (
            <div>
                <h4 style={{alignContent: 'center'}}>
                {props.favouriteItems.length} Stored
                </h4>
                {props.favouriteItems.map((obj) => {
                    return (
                    <Card style={{ width: '18rem',
                    margin: '16px' }}>
                      <Card.Body>
                        <Card.Title>{obj.name} ({obj.original_name})</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{obj.tea_type}</Card.Subtitle>
                        <Card.Text>
                          {obj.description}
                        </Card.Text>
                        <Card.Link variant="primary" href={obj.imageUrl}>View tea image</Card.Link>
                        <Button style={{
                          marginLeft: '10px',
                        }}
                        onClick={() => {
                            props.deleteTea(obj.id)
                        }}
                        >
                            Remove from Favourites
                        </Button>
                      </Card.Body>
                    </Card>)
                })}
            </div>
        ): (
            <div>
                <h2 style={{
                    margin: '16px',
                }}>No items in overlay</h2>
            </div>
        )
        }
    </div>
  );
}

export default TeaFavourites