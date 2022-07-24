import { DataTypes } from 'sequelize';

module.exports = (sequelize: any) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            allownull: false,
            primaryKey: true,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allownull: false,
        },
        email: {
            type: DataTypes.STRING,
            allownull: false,
            validate: {
                isEmail: true,
                isLowercase: true,
            }
        },
        password: {
            type: DataTypes.STRING(20),
            allownull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allownull: false,
        },
    }, {
        timestamps: true
    })
}
