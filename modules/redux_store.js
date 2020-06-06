import { createStore, combineReducers } from 'redux'

let sheetDataReducer = function (state = {}, action) {
  console.log('Action', action)

  if (action.type == 'SET_NAMES') {
    return Object.assign(state, {
      character_name: action.character_name,
      player_name: action.player_name,
    })
  }

  if (action.type == 'SET_CHARACTER_RACE') {
    return Object.assign(state, {
      race_data: action.race_data,
    })
  }

  if (action.type == 'SET_CHARACTER_CLASS') {
    return Object.assign(state, {
      class_data: action.class_data,
    })
  }

  if (action.type == 'SET_ATTRIBUTES') {
    return Object.assign(state, {
      attributes_data: action.attributes_data,
    })
  }

  if (action.type == 'SET_EQUIPMENTS') {
    return Object.assign(state, {
      selected_weapon: action.weapon,
      selected_armor: action.armor,
      selected_grimo: action.grimo,
    })
  }

  if (action.type == 'SET_SPELLS') {
    return Object.assign(state, {
      spells: action.spells,
      ultimates: action.ultimates,
    })
  }

  let mock = {
    "character_name": "fulano",
    "player_name": "fulano",
    "attributes_data": {
      "strength": 12,
      "agility": 12,
      "intelligence": 0,
      "charisma": 0,
      "destiny": 6
    },
    "race_data": {
      "id": "recRn6dbYul0mr3DF",
      "createdTime": "2020-05-21T00:17:46.000Z",
      "name": "Goblins",
      "description": "Os Goblins são a raça mais dominante no mundo das Terras Místicas. Alegres e trabalhadores, os Goblins ergueram verdadeiros impérios com sua perseverança e trabalho árduo. Nos dias de hoje, eles sofrem com os impactos do Blecaute, e lutam diariamente para que possam reconquistar tudo que foi perdido.",
      "attachments": [{
        "id": "attVp9F46GGGWSyCM",
        "url": "https://dl.airtable.com/.attachments/0eb638c4081f4b153905c4aa268e8e8c/cc1547c7/Goblin.png",
        "filename": "Goblin.png",
        "size": 676208,
        "type": "image/png",
        "thumbnails": {
          "small": {
            "url": "https://dl.airtable.com/.attachmentThumbnails/6b7e982b85763afeaa68184f21481767/d5d4315f",
            "width": 79,
            "height": 36
          },
          "large": {
            "url": "https://dl.airtable.com/.attachmentThumbnails/2b0d405e2f7e416c43cf198d985e6caf/f96fd836",
            "width": 1127,
            "height": 512
          },
          "full": {
            "url": "https://dl.airtable.com/.attachmentThumbnails/38f38a29050ef2970cc5acaaefc5f756/3fb0c9e0",
            "width": 3000,
            "height": 3000
          }
        }
      }],
      "available": true
    },
    "class_data": {
      "id": "rec1uccBo4HEguytE",
      "createdTime": "2020-05-21T00:17:03.000Z",
      "name": "Caçador",
      "description": "Seja para Caçar, Rastrear ou Construir, os Caçadores estão sempre prontos quando o assunto é sobrevivência. Alguns priorizam o combate a distância, mas outros preferem confiar na boa e velha Adaga.",
      "attachments": [{
        "id": "att1x7n7B2rR1A4Ul",
        "url": "https://dl.airtable.com/.attachments/7d72dc9398f198db904782ae37d6b756/0e080d9d/WhatsAppImage2020-05-30at09_49_031.jpeg",
        "filename": "WhatsApp Image 2020-05-30 at 09_49_03 (1).jpeg",
        "size": 350927,
        "type": "image/jpeg",
        "thumbnails": {
          "small": {
            "url": "https://dl.airtable.com/.attachmentThumbnails/6e881989a34b3427c062ea5b5cce03b2/f833a793",
            "width": 35,
            "height": 36
          },
          "large": {
            "url": "https://dl.airtable.com/.attachmentThumbnails/7cb357b5305d828d4e578e57ac346e3d/78a05398",
            "width": 512,
            "height": 521
          },
          "full": {
            "url": "https://dl.airtable.com/.attachmentThumbnails/0bd3fd5b6435b301d28ef06020466a21/63b60d10",
            "width": 3000,
            "height": 3000
          }
        }
      }],
      "damage_expectations": ["recipN2QqImu7wFZ5", "reciKBgjJahhRCkjo", "recCGIAfWrkhiYw45", "recsxMTMSd56LigeL"],
      "initial_items": ["rec7AYpMRpMmUiKhJ", "recWKFu718KUbIHrg", "rec9Hbq4dAP2dqx2J"],
      "available": true,
      "hp_increase_formula": "D10 + 6",
      "mp_increase_formula": "D4",
      "handle": "hunter",
      "initial_mp": "5",
      "initial_hp": "10"
    },
    "selected_weapon": {
      "id": "rec7AYpMRpMmUiKhJ",
      "createdTime": "2020-05-29T19:15:59.000Z",
      "name": "Arco Inicial",
      "description": "Um Arco de madeira rígida entregue aos iniciantes da Caça.",
      "attachments": [{
        "id": "att0j0gI40zrUu4Mz",
        "url": "https://dl.airtable.com/.attachments/765fdd065784e8d857cd706e46ce50ea/fde69bb7/ArcoInicial.png",
        "filename": "ArcoInicial.png",
        "size": 34817,
        "type": "image/png",
        "thumbnails": {
          "small": {
            "url": "https://dl.airtable.com/.attachmentThumbnails/f27adff1898bc65a990f53aee1b9f421/7e46dc03",
            "width": 36,
            "height": 36
          },
          "large": {
            "url": "https://dl.airtable.com/.attachmentThumbnails/34acb8ab7b3f14f30ce987406d4e630f/50178d81",
            "width": 500,
            "height": 500
          },
          "full": {
            "url": "https://dl.airtable.com/.attachmentThumbnails/f310bc1747b1e71beb4cbae48d38c52f/fe9b0f14",
            "width": 3000,
            "height": 3000
          }
        }
      }],
      "used_by": ["rec1uccBo4HEguytE"],
      "essence_slots": 0,
      "base_damage_formula": "D8 + 3",
      "item_types": ["recPvyJKjSYZKOxHn"],
      "tier": 0,
      "handle": "initial_bow",
      "_used_by__handle": ["hunter"],
      "_item_types__handle": ["weapon"],
      "attribute": ["recoWocqHa1uycybp"],
      "attribute__handle": ["agility"]
    },
    "selected_armor": {
      "id": "rec9Hbq4dAP2dqx2J",
      "createdTime": "2020-05-30T07:15:06.000Z",
      "name": "Veste Comuns",
      "description": "Roupas comuns de aventureiros comuns, nada aqui chama muita atenção, as vestes estão minimamente cuidadas, mas ainda não fornece nenhum tipo de proteção.",
      "attachments": [{
        "id": "attocMRjM3rd4o7ZG",
        "url": "https://dl.airtable.com/.attachments/786ec0f55918a5ce9e7cbdd63b92880b/aae5b1bb/2020-05-3004.36.33.jpg",
        "filename": "2020-05-30 04.36.33.jpg",
        "size": 85375,
        "type": "image/jpeg",
        "thumbnails": {
          "small": {
            "url": "https://dl.airtable.com/.attachmentThumbnails/c91c34ee4e46a01884e4737844d1073b/3de114e6",
            "width": 36,
            "height": 36
          },
          "large": {
            "url": "https://dl.airtable.com/.attachmentThumbnails/69333f0eec9ce6390e4be715396ac5f2/436f8792",
            "width": 360,
            "height": 360
          },
          "full": {
            "url": "https://dl.airtable.com/.attachmentThumbnails/bf580a1d9ba3dfef20f6fbd188337eba/385150da",
            "width": 3000,
            "height": 3000
          }
        }
      }],
      "used_by": ["recfzVATgY5LRntab", "rec1uccBo4HEguytE"],
      "essence_slots": 0,
      "item_types": ["rec3QR1o6fkcOoa0r"],
      "tier": 0,
      "handle": "initial_rags",
      "_used_by__handle": ["adventurer", "hunter"],
      "_item_types__handle": ["armor"]
    }
  }

  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA == "true") {
    return mock
  } else {
    return state
  }
}

let rootReducer = combineReducers({
  sheet_data: sheetDataReducer,
})

export let store = createStore(
  rootReducer,
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
