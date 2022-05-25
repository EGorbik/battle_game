export const loggerTurn = (name, skills, damage, lostHealth, generalHealth) => {
    console.log(`------${name} Player Turn------`)
    console.log(`🎰 Skills: ${skills}`)
    console.log(`🔥 Damage: ${damage}`)
    console.log(`❌  Lose health: ${lostHealth}`)
    console.log(`💊 General health: ${generalHealth} + ${lostHealth} = ${generalHealth + lostHealth}`)
    console.log('-----------------------------')
}