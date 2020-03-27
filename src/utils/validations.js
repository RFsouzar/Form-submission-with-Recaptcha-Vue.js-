//Patterns para validar emails e o telefones válidos
// eslint-disable-next-line
const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
// eslint-disable-next-line
const phonePattern = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/;
//numeros repetidos
//([0-9]{9})(?!.*\1)

import validaCPF from '@/utils/validaCPF.js';
const { required, minLength,maxLength, helpers} = require("vuelidate/lib/validators");

//function para validação de campos obrigátorios somente se o checkbox estiver true
export const validateIf = (prop, validator) =>
  helpers.withParams({ type: 'validatedIf', prop }, function(value, parentVm) {
    return helpers.ref(prop, this, parentVm) ? validator(value) : true
  })
export const email = (val) => emailPattern.test(val)
export const phone = (val) => phonePattern.test(val)
const validcpf = (val) => validaCPF.validadorCPF(val)
const validCNPJ= (val) => validaCPF.validarCNPJ(val)
//export const emailMessage = val => val && val.length > 0 || 'Por favor digite o email'

export const validations= {
    form: {
      instituicao: {
        required,
        minLength: minLength(4)
      },
      cnpj: {
        required,
        minLength: minLength(14),
        validCNPJ
      },
      distribuidor: {
        required,
        minLength: minLength(4)
      },
      entregaNum:{
        required
      },
      NomeBancoNumerario:{
      },

      respContrato: {
        nome: {
          required,
          minLength: minLength(4)
        },
        telefone: {
          required,
          phone
        },
        email: {
          required,
          minLength: minLength(4),
          email
        }
      },

      respNegociacao: {
        nome: {
          required,
          minLength: minLength(4)
        },
        telefone: {
          required,
          phone
        },
        rg:{
          required: validateIf('groupNegociacao', required),
          minLength: minLength(11),
          maxLength: maxLength(13)
        },
        cpf:{
          required: validateIf('groupNegociacao', required),
          validcpf: validateIf('groupNegociacao', validcpf),
          maxLength: maxLength(11)
        },
        email: {
          required,
          minLength: minLength(4),
          email
        }
      },
      respFatura: {
        nome: {
          required,
          minLength: minLength(4)
        },
        telefone: {
          required,
          phone
        },
        email: {
          required,
          minLength: minLength(4),
          email
        },
        rg:{
          required: validateIf('groupRecFaturas', required),
          minLength: minLength(11),
          maxLength: maxLength(13)
        },
        cpf:{
          required: validateIf('groupRecFaturas', required),
          validcpf: validateIf('groupRecFaturas', validcpf),
          maxLength: maxLength(11)
        }
      },
      respBackOffice: {
        nome: {
          required,
          minLength: minLength(4)
        },
        telefone: {
          required,
          phone
        },
        rg: {
          required,
          minLength: minLength(11),
          maxLength: maxLength(13)
        },
        cpf: {
          required,
          maxLength: maxLength(11),
          validcpf
        },
        email: {
          required,
          minLength: minLength(4),
          email
        }
      },
      canaisAtend:{
          email:{
              minLength: minLength(10)
          }
      },
      transHabil:{
        group:{
          required
        }
      },
      infoTrans:{
        groupTpCartao:{
          required: validateIf('validateTransHabil', required)
        },
        groupBdCartao:{
          required: validateIf('validateTransHabil', required)
        },
        layoutrilha:{
          required: validateIf('validateTransHabil', required)
        },
        volumeTrans:{

        },
        infoAdicional:{

        }
      }
      
    }
  }