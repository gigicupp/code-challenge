import Head from 'next/head';
import React, { FormEvent } from 'react';
import styles from 'src/styles/create_account.module.scss';
import Image from 'next/image';
import Router from 'next/router';
import checkErrors from '../utils/checkErrors';
import checkRetypePass from '../utils/passwordConfirmation';
import validLength from '../utils/validateLength';

type CreateAccountProps = {}

type ErrorTypes = {
  username: string
  password: Array<string>
  password1: string
}

type StateTypes = {
  username: string
  show: boolean
  password: string
  show1: boolean
  password1: string
  errors: ErrorTypes
}

let hasSpecialChar = RegExp(/^(?=.*[!@#$&*])/); 
let hasLetter = RegExp(/^(?=.*[A-Za-z])/);
let hasDigit = RegExp(/^(?=.*[0-9])/) 

class CreateAccount extends React.Component<CreateAccountProps, StateTypes> {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      show: false,
      password: '',
      show1: false,
      password1: '',
      errors: {
        username: '',
        password: [],
        password1: '',
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
  }

  async handleSubmit(evt: FormEvent) {
    let { username, password, password1, errors } = this.state;
    evt.preventDefault();
    console.log("submitting form");
    if(!checkErrors(errors) || !username.length || !password.length || !password1.length) return;
    await fetch('/api/password_exposed', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      })
    })
      .then(res => res.json())
      .then(async data => {
        if (data.result) {
          alert('The password you entered is exposed, please choose a new one')
        }

        if (!data.result) {
          await fetch('api/create_new_account', {
            method: 'POST',
            body: JSON.stringify({
              username,
              password,
              password1
            })
          })
            .then(res => res.json())
            .then(data => {
              if (data.result) {
                Router.push('/success')
              }
            })
        }
      })
  }

  handleChange(event) {
    event.preventDefault();
    let { name, value } = event.target;
    let { errors } = this.state;
    switch (name) {
      case 'username':
        errors.username =
          value.length < 10 || value.length > 50
            ? 'Username must be between 10 to 50 characters long'
            : '';
        break;
      case 'password':
        errors.password = [];
        hasSpecialChar.test(value)
            ? ''
            : errors.password.push(`Must contain at least one symbol (!,@,#,$,%)`)
        hasLetter.test(value)
            ? ''
            : errors.password.push(`Must contain at least one letter`)
        hasDigit.test(value)
            ? ''
            : errors.password.push(`Must contain at least one number`)
        validLength(value)
            ? ''
            : errors.password.push(`Must be between 20 and 50 characters long`)
        break;
      case 'password1':
        errors.password1 =
          checkRetypePass('password', 'password1')
            ? ''
            : `Your password doesn't match with the previously entered password`;
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value } as Pick<StateTypes, keyof StateTypes>)
  }

  togglePassword(event) {
    event.preventDefault();
    let { id } = event.target
    this.setState(prevState => {
      return {
        [id]: !prevState[id]
      } as Pick<StateTypes, keyof StateTypes>
    })
  }

  render() {
    let { errors, username, password, password1, show, show1 } = this.state;
    return (
      <>
        <Head>
          <title>Create Account</title>
        </Head>
        <article className={styles.article}>
          <div className={styles.formContainer}>
            <Image
              priority
              src='/images/wealtfrontLogo.png'
              height={100}
              width={100}
              alt='Wealthfront Logo'
            />
            <h3>Create New Account</h3>
            <form data-testid="form" className={styles.form} onSubmit={this.handleSubmit}>
              {/* username */}
              <div className={styles.username}>
                <label className={styles.label}>Username</label>
                <input type='text'
                  placeholder='username'
                  name='username'
                  value={username}
                  className={styles.input}
                  required={true}
                  onChange={this.handleChange}>
                </input>
                {errors.username.length > 0 &&
                  <span className={styles.error}>{errors.username}</span>}
              </div>
              {/* password */}
              <div className={styles.password}>
                <label className={styles.label}>Password
                  <span onClick={this.togglePassword} id='show'>
                    {show ? 'Hide Password' : 'Show Password'}
                  </span>
                </label>
                <input
                  type={show ? 'text' : 'password'}
                  placeholder='password'
                  name='password'
                  id='password'
                  value={password}
                  className={styles.input}
                  required={true}
                  onChange={this.handleChange}>
                </input>
                {errors.password.length > 0 &&
                  <span className={styles.error}>
                    {errors.password.map(error => <div key={error}>{error}</div>)}
                  </span>}
              </div>
              {/* confirmation password */}
              <div className={styles.password}>
                <label className={styles.label}>Confirm Password
                  <span onClick={this.togglePassword} id='show1'>
                    {show1 ? 'Hide Password' : 'Show Password'}
                  </span>
                </label>
                <input
                  type={show1 ? 'text' : 'password'}
                  placeholder='confirm password'
                  name='password1'
                  id='password1'
                  value={password1}
                  className={styles.input}
                  required={true}
                  onChange={this.handleChange}>
                </input>
                {errors.password1.length > 0 &&
                  <span className={styles.error}>{errors.password1}</span>}
              </div>
              <button className={styles.button} role='button'>
                Create Account
              </button>
            </form>
          </div>
        </article>
      </>
    );
  }
}

export default CreateAccount;