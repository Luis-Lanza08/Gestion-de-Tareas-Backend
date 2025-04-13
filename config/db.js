const { Sequelize } = require('sequelize');

// Usamos DATABASE_URL para entornos de producción (Render)
// y valores por separado si estás en local (opcional)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // opcional: desactiva logs de SQL en consola
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // necesario para Render
    },
  },
});

module.exports = sequelize;
