const express = require('express')

const { sequelize, User, Genre } = require('./models')
const user = require('./models/user')

const app = express()
app.use(express.json())

app.post('/users', async(req, res) => {
    const { nickName, firstName, lastName, image, intentionStatus, bandName, oidc, email, phone, location } = req.body

    try {
        const user = await User.create({ nickName, firstName, lastName, image, intentionStatus, bandName, oidc, email, phone, location })

        return res.json(user)
    } catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll()

        return res.json(users)
    } catch(err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong!' })
    }
})

app.get('/users/:oidc', async (req, res) => {
    const oidc = req.params.oidc
    try {
        const users = await User.findOne({
            where: { oidc },
            include: 'genres',
        })

        return res.json(users)
    } catch(err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong!' })
    }
})

app.delete('/users/:oidc', async (req, res) => {
    const oidc = req.params.oidc
    try {
        const user = await User.findOne({ where: { oidc } })

        await user.destroy()

        return res.json({ message: 'User deleted!'})
    } catch(err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong!' })
    }
})

app.put('/users/:oidc', async (req, res) => {
    const oidc = req.params.oidc
    const { nickName, firstName, lastName, image, intentionStatus, bandName, email, phone, location } = req.body
    try {
        const user = await User.findOne({ where: { oidc } })

        user.nickName = nickName
        user.firstName = firstName
        user.lastName = lastName
        user.image = image
        user.intentionStatus = intentionStatus
        user.bandName = bandName
        user.email = email
        user.phone = phone
        user.location = location

        await user.save()

        return res.json(user)
    } catch(err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong!' })
    }
})

app.post('/genres', async (req, res) => {
    const { userOidc, name } = req.body
    try {
        const user = await User.findOne({
            where: { oidc: userOidc }
        })

        const genre = await Genre.create({
            name, userOidc: user.oidc
        })

        return res.json(genre)
    } catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

app.get('/genres', async (req, res) => {
    const { userOidc, name } = req.body
    try {
        const genres = await Genre.findAll({
            // if you need multiple associations
            // you pass an array and then you pass user and the other ones
            include: ['user']
        })

        return res.json(genres)
    } catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
})




app.listen({ port: 5000 }, async () => {
    console.log('Server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log('Database Connected!')
})