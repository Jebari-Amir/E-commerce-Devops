import React, { useState } from 'react';
import { Grid, Typography, Paper } from '@mui/material';

interface HelpItem {
  question: string;
  answer: string;
}

const helpItems: HelpItem[] = [
  {
    question: "Quelles sont les options de paiement disponibles ?",
    answer: "Nous acceptons les cartes de crédit, PayPal, et les virements bancaires..."
  },
  {
    question: "Quand serai-je facturé pour ma commande ?",
    answer: "Le paiement est généralement prélevé au moment de la validation de la commande..."
  },
  {
    question: "Comment obtenir une facture pour ma commande ?",
    answer: "Une facture électronique est automatiquement envoyée à l'adresse e-mail associée à votre compte..."
  },
  {
    question: "Puis-je modifier les informations de facturation après avoir passé ma commande ?",
    answer: "Les modifications des informations de facturation après la commande sont possibles dans certains cas..."
  },
  // Ajoutez d'autres questions pertinentes sur le paiement et la facturation
];

const HelpPaiement: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Paiement et facture
      </Typography>
      
      <Grid container spacing={2}>
        {helpItems.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Paper 
              onClick={() => handleClick(index)}
              style={{ padding: '16px', cursor: 'pointer', marginBottom: '10px' }}
            >
              <Typography variant="subtitle1">{item.question}</Typography>
              {openItem === index && (
                <Typography style={{ marginTop: '8px' }}>
                  {item.answer}
                </Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HelpPaiement;