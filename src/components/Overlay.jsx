import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from'react-bootstrap/Button';

const TeaOverlay = (props) => {
  return (
    <div>

        <div>
            <h1 style={{alignContent: 'center'}}>
                Overlay
            </h1>
        </div>

        {
        (props.overlayItems.length > 0) ? (
            <div>
                <h4 style={{alignContent: 'center'}}>
                {props.overlayItems.length} Stored
                </h4>
                {props.overlayItems.map((obj) => {
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
                            Remove from overlay
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

        <div>
            <p>Total price: {props.totalPrice}$</p>
        </div>
    </div>
  );
}

export default TeaOverlay