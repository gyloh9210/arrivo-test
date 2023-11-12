const yup = require('yup')

const createCategorySchema = yup.object({
    name: yup.string().required(),
    description: yup.string().optional(),
})

module.exports = createCategorySchema;