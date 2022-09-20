const { validationResult } = require('express-validator')

const submitSupervisor = (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new Error(
                `${errors.array()[0].param}: ${errors.array()[0].msg}`
            )
        }
        console.log('-->REQ BODY:', req.body)
        res.status(200).json({ data: req.body })
    } catch (err) {
        console.log('->error', err)
        return res.status(400).json({ error: { message: err.message } })
    }
}

// const getSupervisors = async (req, res, next) => {
//     try {
//         const result = await fetch(
//             'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers'
//         )
//             .then((res) => res.json())
//             .catch((error) => {
//                 console.error('Error: ', error)
//                 return []
//             })
//         return res.status(200).json({ data: [...result] })
//     } catch (err) {
//         console.log('->error', err)
//         return res.json({ message: err.message, code: 400 })
//     }
// }

module.exports = { submitSupervisor }
