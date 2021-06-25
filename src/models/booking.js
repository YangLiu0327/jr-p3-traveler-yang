const mongoose = require('mongoose');
// 使用schema构造器创建一个新的模式实例
const bookingSchema = new mongoose.Schema({
    // _id:{
    //     type: String,
    //     uppercase: true,
    //     alias: 'code'
    // },
    tour:{
        // ObjectId：特定对象的唯一id
        type: String,
        // type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Booking must belong to a Tour!']
    },
    user:{
         // type: mongoose.Schema.ObejctId,
        type: String,
        ref: 'User',
        required: [true, 'Booking must belong to a User!']
    },
    price: {
        type: Number,
        required: [true, 'Booking must have a price.']
      },
    createDate: {
        type: Date,
        default: Date.now()
      },
    paid:{
        type:Boolean,
        default: true
    }
});

// bookingSchema.pre(/^find/, function(next){
//  this.populate('User').populate({
//    path: 'tour',
//    select: 'name',
// });
// next();
//})
// 使用模式编译模型
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;