//Leitor de código de barras da Loggi
//Matheus da Silva Soares
//Versão 1.0

//Lista de pacotes
const packagesList = {
    "Pacote 1": "288355555123888",
    "Pacote 2": "335333555584333",
    "Pacote 3": "223343555124001",
    "Pacote 4": "002111555874555",
    "Pacote 5": "111187555654777",
    "Pacote 6": "111333555123333",
    "Pacote 7": "432055555123888",
    "Pacote 8": "079333555584333",
    "Pacote 9": "155333555124001",
    "Pacote 10": "333188555584333",
    "Pacote 11": "555288555123001",
    "Pacote 12": "111388555123555",
    "Pacote 13": "288000555367333",
    "Pacote 14": "066311555874001",
    "Pacote 15": "110333555123555",
    "Pacote 16": "333488555584333",
    "Pacote 17": "455448555123001",
    "Pacote 18": "022388555123555",
    "Pacote 19": "432044555845333",
    "Pacote 20": "034311555874001"
}

//Locais
const places = {
    "Sudeste": {"originOfPackages": [], "destinationOfPackages": []},
    "Sul": {"originOfPackages": [], "destinationOfPackages": []},
    "Centro-oeste": {"originOfPackages": [], "destinationOfPackages": []},
    "Nordeste": {"originOfPackages": [], "destinationOfPackages": []},
    "Norte": {"originOfPackages": [], "destinationOfPackages": []}
}

//Código dos produtos
const productCode = {
    "Jóias": "001",
    "Livros": "111",
    "Eletrônicos": "333",
    "Bebidas": "555",
    "Brinquedos": "888"
}

//Código de vendedores ativos/inativos
const activeSellers = []
const inactiveSellers = ["367"]

//Códigos válidos/invalidos
const validCodes = []
const invalidCodes = []

//Pacotes de origem na região sul com brinquedos
const southPackagesWithToys = []

//função identificadora
function split(packageCode) {
    return {
        "origin": packageCode.substring(0, 3),
        "destination": packageCode.substring(3, 6),
        "loggiCode": packageCode.substring(6, 9),
        "sellerCode": packageCode.substring(9, 12),
        "productCode": packageCode.substring(12, 15)
    }
}

//Algoritmo de validação
for (let key in packagesList) {
    if (packagesList.hasOwnProperty(key)) {
        const element = packagesList[key];
        const productData = split(element);

        if (inactiveSellers.indexOf(productData.sellerCode) > -1) {
            let invalidProduct = {[key]: productData}
            invalidCodes.push(invalidProduct);
        } else {
            let validProduct = {[key]: productData}
            validCodes.push(validProduct);
        }
    }
}

//Algoritmo de classificação
for (let i = 0; i < validCodes.length; i++) {
    const packageName = Object.keys(validCodes[i])[0];    
    const packageOriginCode = Number(validCodes[i][packageName].origin);
    const packageDestinationCode = Number(validCodes[i][packageName].destination);

    //Classificando por origem dos produtos
    if (packageOriginCode >= 1 && packageOriginCode <= 99) {
        places["Sudeste"]["originOfPackages"].push(packageName);        
    } else if (packageOriginCode >= 100 && packageOriginCode <= 199) {
        places["Sul"]["originOfPackages"].push(packageName);
    } else if (packageOriginCode >= 201 && packageOriginCode <= 299) {
        places["Centro-oeste"]["originOfPackages"].push(packageName);
    } else if (packageOriginCode >= 300 && packageOriginCode <= 399) {
        places["Nordeste"]["originOfPackages"].push(packageName);
    } else if (packageOriginCode >= 400 && packageOriginCode <= 499) {
        places["Norte"]["originOfPackages"].push(packageName);
    }

    //Classificando por destino dos produtos
    if (packageDestinationCode >= 1 && packageDestinationCode <= 99) {
        places["Sudeste"]["destinationOfPackages"].push(packageName);
    } else if (packageDestinationCode >= 100 && packageDestinationCode <= 199) {    
        places["Sul"]["destinationOfPackages"].push(packageName);
    } else if (packageDestinationCode >= 201 && packageDestinationCode <= 299) {
        places["Centro-oeste"]["destinationOfPackages"].push(packageName);
    } else if (packageDestinationCode >= 300 && packageDestinationCode <= 399) {
        places["Nordeste"]["destinationOfPackages"].push(packageName);
    } else if (packageDestinationCode >= 400 && packageDestinationCode <= 499) {
        places["Norte"]["destinationOfPackages"].push(packageName);
    }

    //Identificando pacotes da região sul com brinquedos
    if (packageOriginCode >= 100 && packageOriginCode <= 199 && productCode["Brinquedos"] == validCodes[i][packageName].productCode) {
        southPackagesWithToys.push(packageName);
    }

    //Identificando vendedores
    activeSellers.push(validCodes[i][packageName].sellerCode);
}

//Número de pacotes enviados por cada vendedor
const packagesByEachSeller = {};
activeSellers.forEach(x => { packagesByEachSeller[x] = (packagesByEachSeller[x] || 0) + 1; })
//console.log(packagesByEachSeller)

//Gerando relatório em arquivo txt:
console.log("1 - Identificar a região de destino de cada pacote, com totalização de pacotes (soma região);")
console.log("Pacotes com destino no Sudeste: " + places["Sudeste"]["destinationOfPackages"]);
console.log("Pacotes com destino no Sul: " + places["Sul"]["destinationOfPackages"]);
console.log("Pacotes com destino no Centro-oeste: " + places["Centro-oeste"]["destinationOfPackages"]);
console.log("Pacotes com destino no Nordeste: " + places["Nordeste"]["destinationOfPackages"]);
console.log("Pacotes com destino no Norte: " + places["Norte"]["destinationOfPackages"]);


















//console.log(typeof Number(validCodes[1]["Pacote 2"]["origin"]));
//console.log(places["Sul"]["originOfPackages"]);
//console.log(southPackagesWithToys);
//console.log(activeSellers);

//6 - pesquisar nos validCodes com packageName dos destinos

















