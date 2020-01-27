module.exports = function (sequelize, DataTypes) {
    const venue = sequelize.define("venue", {
        name: DataTypes.STRING,
        address1: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.STRING,
        latitude: DataTypes.FLOAT,
        longitude: DataTypes.FLOAT
    });

    venue.associate = function (models) {
        models.venue.hasMany(models.event);
    }

    return venue;
}