import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import TeaItem from './components/TeaItem';
import {Route, Routes} from 'react-router-dom';
import TeaOverlay from './components/Overlay';
import TeaHeader from './components/NavBars';
import TeaFavourites from './components/Favourites';
import TeaPage from './components/TeaPage';

export const APP_CONTEXT = React.createContext({});

function App() {
  const [teas, setTeas] = useState([])
  const [overlayItems, setOverlayItems] = useState([])
  const [favouriteItems, setFavouriteItems] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [tea_type, setTea_type] = useState('all')
  const [selectedTea, setSelectedTea] = useState("")

  useEffect (()=>{
    async function axiosData(){
      const teasData = await axios.get('http://localhost:3001/teas')
      const overlays = await axios.get('http://localhost:3001/overlays')
      const favouritesData = await axios.get('http://localhost:3001/favourites')

      setTeas(teasData.data)  
      setOverlayItems(overlays.data)
      setFavouriteItems(favouritesData.data)
    }
    axiosData();
  }, [])

  const isAdded = (personalID) => {
    return overlayItems.some(item => item.personalID === personalID)
  }
  const isAddedToFavourites = (personalID) => {
    return favouriteItems.some(item => item.personalID === personalID)
  }

  const deleteTeaFromOverlay = (id) => {
    axios.delete(`http://localhost:3001/overlays/${id}`)
    setOverlayItems(overlayItems.filter(item => item.id!== id))
  }
  const deleteTeaFromFavourites = (id) => {
    axios.delete(`http://localhost:3001/favourites/${id}`)
    setFavouriteItems(favouriteItems.filter(item => item.id!== id))
  }

  const totalPrice = overlayItems.reduce((total, item) =>
    total + parseFloat(item.price), 0)

  return (

    <APP_CONTEXT.Provider value={{
      teas,
      setTeas,
      overlayItems,
      setOverlayItems,
      favouriteItems,
      setFavouriteItems,
      isAdded,
      isAddedToFavourites,
    }}>
      <div>
        <TeaHeader/>
        <Routes>
          <Route path="/" element={<div>
            <h1>Home page</h1>
          </div>} />
          <Route path="/teas" element={
            <TeaItem 
            items={teas}
            overlayItems={overlayItems}
            setOverlayItems={setOverlayItems}
            favouriteItems={favouriteItems}
            setFavouriteItems={setFavouriteItems}
            setSearch={setSearch}
            search={search}
            setCategory={setCategory}
            category={category}
            tea_type={tea_type}
            setTeaType={setTea_type}
            selectedTea={selectedTea}
            setSelectedTea={setSelectedTea} />
          } />

          <Route path="/overlay" element={
            <TeaOverlay
            totalPrice={totalPrice}
             overlayItems={overlayItems}
            deleteTea={deleteTeaFromOverlay} />
          } />

          <Route path="/favourites" element={
            <TeaFavourites 
            favouriteItems={favouriteItems}
            deleteTea={deleteTeaFromFavourites}/>
          }/>

          <Route path="*" element={
            <TeaPage
            name={selectedTea.name}
            personalID={selectedTea.personalID}
            original_name={selectedTea.original_name}
            tea_type={selectedTea.tea_type}
            imageUrl={selectedTea.imageUrl}
            description={selectedTea.description}
            price={selectedTea.price}/>
          } />
        </Routes>
      </div>
    </APP_CONTEXT.Provider>
  );
}

export default App;
