'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    const productsData = [
      {
        name: 'Smartphone',
        description: 'High-quality smartphone with the latest features.',
        price: 599.99,
        quantity: 50,
      },
      {
        name: 'Laptop',
        description: 'Powerful laptop for work and entertainment.',
        price: 999.99,
        quantity: 30,
      },
      {
        name: 'Headphones',
        description: 'Wireless noise-canceling headphones for immersive audio.',
        price: 149.99,
        quantity: 100,
      },
      {
        name: 'Smart TV',
        description: 'Ultra HD smart TV with built-in streaming apps.',
        price: 799.99,
        quantity: 20,
      },
      {
        name: 'Coffee Maker',
        description: 'Automatic coffee maker with programmable settings.',
        price: 69.99,
        quantity: 40,
      },
      {
        name: 'Gaming Console',
        description: 'Next-gen gaming console for immersive gameplay.',
        price: 449.99,
        quantity: 15,
      },
      {
        name: 'Tablet',
        description: 'Lightweight tablet for on-the-go productivity.',
        price: 299.99,
        quantity: 25,
      },
      {
        name: 'Digital Camera',
        description:
          'High-resolution digital camera for photography enthusiasts.',
        price: 499.99,
        quantity: 10,
      },
      {
        name: 'Wireless Earbuds',
        description: 'Sleek and comfortable wireless earbuds for music lovers.',
        price: 129.99,
        quantity: 50,
      },
      {
        name: 'Fitness Tracker',
        description: 'Fitness tracker with heart rate monitoring and GPS.',
        price: 79.99,
        quantity: 60,
      },
      {
        name: 'Blender',
        description: 'High-speed blender for smoothies and food processing.',
        price: 89.99,
        quantity: 35,
      },
      {
        name: 'Desk Chair',
        description: 'Ergonomic desk chair with lumbar support.',
        price: 199.99,
        quantity: 15,
      },
      {
        name: 'Vacuum Cleaner',
        description: 'Powerful vacuum cleaner for efficient cleaning.',
        price: 149.99,
        quantity: 20,
      },
      {
        name: 'Wireless Router',
        description:
          'High-speed wireless router for fast internet connections.',
        price: 79.99,
        quantity: 30,
      },
      {
        name: 'Backpack',
        description: 'Durable backpack with multiple compartments.',
        price: 49.99,
        quantity: 40,
      },
      {
        name: 'Toaster Oven',
        description: 'Versatile toaster oven for toasting and baking.',
        price: 59.99,
        quantity: 25,
      },
      {
        name: 'Office Desk',
        description: 'Modern office desk with ample workspace.',
        price: 249.99,
        quantity: 10,
      },
      {
        name: 'Digital Watch',
        description: 'Stylish digital watch with smart features.',
        price: 129.99,
        quantity: 30,
      },
      {
        name: 'Microwave Oven',
        description: 'Compact microwave oven for quick heating.',
        price: 79.99,
        quantity: 15,
      },
      {
        name: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker for music on-the-go.',
        price: 39.99,
        quantity: 50,
      },
    ].map((product) => {
      return {
        ...product,
        created_at: new Date(),
        updated_at: new Date(),
      };
    });

    await queryInterface.bulkInsert('products', productsData, {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
