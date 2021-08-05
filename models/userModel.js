const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')
const Joi = require('joi')


const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      mobilePhone: {
        type: DataTypes.STRING,
      }
    }
)

function validateUser(user) {
    const schema = Joi.object({
      firstName: Joi.string().max(255).required(),
      lastName: Joi.string().max(255).required(),
      mobilePhone: Joi.string()
      .pattern(/^[0-9]\d{9}$/)
      .messages({ 'string.pattern.base': `Invalid Mobile Phone Number` })
      .allow('', null)
    })
    return schema.validate(user)
}

module.exports = {
    User,
    validateUser
  }