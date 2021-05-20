'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      nickName: 'JB Jables',
      firstName: 'Jack',
      lastName: 'Black',
      image: '',
      intentionStatus: 'Looking to Network',
      bandName: 'Tenacious D',
      oidc: '0sk1x27qvkckubn5xjhofuvl',
      email: 'jack@gmail.com',
      phone: '9786664201',
      location: 'Hollywood CA'
    }, {
      nickName: 'Crunch Cone',
      firstName: 'Kyle',
      lastName: 'White',
      image: '',
      intentionStatus: 'Looking to Network',
      bandName: '',
      oidc: '0sk2x36qvkckubn5xjhofuvl',
      email: 'kyle@gmail.com',
      phone: '9786664201',
      location: 'Hollywood CA'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
