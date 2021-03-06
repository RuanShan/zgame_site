module.exports = (sequelize, DataTypes) => {
    return sequelize.define('game_results', {
        game_round_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },
        game_player_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },       //助力人
        to_game_player_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' }, //被助力的人
        score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },
        //state:{ type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' }
        //end_at: DataTypes.DATE,

    }, {createdAt: 'created_at', updatedAt:'updated_at'})
}
