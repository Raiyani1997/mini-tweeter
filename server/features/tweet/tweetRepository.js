const { sequelize, tweet, users } = require('../../model/index');

class TweetRepository {
    async getAll(request, response, next) {
        try {
            let result = await tweet.findAll({
                attributes: ['tweetid', 'tweettitle', 'description', 'createdon'],
                include: [{
                    model: users,
                    as: 'users',
                    attributes: ['firstname', 'lastname', 'userid'],
                }],
                order: [['createdon', 'DESC']]
            });
            result = result.map(row => {
                row.tweeter = `${row.dataValues.users.dataValues.firstname} ${row.dataValues.users.dataValues.lastname}`;
                row.dataValues.users.dataValues.firstname = undefined;
                row.dataValues.users.dataValues.lastname = undefined;
            })
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAllByUser(request, response, next) {
        try {
            let user = request.user;
            let result = await tweet.findAll({
                attributes: ['tweetid', 'tweettitle', 'description', 'createdon'],
                include: [{
                    model: users,
                    as: 'users',
                    attributes: ['firstname', 'lastname', 'userid'],
                    where: {
                        userid: user.userid
                    }
                }],
                order: [['createdon', 'DESC']]
            });
            result = result.map(row => {
                row.tweeter = `${row.dataValues.users.dataValues.firstname} ${row.dataValues.users.dataValues.lastname}`;
                row.dataValues.users.dataValues.firstname = undefined;
                row.dataValues.users.dataValues.lastname = undefined;
            })
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async create(request, response, next) {
        let transaction;
        console.log("++++++++++++++=");
        
        try {
            transaction = await sequelize.transaction();
            const tweet = request.body;
            const tweetData = {
                "tweettitle": tweet.title,
                "description": tweet.description,
                "tweeter": request.user.userid
            };
            console.log(tweetData);
            
            const result = await tweet.create(tweetData, transaction);

            response.status(200).json({ message: "successful" });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

const tweetRepository = new TweetRepository();
module.exports = tweetRepository;