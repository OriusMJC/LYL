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
        }
    }, {
        timestamps: true
    })
}