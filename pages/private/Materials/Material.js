import React from 'react'

function Material({ material }) {
  return (
    <div class="container_printers">
<p>Nome: {material.name}<br />colore: {material.color} <br />tipo di materiale: {material.mType}<br /> Quantità: {material.quantityKG}<br /> quantityM: {material.quantityM}<br /> printTemp: {material.printTemperature}<br /> bedTemp: {material.bedTemperature} </p>
    </div>
  )
}

export default Material