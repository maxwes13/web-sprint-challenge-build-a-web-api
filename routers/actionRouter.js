const express = require("express")

const actionRouter = express.Router()

const action = require("../data/helpers/actionModel.js")

//GET
actionRouter.get("/:id", (req,res) => {
    action.get(req.params.id)
    .then(act=> {
        if(act) {
            res.status(200).json(act)
        } else {
            res.status(404).json({ message: "Specified action not found" })
        }
    })
    .catch(error => {
        console.log("Error getting action with specified id ", error)
        res.status(500).json({ errorMessage: "Error processing GET action with specified id" })
    }) 
})

//POST
actionRouter.post("/", (req, res) => {
    action.insert(req.body)
    .then(act => {
              res.status(201).json(act)
            })
            .catch(error => {
              console.log("Error adding action ", error)
              res.status(500).json({ errorMessage: "Error processing POST a new action" })
            })        
})

//PUT
actionRouter.put("/:id", (req,res) => {
    action.update(req.params.id, req.body)
        .then(act => {
      if(act) {
        res.status(200).json(act)
      } else {
        res.status(404).json({ message: "The action could not be updated" })
      }  
    }) 
    .catch(error => {
      console.log("Error updating project ", error)
      res.status(500).json({ errorMessage: "Error processing PUT action update" })
    })
})

//DELETE
actionRouter.delete("/:id", (req,res) => {
    action.remove(req.params.id)
    .then(count => {
        if(count > 0) {
                    res.status(200).json({ message: "The action has been deleted ", removedAction: req.params.id }) //How to add the details of item being removed? Add Req.body variable?
                  } else {
                    res.status(404).json({ message: "The action cannot be deleted" })
                  }
    })
    .catch(error => {
              console.log("Error deleting specified action ", error)
              res.status(500).json({ errorMessage: "Error processing DELETE specified action" })
            })
})


module.exports = actionRouter