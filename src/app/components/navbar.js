"use client"
import React, { Fragment, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next'; // Import du hook useTranslation
import keys from '../../i18n/keys'; 
import i18n from '../../i18n/init'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function Example() {
  const [open, setOpen] = useState(false)
    const [cartItems, setCartItems] = useState(0);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const { t } = useTranslation(); 

  
    // Fonction pour mettre à jour le nombre d'articles dans le panier
    const updateCartItems = (newCount) => {
      setCartItems(newCount);
    };
  

    const navigation = {
      categories: [
        {
          id: 'women',
          name: 'Tous les produits',
          featured: [
            {
              name: 'New Arrivals',
              href: '#',
              imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
              imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
            },
            {
              name: 'Basic Tees',
              href: '#',
              imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
              imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
            },
          ],
          sections: [
            {
              id: 'clothing',
              name: 'Clothing',
              items: [
                { name: 'Tops', href: '#' },
                { name: 'Dresses', href: '#' },
                { name: 'Pants', href: '#' },
                { name: 'Denim', href: '#' },
                { name: 'Sweaters', href: '#' },
                { name: 'T-Shirts', href: '#' },
                { name: 'Jackets', href: '#' },
                { name: 'Activewear', href: '#' },
                { name: 'Browse All', href: '#' },
              ],
            },
            {
              id: 'accessories',
              name: 'Accessories',
              items: [
                { name: 'Watches', href: '#' },
                { name: 'Wallets', href: '#' },
                { name: 'Bags', href: '#' },
                { name: 'Sunglasses', href: '#' },
                { name: 'Hats', href: '#' },
                { name: 'Belts', href: '#' },
              ],
            },
            {
              id: 'brands',
              name: 'Brands',
              items: [
                { name: 'Full Nelson', href: '#' },
                { name: 'My Way', href: '#' },
                { name: 'Re-Arranged', href: '#' },
                { name: 'Counterfeit', href: '#' },
                { name: 'Significant Other', href: '#' },
              ],
            },
          ],
        },
        {
            id: 'crt',
            name: 'carte de visite',
            featured: [
              {
                name: 'Cartes (PVC)',
                href: 'http://localhost:3000/products/crtvs',
                imageSrc: '//contentful.helloprint.com/wm1n7oady8a5/7eYfGXcZO0aoIR4XB50BFW/cb5148b1f6fea63ddca09e8343b742d4/PVC_BC_PLP.png',
                imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
              },
              {
                name: 'Cartes en bois',
                href: 'http://localhost:3000/products/crtenbois',
                imageSrc: '//contentful.helloprint.com/wm1n7oady8a5/5IeyvlYrkSqZZbKEtQExtg/74c8c4367e5cdc126f8350bb0f387e60/Wood_BC_PLP.png',
                imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
              },
            ],
            sections: [
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                      { name: 'Watches', href: '#' },
                      { name: 'Wallets', href: '#' },
                      { name: 'Bags', href: '#' },
                      { name: 'Sunglasses', href: '#' },
                      { name: 'Hats', href: '#' },
                      { name: 'Belts', href: '#' },
                    ],
                  },],
          },
          {
            id: 'men',
            name: 'flayer',
            featured: [
              {
                name: 'Dépliant 2 plis accordéon - 3 volets',
                href: 'http://localhost:3000/products/flayer2plis3volets',
                imageSrc: '//contentful.helloprint.com/wm1n7oady8a5/3AQADINSdDf7EtCQb3Wz12/66e308099ba380b9087d0ec4a8a9e65a/Folded_Leaflet_Bundle_Item_zigzag_fold.png',
                imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
              },
              
            ],
          sections: [
            {
              id: 'clothing',
              name: 'Clothing',
              items: [
                { name: 'Tops', href: '#' },
                { name: 'Pants', href: '#' },
                { name: 'Sweaters', href: '#' },
                { name: 'T-Shirts', href: '#' },
                { name: 'Jackets', href: '#' },
                { name: 'Activewear', href: '#' },
                { name: 'Browse All', href: '#' },
              ],
            },
            {
              id: 'accessories',
              name: 'Accessories',
              items: [
                { name: 'Watches', href: '#' },
                { name: 'Wallets', href: '#' },
                { name: 'Bags', href: '#' },
                { name: 'Sunglasses', href: '#' },
                { name: 'Hats', href: '#' },
                { name: 'Belts', href: '#' },
              ],
            },
            
          ],
        },
      ],
      pages: [
        { name: 'Informations', href: '#' },
        { name: 'Aide', href: '#' },
      ],
    }

    const changeLanguage = (lang) => {
      i18n.changeLanguage(lang);
  };

  return (
    <div class="navbar">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a href="/login" className="-m-2 block p-2 font-medium text-gray-900">
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Create account
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-12">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

             

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <a href={item.href} className="hover:text-gray-800">
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

             
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
