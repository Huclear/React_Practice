import React from 'react';
import TeaCard from './TeaCard';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TeaPage = (props) => {
    return(
        <div>    
            <div className='d-flex align-items-center justify-content-center'>
                <h0 class="my-3" >{props.name} ({props.original_name})</h0>
                <img scr={props.imageUrl} alt='pic'/>
            </div>
            <div className='d-flex align-items-center'>
                <p class="mx-2 mx-3">Description:</p>
                <h3 class="mx-1 my-3 text-wrap"> {props.description}</h3>
            </div>
            <div>
                <p class="my-3 mx-2"> Price: {props.price} </p>
            </div>
        </div>
    )
}

export default TeaPage;