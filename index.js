let express = require("express")
let fs = require("fs").promises

let cidades = "Estado/Cidades.json"
let estados = "Estado/Estados.json"
let mergeJson = "Estado/merge.json"

let jsonPincipal = null
jsonInitial()

async function jsonInitial(){
    try{
        jsonPincipal = await fs.readFile(mergeJson,"utf8")
        addStates()
    }catch (error) {
        const firstJson = {
            states:[]
        }
        await fs.writeFile(mergeJson, JSON.stringify(firstJson)).catch(err=>Console.log(err))
    }
}
async function addStates(){
    try{
        let dataestados =  await fs.readFile(estados,"utf8")
        let dataState = JSON.parse(dataestados)
        let dataPrincipla = JSON.parse(jsonPincipal)
        dataState.forEach(state => {
            const {ID,Sigla,Nome} = state
            let newstate = {
                id: ID,
                uf: Sigla,
                name: Nome,
                citys: []
            }
            dataPrincipla.states.push(newstate)
        });
        await fs.writeFile(mergeJson,JSON.stringify(dataPrincipla))
        
    }catch(err){
        console.log(err)
    }
    
}

async function addCitys(){
    console.log(dataPrincipla)
}


 