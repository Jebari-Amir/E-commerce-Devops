"use client";
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next"; // Import du hook useTranslation
import keys from "../../i18n/keys";
import i18n from "../../i18n/init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCart } from "../CartContext/page";
import { faChevronLeft, faChevronRight, faStar, faCheckCircle, faSmile, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../SearchBar/page"; // Ajout du composant SearchBar

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [open, setOpen] = useState(false);
  // const [cartItems, setCartItems] = useState(0);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const router = useRouter();

  const { pannier } = useCart();
  const itemCount = pannier.reduce((total, item) => total + item.quantity, 0);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      localStorage.removeItem("pannier");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const commande = async () => {
    try {
      router.push("/orders");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users/me");
        console.log("User Data:", response.data);
        if (response.data && response.data.data) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Fonction pour mettre à jour le nombre d'articles dans le panier
  const updateCartItems = (newCount) => {
    setCartItems(newCount);
  };

  const navigation = {
    categories: [
      {
        id: "women",
        name: t(keys.Navbar_pd),
        featured: [
          {
            name: "New Arrivals",
            href: "#",
            imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
            imageAlt: "Models sitting back to back, wearing Basic Tee in black and bone.",
          },
          {
            name: "Basic Tees",
            href: "#",
            imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
            imageAlt: "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
          },
        ],
        sections: [
          {
            id: "clothing",
            name: "Clothing",
            items: [
              { name: "Tops", href: "#" },
              { name: "Dresses", href: "#" },
              { name: "Pants", href: "#" },
              { name: "Denim", href: "#" },
              { name: "Sweaters", href: "#" },
              { name: "T-Shirts", href: "#" },
              { name: "Jackets", href: "#" },
              { name: "Activewear", href: "#" },
              { name: "Browse All", href: "#" },
            ],
          },
          {
            id: "accessories",
            name: "Accessories",
            items: [
              { name: "Watches", href: "#" },
              { name: "Wallets", href: "#" },
              { name: "Bags", href: "#" },
              { name: "Sunglasses", href: "#" },
              { name: "Hats", href: "#" },
              { name: "Belts", href: "#" },
            ],
          },
          {
            id: "brands",
            name: "Brands",
            items: [
              { name: "Full Nelson", href: "#" },
              { name: "My Way", href: "#" },
              { name: "Re-Arranged", href: "#" },
              { name: "Counterfeit", href: "#" },
              { name: "Significant Other", href: "#" },
            ],
          },
        ],
      },
      {
        id: "crt",
        name: t(keys.Navbar_crt),
        featured: [
          {
            name: "Cartes (PVC)",
            href: "http://localhost:3000/products/crtvs",
            imageSrc: "//contentful.helloprint.com/wm1n7oady8a5/7eYfGXcZO0aoIR4XB50BFW/cb5148b1f6fea63ddca09e8343b742d4/PVC_BC_PLP.png",
            imageAlt: "Models sitting back to back, wearing Basic Tee in black and bone.",
          },
          {
            name: "Cartes en bois",
            href: "http://localhost:3000/products/crtenbois",
            imageSrc: "//contentful.helloprint.com/wm1n7oady8a5/5IeyvlYrkSqZZbKEtQExtg/74c8c4367e5cdc126f8350bb0f387e60/Wood_BC_PLP.png",
            imageAlt: "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
          },
        ],
        sections: [
          {
            id: "accessories",
            name: "Accessories",
            items: [
              { name: "Watches", href: "#" },
              { name: "Wallets", href: "#" },
              { name: "Bags", href: "#" },
              { name: "Sunglasses", href: "#" },
              { name: "Hats", href: "#" },
              { name: "Belts", href: "#" },
            ],
          },
        ],
      },
      {
        id: "men",
        name: "flayer",
        featured: [
          {
            name: "Dépliant 2 plis accordéon - 3 volets",
            href: "http://localhost:3000/products/flayer2plis3volets",
            imageSrc: "//contentful.helloprint.com/wm1n7oady8a5/3AQADINSdDf7EtCQb3Wz12/66e308099ba380b9087d0ec4a8a9e65a/Folded_Leaflet_Bundle_Item_zigzag_fold.png",
            imageAlt: "Drawstring top with elastic loop closure and textured interior padding.",
          },
        ],
        sections: [
          {
            id: "clothing",
            name: "Clothing",
            items: [
              { name: "Tops", href: "#" },
              { name: "Pants", href: "#" },
              { name: "Sweaters", href: "#" },
              { name: "T-Shirts", href: "#" },
              { name: "Jackets", href: "#" },
              { name: "Activewear", href: "#" },
              { name: "Browse All", href: "#" },
            ],
          },
          {
            id: "accessories",
            name: "Accessories",
            items: [
              { name: "Watches", href: "#" },
              { name: "Wallets", href: "#" },
              { name: "Bags", href: "#" },
              { name: "Sunglasses", href: "#" },
              { name: "Hats", href: "#" },
              { name: "Belts", href: "#" },
            ],
          },
        ],
      },
    ],
    pages: [
      { name: t(keys.Navbar_company), href: "#" },
      { name: t(keys.Navbar_stores), href: "/help" },
    ],
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="bg-white">
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
                              selected ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
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
                    <a href="/signup" className="-m-2 block p-2 font-medium text-gray-900">
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
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
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
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </a>
              </div>

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
                                open ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
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
                            <Popover.Panel className="absolute inset-x-0 top-full z-50 text-sm text-gray-500">
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
                                          <p aria-hidden="true" className="mt-1">Shop now</p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul role="list" aria-labelledby={`${section.name}-heading`} className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
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
                    <a key={page.name} href={page.href} className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              {/* Search Bar */}
              <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:items-center">
                <SearchBar />
              </div>

              <div className="ml-auto flex items-center">
                <div className="ml-auto flex items-center">
                  {user ? (
                    <Popover className="relative">
                      <Popover.Button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                        <span>{user.firstName}</span>
                        <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-sm -translate-x-1/2 left-1/2 transform px-4 sm:px-0">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                              <a href="/me" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">Mon compte</p>
                                </div>
                              </a>
                              {/* Autres options */}
                              <a onClick={commande} className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">Mes commandes</p>
                                </div>
                              </a>

                              <a href="/chart" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">Chart</p>
                                </div>
                              </a>

                              <a onClick={logout} className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">Déconnexion</p>
                                </div>
                              </a>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  ) : (
                    <>
                      <a href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        {t(keys.Navbar_signin)}
                      </a>
                      <span className="h-6 w-px bg-gray-200 mx-2" aria-hidden="true"></span>
                      <a href="/signup" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        {t(keys.Navbar_createaccount)}
                      </a>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-center relative">
                <div onMouseEnter={() => setShowLanguageMenu(true)} onMouseLeave={() => setShowLanguageMenu(false)}>
                  <button className="mx-2" aria-label="Toggle Language Menu">
                    <FontAwesomeIcon icon={faGlobe} />
                  </button>

                  {/* Menu déroulant des langues */}
                  {showLanguageMenu && (
                    <div
                      className="absolute bg-white shadow-lg rounded-md "
                      onMouseEnter={() => setShowLanguageMenu(true)}
                      onMouseLeave={() => setShowLanguageMenu(false)}
                    >
                      <button onClick={() => changeLanguage("fr")} className="block w-full text-left py-1">
                        {t("French")}
                      </button>
                      <button onClick={() => changeLanguage("en")} className="block w-full text-left py-1">
                        {t("English")}
                      </button>
                      {/* Ajoutez plus de boutons pour chaque langue supportée */}
                    </div>
                  )}
                </div>
              </div>

              {/* Search */}
              <div className="flex lg:ml-6">
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </a>
              </div>

              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <a href="/CartComponent" className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{itemCount}</span>
                  <span className="sr-only">items in cart, view bag</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Nouvelle section */}
      <div className="flex justify-center items-center py-4 ">
        <div className="flex space-x-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
            <span>Meilleur prix garanti</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faSmile} className="text-orange-500 mr-2" />
            <span>500 000+ clients heureux</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faThumbsUp} className="text-blue-500 mr-2" />
            <span>100% satisfaction</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" />
            <span>Un service client personnalisé</span>
          </div>
          <div className="flex items-center">
            <span></span>
            <FontAwesomeIcon icon={faStar} className="text-green-500 mx-1" />
            <FontAwesomeIcon icon={faStar} className="text-green-500 mx-1" />
            <FontAwesomeIcon icon={faStar} className="text-green-500 mx-1" />
            <FontAwesomeIcon icon={faStar} className="text-green-500 mx-1" />
            <FontAwesomeIcon icon={faStar} className="text-gray-400 mx-1" />
            <span>4.2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
