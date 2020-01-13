<template>
<form @submit.prevent="onsubmit()">
  <va-input
    v-model="account"
    type="string"
		placeholder="必填"
    :label="$t('auth.account')"
    :error="!!accountErrors.length"
    :error-messages="accountErrors"
  />

  <va-input
    v-model="password"
    type="password"
		placeholder="必填"
    :label="$t('auth.password')"
    :error="!!passwordErrors.length"
    :error-messages="passwordErrors"
  />

  <va-input
    v-model="mobile"
    type="phone"
		placeholder="选填"
    :label="$t('auth.mobile')"
    :error="!!mobileErrors.length"
    :error-messages="mobileErrors"
  />

  <va-input
    v-model="token"
    type="text"
		placeholder="必填"
    :label="$t('auth.token')"
  />

  <div class="d-flex justify--center mt-3">
    <va-button type="submit" class="my-0">{{ $t('auth.signup') }}</va-button>
  </div>
</form>
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
			token: 'x',
			mobile: '',
      account: '',
      password: '',
      mobileErrors: [],
      accountErrors: [],
      passwordErrors: [],
    }
  },
	mounted: function() {
		this.getToken()
	},
  methods: {
		getToken() {
			this.token = this.$route.query.uid
		},
    onsubmit () {
      this.accountErrors = this.account ? [] : ['Account is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      if (!this.formReady) {
      //this.$router.push({ name: 'signup' })
        return
      }

			var url = "/api/wxpusher/signup"
			console.log(url)
			this.$axios.post(url, {
				token: this.token,
				mobile: this.mobile,
				account: this.account,
				password: this.password,
			})
			.then(res => {
				console.log(res)
			})
			.catch(error => {
				console.log(error)
			})
    },
  },
  computed: {
    formReady () {
      return !(this.accountErrors.length || this.passwordErrors.length)
    },
  },
}
</script>

<style lang="scss">
</style>
