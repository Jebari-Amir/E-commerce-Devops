import React, { useState } from 'react';
import { Grid, Typography, Paper } from '@mui/material';

interface HelpItem {
  question: string;
  answer: string;
}

const helpItems: HelpItem[] = [
  {
    question: "Quels formats de fichiers acceptez-vous ?",
    answer: "Nous acceptons les formats PDF, AI, EPS, et PSD..."
  },
  {
    question: "Comment puis-je m'assurer que mes fichiers sont prêts pour l'impression ?",
    answer: "Assurez-vous que vos fichiers sont en haute résolution (300 dpi minimum), utilisent le mode CMJN..."
  },
  {
    question: "Proposez-vous des modèles de conception ?",
    answer: "Oui, nous proposons une variété de modèles gratuits pour différents produits..."
  },
  // Ajoutez d'autres questions pertinentes sur le design des fichiers
];

const HelpDesign: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Design des fichiers
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

export default HelpDesign;