import React from "react";
import "../qrcode/qr.css"
function QRCodeDisplay({ qrSrc }) {
    return qrSrc ? (
      <div className="qr-code">
        <img src={qrSrc} alt="qr-code" />
        {qrSrc && <span>Long hold on the image to get dowload option </span>}
      </div>
    ) : null;
  }

  export default QRCodeDisplay;