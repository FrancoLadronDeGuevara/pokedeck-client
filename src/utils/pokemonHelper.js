export const defaultAvatars = [
    {
        name: 'Mew',
        url: 'https://res.cloudinary.com/dnlvoza12/image/upload/v1705047000/avatars/hitqfj4slfmzhtdbi99v.png'
    },
    {
        name: 'Jigglypuff',
        url: 'https://res.cloudinary.com/dnlvoza12/image/upload/v1705120525/avatars/eoomdm8czkbqyjwgjyca.png'
    },
    {
        name: 'Pikachu',
        url: 'https://res.cloudinary.com/dnlvoza12/image/upload/v1705120529/avatars/b2sqa60qxr6w7muy24xo.png'
    },
    {
        name: 'Bulbasaur',
        url: 'https://res.cloudinary.com/dnlvoza12/image/upload/v1705046844/avatars/kybvbzfniye2uln75zje.png'
    },
    {
        name: 'Mankey',
        url: 'https://res.cloudinary.com/dnlvoza12/image/upload/v1705046844/avatars/vgfub6hp4yfmei2hyhwh.png'
    },
    {
        name: 'Charmander',
        url: 'https://res.cloudinary.com/dnlvoza12/image/upload/v1705046844/avatars/ga3rwmzabhffjpcxe7kk.png'
    },
    {
        name: 'Odish',
        url: 'https://res.cloudinary.com/dnlvoza12/image/upload/v1705046845/avatars/s5haaqctvg0t7tukf4yc.png'
    },
    {
        name: 'Meowth',
        url: 'https://res.cloudinary.com/dnlvoza12/image/upload/v1705046844/avatars/xuyomuywzqdyw99epgmr.png'
    },
    {
        name: 'Zubat',
        url: 'https://res.cloudinary.com/dnlvoza12/image/upload/v1705046844/avatars/vdfapxidzy3mwxhewnnl.png'
    },
    {
        name: 'Eevee',
        url: 'https://res.cloudinary.com/dnlvoza12/image/upload/v1705046845/avatars/hw3tzzaqe7glnm3xkzut.png'
    },
    {
        name: 'Snorlax',
        url: 'https://res.cloudinary.com/dnlvoza12/image/upload/v1705046980/avatars/mcfdtjezf4q2zccknq5w.png'
    },
    {
        name: 'Psyduck',
        url: 'https://res.cloudinary.com/dnlvoza12/image/upload/v1705046989/avatars/oowp3szrr8al1gayxg3e.png'
    }
]

export const firstTypeList = [
    "NORMAL",
    "PLANTA",
    "FUEGO",
    "AGUA",
    "VOLADOR",
    "LUCHA",
    "VENENO",
    "TIERRA",
    "ROCA",
    "HADA",
    "BICHO",
    "FANTASMA",
    "ELÉCTRICO",
    "PSÍQUICO",
    "HIELO",
    "DRAGÓN",
    "ACERO",
];

export const secondTypeList = [
    "SIN 2° TIPO",
    "NORMAL",
    "PLANTA",
    "FUEGO",
    "AGUA",
    "VOLADOR",
    "LUCHA",
    "VENENO",
    "TIERRA",
    "ROCA",
    "HADA",
    "BICHO",
    "FANTASMA",
    "ELÉCTRICO",
    "PSÍQUICO",
    "HIELO",
    "DRAGÓN",
    "ACERO",
];

export const cardRarity = [
    'Normal',
    'Rara',
    'Epica',
    'Legendaria'
]

export const getTypeColor = (type) => {
    switch (type) {
        case 'NORMAL':
            return '#A0A2A0'; 
        case 'PLANTA':
            return '#3DA224'; 
        case 'FUEGO':
            return '#E72324'; 
        case 'AGUA':
            return '#2481F0'; 
        case 'VOLADOR':
            return '#82BAF0'; 
        case 'LUCHA':
            return '#FF8100'; 
        case 'VENENO':
            return '#923FCC'; 
        case 'TIERRA':
            return '#92501B'; 
        case 'ROCA':
            return '#B0AB82'; 
        case 'HADA':
            return '#EF71F0'; 
        case 'BICHO':
            return '#92A212'; 
        case 'FANTASMA':
            return '#713F71'; 
        case 'ELÉCTRICO':
            return '#FAC100'; 
        case 'PSÍQUICO':
            return '#EF3F7A'; 
        case 'HIELO':
            return '#3DD9FF'; 
        case 'DRAGÓN':
            return '#4F60E2'; 
        case 'ACERO':
            return '#60A2B9'; 
        default:
            return '#000000'; 
    }
}

export const typeList = [
    "Todos los tipos",
    "Normal",
    "Planta",
    "Fuego",
    "Agua",
    "Volador",
    "Lucha",
    "Veneno",
    "Tierra",
    "Roca",
    "Hada",
    "Bicho",
    "Fantasma",
    "Eléctrico",
    "Psíquico",
    "Hielo",
    "Dragón",
    "Acero",
]

export const rarityList = [
    'Todas las rarezas',
    'Normal',
    'Rara',
    'Epica',
    'Legendaria'
]