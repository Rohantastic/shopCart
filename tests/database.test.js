const Sequelize = require('sequelize');
const sequelize = require('../configuration/database');

describe('Sequelize Configuration', () => {
  test('Should create a Sequelize instance', () => {
    expect(sequelize instanceof Sequelize).toBe(true);
  });

  test('Should have correct database configuration', () => {
    console.log(sequelize);
    expect(sequelize.options.dialect).toBe('mysql');
    expect(sequelize.options.host).toBe('localhost');
    expect(sequelize.options.charset).toBe('utf8mb4');
    expect(sequelize.options.collate).toBe('utf8mb4_unicode_ci');
    
  });
});
