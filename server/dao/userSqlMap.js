var userSqlMap = {
    add: 'insert into user(username, password) values(?, ?)',
    deleteById: 'delete from user where id = ?',
    update: 'update user set username=?, password=? where id=?',
    list: 'select * from user',
    getByUserName: 'select * from user where user_name = ?',
    checkPassword: 'select * from user where user_name = ? and password = ?',
    insertNewUser: 'insert into user (user_name, true_name, password, phone, sex, add_time) values (?, ?, ?, ?, ?, ?)',
    getAvatarById:'select profile_photo from user where id = ?',
    updateAvatar:'update user set profile_photo=? where id=?'
};
module.exports = userSqlMap;