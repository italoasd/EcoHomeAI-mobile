import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Animatable from 'react-native-animatable'
import * as yup from 'yup'

const schema = yup.object({
  user: yup.string().min(1, "Nome invalido").required("Informe seu nome"),
  email: yup.string().email("Email invalido").required("Informe seu email"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 digitos").required("Informe sua senha")
})

export default function SignUp() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  function handleSignIn(data) {
    console.log(data);
  }

  return(
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Cadastrar-se</Text>
      </Animatable.View>
      
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
      <Text style={styles.title}>Nome</Text>
        <Controller
          control={control}
          name="user"
          render={({ field: {onChange, onBlur, value} }) => (
            <TextInput
          placeholder='Digite seu nome...'
          style={[
            styles.input, {
              borderBottomWidth: errors.user && 1,
              borderColor: errors.user && '#ff375b'
            }]}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value} 
          />
          )}
        />
        {errors.user && <Text style={styles.labelError}>{errors.user?.message}</Text>}

        <Text style={styles.title}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: {onChange, onBlur, value} }) => (
            <TextInput
          placeholder='Digite um email...'
          style={[
            styles.input, {
              borderBottomWidth: errors.email && 1,
              borderColor: errors.email && '#ff375b'
            }]}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value} 
          />
          )}
        />
        {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

        <Text style={styles.title}>Senha</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: {onChange, onBlur, value} }) => (
            <TextInput
          placeholder='Defina uma senha'
          style={[
            styles.input, {
              borderBottomWidth: errors.password && 1,
              borderColor: errors.password && '#ff375b'
            }]}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value} 
          secureTextEntry={true}
          />
          )}
        /> 
        {errors.password && <Text style={styles.labelError}>{errors.password?.message}</Text>}

            

        <TouchableOpacity style={styles.button} onPress={handleSubmit(handleSignIn)}>
          <Text style={styles.buttonText}>Cadastrar-se</Text>
        </TouchableOpacity>
      </Animatable.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#283760',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  containerForm:{
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd:'5%',
  },
  title:{
    fontSize: 20,
    marginTop: 28,
  },
  input:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button:{
    backgroundColor: '#34E291',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  labelError:{
    alignSelf: 'flex-start',
    color: '#ff375b',
    marginBottom: 8,
  }
})