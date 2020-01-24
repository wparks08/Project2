module.exports = function(sequelize, DataTypes) {
    const event = sequelize.define("event", {
        name: DataTypes.STRING,
        dateTimeStart: DataTypes.DATE,
        dateTimeEnd: DataTypes.DATE
    });

    event.associate = function(models) {
        //models.event.hasMany(models.user, {
        //    as: "attendees",
        //    through: "users_events"
        //})

        models.event.belongsTo(models.venue);

        models.event.belongsToMany(models.user, {
            as: "attendees",
            through: "attendees_events"
        });

        models.event.belongsToMany(models.user, {
            as: "interestedUsers",
            through: "users_savedEvents"
        });
    }

    return event;
}