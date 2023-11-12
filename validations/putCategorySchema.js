const yup = require('yup')

const updateCategorySchema = yup.object({
    name: yup.string().optional(),
    description: yup.string().optional(),
})

module.exports = updateCategorySchema;