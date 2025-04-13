require('dotenv').config(); // Carga variables desde .env
const app = require('./app'); // Importa tu app de Express
const sequelize = require('./config/db'); // Conexión con la base de datos

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await sequelize.sync(); // Sincroniza los modelos con la base de datos
    console.log('DB Connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();
