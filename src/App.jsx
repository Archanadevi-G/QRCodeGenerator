import { useState } from "react";
import "./App.css";

const App = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] = useState("");

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console.error("Error in Generating QR Code", error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "QRCode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error in Downloading QR Code", error);
      });
  }
  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please Wait...</p>}
      {img && <img src={img} className="qrcode-image" />}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR Code
        </label>
        <input
          type="text"
          id="dataInput"
          value={qrData}
          placeholder="Enter QR Code data"
          onChange={(e) => setQrData(e.target.value)}
        />
        <label htmlFor="sizeInput" className="input-label">
          Image Size
        </label>
        <input
          type="text"
          value={qrSize}
          id="sizeInput"
          placeholder="Enter Image Size"
          onChange={(e) => setQrSize(e.target.value)}
        />
        <div className="button-wrapper">
          <button
            className="generateBtn"
            disabled={loading}
            onClick={generateQR}
          >
            Generate QR Code
          </button>
          <button className="downloadBtn" onClick={downloadQR}>
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
