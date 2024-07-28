import React, { useState } from 'react';
import { Grid, Typography, Paper } from '@mui/material';

interface HelpItem {
  question: string;
  answer: string;
}

const helpItems: HelpItem[] = [
  {
    question: "Comment puis-je créer un compte ?",
    answer: "Pour créer un compte, cliquez sur 'S'inscrire' en haut de la page et suivez les instructions..."
  },
  {
    question: "Comment puis-je contacter le service client ?",
    answer: "Vous pouvez nous contacter par email à support@example.com ou par téléphone au 01 23 45 67 89..."
  },
  {
    question: "Quelle est votre politique de retour ?",
    answer: "Nous acceptons les retours dans les 30 jours suivant la réception pour la plupart des produits..."
  },
  // Ajoutez d'autres questions générales pertinentes
];

const HelpGeneral: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Informations générales
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

export default HelpGeneral;