const products = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '#',
      price: '$48',
      imageSrc: '//contentful.helloprint.com/wm1n7oady8a5/7nk0s5pKxYHQ53ZO29w0jb/a57e1a497b0ddb1d92c998ad642fc14a/Cotton_bags.png',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: '#',
      price: '$35',
      imageSrc: '//contentful.helloprint.com/wm1n7oady8a5/3jqnGNhRLB0kJmErlkjviu/9e724ee4445af83fc1d58985d1f23435/Pens.png',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: '#',
      price: '$89',
      imageSrc: '//contentful.helloprint.com/wm1n7oady8a5/51BQLD9GCnWiHA9odbLuvQ/2aaff90185de9d39024d7ee0a57a8261/Mugs___Bottles.png',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'Machined Mechanical Pencil',
      href: '#',
      price: '$35',
      imageSrc: '//contentful.helloprint.com/wm1n7oady8a5/3S5VtDmDqAYLEcZy62EwX3/673cad62103a00cd316b9708680df804/Notepads.png',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    {
        id: 4,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc: '//contentful.helloprint.com/wm1n7oady8a5/20nJtszambthSIruoX3cmY/f7e8e5450fb43a87e9e63011a80a3dc9/Umbrellas.png',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      },
      {
        id: 4,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc: '//contentful.helloprint.com/wm1n7oady8a5/2gAzkHaMkO6A2xma6AnOxq/1c820ab0f0b42f760eb4e69e4ca1f067/Speakers___Headphones.png',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      },
      {
        id: 4,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc: '//contentful.helloprint.com/wm1n7oady8a5/30lLHgqymEsm1EdDO6GE4f/4473df00df66ae9b0978d4336a43dc76/Travel_Mugs.png',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      },
      {
        id: 4,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc: '//contentful.helloprint.com/wm1n7oady8a5/1RkN9QlmW2lsZYUo7GEjox/93a2635220b36e4ee8adad7a8c5a5ec9/Backpacks.png',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      },
  ]
  
  export default function Example() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
  
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <a key={product.id} href={product.href} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 transform transition duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-3">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }