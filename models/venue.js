module.exports = function(sequelize, DataTypes) {
    const venue = sequelize.define("venue", {
        name: DataTypes.STRING,
        address1: DataTypes.STRING,
        address2: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.STRING
    });

    venue.associate = function(models) {
        models.venue.hasMany(models.event, {
            through: "venue_events"
        });
    }

    return venue;
}