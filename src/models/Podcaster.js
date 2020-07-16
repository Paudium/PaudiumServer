const mongooose = require('mongoose');

module.exports = mongooose.model('Podcaster',{
    podcasterName,
    email,
    products,
})