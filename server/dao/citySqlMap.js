var citySqlMap = {
    add: 'insert into city_list(city_name) values (?)',
    getAllCity:'select * from city_list',
    searchCity:'SELECT * FROM `city_list` WHERE city_name LIKE ?'
};
module.exports = citySqlMap;