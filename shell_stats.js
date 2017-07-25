use xavier
db.getCollection('quotes').find({}).length()
db.getCollection('quotes').find({eligible:true}).length()
db.getCollection('quotes').find({eligible:false}).length()
db.getCollection('quotes').aggregate([
  {$match:{eligible:true}},
  {$group:
    {
      _id:'placeholder',
      avgPremium:{$avg:'$annual_premium'}
    }
  }
])