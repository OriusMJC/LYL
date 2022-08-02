import { DataTypes } from 'sequelize';

module.exports = (sequelize: any) => {
    sequelize.define('Vehicle', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allownull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(100),
            allownull: false,
        },
        video: {
            type: DataTypes.STRING,
        },
        presentation: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        photo: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        price: {
            type: DataTypes.FLOAT,
            allownull: false,
        },
        status: {
            type: DataTypes.ENUM('Nuevo', 'Usado'),
            allownull: false,
        },
        kilom: {
            type: DataTypes.FLOAT,
            allownull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allownull: false,
        },
        type: {
            type: DataTypes.ENUM('bmw', 'audi', 'peugeot', 'citroen', 'mercedes benz', 'ford', 'fiat', 'toyota', 'volkswagen', 'renault', 'chevrolet', 'honda', 'hyundai', 'suzuki', 'ducati', 'rouser')
        },
        generalInfo: {
            type: DataTypes.JSON,
            allownull: false,
        },
        exterior: {
            type: DataTypes.JSON,
            allownull: false,
        },
        equipamiento: {
            type: DataTypes.JSON,
            allownull: false,
        },
        seguridad: {
            type: DataTypes.JSON,
            allownull:false,
        },
        interior: {
            type: DataTypes.JSON,
            allownull: false,
        },
        multimedia: {
            type: DataTypes.JSON,
            allownull: false,
        },
    }, {
        timestamps: true
    })
}