
describe('model methods', () => {
    it('contact is created and queried back', async () => {
        const req = {
            first_name: 'name',
            email: 'email@email.com',
            message: 'message',
            last_name: 'surname',
            phone: 'phone',
            address: 'address'
        }
        const contact = require("../../models/contact-us.model")
        const res1 = await contact.create(req)
        expect(res1).toMatchObject(req)
        const res2 = await contact.findById(res1.id)
        expect(res2).toMatchObject(res1)
    })

    it('deletes all, create a few, select all', async () => {
        const faker = require("faker")
        const contact = require("../../models/contact-us.model")
        await contact.removeAll()
        const total = 5

        const contacts = []
        for (let i = 0; i < total; i++) {
            const req = {
                first_name: faker.name.firstName(),
                email: faker.internet.email(),
                message: faker.lorem.sentences(5),
                last_name: faker.name.lastName(),
                phone: faker.phone.phoneNumberFormat(),
                address: faker.address.streetAddress("###")
            }
            const res1 = await contact.create(req)
            contacts.push(res1)
        }

        const all = await contact.getAll()
        expect(all.length).toBe(total)

        for (let i = 0; i < total; i++) {
            expect(all[i]).toMatchObject(contacts[i])
        }
    })

    afterAll(() => {
        const db = require("../../models/db")
        db.destroy();
    })
})