const Special = require('../models/specialists');

module.exports = {
    getSpecial: async function(req,res){
        const SpecialList = await Special.find();
        res.send(Special)
    },

   
    getIdSpecial : async function(req,res){
        const id = req.params.id;
        const SpecialItem = await Special.findById(id);
        res.send(SpecialItem)
    },
  
    putIdSpecial: async function(req,res){
        const id = req.params.id;
        try {
            const specialName = req.body.specialName;
            const specialPrice = req.body.specialPrice;
            const createAt = req.body.createAt;
            const updateAt = req.body.updateAt;
            const special = await Special.findByIdAndUpdate(id,{
                specialName,
                specialPrice,
                createAt ,
                updateAt

            })
            await special.save();
            res.send('PUT THANH cong') 
        } catch (error) {
            console.log('Failed')
        } 
    },
    postSpecial: async function(req,res){
        try {
            const specialName = req.body.specialName;
            const specialPrice = req.body.specialPrice;
            const createAt = req.body.createAt;
            const updateAt = req.body.updateAt;
            const special = new Special({
                specialName,
                specialPrice,
                createAt ,
                updateAt
            })
            await special.save();
            res.send('POST THANH cong') 
        } catch (error) {
            console.log('Failed')
        } 
    },
    
    deleteIdSpecial: async function(req,res){
        const id = req.params.id;
        try{
            await Special.findByIdAndDelete(id)
            res.send('DELETE THANH cong') 
        }catch(error){
            console.log(error)
        }
    }
}