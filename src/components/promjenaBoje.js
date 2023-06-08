// Mijenja boju ovisno o ocjeni

function bojaPromijeni(ocjena) {
    let rgb;
    if (ocjena < 0.5) {
        ocjena = ocjena / 0.5
        rgb = `rgba(255, ${Math.round((ocjena) * 255)}, 0, 1)`
    } else {
        ocjena = 1 - ((ocjena - 0.5) / 0.5)
        rgb = `rgba(${Math.round((ocjena) * 255)}, 255, 0, 1)`
    }
    return rgb; 
}

export default bojaPromijeni;