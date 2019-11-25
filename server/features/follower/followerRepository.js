const { sequelize, users, follower } = require('../../model/index');

class FollowerRepository {
    async getAllFollowers(request, response, next) {
        try {
            let result = await users.findAll({
                attributes: ['firstname', 'lastname', 'userid'],
                include: [{
                    model: follower,
                    as: 'followers',
                    where: {
                        follwingid: request.user.userid
                    }
                }]
            });
            result = result.map(row => {
                row.username = `${row.dataValues.users.dataValues.firstname} ${row.dataValues.users.dataValues.lastname}`;
                row.dataValues.firstname = undefined;
                row.dataValues.lastname = undefined;
            })
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAllFollowings(request, response, next) {
        try {
            let result = await users.findAll({
                attributes: ['firstname', 'lastname', 'userid'],
                include: [{
                    model: follower,
                    as: 'followings',
                    where: {
                        follwerid: request.user.userid
                    }
                }]
            });
            result = result.map(row => {
                row.username = `${row.dataValues.users.dataValues.firstname} ${row.dataValues.users.dataValues.lastname}`;
                row.dataValues.firstname = undefined;
                row.dataValues.lastname = undefined;
            })
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAllUser(request, response, next) {
        try {
            let user = request.user;
            let result = await follower.findAll({
                attributes: ['follwingid'],
                where : {
                    follwerid: userid
                }
            });

            result = result.map( row => row.dataValues.follwingid );
            result.push(user.userid);

            let usersList = await user.findAll({
                attributes: ['firstname', 'lastname', 'userid'],
                where : {
                    userid : {
                        [Op.notIn]: result
                    }
                }
            });
            usersList = usersList.map(row => {
                row.username = `${row.dataValues.users.dataValues.firstname} ${row.dataValues.users.dataValues.lastname}`;
                row.dataValues.users.dataValues.firstname = undefined;
                row.dataValues.users.dataValues.lastname = undefined;
            })
            response.status(200).json(usersList);
        } catch (error) {
            next(error);
        }
    }

    async create(request, response, next) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            let followerData = request.body;
            followerData.followerid = request.user.userid;
            const result = await tweet.create(followerData, transaction);

            response.status(200).json({ message: "successful" });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

const followerRepository = new FollowerRepository();
module.exports = followerRepository;