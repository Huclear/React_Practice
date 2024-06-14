import React from 'react';
import TeaCard from './TeaCard';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TeaItem = (props) => {

  const onAddOverlay = (obj) => {
    try {
      if(props.overlayItems.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`http://localhost:3001/overlays/${obj.id}`,);
        props.setOverlayItems(props.overlayItems.filter(item => Number(item.id)!== Number(obj.id)));
    }
    else{
      axios.post('http://localhost:3001/overlays', obj);
      props.setOverlayItems([...props.overlayItems, obj]);
    }
  }
    catch (err) {
      alert(err)
    }
  }
  
  const onAddFavourite = (obj) => {
    try {
      if(props.favouriteItems.find(item => item.personalID === obj.personalID)) {
        alert('Already added to favourites');
      }
      else{
        axios.post('http://localhost:3001/favourites', obj);
        props.setFavouriteItems([...props.favouriteItems, obj]);
      }
    }
    catch (err) {
      alert(err);
    }
  }


  return (
    <div>
      {
        props.items.map(obj => {
          return (
            <TeaCard 
            name={obj.name}
            personalID={obj.personalID}
            original_name={obj.original_name}
            tea_type={obj.tea_type}
            imageUrl={obj.imageUrl}
            description={obj.description}
            price={obj.price}
            onAdd={(obj) => onAddOverlay(obj)}
            onAddToFavourites={(obj) => onAddFavourite(obj)}
            />
          )
        })
      }
    </div>
  )
}
export default TeaItem