import React from "react";
import Card from "../../card/Card";
import "./customerForm.scss";


const CustomerForm = ({
  customer,
  handleInputChange,
  imagePreview,
  handleImageChange,
  saveCustomer,
  showWidget,
  handleRemoveDocuments,
  documentToRemove,
  documents,
  customerEdit
}) => {
  return (
    <div className="add-product displayflex">
      <Card cardClass={"card"}>
        <form onSubmit={saveCustomer}>
          <Card cardClass={"group"}>
            <label>Customer Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt={customer?.name} />
              </div>
            ) : (
              <p>No image set for this customer.</p>
            )}
          </Card>
          <label className="--my">Customer Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={customer?.name || ''}
            onChange={handleInputChange}
          />

          <label>Customer Category:</label>
          <input
            type="text"
            placeholder="Customer Category"
            name="category"
            value={customer?.category || ''}
            onChange={handleInputChange}
          />

          <label>License Type:</label>
          <input
            type="text"
            placeholder="License Type"
            name="license_type"
            value={customer?.license_type || ''}
            onChange={handleInputChange}
          />

          <label>Price:</label>
          <input
            type="text"
            placeholder="Price"
            name="price"
            value={customer?.price || ''}
            onChange={handleInputChange}
          />
          <label>Amount Paid:</label>
          <input
            type="text"
            placeholder="Amount paid"
            name="amount_paid"
            value={customer?.amount_paid || ''}
            onChange={handleInputChange}
          />

          <label>Registeration Date:</label>
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            name="registeration_date"
            value={customer?.registeration_date || ''}
            onChange={handleInputChange}
          />
          <label>Date of completion:</label>
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            name="date_of_completion"
            value={customer?.date_of_completion || ''}
            onChange={handleInputChange}
          />
          <label>License Production Date:</label>
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            name="production_date"
            value={customer?.production_date || ''}
            onChange={handleInputChange}
          />
          <label>License Expiry Date:</label>
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            name="expiry_date"
            value={customer?.expiry_date || ''}
            onChange={handleInputChange}
          />
          
          {
            documents && <Card>
          
            <button type="button" onClick={showWidget} className="--btn" >
              Upload documents
            </button>
            <div className="documents-preview-container">
                {documents.map((image) => (
                    <div key={image?.public_id} className="documents-preview">
                        <img src={image?.url} />
                        {documentToRemove != image?.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveDocuments(image)}></i>}
                    </div>
                ))}
            </div>
        
</Card>
          }
          {
            customerEdit?.documents && customerEdit?.documents.length > 0 && (<Card>

            <div className="documents-preview-container">
                {customerEdit?.documents.map((image) => (
                    <div key={image?.public_id} className="documents-preview">
                        <img src={image?.url} />
                        {documentToRemove != image?.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveDocuments(image)}></i>}
                    </div>
                ))}
            </div>
        
</Card>)
          }
          <label className="--my">Additional Details:</label>
            <textarea
              cols="30"
              rows="10"
              name="details"
              placeholder="Additional details"
              value={customer?.details || ''}
              onChange={handleInputChange}
              style={{width: "100%"}}
            ></textarea>
          
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};



export default CustomerForm;
