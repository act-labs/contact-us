jest.mock("mysql", () => {
    return {
        createConnection: () => ({
            connect: () => null
        })
    }
})

const model = require("../../models/contact-us.model")
jest.mock("../../models/contact-us.model")

const mockResponse = () => {
    const res = {}
    res.send = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
}

describe('controllers', () => {
    it('contact creation success', async () => {
        const data = {
            first_name: 'name',
            email: 'email@email.com',
            message: 'message',
            last_name: 'surname',
            phone: 'phone',
            address: 'address'
        }
        const contact = require("../../controllers/contact-us.controller")
        const res = mockResponse ()
        await contact.create({ body: data }, res)
        expect(model.create.mock.calls.length).toBe(1)
        expect(model.create.mock.calls[0][0]).toEqual(data)

        expect(res.send.mock.calls[0][0]).toEqual({message: "Success!"})

    })

})