import {getRandomValueFromInterval} from "./customRandom";
import {
    constitutionMaxValue,
    constitutionMinValue,
    damageСoef, healthСoef,
    strengthMaxValue,
    strengthMinValue
} from "../constants/ stats";

export const generateRandomStats = () => {
    let strength = getRandomValueFromInterval(strengthMinValue, strengthMaxValue);
    let constitution = getRandomValueFromInterval(constitutionMinValue, constitutionMaxValue);
    let damage = strength * damageСoef;
    let health = constitution * healthСoef;
    let orderSkills = 0;

    return {strength, constitution, damage, health, orderSkills}
}

