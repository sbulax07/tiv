// Empty array of users
const users = [];

// Add user
function userJoin(id, uname, room){
    const user = {id, uname, room};

    users.push(user);
    return user;
}

// Getter method for current user
function getCurrentUser(id){
    return users.find( user => user.id = id);

}

module.exports = { userJoin, getCurrentUser};

