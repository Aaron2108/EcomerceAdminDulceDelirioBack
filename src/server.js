const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 8080;

const main = async () => {
    try {
        // 1. Primero sincronizar/conectar la BD
        await db.sequelize.authenticate();
        console.log('Database connected');

        await db.sequelize.sync({ alter: true });
        console.log('Database synchronized');

        // 2. Luego levantar el servidor
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Startup error:', error);
        process.exit(1); 
    }
}

main();