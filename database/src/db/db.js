import mongose from "mongoose"

const dataConnection = () => { mongose.connect(process.env.CONNECTION).then(()=>(console.log("db connected"))).catch((err)=> (console.log("DB coonection error", err))) }

export default dataConnection