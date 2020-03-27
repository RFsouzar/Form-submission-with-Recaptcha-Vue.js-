<template>
  <div class="home">
      <q-toolbar style="background-color:#404242">
        <div class="col">
        </div>
    </q-toolbar>

    <div class="row q-pt-sm justify-center">
    </div>
    <div class="row justify-center">
      <p class="fontTitle">Formulário de Cadastro</p>
    </div>

    <q-page class="flex flex-center sizeflex">
      <q-card style="width:75rem" bordered>
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-stepper v-model="step" vertical color="primary" animated>
              <q-step
                :name="1"
                title="Dados da Instituição"
                color="primary"
                class="bystep"
                icon="edit"
                @click="step = 1"
                :done="step > 1"
              >
                <div class="row">
                  <div class="col">
                    <q-input
                      v-model="$v.form.instituicao.$model"
                      label="Instituição:"
                      color="primary"
                      hint
                      dense
                      :error="$v.form.instituicao.$error"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Digite o nome da Instituição']"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <q-input
                      v-model="$v.form.cnpj.$model"
                      label="CNPJ:"
                      color="primary"
                      placeholder="00.000.000/0000-00"
                      dense
                      v-mask="'##.###.###/####-##'"
                      :error="$v.form.cnpj.$error"
                      error-message="Digite um CNPJ válido!"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <q-input
                      v-model="$v.form.distribuidor.$model"
                      label="Distribuidor:"
                      color="primary"
                      hint
                      dense
                      :error="$v.form.distribuidor.$error"
                      required
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Digite o Distribuidor']"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="col q-pt-sm q-pb-sm">
                      <label style="font-size:14px;" for="entregNum">Entrega do numerário:</label>
                    </div>
                      <q-option-group
                        :options="optionsInst"
                        label="Notifications"
                        color="primary"
                        size="sm"
                        inline
                        dense
                        v-model="$v.form.entregaNum.$model"
                        @input="clearCampoNum"
                      />
                  </div>
                </div>
                <div class="row">
                  <div class="col" v-show="form.entregaNum == 'banco'">
                    <q-input
                      v-model="$v.form.NomeBancoNumerario.$model"
                      label="Qual?:"
                      color="primary"
                      hint="Informar se a remessa de numerário será entregue através de operação própria ou por algum Banco (informar qual)"
                      dense
                      :error="$v.form.NomeBancoNumerario.$error"
                      error-message="Informe um banco para a entrega do numerário"
                    />
                  </div>
                </div>

                <q-stepper-navigation>
                  <!-- <q-btn @click="step = 2" color="primary" label="Continue" /> -->
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="2"
                title="Responsáveis"
                color="primary"
                class="bystep"
                icon="edit"
                @click="step = 2"
                :done="step > 2"
              >
                <div class="flex flex-center">
                  <div class="font">Responsáveis</div>
                </div>

                <div class="q-pb-sm">
                  <q-card>
                    <q-card-section>
                      <div id="contratos">
                        <div class="col center">Contratos</div>
                        <div class="col">
                          <div class="form-group">
                            <q-input
                              v-model.trim="$v.form.respContrato.nome.$model"
                              label="Nome:"
                              color="primary"
                              hint
                              dense
                              :error="$v.form.respContrato.nome.$error"
                              required
                              lazy-rules
                              :rules="[ val => val && val.length > 0 || 'Por favor digite o nome']"
                            />
                          </div>
                        </div>
                        <div class="col">
                          <q-input
                            v-model="$v.form.respContrato.telefone.$model"
                            label="Telefone:"
                            color="primary"
                            placeholder="(00) 00000-0000"
                            type="tel"
                            v-mask="['(##) ####-####', '(##) #####-####']"
                            dense
                            :error="$v.form.respContrato.telefone.$error"
                            error-message="Digite um telefone válido!"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            v-model="$v.form.respContrato.email.$model"
                            label="Email:"
                            color="primary"
                            hint
                            dense
                            :error="$v.form.respContrato.email.$error"
                            error-message="Por favor digite um email válido!"
                          />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <div class="q-pb-sm">
                  <q-card>
                    <q-card-section>
                      <div id="negociacao">
                        <div class="col center">Negociação</div>
                        <div class="col">
                          <q-input
                            v-model="$v.form.respNegociacao.nome.$model"
                            label="Nome:"
                            color="primary"
                            hint
                            dense
                            :error="$v.form.respNegociacao.nome.$error"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Por favor digite o nome']"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            v-model="$v.form.respNegociacao.telefone.$model"
                            label="Telefone:"
                            color="primary"
                            placeholder="(00) 00000-0000"
                            type="tel"
                            v-mask="['(##) ####-####', '(##) #####-####']"
                            dense
                            :error="$v.form.respNegociacao.telefone.$error"
                            error-message="Digite um telefone válido!"
                          />
                        </div>
                        <div class="col">
                           <q-checkbox
                            v-model="form.respNegociacao.groupNegociacao"
                            color="primary"
                            size="sm"
                            label="Acesso ao Portal de Controle de Numerário: "
                          />
                        </div>
                        <div class="row q-gutter-md" v-show="form.respNegociacao.groupNegociacao !== false">
                          <div class="col-12 msgCampos">
                            Informar RG e CPF do responsável por negociação de remessa de numerário para liberação de acesso ao Portal de Controle de Numerário
                          </div>
                          <div class="col">
                            <q-input
                              v-model="$v.form.respNegociacao.rg.$model"
                              label="RG:"
                              color="primary"
                              v-mask="['##.###.###-XX']"
                              placeholder="00.000.000-0"
                              dense
                              :error="$v.form.respNegociacao.rg.$error"
                              error-message="Digite um RG válido!"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              v-model="$v.form.respNegociacao.cpf.$model"
                              label="CPF:"
                              color="primary"
                              dense
                              hint="Digite o CPF sem pontos e traço"
                              :error="$v.form.respNegociacao.cpf.$error"
                              error-message="Digite um CPF válido!"
                            />
                          </div>
                        </div>
                        <div class="col">
                          <q-input
                            v-model="$v.form.respNegociacao.email.$model"
                            label="Email:"
                            color="primary"
                            hint
                            dense
                            :error="$v.form.respNegociacao.email.$error"
                            error-message="Por favor digite um email válido"
                          />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <div class="q-pb-sm">
                  <q-card>
                    <q-card-section>
                      <div id="faturas">
                        <div class="col center">Recebimentos e Pagamentos de Faturas</div>
                        <div class="col">
                          <q-input
                            v-model="$v.form.respFatura.nome.$model"
                            label="Nome:"
                            color="primary"
                            dense
                            :error="$v.form.respFatura.nome.$error"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Por favor digite o nome']"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            v-model="$v.form.respFatura.telefone.$model"
                            label="Telefone:"
                            color="primary"
                            type="tel"
                            placeholder="(00) 00000-0000"
                            v-mask="['(##) ####-####', '(##) #####-####']"
                            dense
                            :error="$v.form.respFatura.telefone.$error"
                            error-message="Digite um telefone válido!"
                          />
                        </div>
                         <div class="col">
                           <q-checkbox
                            v-model="form.respFatura.groupRecFaturas"
                            color="primary"
                            size="sm"
                            label="Acesso ao Portal de Faturamento: "
                          />
                        </div>
                        <div class="row q-gutter-md" v-show="form.respFatura.groupRecFaturas !== false">
                          <div class="col-12 msgCampos">
                            Informar RG e CPF do responsável pelo recebimento e pagamento de faturas para liberação de acesso ao Portal de Faturamento
                          </div>
                          <div class="col">
                            <q-input
                              v-model="$v.form.respFatura.rg.$model"
                              label="RG:"
                              color="primary"
                              placeholder="00.000.000-0"
                              v-mask="['##.###.###-XX']"
                              dense
                              :error="$v.form.respFatura.rg.$error"
                              error-message="Digite um RG válido!"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              v-model="$v.form.respFatura.cpf.$model"
                              label="CPF:"
                              color="primary"
                              placeholder="000.000.000-00"
                              dense
                              :error="$v.form.respFatura.cpf.$error"
                              error-message="Digite um CPF válido!"
                            />
                          </div>
                        </div>
                        <div class="col">
                          <q-input
                            v-model="$v.form.respFatura.email.$model"
                            label="Email:"
                            color="primary"
                            hint
                            dense
                            :error="$v.form.respFatura.email.$error"
                            error-message="Por favor digite um email válido"
                          />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <div class="q-pb-sm">
                  <q-card>
                    <q-card-section>
                      <div id="backoffice">
                        <div class="col center">BackOffice Apoio 2º Nível</div>
                        <div class="col">
                          <q-input
                            v-model="$v.form.respBackOffice.nome.$model"
                            label="Nome:"
                            color="primary"
                            hint="Digite o nome do Responsável"
                            dense
                            :error="$v.form.respBackOffice.nome.$error"
                            required
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Por favor digite o Nome']"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            v-model="$v.form.respBackOffice.telefone.$model"
                            label="Telefone:"
                            color="primary"
                            placeholder="(00) 00000-0000"
                            type="tel"
                            hint="Digite o telefone do Responsável"
                            v-mask="['(##) ####-####', '(##) #####-####']"
                            dense
                            :error="$v.form.respBackOffice.telefone.$error"
                            error-message="Digite um telefone válido"
                          />
                        </div>
                        <div class="row q-gutter-md">
                          <div class="col">
                            <q-input
                              v-model="$v.form.respBackOffice.rg.$model"
                              label="RG:"
                              color="primary"
                              placeholder="00.000.000-0"
                              v-mask="['##.###.###-XX']"
                              hint="Digite o RG do Responsável"
                              dense
                              :error="$v.form.respBackOffice.rg.$error"
                              error-message="Digite um RG válido"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              v-model="$v.form.respBackOffice.cpf.$model"
                              label="CPF:"
                              color="primary"
                              placeholder="000.000.000-00"
                              hint="Digite o CPF do Responsável"
                              dense
                              :error="$v.form.respBackOffice.cpf.$error"
                              error-message="Digite um CPF válido"
                            />
                          </div>
                        </div>
                        <div class="col">
                          <q-input
                            v-model="$v.form.respBackOffice.email.$model"
                            label="Email:"
                            color="primary"
                            hint="Digite o email do Responsável"
                            dense
                            :error="$v.form.respBackOffice.email.$error"
                            error-message="Por favor digite um email válido"
                          />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <div class="q-pb-sm">
                  <q-card>
                    <q-card-section>
                      <div id="canalAtendimento">
                        <div class="col center">Canais de Atendimento</div>
                        <div class="col q-pt-sm">
                          <q-input
                            v-model="form.canaisAtend.telefone"
                            label="Telefone(s):"
                            color="primary"
                            type="tel"
                            placeholder="(00) 00000-0000"
                            hint="Descrever telefone para direcionamento de ligações com pedido de informações referente a sua Instituição"
                            dense
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Por favor digite o Telefone']"
                          />
                        </div>
                        <div class="col q-pt-md">
                          <q-input
                            v-model="$v.form.canaisAtend.email.$model"
                            label="Email(s):"
                            color="primary"
                            hint="Descrever email para direcionamento de mensagens com pedido de informações referente a sua Instituição"
                            dense
                            :error="$v.form.canaisAtend.email.$error"
                            :rules="[ val => val && val.length > 0  || 'Por favor digite uma ou mais emails válidos']"
                          />
                        </div>
                        <div class="col q-pt-md">
                          <q-input
                            v-model="form.canaisAtend.chat"
                            label="Chat:"
                            color="primary"
                            hint="Descrever chat para direcionamento de informações referente a sua Instituição"
                            dense
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Por favor digite um meio de contato por Chat']"
                          />
                        </div>
                        <div class="col q-pt-md">
                          <q-input
                            v-model="form.canaisAtend.outros"
                            label="Outros:"
                            color="primary"
                            hint="Descrever algum canal de atendimento para informações referente a sua Instituição"
                            dense
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Por favor digite algum meio de Atendimento']"
                          />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <q-stepper-navigation>
                </q-stepper-navigation>
              </q-step>
              <q-step
                :name="3"
                title="Tipos de Transações"
                color="primary"
                class="bystep"
                icon="edit"
                @click="step = 3"
              >
                <div class="row">
                  <q-toolbar>
                    <p class="font"> Transações que serão Habilitadas </p>
                  </q-toolbar>
                </div>
                <q-field
                  ref="toggle"
                  :value="$v.form.transHabil.group.$model"
                  :error="$v.form.transHabil.group.$error"
                  error-message="Você deve escolher ao menos uma opção!"
                  borderless
                  dense
                >
                <template v-slot:control>
                <q-option-group
                  :options="options"
                  type="checkbox"
                  size="sm"
                  @input="habilitaCampos($event)"
                  color="primary"
                  v-model="$v.form.transHabil.group.$model"
                />
                </template>
                </q-field>
                <q-slide-transition>
                  <div>

                  
                  <div v-show="visible">
                    <div class="row font" >
                      <q-toolbar>
                        <q-toolbar-title >Informações Transacionais</q-toolbar-title>
                      </q-toolbar>
                    </div>

                    <div class="row">
                      <div class="col-3">Tipo do Cartão: </div>
                      <div class="col">
                        <q-field
                          ref="toggle"
                          :value="$v.form.infoTrans.groupTpCartao.$model"
                          :error="$v.form.infoTrans.groupTpCartao.$error"
                          error-message="Você deve escolher ao menos uma opção!"
                          borderless
                          dense
                        >
                        <template v-slot:control>
                          <q-option-group
                            :options="optionsTpCartao"
                            label="Notifications"
                            type="checkbox"
                            color="primary"
                            inline
                            v-model="$v.form.infoTrans.groupTpCartao.$model"
                          />
                        </template>
                        </q-field>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-3">Bandeira dos Cartões: </div>
                      <div class="col">
                        <q-field
                            ref="toggle"
                            :value="$v.form.infoTrans.groupBdCartao.$model"
                            :error="$v.form.infoTrans.groupBdCartao.$error"
                            error-message="Você deve escolher ao menos uma opção!"
                            borderless
                            dense
                          >
                          <template v-slot:control>
                            <q-option-group
                              :options="optionsBdCartao"
                              label="Notifications"
                              type="checkbox"
                              color="primary"
                              inline
                              v-model="$v.form.infoTrans.groupBdCartao.$model"
                            />
                          </template>
                        </q-field>
                      </div>
                      <div class="col">
                        <q-input
                          v-show="form.infoTrans.groupBdCartao.indexOf('outras') !== -1"
                          v-model="form.infoTrans.outrasBd"
                          dense
                          color="primary"
                          hint
                          lazy-rules
                          :rules="[ val => val && val.length > 0 || 'Informe alguma Bandeira']"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col q-pt-sm">
                        <q-input
                          v-model="$v.form.infoTrans.layoutrilha.$model"
                          filled
                          color="primary"
                          dense
                          :error="$v.form.infoTrans.layoutrilha.$error"
                          error-message="Favor entrar com as informações de trilhas dos Cartões"
                          type="textarea"                     
                          placeholder="Se houver transação com cartão, informar layout da(s) trilha(s)"
                        />
                      </div>
                    </div>
                    </div>
                    <div class="row q-pt-sm">
                      <div class="col">
                        <q-input
                          v-model="form.infoTrans.volumeTrans"
                          filled
                          color="primary"
                          label="Volume transacional estimado e ticket médio do saque:"
                          dense
                          type="textarea"
                          placeholder=" Exemplo:
    • 20.000 transações de saque no mês 1 / 30.000 transações de saque no mês 2.  Ticket médio de R$ 280,00;
    • 15.000 transações de saldo no mês 1 / 17.000 transações de saldo no mês 2; ...
    • 10.000 transações extrato no mês 1 / 12.000 transações extrato no mês 2; ..."
                        />
                      </div>
                    </div>

                    <div class="row q-pt-sm">
                      <div class="col">
                        <q-input
                          v-model="form.infoTrans.infoAdicional"
                          filled
                          label="Informações Adicionais:"
                          color="primary"
                          hint
                          dense
                          type="textarea"
                        />
                      </div>
                    </div>
                  </div>
                </q-slide-transition>

                <q-stepper-navigation>
                  <!-- <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" /> -->
                </q-stepper-navigation>

              </q-step>
                  
                  <div class="row q-pt-xl justify-center">
                    <label class="importantInfo">Informações importantes</label>
                  </div>
                  <div class="importantInfoAlign q-pt-md" style="width:80%;height:80%">
                      <p>
                        &#10004; Produtos e serviços;
                      </p>
                      <p>
                        &#10004; <u>Lembre-se de que cada negócio é diferente. Por isso, nunca use um documento genérico sem antes lê-lo muito bem, examinando quais aspectos servem e quais não servem para a sua empresa.</u>.
                      </p>
                      <p>
                        &#10004; Após examinar um modelo genérico, leia os de uma empresa parecida com a sua. Por exemplo, se você vende produtos online, pode dar uma olhada nos Termos e Condições de uma loja virtual.
                      </p>
                      <p>
                        &#10004; Depois de considerar as necessidades da sua empresa e de fazer toda a pesquisa, você estará pronto para criar seus próprios Termos e Condições. Usando como referência os documentos que reuniu em sua pesquisa, selecione certas frases ou parágrafos completos que se adequem a sua empresa.
                      </p>
                  </div>

            </q-stepper>
            <div class="row justify-center">
              <div class="g-recaptcha" data-sitekey="6Ld2Q9kUAAAAAJLIS7JmPvXkRst8D70nkozyM1yx"></div>
            </div>
            <div class="row justify-center">
              <q-btn @click="submit" color="primary" label="Enviar" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
    <q-inner-loading :showing="innerVisible">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
  </div>
