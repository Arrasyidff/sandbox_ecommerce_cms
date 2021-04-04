<template>
  <section>
    <div class="cover-login">
      <div class="card-cover-login">
        <h1>Welcome Admin</h1>
        <p>are you ready to process our data</p>
      </div>
    </div>
    <div class="form-login">
      <form @submit.prevent="loginOn">
        <h1>SIGN IN</h1>
        <div class="mb-3">
          <label for="InputEmailLogin" class="form-label">Email address</label>
          <input v-model="email" type="email" class="form-control" id="InputEmailLogin" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="InputPasswordLogin" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="InputPasswordLogin">
        </div>
        <div v-if="error !== null" class="mb-3">
          <div class="alert alert-danger" role="alert">
            {{error}}
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </section>
</template>

<script>
import Axios from '../config/axiosInstance'

export default {
  name: 'Login-Page',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    loginOn () {
      if (this.email === '') {
        this.error = 'email cant be empty'
        setTimeout(() => {
          this.error = null
        }, 3000)
      } else if (this.password === '') {
        this.error = 'password cant be empty'
        setTimeout(() => {
          this.error = null
        }, 3000)
      } else {
        Axios({
          url: 'login-admin',
          method: 'POST',
          data: {
            email: this.email,
            password: this.password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('access_token', data.access_token)
            this.$router.push('/')
          })
          .catch(err => {
            this.error = err.response.data.msg
            setTimeout(() => {
              this.error = null
            }, 3000)
          })
      }
    }
  }
}
</script>

<style scoped>
section {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.cover-login {
  width: 50%;
  background: purple;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0,0,0,0.5),#2f3841), url("https://sasanadigital.com/wp-content/uploads/2019/12/featured-image-marketplace.jpg");
  color: white;
}

.card-cover-login {
  text-align: end;
  min-height: 200px;
  width: 70%;
}

.card-cover-login h1 {
  font-weight: bold;
  font-size: 50px;
}

.card-cover-login p {
  font-size: 20px;
}

.form-login {
  width: 50%;
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: red; */
}

.form-login form {
  width: 450px;
  padding: 20px;
}

.form-login form h1 {
  margin-bottom: 20px;
}

.alert {
  padding: 5px 10px !important;
}
</style>
