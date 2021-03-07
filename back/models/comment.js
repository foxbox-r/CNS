module.exports = (sequelize,DataTypes)=>{
    const Comment = sequelize.define("Comment",{
        description:{
            type:DataTypes.STRING(120),
            allowNull:false
        }
    },{
        charset:"utf8",
        collate:"utf8_general_ci"
    });

    Comment.associate = (db)=>{
        db.Comment.belongsTo(db.Post);
        db.Comment.belongsTo(db.User);
    }

    return Comment; 
}