</template>

<script>
import '@/config/index.js'
import {validations} from '../utils/validations';
export default {
  name: "Home",

  data() {
    return {

      step: 1,

      form: {
        instituicao: "",
        cnpj: "",
        distribuidor: "",
        entregaNum: "operacaopropria",
        nomeBancoNumerario:"",

        respContrato: {
          nome: "",
          telefone: "",
          email: ""
        },
        respNegociacao: {
          nome: "",
          telefone: "",
          email: "",
          groupNegociacao: false,
          rg: "",
          cpf: ""
        },
        respFatura: {
          nome: "",
          telefone: "",
          email: "",
          groupRecFaturas: false,
          rg: "",
          cpf: ""
        },
        respBackOffice: {
          nome: "",
          telefone: "",
          email: "",
          rg: "",
          cpf: ""
        },

        canaisAtend: {
          telefone: "",
          email: "",
          chat: "",
          outros: ""
        },

        transHabil: {
          group: []
        },

        infoTrans: {
          validateTransHabil: false, //retorna true se o checkbox de transações com cartão for habilitado
          groupTpCartao: [],
          groupBdCartao: [],
          outrasBd:"",
          layoutrilha: "",
          volumeTrans: "",
          infoAdicional: ""
        }
      },
      optionsInst: [
        {
          label: "Operação própria",
          value: "operacaopropria"
        },
        {
          label: "Banco",
          value: "banco"
        }
      ],

      optionsTpCartao: [
        {
          label: "Débito",
          value: "Debito"
        },
        {
          label: "Pré-Pago",
          value: "pre-pago"
        }
      ],

      optionsBdCartao: [
        {
          label: "Visa",
          value: "visa"
        },
        {
          label: "MasterCard",
          value: "mastercard"
        },
        {
          label: "Elo",
          value: "elo"
        },
        {
          label: "Outras. Qual?",
          value: "outras"
        }
      ],

      options: [
        {
          label: "Opção 1 (QR Code, sem cartão)",
          value: "op1"
        },
        {
          label: "Opção2 (Débito ou Pré pago)",
          value: "op2"
        },
        { label: "Opção 3", value: "op3" },
        { label: "Opção 4", value: "op4" }
      ],

      innerVisible:false,
      visible: false
    };
  },

  computed:{
    isOptional(){
      return true;
    }
  },
  validations,
  methods: {

    submit() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        this.$q.notify({
          message: "Preencha todos os campos Obrigatórios!",
          timeout: 1000,
          position:"center",
          type: "negative",
          color: "negative",
          textColor: "white",
          icon: "warning"
        });
        return;
      }

      var captcha = document.querySelector("#g-recaptcha-response").value;
      //console.log(captcha);

      let data = JSON.stringify({
        captcha
      });

        this.innerVisible = true
      this.$axios()
        .post(process.env.VUE_APP_SERVER + process.env.VUE_APP_RECAPTCHA, data)
        .then(response => {
          //console.log(response.data);
          if(response.data.success == false){
            this.$q.notify({
              message: "Recaptcha não validado!",
              timeout: 1000,
              position:"center",
              type: "negative",
              color: "negative",
              textColor: "white",
              icon: "warning"
            });
            window.grecaptcha.reset();
            this.innerVisible = false
          }
          else{
            this.sendData();
          }
          
        });
    },

    sendData(){
      this.$axios()
        .post(process.env.VUE_APP_SERVER + process.env.VUE_APP_RDS, this.form)
        .then(response => {
          //console.log(response);
          this.innerVisible = false
          if(response.data == "Success"){
            this.$q
              .dialog({
                title: "Cadastro",
                message: "Dados enviados com Sucesso!",
                ok: {
                  push: true,
                  color: "negative",
                  position: "center"
                },
                persistent: true
              })
              .onOk(()=>{
                document.location.reload();
              })
          }else{
            this.$q.notify({
                message: "Erro no envio dos Dados, Tente Novamente",
                timeout: 3000,
                position:"center",
                type: "negative",
                color: "negative",
                textColor: "white",
                icon: "warning"
              });
              window.grecaptcha.reset();
              this.innerVisible = false
          }
        });

    },

    
    onReset() {
      //console.log("teste");
      this.name = null;
      this.age = null;
      this.accept = false;
    },

    habilitaCampos(event) {
     // console.log(event);
      for (let i = 0; i < event.length; i++) {
        if (
          event.indexOf("op2") != -1 ||
          event.indexOf("op3") != -1 ||
          event.indexOf("op4") != -1
        ) {
          this.visible = true;
          this.form.infoTrans.validateTransHabil = true;
        } else if (
          (event.indexOf("op1") &&
            event.indexOf("op2") == -1) ||
          event.indexOf("op3") == -1 ||
          event.indexOf("op4") == -1
        ) {
          this.visible = false;
          this.form.infoTrans.validateTransHabil = false;
        }
      }
    },

    validaCamposGroup1() {
      if (
        this.form.cnpj !== "" &&
        this.form.instituicao !== "" &&
        this.form.distribuidor !== ""
      ) {
        this.step = 2;
      } else {
        this.$q.notify({
          message: "Favor Preencher os campos acima!",
          timeout: 3000,
          type: "negative",
          color: "negative",
          textColor: "white",
          icon: "warning"
        });
      }
    },

    clearCampoNum() {
      if (this.form.entregaNum == "operacaopropria") {
        this.form.NomeBancoNumerario = "";
      }
    }
  },
  mounted(){
    // console.log(process.env.VUE_APP_SERVER + process.env.VUE_APP_RECAPTCHA + process.env.VUE_APP_RDS);
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

.font {
  color: #050505;
  font-size: 1.3rem;
  text-align: center;
}
.fontTitle {
  font-size: 1.0rem;
}
.center {
  text-align: center;
}
.bystep {
  cursor: pointer;
}
.sizeflex {
  min-height: 660px !important;
}
.importantInfo{
  font-style: italic;
  text-decoration: underline;
  font-family: "Arial", Times, serif;

}
.importantInfoAlign{
  width: 48em;
  height: 80%;
  margin-left: auto;
  margin-right: auto;
  font-family: "Arial", Times, serif;
}

.msgCampos{
  font-size: 11px;
  font-family: "Arial", Times, serif;
  color:#E53935;
}
</style>
