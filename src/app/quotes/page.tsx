"use client"
import React, { useState } from 'react';

const QuotePage = () => {
  const [formData, setFormData] = useState({
    variantKey: '',
    quantity: 1,
    serviceLevel: 'standard'
  });
  
  const [quoteData, setQuoteData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/helloprint/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: [formData] })
      });
      const data = await response.json();
      if (response.ok) {
        setQuoteData(data.data);
      } else {
        throw new Error(data.error || 'Failed to create quote');
      }
    } catch (error:any) {
      console.error('Error submitting quote:', error);
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Create a Quote</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Variant Key:
            <input
              type="text"
              name="variantKey"
              value={formData.variantKey}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>Quantity:
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>Service Level:
            <select
              name="serviceLevel"
              value={formData.serviceLevel}
              onChange={handleInputChange}
              required
            >
              <option value="standard">Standard</option>
              <option value="express">Express</option>
              <option value="saver">Saver</option>
            </select>
          </label>
        </div>
        <button type="submit">Submit Quote</button>
        {error && <p>{error}</p>}
      </form>
      {quoteData && (
        <div style={{ background: 'white', padding: '20px', marginTop: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2>Résumé</h2>
          <p>Total produits HT: {quoteData.costSummary.items.centAmountTotal / 100} €</p>
          <p>Frais de port: {(quoteData.costSummary.shipping.centAmountTotal / 100).toFixed(2)} €</p>
          <p>Total HT: {(quoteData.costSummary.items.centAmountTotal / 100) + (quoteData.costSummary.shipping.centAmountTotal / 100)} €</p>
          <p>TVA: {((quoteData.costSummary.items.centAmountTotalInclTax - quoteData.costSummary.items.centAmountTotal) / 100).toFixed(2)} €</p>
          <p>Total: {quoteData.costSummary.items.centAmountTotalInclTax / 100} €</p>
          <button style={{ padding: '10px 20px', background: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Continuer</button>
        </div>
      )}
    </div>
  );
};

export default QuotePage;
