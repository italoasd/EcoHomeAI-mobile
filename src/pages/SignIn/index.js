import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Animatable from 'react-native-animatable'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email("Email invalido").required("Informe seu email"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 digitos").required("Informe sua senha")
})

export default function SignIn() {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  function handleSignIn(data) {
    console.log(data);
  }

  return(
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>
      
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
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
          placeholder='Sua senha'
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
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.buttonRegister}
        onPress={ () => navigation.navigate('SignUp') }
        >
          <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff'
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
  buttonRegister:{
    marginTop: 14,
    alignSelf: 'center',
  },
  registerText:{
    color: '#a1a1a1'
  },
  labelError:{
    alignSelf: 'flex-start',
    color: '#ff375b',
    marginBottom: 8,
  }
})