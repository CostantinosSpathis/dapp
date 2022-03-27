import React from 'react'

const Printer = ({ printer }) => {
  return (
    <div className='container_printers'>
        <p><h3>PRINTER</h3><br />Nome: <br />{printer.name}<br />Address : {printer.printerAddress}<br /> Materiali supportati: {printer.supportedMaterial}<br />nozzles : {printer.nozzles}<br />nozzlesMounted : {printer.mountedNozzles}<br />printTemperature : {printer.maxPrintTemperature}<br />maxBedTemperature: {printer.maxBedTemperature}<br />nozzles : {printer.nozzles}<br />Soluble :{printer.soluble}<br />Supported Material: {printer.supportedMaterial}<br />Volume : {printer.volume}</p>
    </div>
  )
}

export default Printer