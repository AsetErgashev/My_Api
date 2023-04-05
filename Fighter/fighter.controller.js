import Fighter from "../model/Fighter.js"
import asyncHandler from 'express-async-handler'
import { validationResult } from "express-validator"

export const createFighter = asyncHandler(async(req,res) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
    return res.status(400).json({message: "Error in register", errors})
    }

    const {name, age, category, weight} = req.body
    const fighter = await Fighter.create({name, age, category,weight})

    await fighter.save()
    res.json(fighter)
})

export const getAll = async(req,res) => {
    const fighter = await Fighter.find()

    if(!fighter)
    {
        return res.status(404).json({message: 'Fighters is not defined'})
    }

    res.json(fighter)
}

export const getOne = async(req,res) => {
    const {id} = req.params
    const fighter = await Fighter.findById(id)

    if(!fighter)
    {
        return res.status(404).json({message: 'Fighter with id is not defined'})
    }

    res.json({fighter})
}


export const updateFighter = async (req, res) => {
    const id = req.params.id;
  
    try {
      const updatedFighter = await Fighter.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
  
      if (!updatedFighter) {
        return res.status(404).send({
          message: `Cannot update Fighter with id=${id}. Fighter not found!`
        });
      }
      const updateFighter = await Fighter.findById(id)
      res.send({ message: "Fighter updated successfully.", updateFighter });
    } catch (err) {
      res.status(500).send({
        message: "Error updating Fighter with id=" + id
      });
    }
  };
  

export const deleteFighter = async(req,res) => {
    const {id} = req.params
    const deleteFighter = await Fighter.findByIdAndDelete(id)

    if(!deleteFighter) {
        return res.status(404).json({message: 'This fighter already deleted'})
    }
    res.json({message: 'Fighter deleted succesfully'})
}