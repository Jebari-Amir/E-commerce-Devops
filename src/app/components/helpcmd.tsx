import React, { useState } from 'react';
import { Grid, Typography, Paper } from '@mui/material';

interface HelpItem {
  question: string;
  answer: string;
}

const helpItems: HelpItem[] = [
  {
    question: "Qu'est-ce qu'une épreuve numérique (BAT) ?",
    answer: "Une épreuve numérique (BAT) est..."
  },
  {
    question: "Qu'est-ce qui est inclus et qu'est-ce qui n'est pas inclus dans la vérification Premium/Deluxe ?",
    answer: "La vérification Premium/Deluxe inclut..."
  },
  // Ajoutez les autres éléments ici
];

const HelpCmd: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Votre commande
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        Vérification et épreuve numérique
      </Typography>
      
      <Grid container spacing={2}>
        {helpItems.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper 
              onClick={() => handleClick(index)}
              style={{ padding: '16px', cursor: 'pointer' }}
            >
              <Typography>{item.question}</Typography>
              {openItem === index && (
                <Typography style={{ marginTop: '8px' }}>
                  {item.answer}
                </Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {/* Ajoutez d'autres sections comme "Avant de commander" ici */}
    </div>
  );
};

export default HelpCmd;