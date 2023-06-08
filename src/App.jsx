import { useEffect, useState } from 'react'
import './App.css'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import useBuscaCep from "./hooks/useBuscaCep"

function App() {

  const useFormSchema = yup.object().shape({
    nome: yup.string().required("O nome é obrigatório!").min(10, "O nome precisa ter pelo menos 10 letras"),
    email: yup.string().required("O e-mail é obrigatório").email("O e-mail não é válido"),
    data: yup.date().min("2023-01-01", "Data inferior ao mínimo"),

    cep: yup.string().required("O cep é obrigatório").min(8, "O CEP precisa ter 8 caracteres"),
    logradouro: yup.string().required("O logradouro é obrigatório"),
    numero: yup.string().required("O número é obrigatório"),
    complemento: yup.string(),
    bairro: yup.string().required("O bairro é obrigatório"),
    cidade: yup.string().required("A cidade é obrigatória"),
    estado: yup.string().required("O estado é obrigatório"),
  })

  const {register, formState: {errors}, handleSubmit, getValues, setValue } = useForm({resolver: yupResolver(useFormSchema), defaultValues: {
    data: "2023-06-07",
    nome: "",
    email: ""
  }})

  const buscaCep = async () => {
    const cep = getValues('cep')

    const {data, error} = await useBuscaCep(cep)

    if(error == null){
      setValue('logradouro', data.logradouro)
      setValue('bairro', data.bairro)
      setValue('cidade', data.localidade)
      setValue('estado', data.uf)
    }
  }

  const submit = (dados) => {
    console.log(dados)
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        {/* o name do input precisa ser o mesmo no resgister */}
        <input type='text' placeholder='nome' name='nome' {...register('nome', {required: true})} />
        {!!errors.nome && <span>{errors.nome.message}</span>}
        <input type='email' placeholder='email' name='email' {...register('email', {required: true})} />
        {!!errors.email && <span>{errors.email.message}</span>}
        <input type='date' placeholder='data' name='data' {...register('data')} />
        {!!errors.data && <span>{errors.data.message}</span>}
        
        
        <input type='text' placeholder='cep' 
          name='cep' 
          {...register('cep', {required: true, onBlur: () => buscaCep()})} 
          // onBlur={() => buscaCep()}

        />
        {!!errors.cep && <span>{errors.cep.message}</span>}
        
        
        <input type='text' placeholder='logradouro' name='logradouro' {...register('logradouro', {required: true})} />
        {!!errors.logradouro && <span>{errors.logradouro.message}</span>}
        <input type='text' placeholder='numero' name='numero' {...register('numero', {required: true})} />
        {!!errors.numero && <span>{errors.numero.message}</span>}
        <input type='text' placeholder='bairro' name='bairro' {...register('bairro', {required: true})} />
        {!!errors.bairro && <span>{errors.bairro.message}</span>}
        <input type='text' placeholder='complemento' name='complemento' {...register('complemento')} />
        {!!errors.complemento && <span>{errors.complemento.message}</span>}
        <input type='text' placeholder='cidade' name='cidade' {...register('cidade')} />
        {!!errors.cidade && <span>{errors.cidade.message}</span>}
        <input type='text' placeholder='estado' name='estado' {...register('estado')} />
        {!!errors.estado && <span>{errors.estado.message}</span>}
        <button type='submit'>enviar</button>
      </form>
    </>
  )
}

export default App
