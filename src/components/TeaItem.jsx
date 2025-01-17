import React from 'react';
import TeaCard from './TeaCard';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {motion} from "framer-motion";
import { useNavigate } from 'react-router-dom';

const TeaItem = (props) => {

  const navigate = useNavigate();

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
  
  const onSetSelected = (obj) => {
    try {
        props.setSelectedTea(obj);
        navigate("/Tea")
    }
    catch (err) {
      alert(err);
    }
  }

  const onSearch = (searchString) => {
    props.setSearch(searchString.target.value)
  }
  const onCategoryChanged = (newCategory) => {
    props.setCategory(newCategory.target.value);
  }
  const onTeaTypeChanged = (newTeaType) => {
    props.setTeaType(newTeaType.target.value);
  }


  return (
    <motion.div
    initial = {{x: -100, y: -100}}
    animate={{ x: 25, y: 0 }}
    transition={{ ease: "easeOut", duration: 1.5 }}>
      <div>
        <label htmlFor="tea_type_cat">Select the tea type</label>
        <motion.select
        class="form-select mx-3 my-4"
        id="tea_type_cat" 
        aria-label="Select the tea_type" 
        onChange={onTeaTypeChanged}
        >
          <motion.option option value="all">All</motion.option>
          <motion.option className="bg-transparent" value="Oolong">Oolong</motion.option>
          <motion.option className="bg-transparent" value="white tea">White tea</motion.option>
          <motion.option className="bg-transparent" value="black tea">Black tea</motion.option>
          <motion.option className="bg-transparent" value="green tea">Green tea</motion.option>
        </motion.select>
      <select class="form-select mx-3" aria-label="Select the searching category" onChange={onCategoryChanged}>
  <option value="all">All</option>
  <option value="name">Tea name</option>
  <option value="description">Tea Description</option>
</select>
        <input type="text mx-5" placeholder="Search" onChange={onSearch}/>
      </div>
      {
        props.items.filter((tea) => 
        props.category == 'all' || 
        ( props.category === "name" && (tea.name.toLowerCase().includes(props.search.toLowerCase()) || tea.original_name.toLowerCase().includes(props.search.toLowerCase()))) ||
        props.category === "description" && tea.description.toLowerCase().includes(props.search.toLowerCase()))
        .filter((tea) => props.tea_type === 'all' || tea.tea_type === props.tea_type)
        .map(obj => {
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
            setSelectedTea={onSetSelected}
            />
          )
        })
      }
    </motion.div>
  )
}
export default TeaItem