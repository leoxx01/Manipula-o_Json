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
        //countCityState("GO")
        //fiveStatesByMoreCitys()
        //fiveStatesByMinusCitys()
        
    }catch (error) {
        const firstJson = {
            states:[]
        }
        await fs.writeFile(mergeJson, JSON.stringify(firstJson)).catch(err=>Console.log(err))
        addStates()
        addCitys()
        jsonSoloState()
    }
}
async function addStates(){
    try{
        let dataestados =  await fs.readFile(estados,"utf8")
        let dataState = JSON.parse(dataestados)
        let dataPrincipal = JSON.parse(jsonPincipal)
        dataState.forEach(state => {
            const {ID,Sigla,Nome} = state
            let newstate = {
                id: ID,
                uf: Sigla,
                name: Nome,
                citys: []
            }
            dataPrincipal.states.push(newstate)
        });
        await fs.writeFile(mergeJson,JSON.stringify(dataPrincipal))
        
    }catch(err){
        console.log(err)
    }
    
}

async function addCitys(){
    let datacidades = await fs.readFile(cidades,'utf8')
    let datacitys = JSON.parse(datacidades)
    let dataPrincipal = JSON.parse(jsonPincipal)
    
    let index = null
    
    dataPrincipal.states.forEach((data)=>{
        datacitys.forEach(city=>{
            if(city.Estado === data.id){
                 index = dataPrincipal.states.findIndex(state=>{
                     return state.id === city.Estado
                 })
                 dataPrincipal.states[index].citys.push(city)
             } 
         })
    })
    await fs.writeFile(mergeJson,JSON.stringify(dataPrincipal))  
}

async function countCityState(uf){
    let list = []
    let dataPrincipal = JSON.parse(jsonPincipal)
    dataPrincipal.states.forEach(state=>{
        if(state.uf === uf){
            console.log(state.citys.length)
        }
    })
}

async function fiveStatesByMoreCitys(){
    let dataPrincipal = JSON.parse(jsonPincipal)
    let list = []
    dataPrincipal.states.forEach(state=>{
        list.push({uf:state.uf,cidades:state.citys.length})
    })
    list.sort((a,b)=>{
        return b.cidades-a.cidades
    })
    for(let i=0; i <5; i++){
        console.log(list[i])
    }
}

async function fiveStatesByMinusCitys(){
    let dataPrincipal = JSON.parse(jsonPincipal)
    let list = []
    let newarray = []
    dataPrincipal.states.forEach(state=>{
        list.push({uf:state.uf,cidades:state.citys.length})
    })
    list = list.sort((a,b)=>{
        return a.cidades-b.cidades
    })
    for(let i=0; i <5; i++){
        newarray.push(list[i])
        newarray.sort((a,b)=>{
            return b.cidades-a.cidades
        })
    }
    console.log(newarray)
}
async function jsonSoloState(){
    let dataPrincipal = JSON.parse(jsonPincipal)
    let cont = dataPrincipal.states.length
    for(let i = 0 ; i < cont-1;i++){
        const seprateStateJson = {
            state: dataPrincipal.states[i]
        }
        fs.writeFile(dataPrincipal.states[i].name, JSON.stringify(seprateStateJson))
        console.log(seprateStateJson)
    }
}