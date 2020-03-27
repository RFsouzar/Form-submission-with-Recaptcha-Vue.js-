<template>
    <div>
        <div 
        id="g-recaptcha"
        class="g-recaptcha"
        :data-sitekey="siteKey"
        >
        
        </div>
        <!-- <button @click="render">click</button> -->
        
    </div>
</template>

<script>
export default {
    name: 'Recaptcha',
    data(){
        return{
            siteKey:"6LeiTtgUAAAAAMp5NsAlQ0et_XHS_GxJ3ll2X4A8",
            widgetId:0,
        }
    },
    methods:{

        execute () {
        window.grecaptcha.execute(this.widgetId)
        },
        reset () {
        window.grecaptcha.reset(this.widgetId)
        },
        render () {
            console.log("loading...")
            if (window.grecaptcha) {
            this.widgetId = window.grecaptcha.render('g-recaptcha', {
            sitekey: this.siteKey,
            size: 'invisible',
            // badge: 'inline',
            // the callback executed when the user solve the recaptcha
            callback: (response) => {
                // emit an event called verify with the response as payload
                this.$emit('verify', response)
                // reset the recaptcha widget so you can execute it again
                this.reset() 
            }
            })
        }
    },
   
    },
    async mounted () {
    // render the recaptcha widget when the component is mounted
    await this.render()
  }
    
}
</script>

<style scoped>
    
</style>