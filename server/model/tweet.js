const general = require('../utils/general');
class TweetModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true
            },
            tweetid: {
                type: DataTypes.UUID,
                allowNull: true,
                primaryKey: true,
                validate: {
                    isUUID: 4
                },
                defaultValue: () => general.genUUID()
            },
            tweettitle: {
                type: DataTypes.STRING(25),
                allowNull: true,
                validate: {
                    max: 25
                }
            },
            description: {
                type: DataTypes.STRING(140),
                allowNull: true,
                validate: {
                    max: 25
                }
            },
            isactive: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            modelName: "tweet",
            sequelize
        });
    }

    static associate(models) {
        this.myAssociation = models.tweet.belongsTo(models.users, { foreignKey: 'tweeter', as: 'users' });
    }
}

module.exports = TweetModel;