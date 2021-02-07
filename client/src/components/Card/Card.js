import React from 'react'

export const Card = ({ tokenUri }) => {
  return (
    tokenUri.map((image, index) => {
      return (
        <div className='d-flex justify-content-around' key={index}>
          <div className='col-sm-4'>
            <div className="card shadow my-4">
              <img src={image} className="rounded img-fluid card-img mx-auto d-block" alt="tokenUri" />
            </div>
          </div>
        </div>
      )
    })
  )
}

export default Card;
