// db.products.count()
// db.products.find({name:'iphone XS'})
// db.products.find({name:/book$/})
// db.products.find({quantity: 90, type: 'D'})
// db.products.find({$or: [{quantity: 90}, {type:'D'}]})
//Nhieu dieu kien hoac ($or) => su dung $in
//Tim nhung documents co quantity = 130, 90, hoac 100
// db.products.find({quantity: {$in: [130, 90, 100]}})
//Update a document
// db.products.updateOne(
//     {name: 'iphone XS'}, //dieu kien
//     {
//         $set: {quantity: 131, "size.width": 2.78}, //Gia tri moi
//         $currentDate: {lastModified:true} //Cap nhat gia tri lastModified thanh ngay gio hien tai
//     } //dieu kien moi
// )
//Cap nhat theo truong _id
// db.products.updateOne(
//     {_id: ObjectId("5dab2661ee1541c2b260a546")},
//     {
//         $set: {name: "notebook 3", quantity: 101},
//         $currentDate:{lastModified:true}
//     }
// )
//Cap nhat 1 document, neu khong tim thay thi tao moi?
// db.products.updateOne(
//     {name: "iphone X++"},
//     {
//         $set:{"size.width": 3.78, quantity: 151},
//         $currentDate:{lastModified: true}
//     }, {
//         upsert: true //Tu tao object moi neu khong tim thay "iphone X++"
//     }
// )
//Cap nhat nhieu ban ghi
// db.products.updateMany(
//     {quantity: {$gt:110}}, //gt = greater than, gte = greater than or equal
//     {
//           $set: {type: "D"},
//           $currentDate:{lastModified:true}
//     }
// )
//Thay the mot document
// db.products.replaceOne(
//     {name: "iphone X"},
//     {name: "iphone X1", quantity: 121, size: {width: 2.80, height: 5.56, unit: "inch"}}// Document moi
// )
//Xoa mot document trong collection
db.products.deleteOne({name: "iphone X1"})























