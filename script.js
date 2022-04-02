//Leitor de código de barras da Loggi
//Versão 1.0

//Lista de pacotes
const packagesList = {
  'Pacote 1': '288355555123888',
  'Pacote 2': '335333555584333',
  'Pacote 3': '223343555124001',
  'Pacote 4': '002111555874555',
  'Pacote 5': '111187555654777',
  'Pacote 6': '111333555123333',
  'Pacote 7': '432055555123888',
  'Pacote 8': '079333555584333',
  'Pacote 9': '155333555124001',
  'Pacote 10': '333188555584333',
  'Pacote 11': '555288555123001',
  'Pacote 12': '111388555123555',
  'Pacote 13': '288000555367333',
  'Pacote 14': '066311555874001',
  'Pacote 15': '110333555123555',
  'Pacote 16': '333488555584333',
  'Pacote 17': '455448555123001',
  'Pacote 18': '022388555123555',
  'Pacote 19': '432044555845333',
  'Pacote 20': '034311555874001',
}

//Locais
const places = {
  Sudeste: { originOfPackages: [], destinationOfPackages: [] },
  Sul: { originOfPackages: [], destinationOfPackages: [] },
  'Centro-oeste': { originOfPackages: [], destinationOfPackages: [] },
  Nordeste: { originOfPackages: [], destinationOfPackages: [] },
  Norte: { originOfPackages: [], destinationOfPackages: [] },
}

//Código dos produtos
const productCode = {
  '001': 'Jóias',
  111: 'Livros',
  333: 'Eletrônicos',
  555: 'Bebidas',
  888: 'Brinquedos',
}

//Código de vendedores ativos/inativos
const activeSellers = []
const inactiveSellers = ['367']

//Códigos válidos/invalidos
const validCodes = []
const invalidCodes = []

//Pacotes de origem na região sul com brinquedos
const southPackagesWithToys = []

//função identificadora
function split(packageCode) {
  return {
    origin: packageCode.substring(0, 3),
    destination: packageCode.substring(3, 6),
    loggiCode: packageCode.substring(6, 9),
    sellerCode: packageCode.substring(9, 12),
    productCode: packageCode.substring(12, 15),
  }
}

//Algoritmo de validação
for (let key in packagesList) {
  if (packagesList.hasOwnProperty(key)) {
    const element = packagesList[key]
    const productData = split(element)

    if (inactiveSellers.indexOf(productData.sellerCode) > -1) {
      let invalidProduct = { [key]: productData }
      invalidCodes.push(invalidProduct)
    } else {
      let validProduct = { [key]: productData }
      validCodes.push(validProduct)
    }
  }
}

//Algoritmo de classificação
for (let i = 0; i < validCodes.length; i++) {
  const packageName = Object.keys(validCodes[i])[0]
  const packageOriginCode = Number(validCodes[i][packageName].origin)
  const packageDestinationCode = Number(validCodes[i][packageName].destination)

  //Classificando por origem dos produtos
  if (packageOriginCode >= 1 && packageOriginCode <= 99) {
    places['Sudeste']['originOfPackages'].push(packageName)
  } else if (packageOriginCode >= 100 && packageOriginCode <= 199) {
    places['Sul']['originOfPackages'].push(packageName)
  } else if (packageOriginCode >= 201 && packageOriginCode <= 299) {
    places['Centro-oeste']['originOfPackages'].push(packageName)
  } else if (packageOriginCode >= 300 && packageOriginCode <= 399) {
    places['Nordeste']['originOfPackages'].push(packageName)
  } else if (packageOriginCode >= 400 && packageOriginCode <= 499) {
    places['Norte']['originOfPackages'].push(packageName)
  }

  //Classificando por destino dos produtos
  if (packageDestinationCode >= 1 && packageDestinationCode <= 99) {
    places['Sudeste']['destinationOfPackages'].push(packageName)
  } else if (packageDestinationCode >= 100 && packageDestinationCode <= 199) {
    places['Sul']['destinationOfPackages'].push(packageName)
  } else if (packageDestinationCode >= 201 && packageDestinationCode <= 299) {
    places['Centro-oeste']['destinationOfPackages'].push(packageName)
  } else if (packageDestinationCode >= 300 && packageDestinationCode <= 399) {
    places['Nordeste']['destinationOfPackages'].push(packageName)
  } else if (packageDestinationCode >= 400 && packageDestinationCode <= 499) {
    places['Norte']['destinationOfPackages'].push(packageName)
  }

  //Identificando pacotes da região sul com brinquedos
  if (
    packageOriginCode >= 100 &&
    packageOriginCode <= 199 &&
    validCodes[i][packageName].productCode == '888'
  ) {
    southPackagesWithToys.push(packageName)
  }

  //Identificando vendedores
  activeSellers.push(validCodes[i][packageName].sellerCode)
}

//Número de pacotes enviados por cada vendedor
const packagesByEachSeller = {}
activeSellers.forEach((x) => {
  packagesByEachSeller[x] = (packagesByEachSeller[x] || 0) + 1
})

