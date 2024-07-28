import React, { useState } from 'react';
import { Grid, Typography, Paper } from '@mui/material';

interface HelpItem {
  question: string;
  answer: string;
}

const helpItems: HelpItem[] = [
  {
    question: "Quels sont les délais de livraison ?",
    answer: "Les délais de livraison varient selon le produit et la destination. En général, comptez 3 à 5 jours ouvrables..."
  },
  {
    question: "Puis-je suivre ma commande ?",
    answer: "Oui, vous recevrez un numéro de suivi par email dès que votre commande sera expédiée..."
  },
  {
    question: "Livrez-vous à l'international ?",
    answer: "Oui, nous livrons dans de nombreux pays. Les frais et délais peuvent varier selon la destination..."
  },
  // Ajoutez d'autres questions pertinentes sur la livraison
];

const HelpLiv: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Livraison
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

export default HelpLiv;