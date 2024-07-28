import React, { useEffect, useRef, useState } from 'react';

const CustomProduct = ({ imageSrc }) => {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && imageSrc) {
            import('fabric').then(({ fabric }) => {
                let initCanvas = new fabric.Canvas(canvasRef.current, {
                    selection: false  // Désactive la sélection globale pour que le t-shirt reste fixe
                });
                setCanvas(initCanvas);  // Sauvegarde de l'instance canvas dans l'état

                return () => initCanvas.dispose();  // Nettoyer le canvas lors du démontage du composant
            });
        }
    }, []);

    useEffect(() => {
        if (canvas && imageSrc) {
            canvas.clear();  // Effacer le canvas avant de charger une nouvelle image
            const imgElement = new Image();
            imgElement.crossOrigin = "anonymous";  // Important pour éviter de tacher le canvas
            imgElement.onload = () => {
                const img = new fabric.Image(imgElement, {
                    scaleX: 3,
                    scaleY: 2.5,
                    selectable: false,
                    evented: false,
                });
                canvas.centerObject(img);
                canvas.add(img);
                canvas.renderAll();
            };
            imgElement.src = imageSrc;
        }
    }, [canvas, imageSrc]);
    

    const addText = () => {
        if (canvas) {
            const text = new fabric.IText('Nouveau texte', {
                left: 100,
                top: 100,
                fontFamily: 'Arial',
                fill: '#000000',
                fontSize: 20,
                editable: true
            });
            canvas.add(text);
            canvas.renderAll();
        }
    };

    const uploadImage = (event) => {
        const file = event.target.files[0];
        if (file && canvas) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgElement = new Image();
                imgElement.crossOrigin = "anonymous";  // Ajoutez ceci pour éviter de tacher le canvas
                imgElement.onload = () => {
                    const img = new fabric.Image(imgElement, {
                        angle: 0,
                        padding: 10,
                        cornersize: 10,
                        scaleX: 0.25,
                        scaleY: 0.25,
                    });
                    canvas.centerObject(img);
                    canvas.add(img);
                    canvas.renderAll();
                };
                imgElement.src = e.target.result;  // Ceci est sûr après le réglage de `crossOrigin`
            };
            reader.readAsDataURL(file);
        }
    };

    const saveDesign = () => {
        if (canvas) {
            try {
                const dataURL = canvas.toDataURL({
                    format: 'png',
                    quality: 0.8 // Vous pouvez ajuster la qualité de l'image ici
                });
                console.log("Image URL:", dataURL); // Vous pouvez également afficher l'URL pour déboguer
                // Stocker l'URL de l'image dans localStorage ou envoyer au serveur selon le besoin
                localStorage.setItem('customDesign', dataURL);
            } catch (error) {
                console.error("Error saving canvas data:", error);
            }
        }
    };

    return (
        <div>
            <canvas ref={canvasRef} id="canvas-id" width={800} height={600} />
            <button onClick={addText}>Ajouter Texte</button>
            <input type="file" onChange={uploadImage} accept="image/*" />
            <br/>
            <button onClick={saveDesign}>Enregistrer le design</button>
        </div>
    );
};

export default CustomProduct;
