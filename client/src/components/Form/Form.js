import React, { useState } from 'react';

function Form({ contract, account }) {
  const [formData, setFormData] = useState({ addressee: '', urlImage: '' });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }
  
  const sendFormData = (event) => {
    event.preventDefault();
    contract.methods.mint(formData.addressee, formData.urlImage).send({ from: account })
  }

  return (
    <>
      <form onSubmit={sendFormData}>
        <div className='row justify-content-md-center'>
          <div className='col-sm-7'>
            <div class="mb-3">
              <label for="addressInput" class="form-label hashText fs-5">
                Address Wallet
              </label>
              <input
                type="text"
                class="form-control"
                name="addressee"
                placeholder="0x12A..."
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className='row justify-content-md-center'>
          <div className='col-sm-7'>
            <div class="mb-3">
              <label for="uriInput" class="form-label hashText fs-5">
                URI Link
              </label>
              <input
                type="text"
                class="form-control"
                name="urlImage"
                placeholder="https://myImage.com"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className='row justify-content-md-center'>
          <div className='col-sm-5'>
            <div className='d-grid gap-2'>
              <button type="button" class="btn btn-outline-evnd">
                Send NFT
            </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Form;
