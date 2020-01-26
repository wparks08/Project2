module.exports = function(sequelize, DataTypes) {
    const venue = sequelize.define("venue", {
        name: DataTypes.STRING,
        address1: DataTypes.STRING,
        address2: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.STRING,
        latitude: DataTypes.DECIMAL,
        longitude: DataTypes.DECIMAL
    });

    venue.associate = function(models) {
        models.venue.hasMany(models.event);
    }

    return venue;
}