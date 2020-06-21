const sql = require("./db")

const ContactUs = {}

ContactUs.create = (newContact) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO CONTACT_US SET ?", newContact, (err, res) => {
            if (err) {
                console.log("error: ", err)
                reject(err)
                return
            }

            console.log("created contact-us: ", { id: res.insertId, ...newContact })
            resolve({ id: res.insertId, ...newContact })
        })
    })
}

ContactUs.findById = (contactId) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM CONTACT_US WHERE id = ${contactId}`, (err, res) => {
            if (err) {
                console.log("error: ", err)
                reject(err)
                return
            }

            if (res.length) {
                console.log("found contact-us: ", res[0])
                resolve(res[0])
                return
            }

            // not found ContactUs with the id
            resolve(null)
        })
    })
}

ContactUs.removeAll = () => {
    return new Promise((resolve, reject) => {
        sql.query("DELETE FROM CONTACT_US", (err, res) => {
            if (err) {
                console.log("error: ", err)
                reject(err)
                return
            }

            console.log(`deleted ${res.affectedRows} contact-us`)
            resolve(res)
        })
    })
}

ContactUs.getAll = () => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM CONTACT_US ORDER BY ID", (err, res) => {
            if (err) {
                console.log("error: ", err)
                reject(err)
                return
            }

            console.log("contact-us: ", res)
            resolve(res)
        })
    })
}

module.exports = ContactUs
