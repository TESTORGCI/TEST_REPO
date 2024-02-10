import { DataTypes, Sequelize } from "sequelize";
import DbContext from "../DataContext/DbContext.js";
import bcrypt from "bcrypt";

const User = DbContext.define('User',{

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        readOnly:true,
        primaryKey: true
    },
    first_name:{
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'First name is required' },
            len: { args: [2, 255], msg: 'First name must be between 2 and 20 characters long' }
        }
    },
    last_name:{
        type : DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Last name is required' },
            len: { args: [2, 255], msg: 'Last name must be between 2 and 20 characters long' }
        }
    },
    password:{
        type : DataTypes.STRING,
        allowNull: false,
        writeOnly : true,
        validate: {
            notNull: { msg: 'Password is required' },
            len: { args: [2, 255], msg: 'Password should be more than 6 characters long' }
        },
        set(value){
            if (value && value.length > 6) {
                const hashedPassword = bcrypt.hashSync(value, 10);
                this.setDataValue('password', hashedPassword);
            }
        }
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: 'Username is required' },
            isEmail: { msg: 'Username must be a valid email address' }
        }
    },
    account_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        readOnly:true,
        allowNull: false,
    },
    account_updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        readOnly:true,
        allowNull: false,
    }
}, {
    timestamps : false,
    underscored : true,
    modelName: 'users'
});

export default User;