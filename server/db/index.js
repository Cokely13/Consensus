const db = require('./db')
const Group = require('./models/Group');
const GroupMember = require('./models/GroupMember');
const Question = require('./models/Question');
const GroupQuestion = require('./models/GroupQuestion');
const UserResponse = require('./models/UserResponse');
const Consensus = require('./models/Consensus');

const User = require('./models/User')

//associations:
User.belongsToMany(Group, { through: GroupMember });
Group.belongsToMany(User, { through: GroupMember });

Group.belongsTo(User, { as: 'leader', foreignKey: 'leaderId' });

Group.belongsToMany(Question, { through: GroupQuestion });
Question.belongsToMany(Group, { through: GroupQuestion });

Question.hasMany(UserResponse);
UserResponse.belongsTo(Question);

User.hasMany(UserResponse);
UserResponse.belongsTo(User);

Group.hasMany(GroupMember);
GroupMember.belongsTo(Group);

Group.hasMany(Consensus);
Consensus.belongsTo(Group);

Question.hasMany(Consensus);
Consensus.belongsTo(Question);

module.exports = {
  db,
  models: {
    User,
    Group,
    GroupMember,
    Question,
    GroupQuestion,
    UserResponse,
    Consensus,
  },
}
