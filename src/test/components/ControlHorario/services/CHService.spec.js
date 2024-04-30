import {ComprobarHorario} from '../../../../components/ControlHorario/services/CHService';

describe('ComprobarHorario',()=> {
    test('Should return true  if the hour is before 9:00',()=>{
        const hourmock = "08:00:00";
        const result = ComprobarHorario(hourmock);

        expect(parserCondition(result)).toBe(true);
    })
    test('Should return false  if the hour is between 9:00 and 18:00 ',()=>{
        const hourmock = "12:00:00";
        const result = ComprobarHorario(hourmock);
        expect(parserCondition(result)).toBe(false);
    })
    test('Should return false  if the hour is after 18:00 ',()=>{
        const hourmock = "20:00:00";
        const result = ComprobarHorario(hourmock);
        expect(parserCondition(result)).toBe(false);
    })
})
function parserCondition(valor){
    if(valor === 1){
        return true
    }
    else
    return false;
}