const express = require("express")

const projectRouter = express.Router()

const project = require("../data/helpers/projectModel.js")



//GET 
projectRouter.get("/:id", (req,res) => {
    project.get(req.params.id)
    .then(resource => {
        if(resource) {
            res.status(200).json(resource)
        } else {
            res.status(404).json({ message: "Resource not found" })
        }
    })
    .catch(error => {
        console.log("Error getting resource with specified id ", error)
        res.status(500).json({ errorMessage: "Error processing GET project with specified id" })
    }) 
})



//POST
projectRouter.post("/", (req, res) => {
    project.insert(req.body)
    .then(proj => {
              res.status(201).json(proj)
            })
            .catch(error => {
              console.log("Error adding project ", error)
              res.status(500).json({ errorMessage: "Error processing POST a new project" })
            })        
})



//PUT
projectRouter.put("/:id", (req,res) => {
    project.update(req.params.id, req.body)
        .then(proj => {
      if(proj) {
        res.status(200).json(proj)
      } else {
        res.status(404).json({ message: "The project could not be updated" })
      }  
    }) 
    .catch(error => {
      console.log("Error updating project ", error)
      res.status(500).json({ errorMessage: "Error processing PUT project update" })
    })
})

//DELETE
projectRouter.delete("/:id", (req,res) => {
    project.remove(req.params.id)
    .then(count => {
        if(count > 0) {
                    res.status(200).json({ message: "The project has been deleted ", removedProject: req.params.id }) //How to add the details of item being removed? Add Req.body variable?
                  } else {
                    res.status(404).json({ message: "The project cannot be deleted" })
                  }
    })
    .catch(error => {
              console.log("Error deleting specified project ", error)
              res.status(500).json({ errorMessage: "Error processing DELETE specified project" })
            })
})



//GET 
projectRouter.get("/:id/actions", (req,res) => {
    project.getProjectActions(req.params.id)
    .then(actions => {
        if(actions) {
            res.status(200).json(actions)
        } else {
            res.status(404).json({ message: "List of actions not found" })
        }
    })
    .catch(error => {
        console.log("Error getting list of actions for specified project ", error)
        res.status(500).json({ errorMessage: "Error processing GET list of actions for specified project" })
    }) 
})



module.exports = projectRouter