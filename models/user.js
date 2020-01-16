module.exports = function (sequelize, DataTypes) {
    const user = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        zip: DataTypes.STRING
    });

    user.associate = function (models) {
        //TODO
        //hasMany events as "attending"
        //hasMany events as "saved"
    }

    return user;
}