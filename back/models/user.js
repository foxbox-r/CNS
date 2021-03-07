module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define("User",{ // 테이블명 : users
        mail:{
            type:DataTypes.STRING(50),
            allowNull:false,
            unique:true,
        },
        password:{
            type:DataTypes.STRING(120),
            allowNull:false,
        },
        name:{
            type:DataTypes.STRING(15),
            allowNull:false,
        },
        color:{
           type:DataTypes.STRING(10),
           allowNull:false,
           defaultValue:"#ffffff", 
        },
        backgroundColor:{
            type:DataTypes.STRING(10),
            allowNull:false,
            defaultValue:"#000000",
        },
        profileImg:{
            type:DataTypes.STRING(100),
            allowNull:true,
        }
    },{
        charset:"utf8",
        collate:"utf8_general_ci",
    }) 

    User.associate = (db)=>{
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.Post,{through:"Like",as:"Likeds"});
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.User,{through:"Subscribe",as:"Makers",foreignKey:"ClientId"});
        db.User.belongsToMany(db.User,{through:"Subscribe",as:"Clients",foreignKey:"MakerId"});
    }

    return User;
} 