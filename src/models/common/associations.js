// copy to zgame_site
export function buildSharedAssociations(db) {
  // 为公共模型添加关系
  let SharedPost = db.SharedPost
  let SharedPhoto = db.SharedPhoto
  let SharedTerm = db.SharedTerm
  let SharedPhotoRelationship = db.SharedPhotoRelationship
  let SharedTermRelationship = db.SharedTermRelationship

  SharedPost.belongsToMany(SharedPhoto, {
    through: {
      model: SharedPhotoRelationship,
      scope: {
        viewable_type: 'cover'
      }
    },
    constraints: false,
    foreignKey: 'viewable_id',
    otherKey: 'photo_id',
    as: 'Covers'
  })

  SharedPost.belongsToMany(SharedTerm, {
    through: {
      model: SharedTermRelationship,
      scope: {
        viewable_type: 'post'
      }
    },
    foreignKey: 'viewable_id',
    otherKey: 'term_id',
    as: 'Terms'
  })

  //  支持查找分配了几个分类的文章
  //  findAll( { include:[{association:'TermRelationships', where:{ taxon_id: xxx } }]})
  SharedPost.hasMany(SharedTermRelationship, {
    foreignKey: 'viewable_id',
    scope: {
      viewable_type: 'post'
    },
    as: 'TermRelationships'
  });
}
