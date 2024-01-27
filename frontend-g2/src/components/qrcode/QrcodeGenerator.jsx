import React, { useState, useEffect } from "react";

import "./qr.css";

import QRForm from "../qrform/QRForm";

import QRCodeDisplay from "../qrform/QRCodedisplay";


function QRCodeGenerator() {

  const [qrSrc, setQrSrc] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  const [error, setError] = useState(null);


  const generateQRCode = (input) => {

    setIsLoading(true);

    setError(null);

    let img = new Image();

    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${input}`;

    img.onload = () => {

      setQrSrc(img.src);

      setIsLoaded(true);

      setIsLoading(false);

    };

    img.onerror = () => {

      setError('Failed to generate QR code. Please try again.');

      setIsLoading(false);

    };

  };

  return (

    <div className={`qrwrapper ${isLoaded ? 'active' : ''}`}>

      <header>

        <h1>QR Code Generator</h1>

        <p>Paste a url or enter text to create QR code</p>

      </header>

      <QRForm onGenerate={generateQRCode} isLoading={isLoading}/>

       <QRCodeDisplay qrSrc={qrSrc} />

      {error && <p>{error}</p>}

    </div>

  );
  
}

export default QRCodeGenerator;
