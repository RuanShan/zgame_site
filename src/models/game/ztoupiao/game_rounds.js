const moment = require('moment')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('ZTouPiaoGameRound', {
    game_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        IsNull: function(value) {
          if (value == '') {
            console.log('name can not be null');
            throw new Error('name can not be null')
          }
        }
      }
    },
    state: {
      type: DataTypes.STRING(24),
      defaultValue: 'created'
    },
    creator_id: DataTypes.INTEGER,
    start_at: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        IsNull: function(value) {
          if (value == '') {
            console.log('start_at can not be null');
            throw new Error('start_at can not be null')
          }
        }
      }
    },
    end_at: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        IsNull: function(value) {
          if (value == '') {
            console.log('end_at can not be null');
            throw new Error('end_at can not be null')
          }
        }
      }
    },
    desc: DataTypes.TEXT, //游戏描述
    award_desc: DataTypes.TEXT,
    host: DataTypes.STRING(128), //游戏主办方
    duration: { //游戏时间，多少秒
      type: DataTypes.INTEGER,
      defaultValue: '0',
      allowNull: false,
      validate: {
        IsNull: function(value) {
          if (value == '') {
            console.log('duration can not be null');
            throw new Error('duration can not be null')
          }
        }
      }
    },
    code: { //缺省值为空，必填
      type: DataTypes.STRING(24),
      allowNull: false,
      defaultValue: '',
      validate: {
        IsNull: function(value) {
          if (value == '') {
            console.log('code can not be null');
            throw new Error('code can not be null')
          }
        }
      }
    },
    appid: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: ''
    },
    contact_required: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    number: {
      type: DataTypes.STRING(45), // get game_round by number
      unique: true // add unique index
    },
    color: {
      type: DataTypes.STRING(16), // Hex + opacity
    }

  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'game_rounds'
  })
  // 添加方法 model.paginate( { page: 1, paginate: 25 } )
  // Default page = 1 and paginate = 25
  // const { docs, pages, total } = await db.model.paginate()
  sequelizePaginate.paginate(model)

  addHooks(model)
  bindClassMethods(model)
  bindMemberMethods(model)
  return model
}

function addHooks(model) {
  model.addHook('beforeCreate', 'set_defults', (game, options) => {
    game.code = 'ztoupiao'
  })
}

const permittedAttributes = ['number', 'state', 'name', 'desc', 'award_desc', 'start_at', 'end_at', 'code', 'duration', 'host', 'color']

function bindClassMethods(model) {
  model.getAllInfoByNumber = async function(number) {
    let gameRound = model.findOne({
      attributes: permittedAttributes,
      where: {
        number
      }
    })
    let playerCount = model.count({
      where: {
        number
      },
      include: 'GamePlayers'
    })
    let resultCount = model.count({
      where: {
        number
      },
      include: 'GameResults'
    })

    let results = await Promise.all([gameRound,playerCount, resultCount])

    let info = results[0]
    info.playPath = info.getPlayPath()
    info.playerCount = results[1]
    info.resultCount = results[2]
    return info
  }


}


function bindMemberMethods(model) {
  model.prototype.getInfo = getInfo
}

/**
 * 取得游戏相关信息，用于初始化游戏
 * @param {*} url
 * @return {返回值类型} wxConfig or null
 */

function getInfo() {

  let playPath = this.getPlayPath()

  return {
    number: this.number,
    state: this.state,
    name: this.name,
    desc: this.desc,
    state: this.state,
    award_desc: this.award_desc,
    start_at: this.start_at,
    end_at: this.end_at,
    host: this.host,
    code: this.code,
    color: this.color,
    duration: this.duration,
    playPath
  }

}