const { users } = require('../../model/index');

class UserRepository {

    async getUserByEmailId(emailId) {
        try {
            let result = await users.findOne({ email: emailId });
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createUser(user) {
        try {
            let result = await users.build(user);
            await result.generateHash();
            result.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const userRepository = new UserRepository();
module.exports = userRepository;