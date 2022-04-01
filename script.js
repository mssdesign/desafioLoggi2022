//Leitor de código de barras da Loggi
//Matheus da Silva Soares
//Versão 1.0

//Lista de pacotes
const packagesList = [{
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
}]

//Locais
const places = [{
    "Sudeste": [{"min": 001, "max": 099}, {"originProducts": [], "destinationProducts": []}],
    "Sul": [{"min": 100, "max": 199}, {"originProducts": [], "destinationProducts": []}],
    "Centro-oeste": [{"min": 201, "max": 299}, {"originProducts": [], "destinationProducts": []}],
    "Nordeste": [{"min": 300, "max": 399}, {"originProducts": [], "destinationProducts": []}],
    "Norte": [{"min": 400, "max": 499}, {"originProducts": [], "destinationProducts": []}]
}]

//Código dos produtos
const productsCode = [{
    "Jóias": "001",
    "Livros": "111",
    "Eletrônicos": "333",
    "Bebidas": "555",
    "Brinquedos": "888"
}]

//Código de vendedores ativos/inativos
const activeSellers = []
const inactiveSellers = ["367"]

//Códigos válidos/invalidos
const validCodes = []
const invalidCodes = []

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
for (let i = 0; i < packagesList.length; i++) {
    for (let key in packagesList[i]) {
        if (packagesList[i].hasOwnProperty(key)) {
            const element = packagesList[i][key];
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
}

for (let i = 0; i < validCodes.length; i++) {
    const productName = Object.keys(validCodes[i])[0];
    console.log(product)
}






















