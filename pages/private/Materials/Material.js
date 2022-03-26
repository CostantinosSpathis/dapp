import React from 'react'

function Material({ material }) {
  return (
    <div>
<p class="textcolor">Nome: {material.name}<br />colore: {material.color} <br />tipo di materiale: {material.mType}<br /> Quantità: {material.quantityKG}<br /> quantityM: {material.quantityM}<br /> printTemp: {material.printTemperature}<br /> bedTemp: {material.bedTemperature} </p>
    </div>
  )
}

export default Material