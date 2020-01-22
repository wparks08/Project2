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
        models.user.belongsToMany(models.event, {
            as: "attending",
            through: "attendees_events"
        });

        models.user.belongsToMany(models.event, {
            as: "saved",
            through: "users_savedEvents"
        });
    };

    return user;
};
