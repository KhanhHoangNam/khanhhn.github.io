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
// db.products.deleteOne({name: "iphone X1"})
//Xoa nhieu documents trong collection
// db.products.deleteMany({quantity: {$gt: 110}})
//Gio chung ta co 2 collections: categories va products
//Quan he giua 2 collection nay: 1-n => category chua "nhieu products"
// db.categories.insertMany([{
//     name: 'Electronics',
//     description: "Đây là danh mục các đồ điện tử",    
// },{
//     name: 'Housewares',
//     description: "Danh mục các đồ gia dụng. VD: điều hoà, tủ lạnh",    
// },{
//     name: 'School supplies',
//     description: "Văn phòng phẩm, đồ dùng học tập",    
// },{
//     name: 'Fashion',
//     description: "Thời trang, quần áo, giày dép",    
// }
// ])
// db.categories.find({}).count()
// db.products.insertMany([{
//     name: 'iphone XS',
//     quantity: 130,
//     type: 'A',
//     category: 'Electronics',
//     size: {width: 2.79, height: 5.65, unit: 'inch'}
// },{
//     name: 'track pad',
//     quantity: 80,
//     type: 'B',    
//     category: 'Electronics',
//     size: {width: 16, height: 9, unit: 'cm'}
// },{
//     name: 'Table Lamp',
//     quantity: 30,
//     type: 'C',
//     category: 'Housewares',
//     size: {width: 5, height: 12, unit: 'inch'}
// },{
//     name: 'notebook', 
//     quantity: 90,
//     type: 'D',
//     category: 'School supplies',
//     size: {width: 9, height: 11, unit: 'cm'}
// },{
//     name: 'notebook 2',
//     quantity: 100,
//     type: 'D',
//     category: 'School supplies',
//     size: {width: 9, height: 11, unit: 'cm'}
// },{
//     name: 'Bộ đồ cực cool cotton cho bé từ 1-5 tuổi',
//     quantity: 12,
//     type: 'D',
//     category: 'Fashion',
//     size: {width: 12, height: 5, unit: 'cm'}
// },{
//     name: 'Quần Túi Hộp Kiểu Lính Qh68',
//     quantity: 5,
//     type: 'A',
//     category: 'Fashion',
//     size: {width: 12, height: 5, unit: 'cm'}
// },{
//     name: 'Tủ lạnh 2 ngăn GN-D315PS',
//     quantity: 34,
//     type: 'B',
//     category: 'Housewares',
//     size: {width: 51, height: 11, unit: 'inch'}
// },{
//     name: 'Máy hút bụi LG VC4420NHTPY',
//     quantity: 34,
//     type: 'C',
//     category: 'Housewares',
//     size: {width: 12, height: 3, unit: 'inch'}
// },{
//     name: 'Quần Short Kaki Mài, Loang Các Mầu',
//     quantity: 13,
//     type: 'D',
//     category: 'Fashion',
//     size: {width: 30, height: 150, unit: 'cm'}
// },{
//     name: 'Bộ phần mềm văn phòng Microsoft Office',
//     quantity: 23,
//     type: 'D',
//     category: 'Software',
//     size: {width: 30, height: 150, unit: 'cm'}
// }
// ])
//Su dung phep join 2 collections de tao ra mot collection co:
//Thong tin products, kem thong tin CHI TIET tung category
db.products.aggregate([
    {
        $lookup: {
                from: "categories",
                localField: "category", //field cua "products"
                foreignField: "name",  //field cua categories
                as: "category_doc"
            }
        }
])























