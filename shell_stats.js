db.getCollection('quotes').find({}).length() + ' total quotes attempted'
db.getCollection('quotes').find({eligible:true}).length() + ' quotes status = "success" '
db.getCollection('quotes').find({eligible:false}).length() + ' quotes status = "failure" '
db.getCollection('quotes').aggregate([
  {$match:{eligible:true}},
  {$group:
    {
      _id:'placeholder',
      avgPremium:{$avg:'$annual_premium'}
    }
  }
])
