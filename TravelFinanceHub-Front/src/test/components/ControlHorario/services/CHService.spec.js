import {ComprobarHorario} from '../../../../components/ControlHorario/services/CHService';

describe('ComprobarHorario-OB4', () => {
    test('Debería devolver true si la hora es antes de las 9:00', () => {
        const horaMock = "08:00:00";
        const resultado = ComprobarHorario(horaMock);

        expect(condiciónParser(resultado)).toBe(true);
    });
    test('Debería devolver false si la hora es entre las 9:00 y las 18:00', () => {
        const horaMock = "12:00:00";
        const resultado = ComprobarHorario(horaMock);
        expect(condiciónParser(resultado)).toBe(false);
    });
    test('Debería devolver false si la hora es después de las 18:00', () => {
        const horaMock = "20:00:00";
        const resultado = ComprobarHorario(horaMock);
        expect(condiciónParser(resultado)).toBe(false);
    });
});

function condiciónParser(valor) {
    if (valor === 1) {
        return true;
    } else {
        return false;
    }
}
