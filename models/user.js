module.exports = function(sequelize, DataTypes) {
    const user = sequelize.define("user", {
        username: {
            type: DataTypes.STRING(126),
            validate: {
                isEmail: true
            },
            unique: true
        },
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        zip: DataTypes.STRING
    });

    user.associate = function(models) {
        //TODO
        //The below associations should be added after the 'event' table has been
        //created.
        //hasMany events as "attending"
        //hasMany events as "saved"
    };

    return user;
};
