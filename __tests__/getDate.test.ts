import chai from 'chai';
const { expect } = chai;
import { getAtualDate } from '../src/plugins/dates/getAtualDate'

describe('Teste de formato de datas', () => {

    it('Deve retornar a data no formato dd/mm/yyyy', () => {
        const expression = new RegExp(/\d{2}\/\d{2}\/\d{4}/g);
        const dateBr = getAtualDate('br');
        expect(
            expression.test(dateBr)
        ).to.be.equal(true);
    });

    it('Deve retornar a data no formato dd/mm/yyyy hh:mm:ss', () => {
        const expression = new RegExp(/\d{2}\/\d{2}\/\d{4}\s{1}\d{2}\:\d{2}\:\d{2}/g);
        const dateBr = getAtualDate('br-hour');
        expect(
            expression.test(dateBr)
        ).to.be.equal(true);
    });

    it('Deve retornar a data no formato yyyy-mm-dd', () => {
        const expression = new RegExp(/\d{4}\-\d{2}\-\d{2}/g);
        const dateBr = getAtualDate('db');
        expect(
            expression.test(dateBr)
        ).to.be.equal(true);
    });

    it('Deve retornar a data no formato yyyy-mm-dd hh:mm:ss', () => {
        const expression = new RegExp(/\d{4}\-\d{2}\-\d{2}\s{1}\d{2}\:\d{2}\:\d{2}/g);
        const dateBr = getAtualDate('db-hour');
        expect(
            expression.test(dateBr)
        ).to.be.equal(true);
    });

    it('Deve vir um retorno vazio', () => {
        const dateBr = getAtualDate('');
        expect(dateBr)
        .to.be.equal('')
    });

});

// describe('Em caso de erro', () => {



// })