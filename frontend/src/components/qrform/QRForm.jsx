import { useState } from "react";


function QRForm({ onGenerate, isLoading }) {
    const [input, setInput] = useState(window.location.href);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onGenerate(input);
    };
  
    return (
      <div className="form">
        <input
          type="text"
          spellCheck="false"
          placeholder="Enter text or url"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Enter text or url"
        />
        <button type="submit" onClick={handleSubmit} aria-label="Generate QR Code">
          {isLoading ? "Generating QR code..." : "Generate QR Code"}
        </button>
      </div>
    );
  }
  
  export default QRForm