"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Stronavigation from "../../components/storenavigation";
import "./style.css";

const detailprod = [
  {
    id: 1,
    detprod: "mrawel",
    name: "Earthen Bottle",
    price: "$48",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    colors: [
      { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
      { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
      { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "B", inStock: false },
    ],
  },
  {
    id: 2,
    detprod: "mrawelnos",
    name: "Nomad Tumbler",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    colors: [
      { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
      { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
      { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    sizes: [
      { name: "S", inStock: false },
      { name: "M", inStock: true },
      { name: "B", inStock: false },
    ],
  },
  {
    id: 3,
    detprod: "sabat",
    name: "Focus Paper Refill",
    price: "$89",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    colors: [
      { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
      { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
      { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: false },
      { name: "B", inStock: false },
    ],
  },
  {
    id: 4,
    detprod: "chapeau",
    name: "Machined Mechanical Pencil",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    colors: [
      { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
      { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
      { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: false },
      { name: "B", inStock: false },
    ],
  },
  {
    id: "5",
    detprod: "crtvs",
    name: "Cartes de visite en plastique blanc (PVC)",
    materiaux: [
      {
        type: "PVC blanc brillant",
        quantiteprix: [
          {
            quantite: 25,
            prix: 107,
            qt: [
              {
                datelivraison: "Lundi 8 avril",
              },
            ],
          },
          {
            quantite: 100,
            prix: 120,
            qt: [
              {
                datelivraison: "mercredi 10 avril",
              },
              {
                datelivraison: "Lundi 8 avril",
              },
            ],
          },
        ],
        imageSrcAvif:
          "//contentful.helloprint.com/wm1n7oady8a5/2PKFF9e48uanXm2vgGAQ7T/055124d72af4f2fdbfb2dbd8cc11269d/plastic_cards_white_gloss.png?q=75&h=45&w=45&fm=avif",
        imageSrcWebp:
          "//contentful.helloprint.com/wm1n7oady8a5/2PKFF9e48uanXm2vgGAQ7T/055124d72af4f2fdbfb2dbd8cc11269d/plastic_cards_white_gloss.png?q=75&h=45&w=45&fm=webp",
        imageSrcJpg:
          "//contentful.helloprint.com/wm1n7oady8a5/2PKFF9e48uanXm2vgGAQ7T/055124d72af4f2fdbfb2dbd8cc11269d/plastic_cards_white_gloss.png?q=75&h=90&w=90&fm=jpg",
        imageAlt: "Description de l image PVC blanc brillant",
      },
      {
        type: "PVC blanc mat",
        quantiteprix: [
          {
            quantite: 25,
            prix: 107,
            qt: [
              {
                datelivraison: "Lundi 18  aout",
              },
            ],
          },
        ],
        imageSrcAvif:
          "//contentful.helloprint.com/wm1n7oady8a5/6OnI9SsYFEdNiJcVs6XvbN/246af88bbb05f2af42120b292aa7f1ac/plastic_cards_white_matte.png?q=75&h=45&w=45&fm=avif",
        imageSrcWebp:
          "//contentful.helloprint.com/wm1n7oady8a5/6OnI9SsYFEdNiJcVs6XvbN/246af88bbb05f2af42120b292aa7f1ac/plastic_cards_white_matte.png?q=75&h=45&w=45&fm=webp",
        imageSrcJpg:
          "//contentful.helloprint.com/wm1n7oady8a5/6OnI9SsYFEdNiJcVs6XvbN/246af88bbb05f2af42120b292aa7f1ac/plastic_cards_white_matte.png?q=75&h=90&w=90&fm=jpg",
        imageAlt: "Description de l image PVC blanc mat",
      },
    ],
    price: "$45",
    description:
      "Les cartes de visite en plastique blanc PVC sont bien plus durables que les cartes qui utilisent un papier normal.",
    Caractéristiques:
      "Matériaux 760μ PVC blanc brillant | 760μ PVC blanc mat Technique d'impression Numérique | Offset",
    imageSrc:
      "//contentful.helloprint.com/wm1n7oady8a5/7eYfGXcZO0aoIR4XB50BFW/cb5148b1f6fea63ddca09e8343b742d4/PVC_BC_PLP.png",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },

  {
    id: "6",
    detprod: "crtenbois",
    name: "Cartes de visite en bois",

    modele: [
      {
        type: "Coins arrondis",

        imageSrcJpg:
          "//contentful.helloprint.com/wm1n7oady8a5/25rMBqgaY4Ywh7HyV3J6H/2c9680e8ee700d1d29f5f6339ee00f3f/BC_rounded_corner.png",
        imageAlt: "Description de l image ",
      },
    ],

    materiaux: [
      {
        type: "Bois 0,76 mm épaisseur",

        quantiteprix: [
          {
            quantite: 25,
            prix: 107,
            qt: [
              {
                datelivraison: "Lundi 8 avril",
              },
            ],
          },
          {
            quantite: 100,
            prix: 120,
            qt: [
              {
                datelivraison: "mercredi 10 avril",
              },
              {
                datelivraison: "Lundi 8 avril",
              },
            ],
          },
        ],

        imageSrcJpg:
          "//contentful.helloprint.com/wm1n7oady8a5/6kWL71ByxH3dVJ0nViJzuk/e43aa6d4c94fd6fc24b9bf445c93fa3b/BC_paper_wood.png",
        imageAlt: "Description de l image ",
      },
    ],

    impression: [
      {
        type: "Recto",
      },
      {
        type: "Recto-verso",
      },
    ],

    price: "$45",
    description:
      "Les cartes de visite en bois sont bien plus durables que les cartes qui utilisent un papier normal.",
    Caractéristiques:
      "Matériaux 760μ PVC blanc brillant | 760μ PVC blanc mat Technique d'impression Numérique | Offset",
    imageSrc:
      "//contentful.helloprint.com/wm1n7oady8a5/5IeyvlYrkSqZZbKEtQExtg/74c8c4367e5cdc126f8350bb0f387e60/Wood_BC_PLP.png",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },

  // produit flayer

  {
    id: "7",
    detprod: "flayer2plis3volets",
    name: "Dépliant 2 plis accordéon - 3 volets",

    forme: [
      {
        type: "Portrait",

        format: [
          {
            type: "A4",

            aspect: [
              {
                type: "Brillant",

                materiau: [
                  {
                    type: "Budget 135 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/41ZQyG0sd2CcBZWG09g7Ha/6023a7c3e5d789bbd14773b8581d0619/Thickness_icon_matt_135_Copy_4.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Medium 170 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium 250 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },
                ],

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/14cSTwERHlAEKWNJ1qDdBS/dca3cb4fa0a5246759b7f1b1eb2bbef6/flyer_gloss_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Mat",

                materiau: [
                  {
                    type: "Budget 135 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/41ZQyG0sd2CcBZWG09g7Ha/6023a7c3e5d789bbd14773b8581d0619/Thickness_icon_matt_135_Copy_4.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Medium 170 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium 250 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium Plus 400 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/6e5BErjeqEka5oXkoK1rXK/a259e65e459a0dc17e0b20ebbee8a6de/thickness_400.png",
                    imageAlt: "Description de l image ",
                  },
                ],

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/3hKUQh0YeXVxm9Oj9fmkiw/fb578417c84b6cfcf36467701794c3ad/flyer_matte_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Ofsset sans bois",

                materiau: [
                  {
                    type: "Budget 135 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/41ZQyG0sd2CcBZWG09g7Ha/6023a7c3e5d789bbd14773b8581d0619/Thickness_icon_matt_135_Copy_4.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Medium 170 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium 250 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium Plus 400 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/6e5BErjeqEka5oXkoK1rXK/a259e65e459a0dc17e0b20ebbee8a6de/thickness_400.png",
                    imageAlt: "Description de l image ",
                  },
                ],

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1deIz0OMzkGLnsBvsI93Gz/c2e30155ffb8788e2a964dd2961b371a/flyer_writeable_mod.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Recyclé",

                materiau: [
                  {
                    type: "Medium 170 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium 250 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },
                ],

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1pRgAkRFxN9eRRqEWdABBN/663c00f429ab01a0797d51b85c335217/flyer_recycled_copy.png",
                imageAlt: "Description de l image ",
              },
            ],

            imageSrcJpg:
              "//contentful.helloprint.com/wm1n7oady8a5/6pAgXMk76ThXqBZohY0ky8/53522c51337f913f2542bd56d1b88f63/size_A4_Copy.png",
            imageAlt: "Description de l image ",
          },

          {
            type: "A5",

            aspect: [
              {
                type: "Brillant",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/14cSTwERHlAEKWNJ1qDdBS/dca3cb4fa0a5246759b7f1b1eb2bbef6/flyer_gloss_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Mat",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/3hKUQh0YeXVxm9Oj9fmkiw/fb578417c84b6cfcf36467701794c3ad/flyer_matte_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Ofsset sans bois",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1deIz0OMzkGLnsBvsI93Gz/c2e30155ffb8788e2a964dd2961b371a/flyer_writeable_mod.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Recyclé",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1pRgAkRFxN9eRRqEWdABBN/663c00f429ab01a0797d51b85c335217/flyer_recycled_copy.png",
                imageAlt: "Description de l image ",
              },
            ],

            imageSrcJpg:
              "//contentful.helloprint.com/wm1n7oady8a5/2AyTKzdLsIEE65Ueox5JIx/6097cb62f82d13679739a442f4bbc28d/size_A5_Copy.png",
            imageAlt: "Description de l image ",
          },

          {
            type: "A6",

            aspect: [
              {
                type: "Brillant",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/14cSTwERHlAEKWNJ1qDdBS/dca3cb4fa0a5246759b7f1b1eb2bbef6/flyer_gloss_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Mat",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/3hKUQh0YeXVxm9Oj9fmkiw/fb578417c84b6cfcf36467701794c3ad/flyer_matte_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Ofsset sans bois",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1deIz0OMzkGLnsBvsI93Gz/c2e30155ffb8788e2a964dd2961b371a/flyer_writeable_mod.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Recyclé",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1pRgAkRFxN9eRRqEWdABBN/663c00f429ab01a0797d51b85c335217/flyer_recycled_copy.png",
                imageAlt: "Description de l image ",
              },
            ],

            imageSrcJpg:
              "//contentful.helloprint.com/wm1n7oady8a5/7f6hd84IzyRZx2jjDussjd/bf6793954d3cf88f0c996aa63d8ba1e5/size_A6_Copy.png",
            imageAlt: "Description de l image ",
          },

          {
            type: "DL | US",

            aspect: [
              {
                type: "Brillant",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/14cSTwERHlAEKWNJ1qDdBS/dca3cb4fa0a5246759b7f1b1eb2bbef6/flyer_gloss_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Mat",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/3hKUQh0YeXVxm9Oj9fmkiw/fb578417c84b6cfcf36467701794c3ad/flyer_matte_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Ofsset sans bois",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1deIz0OMzkGLnsBvsI93Gz/c2e30155ffb8788e2a964dd2961b371a/flyer_writeable_mod.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Recyclé",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1pRgAkRFxN9eRRqEWdABBN/663c00f429ab01a0797d51b85c335217/flyer_recycled_copy.png",
                imageAlt: "Description de l image ",
              },
            ],

            imageSrcJpg:
              "//contentful.helloprint.com/wm1n7oady8a5/1Ikdm2EyN1R9rdvT1WXdxL/9bb7a965707f6cf4ec4b0b4fcf4f6ec8/size_DL_Copy_2.png",
            imageAlt: "Description de l image ",
          },

          {
            type: "1/3 A3",

            aspect: [
              {
                type: "Brillant",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/14cSTwERHlAEKWNJ1qDdBS/dca3cb4fa0a5246759b7f1b1eb2bbef6/flyer_gloss_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Mat",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/3hKUQh0YeXVxm9Oj9fmkiw/fb578417c84b6cfcf36467701794c3ad/flyer_matte_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Ofsset sans bois",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1deIz0OMzkGLnsBvsI93Gz/c2e30155ffb8788e2a964dd2961b371a/flyer_writeable_mod.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Recyclé",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1pRgAkRFxN9eRRqEWdABBN/663c00f429ab01a0797d51b85c335217/flyer_recycled_copy.png",
                imageAlt: "Description de l image ",
              },
            ],

            imageSrcJpg:
              "//contentful.helloprint.com/wm1n7oady8a5/6dUb2WAMLU2jJYeUq3Ru84/f8028fd174f099cb38eab3adba30e8c6/size_297x140.png",
            imageAlt: "Description de l image ",
          },
        ],

        imageSrcJpg:
          "//contentful.helloprint.com/wm1n7oady8a5/3S4eaDIYNHyOET7XZqhROZ/9c7afa90b440406b05081a26de0a266d/Portrait.png",
        imageAlt: "Description de l image ",
      },

      //forme pysage

      {
        type: "Paysage",

        format: [
          {
            type: "A4",

            aspect: [
              {
                type: "Brillant",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/14cSTwERHlAEKWNJ1qDdBS/dca3cb4fa0a5246759b7f1b1eb2bbef6/flyer_gloss_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Mat",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/3hKUQh0YeXVxm9Oj9fmkiw/fb578417c84b6cfcf36467701794c3ad/flyer_matte_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Ofsset sans bois",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1deIz0OMzkGLnsBvsI93Gz/c2e30155ffb8788e2a964dd2961b371a/flyer_writeable_mod.png",
                imageAlt: "Description de l image ",
              },
            ],

            imageSrcJpg:
              "//contentful.helloprint.com/wm1n7oady8a5/6pAgXMk76ThXqBZohY0ky8/53522c51337f913f2542bd56d1b88f63/size_A4_Copy.png",
            imageAlt: "Description de l image ",
          },

          {
            type: "A5",

            aspect: [
              {
                type: "Brillant",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/14cSTwERHlAEKWNJ1qDdBS/dca3cb4fa0a5246759b7f1b1eb2bbef6/flyer_gloss_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Mat",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/3hKUQh0YeXVxm9Oj9fmkiw/fb578417c84b6cfcf36467701794c3ad/flyer_matte_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Ofsset sans bois",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1deIz0OMzkGLnsBvsI93Gz/c2e30155ffb8788e2a964dd2961b371a/flyer_writeable_mod.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Recyclé",

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1pRgAkRFxN9eRRqEWdABBN/663c00f429ab01a0797d51b85c335217/flyer_recycled_copy.png",
                imageAlt: "Description de l image ",
              },
            ],

            imageSrcJpg:
              "//contentful.helloprint.com/wm1n7oady8a5/2AyTKzdLsIEE65Ueox5JIx/6097cb62f82d13679739a442f4bbc28d/size_A5_Copy.png",
            imageAlt: "Description de l image ",
          },
        ],

        imageSrcJpg:
          "//contentful.helloprint.com/wm1n7oady8a5/7AW9rC4L5l0ZiyRnDjfDnT/3245dabbb9b17b8d178a72555e72a80c/Landscape.png",
        imageAlt: "Description de l image ",
      },

      //forme carré

      {
        type: "Carre",

        format: [
          {
            type: "Carré grand",

            aspect: [
              {
                type: "Brillant",

                materiau: [
                  {
                    type: "Budget 135 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/41ZQyG0sd2CcBZWG09g7Ha/6023a7c3e5d789bbd14773b8581d0619/Thickness_icon_matt_135_Copy_4.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Medium 170 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium 250 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },
                ],

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/14cSTwERHlAEKWNJ1qDdBS/dca3cb4fa0a5246759b7f1b1eb2bbef6/flyer_gloss_copy.png",
                imageAlt: "Description de l image ",
              },

              {
                type: "Mat",

                materiau: [
                  {
                    type: "Budget 135 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/41ZQyG0sd2CcBZWG09g7Ha/6023a7c3e5d789bbd14773b8581d0619/Thickness_icon_matt_135_Copy_4.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Medium 170 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium 250 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium Plus 400 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/6e5BErjeqEka5oXkoK1rXK/a259e65e459a0dc17e0b20ebbee8a6de/thickness_400.png",
                    imageAlt: "Description de l image ",
                  },
                ],

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/3hKUQh0YeXVxm9Oj9fmkiw/fb578417c84b6cfcf36467701794c3ad/flyer_matte_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Ofsset sans bois",

                materiau: [
                  {
                    type: "Budget 135 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/41ZQyG0sd2CcBZWG09g7Ha/6023a7c3e5d789bbd14773b8581d0619/Thickness_icon_matt_135_Copy_4.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Medium 170 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium 250 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium Plus 400 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/6e5BErjeqEka5oXkoK1rXK/a259e65e459a0dc17e0b20ebbee8a6de/thickness_400.png",
                    imageAlt: "Description de l image ",
                  },
                ],

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1deIz0OMzkGLnsBvsI93Gz/c2e30155ffb8788e2a964dd2961b371a/flyer_writeable_mod.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Recyclé",

                materiau: [
                  {
                    type: "Medium 170 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium Plus 300 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/6e5BErjeqEka5oXkoK1rXK/a259e65e459a0dc17e0b20ebbee8a6de/thickness_400.png",
                    imageAlt: "Description de l image ",
                  },
                ],

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1pRgAkRFxN9eRRqEWdABBN/663c00f429ab01a0797d51b85c335217/flyer_recycled_copy.png",
                imageAlt: "Description de l image ",
              },
            ],

            imageSrcJpg:
              "//contentful.helloprint.com/wm1n7oady8a5/46HqaVBzVNTlLH94heEuLe/30cab2ec59f367f0eb8d87ac39953a87/size_L_210_Copy.png",
            imageAlt: "Description de l image ",
          },

          {
            type: "Carré moyen",

            aspect: [
              {
                type: "Brillant",

                materiau: [
                  {
                    type: "Budget 135 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/41ZQyG0sd2CcBZWG09g7Ha/6023a7c3e5d789bbd14773b8581d0619/Thickness_icon_matt_135_Copy_4.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Medium 170 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium 250 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },
                ],

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/14cSTwERHlAEKWNJ1qDdBS/dca3cb4fa0a5246759b7f1b1eb2bbef6/flyer_gloss_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Mat",

                materiau: [
                  {
                    type: "Budget 135 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/41ZQyG0sd2CcBZWG09g7Ha/6023a7c3e5d789bbd14773b8581d0619/Thickness_icon_matt_135_Copy_4.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Medium 170 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium 250 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium Plus 400 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/6e5BErjeqEka5oXkoK1rXK/a259e65e459a0dc17e0b20ebbee8a6de/thickness_400.png",
                    imageAlt: "Description de l image ",
                  },
                ],

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/3hKUQh0YeXVxm9Oj9fmkiw/fb578417c84b6cfcf36467701794c3ad/flyer_matte_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Ofsset sans bois",

                materiau: [
                  {
                    type: "Budget 135 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/41ZQyG0sd2CcBZWG09g7Ha/6023a7c3e5d789bbd14773b8581d0619/Thickness_icon_matt_135_Copy_4.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Medium 170 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium 250 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium Plus 400 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/6e5BErjeqEka5oXkoK1rXK/a259e65e459a0dc17e0b20ebbee8a6de/thickness_400.png",
                    imageAlt: "Description de l image ",
                  },
                ],

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1deIz0OMzkGLnsBvsI93Gz/c2e30155ffb8788e2a964dd2961b371a/flyer_writeable_mod.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Recyclé",

                materiau: [
                  {
                    type: "Medium 170 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium Plus 300 g",

                    quantiteprix: [
                      {
                        quantite: 25,
                        prix: 107,
                        qt: [
                          {
                            datelivraison: "Lundi 18  aout",
                          },
                        ],
                      },
                    ],

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/6e5BErjeqEka5oXkoK1rXK/a259e65e459a0dc17e0b20ebbee8a6de/thickness_400.png",
                    imageAlt: "Description de l image ",
                  },
                ],

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1pRgAkRFxN9eRRqEWdABBN/663c00f429ab01a0797d51b85c335217/flyer_recycled_copy.png",
                imageAlt: "Description de l image ",
              },
            ],

            imageSrcJpg:
              "//contentful.helloprint.com/wm1n7oady8a5/4J4BZFdshIUanruuLvfWnl/0f159dbe1cd2ec8a85ac0a54a776d25d/size_M_148_Copy.png",
            imageAlt: "Description de l image ",
          },

          {
            type: "Carré petit",

            aspect: [
              {
                type: "Brillant",

                materiau: [
                  {
                    type: "Budget 135 g",

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/41ZQyG0sd2CcBZWG09g7Ha/6023a7c3e5d789bbd14773b8581d0619/Thickness_icon_matt_135_Copy_4.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Medium 170 g",

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium 250 g",

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },
                ],

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/14cSTwERHlAEKWNJ1qDdBS/dca3cb4fa0a5246759b7f1b1eb2bbef6/flyer_gloss_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Mat",

                materiau: [
                  {
                    type: "Budget 135 g",

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/41ZQyG0sd2CcBZWG09g7Ha/6023a7c3e5d789bbd14773b8581d0619/Thickness_icon_matt_135_Copy_4.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Medium 170 g",

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium 250 g",

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium Plus 400 g",

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/6e5BErjeqEka5oXkoK1rXK/a259e65e459a0dc17e0b20ebbee8a6de/thickness_400.png",
                    imageAlt: "Description de l image ",
                  },
                ],

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/3hKUQh0YeXVxm9Oj9fmkiw/fb578417c84b6cfcf36467701794c3ad/flyer_matte_copy.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Ofsset sans bois",

                materiau: [
                  {
                    type: "Budget 135 g",

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/41ZQyG0sd2CcBZWG09g7Ha/6023a7c3e5d789bbd14773b8581d0619/Thickness_icon_matt_135_Copy_4.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Medium 170 g",

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium 250 g",

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium Plus 400 g",

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/6e5BErjeqEka5oXkoK1rXK/a259e65e459a0dc17e0b20ebbee8a6de/thickness_400.png",
                    imageAlt: "Description de l image ",
                  },
                ],

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1deIz0OMzkGLnsBvsI93Gz/c2e30155ffb8788e2a964dd2961b371a/flyer_writeable_mod.png",
                imageAlt: "Description de l image ",
              },
              {
                type: "Recyclé",

                materiau: [
                  {
                    type: "Medium 170 g",

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/3n23p3w6WrtS3UeXISQSXL/3a7f160d51f08c0ab6ecf874e529cce0/Thickness_icon_gloss_170_Copy_2.png",
                    imageAlt: "Description de l image ",
                  },

                  {
                    type: "Premium Plus 300 g",

                    imageSrcJpg:
                      "//contentful.helloprint.com/wm1n7oady8a5/6e5BErjeqEka5oXkoK1rXK/a259e65e459a0dc17e0b20ebbee8a6de/thickness_400.png",
                    imageAlt: "Description de l image ",
                  },
                ],

                imageSrcJpg:
                  "//contentful.helloprint.com/wm1n7oady8a5/1pRgAkRFxN9eRRqEWdABBN/663c00f429ab01a0797d51b85c335217/flyer_recycled_copy.png",
                imageAlt: "Description de l image ",
              },
            ],

            imageSrcJpg:
              "//contentful.helloprint.com/wm1n7oady8a5/NPqC8bE5ELFXcviUo0PAT/9b3c1cb08663c26e76fcede09c938eac/size_S_105_Copy.png",
            imageAlt: "Description de l image ",
          },
        ],

        imageSrcJpg:
          "//contentful.helloprint.com/wm1n7oady8a5/4ibOSeuizjso42zjrwLvck/055dc1ae38d0b11d4525f9b38ade2849/Square.png",
        imageAlt: "Description de l image ",
      },
    ],

    description:
      "Ces supports marketing polyvalents peuvent être utilisés de différentes manières",
    Caractéristiques:
      " Papier couché brillant de 135 à 350 g- Papier couché mat de 90 to 400 g- Papier offset de 90 à 300 g- Papier recyclé de 80 à 300 g",
    imageSrc:
      "//contentful.helloprint.com/wm1n7oady8a5/3AQADINSdDf7EtCQb3Wz12/66e308099ba380b9087d0ec4a8a9e65a/Folded_Leaflet_Bundle_Item_zigzag_fold.png",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
];

export default function DetailsProductsPage({ params, updateCartItems }: any) {
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [selectedRectangleIndex, setSelectedRectangleIndex] = useState(0);
  const [selectedForme, setSelectedForme] = useState<any>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<any>(null);
  const [selectedAspect, setSelectedAspect] = useState<any>(null);
  const [selectedMateriau, setSelectedMateriau] = useState<any>(null);
  const [selectedqt, setSelectedqt] = useState<any>(null);

  const [productVariants, setProductVariants] = useState<any>([]);

  const fetchProductVariants = async () => {
    try {
      const sku = "";
      const includeAvailableQtys = "";
      const res = await axios.get(
        `/api/helloprint/products/stickers/variants?sku=${sku}&includeAvailableQtys=${includeAvailableQtys}`
      );
      setProductVariants(res.data);
    } catch (error) {
      console.log(`Error! ${error}`);
    }
  };

  useEffect(() => {
    fetchProductVariants();
  }, []);

  const handleRectangleSelect = (index: any) => {
    setSelectedRectangleIndex(index);
  };

  const product = detailprod.find((prod) => prod.detprod === params.id);

  if (!product) return <div>Product not found!</div>;

  if (!selectedMaterial && product.materiaux && product.materiaux.length > 0) {
    setSelectedMaterial(product.materiaux[0]);
  }

  if (!selectedForme && product.forme && product.forme.length > 0) {
    setSelectedForme(product.forme[0]);
  }

  const handleFormeSelect = (forme: any) => {
    setSelectedForme(forme);
  };

  const handleMateriauSelect = (materiau: any) => {
    setSelectedMateriau(materiau);
  };

  const handleQtSelect = (materiau: any) => {
    setSelectedqt(materiau.quantiteprix);
  };

  const handleFormatSelect = (format: any) => {
    setSelectedFormat(format);
    // Sélectionner par défaut le premier aspect du format sélectionné
    if (format.aspect && format.aspect.length > 0) {
      setSelectedAspect(format.aspect[0]);
    }
  };

  useEffect(() => {
    if (
      selectedForme &&
      selectedForme.format &&
      selectedForme.format.length > 0
    ) {
      const firstFormat = selectedForme.format[0];
      setSelectedFormat(firstFormat);
      if (firstFormat.aspect && firstFormat.aspect.length > 0) {
        setSelectedAspect(firstFormat.aspect[0]);
      }
    }
  }, [selectedForme]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAddToCart = () => {
    if (typeof updateCartItems === "function") {
      updateCartItems((prevCount: any) => prevCount + 1);
    }
  };

  const handleClick = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="bg-white">
      <Stronavigation />

      <div className="pt-6">
        <div className="mx-auto mt-1 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <div className="w-1/2">
                <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                  <strong>{product.name}</strong>
                </h2>
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-auto object-cover group-hover:opacity-75 border-none"
                  style={{ maxHeight: "500px" }}
                />
              </div>
              <div className="w-1/2">
                {/* Forme */}
                {product.forme && product.forme.length > 0 && (
                  <div className="pl-8">
                    <h3 className="text-lg font-medium text-gray-900">
                      Forme :{" "}
                    </h3>
                    <ul className="mt-2 space-x-4 flex flex-wrap">
                      {product.forme.map((forme) => (
                        <li key={forme.type}>
                          <button
                            className={`flex flex-col items-center justify-center w-13 h-17 text-sm font-medium text-blue-500 bg-white rounded-md border border-gray-200 hover:bg-gray-100 focus:outline-none ${
                              selectedForme === forme ? "bg-gray-100" : ""
                            }`}
                            onClick={() => handleFormeSelect(forme)}
                          >
                            <img
                              src={forme.imageSrcJpg}
                              alt={forme.imageAlt}
                              className="w-24 h-24 object-cover group-hover:opacity-75 border-none"
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* forme.Formats */}
                {selectedForme &&
                  selectedForme.format &&
                  selectedForme.format.length > 0 && (
                    <div className="pl-8">
                      <h3 className="text-lg font-medium text-gray-900">
                        Formats :{" "}
                      </h3>
                      <ul className="mt-2 space-x-4 flex flex-wrap">
                        {selectedForme.format.map((format: any) => (
                          <li key={format.type}>
                            <button
                              className="flex flex-col items-center justify-center w-24 h-44 text-sm font-medium text-gray-500 bg-white rounded-md border border-gray-200 hover:bg-gray-100 focus:outline-none px-4 py-2"
                              onClick={() => handleFormatSelect(format)} // Mettre à jour le format sélectionné lors du clic
                            >
                              <img
                                src={format.imageSrcJpg}
                                alt={format.imageAlt}
                                className="w-24 h-24 object-cover group-hover:opacity-75 border-none"
                              />
                              {format.type}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Afficher l'aspect sélectionné */}
                {selectedFormat &&
                  selectedFormat.aspect &&
                  selectedFormat.aspect.length > 0 && (
                    <div className="pl-8">
                      <h3 className="text-lg font-medium text-gray-900">
                        Aspect :{" "}
                      </h3>
                      <ul className="mt-2 space-x-4 flex flex-wrap">
                        {selectedFormat.aspect.map((aspect: any) => (
                          <li key={aspect.type}>
                            <button
                              className="flex flex-col items-center justify-center w-24 h-44 text-sm font-medium text-gray-500 bg-white rounded-md border border-gray-200 hover:bg-gray-100 focus:outline-none px-4 py-2"
                              onClick={() => handleMateriauSelect(aspect)} // Mettre à jour le format sélectionné lors du clic
                            >
                              <img
                                src={aspect.imageSrcJpg}
                                alt={aspect.imageAlt}
                                className="w-24 h-24 object-cover group-hover:opacity-75 border-none"
                              />
                              {aspect.type}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Materiau */}
                {selectedMateriau &&
                  selectedMateriau.materiau &&
                  selectedMateriau.materiau.length > 0 && (
                    <div className="pl-8">
                      <h3 className="text-lg font-medium text-gray-900">
                        materiau :{" "}
                      </h3>
                      <ul className="mt-2 space-x-4 flex flex-wrap">
                        {selectedMateriau.materiau.map((materiau: any) => (
                          <li key={materiau.type}>
                            <button
                              className="flex flex-col items-center justify-center w-24 h-44 text-sm font-medium text-gray-500 bg-white rounded-md border border-gray-200 hover:bg-gray-100 focus:outline-none px-4 py-2"
                              onClick={() => handleQtSelect(materiau)} // Mettre à jour le format sélectionné lors du clic
                            >
                              <img
                                src={materiau.imageSrcJpg}
                                alt={materiau.imageAlt}
                                className="w-24 h-24 object-cover group-hover:opacity-75 border-none"
                              />
                              {materiau.type}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* MODELE */}
                {product.modele && product.modele.length > 0 && (
                  <div className="pl-8">
                    <h3 className="text-lg font-medium text-gray-900">
                      Modèle: <small>Coins arrondis</small>
                    </h3>
                    <ul className="mt-2 space-x-4 flex flex-wrap">
                      {product.modele.map((modele) => (
                        <li key={modele.type}>
                          <button
                            className={`flex flex-col items-center justify-center w-13 h-17 text-sm font-medium text-blue-500 bg-white rounded-md border border-gray-200 hover:bg-gray-100 focus:outline-none ${
                              selectedMaterial === modele ? "bg-gray-100" : ""
                            }`}
                          >
                            <img
                              src={modele.imageSrcJpg}
                              alt={modele.imageAlt}
                              className="w-24 h-24 object-cover group-hover:opacity-75 border-none"
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* MATERIEAUX */}
                {product.materiaux && product.materiaux.length > 0 && (
                  <div className="pl-8">
                    <h3 className="text-lg font-medium text-gray-900">
                      Matériaux :
                    </h3>
                    <ul className="mt-2 space-x-4 flex flex-wrap">
                      {product.materiaux.map((materiau) => (
                        <li key={materiau.type}>
                          <button
                            onClick={() => setSelectedMaterial(materiau)}
                            className={`flex flex-col items-center justify-center w-32 h-52 px-4 py-2 text-sm font-medium text-blue-500 bg-white rounded-md border border-gray-200 hover:bg-gray-100 focus:outline-none ${
                              selectedMaterial === materiau ? "bg-gray-100" : ""
                            }`}
                          >
                            <img
                              src={materiau.imageSrcJpg}
                              alt={materiau.imageAlt}
                              className="w-24 h-24 object-cover group-hover:opacity-75 border-none"
                            />
                            <span className="mt-2">{materiau.type}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Impression */}
                {product.impression && product.impression.length > 0 && (
                  <div className="pl-8">
                    <h3 className="text-lg font-medium text-gray-900">
                      Impression :
                    </h3>
                    <div className="mt-2 flex">
                      {product.impression.map((impression, index) => (
                        <div
                          key={index}
                          className="rectanglee flex justify-between mr-2"
                        >
                          <p className="text-sm font-medium text-gray-500">
                            {impression.type}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* selecet weset select */}
                {selectedMaterial && selectedMaterial.quantiteprix && (
                  <div className="pl-8">
                    <div className="sku-step__title-wrapper mt-2">
                      <h3 className="sku-step__title">
                        Quantité
                        <div className="tooltip-hint tooltip-hint--medium tooltip-hint--blue">
                          <svg
                            className="tooltip-hint__trigger-icon"
                            role="img"
                            width="24"
                            height="18"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 0C5.373 0 0 5.373 0 11.998c0 6.627 5.373 11.998 12 11.998 6.628 0 12-5.371 12-11.998C24 5.372 18.628 0 12 0Zm-.402 4.97c1.11 0 2.008.898 2.008 2.006 0 1.108-.899 2.007-2.008 2.007-1.107 0-2.006-.898-2.006-2.007s.899-2.006 2.006-2.006Zm3.734 14.056H8.668v-.729h1.654c.438 0 .341-1.118.341-1.118v-4.232c.049-2.141-1.848-2.091-1.848-2.091v-.829h4.524v7.151s-.096 1.118.341 1.118h1.653v.729l-.001.001Z" />
                          </svg>
                        </div>
                      </h3>
                    </div>
                    <div className="mt-2 flex">
                      {selectedMaterial.quantiteprix.map(
                        (item: any, index: number) => (
                          <div
                            key={index}
                            className={`rectangle flex justify-between mr-2 ${
                              selectedRectangleIndex === index ? "selected" : ""
                            }`}
                            onClick={() => handleRectangleSelect(index)}
                          >
                            <p className="text-sm font-medium text-gray-500">
                              {item.quantite}
                            </p>
                            <p className="text-sm font-medium text-green-500">
                              {item.prix}£
                            </p>
                          </div>
                        )
                      )}
                    </div>
                    <h3 className="sku-step__title">
                      Date de livraison estimée
                    </h3>
                    {selectedRectangleIndex !== -1 &&
                      selectedMaterial.quantiteprix[selectedRectangleIndex]
                        .qt &&
                      selectedMaterial.quantiteprix[selectedRectangleIndex].qt
                        .length > 0 && (
                        <div className="mt-2 flex">
                          {selectedMaterial.quantiteprix[
                            selectedRectangleIndex
                          ].qt.map((item: any, index: number) => (
                            <div key={index} className="card mr-2">
                              <p className="text-sm font-medium text-gray-500">
                                Date de livraison : {item.datelivraison}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                )}

                {/* qt taa materiau */}
                {selectedqt && (
                  <div className="pl-8">
                    <div className="sku-step__title-wrapper mt-2">
                      <h3 className="sku-step__title">
                        Quantité
                        <div className="tooltip-hint tooltip-hint--medium tooltip-hint--blue">
                          <svg
                            className="tooltip-hint__trigger-icon"
                            role="img"
                            width="24"
                            height="18"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 0C5.373 0 0 5.373 0 11.998c0 6.627 5.373 11.998 12 11.998 6.628 0 12-5.371 12-11.998C24 5.372 18.628 0 12 0Zm-.402 4.97c1.11 0 2.008.898 2.008 2.006 0 1.108-.899 2.007-2.008 2.007-1.107 0-2.006-.898-2.006-2.007s.899-2.006 2.006-2.006Zm3.734 14.056H8.668v-.729h1.654c.438 0 .341-1.118.341-1.118v-4.232c.049-2.141-1.848-2.091-1.848-2.091v-.829h4.524v7.151s-.096 1.118.341 1.118h1.653v.729l-.001.001Z" />
                          </svg>
                        </div>
                      </h3>
                    </div>
                    <div className="mt-2 flex">
                      {selectedqt.map((item: any, index: number) => (
                        <div
                          key={index}
                          className={`rectangle flex justify-between mr-2 ${
                            selectedRectangleIndex === index ? "selected" : ""
                          }`}
                          onClick={() => handleRectangleSelect(index)}
                        >
                          <p className="text-sm font-medium text-gray-500">
                            {item.quantite}
                          </p>
                          <p className="text-sm font-medium text-green-500">
                            {item.prix}£
                          </p>
                        </div>
                      ))}
                    </div>
                    <h3 className="sku-step__title">
                      Date de livraison estimée
                    </h3>
                    {selectedRectangleIndex !== -1 &&
                      selectedqt[selectedRectangleIndex].qt &&
                      selectedqt[selectedRectangleIndex].qt.length > 0 && (
                        <div className="mt-2 flex">
                          {selectedqt[selectedRectangleIndex].qt.map(
                            (item: any, index: number) => (
                              <div key={index} className="card mr-2">
                                <p className="text-sm font-medium text-gray-500">
                                  Date de livraison : {item.datelivraison}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>
                )}

                <button className="text-white bg-green-500 hover:bg-green-600 focus:outline-none rounded-md px-6 py-3 transition-colors mt-4 w-full">
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="pl-8">
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handleLike}
                  className={`text-gray-500 hover:text-gray-700 focus:outline-none rounded-md px-4 py-2 transition-colors ${
                    isLiked ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Like
                </button>
              </div>
            </div>
          </div>

          <div>
            <button className="mt-4" onClick={handleClick}>
              Description
            </button>
            {showDescription && (
              <div>
                <p className="text-base text-gray-900 mt-4">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
