const general = require('../utils/general');
class FollowerModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }
        }, {
            modelName: "follower",
            sequelize
        });
    }

    static associate(models) {
        this.myAssociation = models.users.belongsTo(models.users, { foreignKey: 'followerid', as: 'follower' });
        this.myAssociation = models.users.belongsTo(models.users, { foreignKey: 'followingid', as: 'following' });
    }
}

module.exports = FollowerModel;