/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wp_evf_sessions', {
    session_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    session_key: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      unique: true
    },
    session_value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    session_expiry: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'wp_evf_sessions'
  });
};