//Função que retorna o destino em nome
function findDestinyName(destinyCode) {
  if (Number(destinyCode) >= 1 && Number(destinyCode) <= 99) {
    return 'Sudeste'
  } else if (Number(destinyCode) >= 100 && Number(destinyCode) <= 199) {
    return 'Sul'
  } else if (Number(destinyCode) >= 201 && Number(destinyCode) <= 299) {
    return 'Centro-oeste'
  } else if (Number(destinyCode) >= 300 && Number(destinyCode) <= 399) {
    return 'Nordeste'
  } else if (Number(destinyCode) >= 400 && Number(destinyCode) <= 499) {
    return 'Norte'
  }
}

//Função que retorna o tipo de produto
function findProductType(code) {
  return productCode[code]
}

//Função que retorna o tipo de produto nos pacotes
function findTypeAndDestiny(packageName) {
  for (let i = 0; i < validCodes.length; i++) {
    if (Object.keys(validCodes[i])[0] == packageName) {
      return {
        type: validCodes[i][packageName].productCode,
        destiny: validCodes[i][packageName].destination,
      }
    }
  }
}

//Gerando relatório para a Loggi:
console.log('\nNome: Matheus da Silva Soares \nUniversidade: UCB - Universidade Católica de Brasília \nCurso: Análise e Desenvolvimento de Sistemas \nSemestre: 1/4 (primeiro) \nFormação: 12/2023')
//Questão 1
console.log(
  '\n1. Identificar a região de destino de cada pacote, com totalização de pacotes (soma região):'
)
console.log(
  '\nPacotes com destino no Sudeste: ' +
    places['Sudeste']['destinationOfPackages'] +
    ' | Total de pacotes: ' +
    places['Sudeste']['destinationOfPackages'].length
)
console.log(
  '\nPacotes com destino no Sul: ' +
    places['Sul']['destinationOfPackages'] +
    ' | Total de pacotes: ' +
    places['Sul']['destinationOfPackages'].length
)
console.log(
  '\nPacotes com destino no Centro-oeste: ' +
    places['Centro-oeste']['destinationOfPackages'] +
    ' | Total de pacotes: ' +
    places['Centro-oeste']['destinationOfPackages'].length
)
console.log(
  '\nPacotes com destino no Nordeste: ' +
    places['Nordeste']['destinationOfPackages'] +
    ' | Total de pacotes: ' +
    places['Nordeste']['destinationOfPackages'].length
)
console.log(
  '\nPacotes com destino no Norte: ' +
    places['Norte']['destinationOfPackages'] +
    ' | Total de pacotes: ' +
    places['Norte']['destinationOfPackages'].length
)

//Questão 2
console.log(
  '\n2. Saber quais pacotes possuem códigos de barras válidos e/ou inválidos:'
)
console.log('\nPacotes com códigos de barras válidos: ')
for (let package in validCodes) {
  console.log(Object.keys(validCodes[package])[0])
}
console.log('\nPacotes com códigos de barras inválidos: ')
for (let package in invalidCodes) {
  console.log(Object.keys(invalidCodes[package])[0])
}

//Questão 3
console.log(
  '\n3. Identificar os pacotes que têm como origem a região Sul e Brinquedos em seu conteúdo:'
)
console.log(
  southPackagesWithToys.length > 0
    ? southPackagesWithToys
    : 'Nenhum pacote encontrado.'
)

//Questão 4
console.log(
  '\n4. Listar os pacotes agrupados por região de destino (Considere apenas pacotes válidos):'
)
console.log('\nPacotes com destino na região Sul: ')
console.log(places['Sul']['destinationOfPackages'])
console.log('\nPacotes com destino na região Sudeste: ')
console.log(places['Sudeste']['destinationOfPackages'])
console.log('\nPacotes com destino na região Centro-oeste: ')
console.log(places['Centro-oeste']['destinationOfPackages'])
console.log('\nPacotes com destino na região Nordeste: ')
console.log(places['Nordeste']['destinationOfPackages'])
console.log('\nPacotes com destino na região Norte: ')
console.log(places['Norte']['destinationOfPackages'])

//Questão 5
console.log(
  '\n5. Listar o número de pacotes enviados por cada vendedor (Considere apenas pacotes válidos):'
)
const sellers = Object.keys(packagesByEachSeller)
for (let seller in sellers) {
  console.log(
    'vendedor: ' +
      sellers[seller] +
      '; pacotes enviados: ' +
      packagesByEachSeller[sellers[seller]]
  )
}

//Questão 6
console.log(
  '\n6. Gerar o relatório/lista de pacotes por destino e por tipo (Considere apenas pacotes válidos):'
)
validCodes.map((x) => {
  let package = findTypeAndDestiny(Object.keys(x)[0])
  console.log(
    Object.keys(x)[0],
    ' - ',
    findProductType(package.type),
    ' - ',
    findDestinyName(package.destiny)
  )
})

//Questão 7, 8 e 9
console.log(
  '\n7. Se o transporte dos pacotes para o Norte passa pela Região Centro-Oeste, quais são os pacotes que devem ser despachados no mesmo caminhão?' +
  '\n8. Se todos os pacotes fossem uma fila qual seria a ordem de carga para o Norte no caminhão para descarregar os pacotes da Região Centro Oeste primeiro;' +
  '\n9. No item acima considerar que as jóias fossem sempre as primeiras a serem descarregadas;'
)

let northPackages = []

//Questão 10
console.log('\n10. Listar os pacotes inválidos:')
for (let package in invalidCodes) {
  console.log(Object.keys(invalidCodes[package])[0])
}

console.log('\nFim do relatório. :)')