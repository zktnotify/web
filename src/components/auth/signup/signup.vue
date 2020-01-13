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

	<va-button class="ma-0" color="primary" slot="trigger" @click="launchToast">
		{{ $t('notificationsPage.toasts.launchToast') }}
	</va-button> 

</form>
</template>

<script>

import Notification from './notification'

export default {
  name: 'signup',
  components: {
		Notification,
  },
  data () {
    return {
			token: 'x',
			mobile: '',
      account: '',
      password: '',
      mobileErrors: [],
      accountErrors: [],
      passwordErrors: [],

      toastText: '',
      toastDuration: 2500,
      toastIcon: 'fa-star-o',
      toastPosition: 'bottom-right',
      isToastFullWidth: false,
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
        return
      }

			this.$axios.post("/api/wxpusher/signup", {
				token: this.token,
				mobile: this.mobile,
				account: this.account,
				password: this.password,
			})
			.then(res => {
				this.showToast(
					res.data.msg,
					{
						icon: this.toastIcon,
						position: this.toastPosition,
						duration: this.toastDuration,
						fullWidth: this.isToastFullWidth,
					},
				)
			})
			.catch(error => {
				this.showToast(
					error,
					{
						icon: this.toastIcon,
						position: this.toastPosition,
						duration: this.toastDuration,
						fullWidth: this.isToastFullWidth,
					},
				)
			})
    },
  },
  computed: {
    isToastContentPresent () {
      return !!(this.toastText || this.toastIcon)
    },
    formReady () {
      return !(this.accountErrors.length || this.passwordErrors.length)
    },
  },
}
</script>

<style lang="scss">
</style>
