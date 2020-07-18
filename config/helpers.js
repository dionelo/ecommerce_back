const mysqli = require('mysqli')
const Mysqli = require('mysqli')

let conn = new Mysqli({
    host: 'localhost',
    post: 3306,
    user: 'root',
    passwd: '',
    db: 'megashop'
})

let db = conn.emit(false, '')

module.exports = {
    database: db
}