const Booking = require('../../../models/booking');
const User = require('../../../models/user');
// const Tour = require('../../../models/tour');
const Joi = require('joi');


async function createBooking(req,res){
  const {tour, user, paid} = req.body;
  const schema = Joi.object({
    code: Joi.string()
    .regex(/^[a-zA-Z0-9]+$/)
    .required(),
  });

  const { code } = await schema.validateAsync(req.body, {
    allowUnknown: true,
    stripUnknown: true,
    abortEarly: false
  });

  const existingBooking = await Booking.findById(code).exec();
  if(existingBooking){
    return res.status(409).json('Booking already exist');
  }
  

  const booking = new Booking({ _id:code, tour, user, paid})
  try {
    await booking.save();
    res.status(201).send({ booking });
  } catch (e) {
    res.status(400).send(e);
  }
}

async function getBooking(req,res){
 const { id } = req.params;
 const booking = await Booking.findById(id).exec();
 if(!booking){
     return res.sendStatus(404).json('No document found with that ID');
 }
try{
    res.status(200).json({
        status: 'success',
        data:{
            data: booking
        }
    });
} catch (e) {
    res.status(400).send(e);
  }

}

async function getAllBookings(req,res){
   const bookings = await Booking.find().exec();
   try {
    res.status(200).json({
        status: 'success',
        data:{
            data: bookings
        }
    });
  } catch (e) {
    res.status(400).send(e);
  }
}


async function updateBooking(req,res){
    const{ id } = req.params;
    const { tour, user, paid } = req.body;
    const booking = await Booking.findByIdAndUpdate(
        id, 
        { tour, user, paid },
        { new: true }
    );
    if (!booking){
        return res.sendStatus(404).json('No document found with that ID');
    }
    try {
        res.status(200).json({
            status: 'success',
            data:{
                data: booking
            }
        });
      } catch (e) {
        res.status(400).send(e);
      }
}

async function deleteBooking(req,res){
   const  { id } = req.params;
   const booking = await Booking.findByIdAndDelete(id);
   if(!booking){
       return res.sendStatus(404).json('No document found with that ID');
   }
   try {
    res.status(204).json({
        status: 'success',
        data:{
            data: null
        }
    });
  } catch (e) {
    res.status(400).send(e);
  }
}



module.exports = {
    createBooking,
    getBooking,
    getAllBookings,
    updateBooking,
    deleteBooking
  };

