module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define(
        'Address',
        {
            postnumber: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            address: {
                type: DataTypes.STRING(200),
                allowNull: false
            },
            default: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        }
    );

    Address.associate = db => {

    };

    return Address;
};
