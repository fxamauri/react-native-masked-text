import BaseMask from './_base.mask';

const CPF_MASK = '999.999.999-99';
const CNPJ_MASK = '99.999.999/9999-99';

export default class CpfCnpjMask extends BaseMask {
    static getType() {
        return 'cpf-cnpj';
    }

    getValue(value, settings) {
        let mask = this._getMask(value, settings);
        return this.getVMasker().toPattern(value, mask);
    }

    getRawValue(maskedValue, settings) {
        return super.removeNotNumbers(maskedValue);
    }

    //nao testado nesse novo mask
    validate(value, settings) {
        let valueToValidate = super.getDefaultValue(value);
        valueToValidate = this.getValue(value, settings);

        let mask = this._getMask(value, settings);

        return valueToValidate.length === mask.length;
    }

    _getMask(value, settings) {

        let numbers = super.removeNotNumbers(value);

        let mask = CPF_MASK;

        if(numbers.length >= 12) {
            mask = CNPJ_MASK;
        }

        return mask;
    }
}