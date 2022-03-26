import React from 'react'

const Printer = ({ printer }) => {
  return (
    <div>
        <p>Nome: {printer.name}<br />Address : {printer.printerAddress}<br /> Materiali supportati: {printer.supportedMaterial}<br />nozzles : {printer.nozzles}<br />nozzlesMounted : {printer.mountedNozzles}<br />printTemperature : {printer.maxPrintTemperature}<br />maxBedTemperature: {printer.maxBedTemperature}<br />nozzles : {printer.nozzles}<br />Soluble :{printer.soluble}<br />Supported Material: {printer.supportedMaterial}<br />Volume : {printer.volume}</p>
    </div>
  )
}

export default Printer