const total = process.argv.length === 3 ? parseInt(process.argv[2]) : 20

const seedContactUs = async (total) => {
    const faker = require("faker")
    const contact = require("../models/contact-us.model")

    for (let i = 0; i < total; i++) {
        const req = {
            first_name: faker.name.firstName(),
            email: faker.internet.email(),
            message: faker.lorem.sentences(5),
            last_name: faker.name.lastName(),
            phone: faker.phone.phoneNumberFormat(),
            address: faker.address.streetAddress("###")
        }
        await contact.create(req)
    }

    const db = require("../models/db")
    db.destroy();
}

seedContactUs(total)


