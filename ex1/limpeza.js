
var fs = require('fs')

var json = require('./batismos.json');
// O campo ref passa a ser _id e substitui-se a "/" por "_"
json.forEach(i => {
   // console.log(i)
    i._id = i.ref.split("/").join("_")
    let pai_mae = i.title.split(".")[i.title.split(".").length - 1]

    let nome = i.title.split(".")[i.title.split(".").length - 2]

    let nome_final = nome.split(":")[nome.split(":").length - 1]
    
    console.log(nome_final)

    let pai= pai_mae.split(";")[pai_mae.split(";").length - 1]
    let mae = pai_mae.split(";")[pai_mae.split(";").length - 2]

    let pai_final= pai.split(":")[pai.split(":").length- 1]
    let mae_final = mae.split(":")[mae.split(":").length - 1]

 //  console.log(mae_final)
   // console.log(pai_final)

    i.pai = pai_final
    i.mae = mae_final
    i.nome = nome_final

})


// O novo ficheiro passa a chamar-se db.json
let data = JSON.stringify(json, null, 2);
fs.writeFileSync('db.json', data);