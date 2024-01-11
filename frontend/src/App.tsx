import React, { useEffect, useState, useRef, FormEvent } from 'react'
import {FiTrash} from 'react-icons/fi'
import { api } from './services/api'
import { Result } from '../../backend/src/types/Result'
import Modal from 'react-modal';
import { Bimester } from '../../backend/src/types/BimesterType';
import { Subject } from '../../backend/src/types/SubjectType';

Modal.setAppElement("#root")

interface ResultProps extends Result{

  id: string
  createdAt: string
  
}

export default function App(){
  
  //Muda a cor das notas de acordo com a discplina
  const bio = [...document.getElementsByClassName(Subject.Biologia)]
  if (bio){
    bio.forEach(function(b){
      const element: HTMLElement | null = b as HTMLElement | null
      if (element){
        element.style.backgroundColor = 'pink'
      }

    })
  }

  const art = [...document.getElementsByClassName(Subject.Artes)]
  if (art){
    art.forEach(function(b){
      const element: HTMLElement | null = b as HTMLElement | null
      if (element){
        element.style.backgroundColor = 'blue'
      }

    })
  }
  const geo = [...document.getElementsByClassName(Subject.Geografia)]
  if (geo){
    geo.forEach(function(b){
      const element: HTMLElement | null = b as HTMLElement | null
      if (element){
        element.style.backgroundColor = 'orange'
      }

    })
  }
  const soc = [...document.getElementsByClassName(Subject.Sociologia)]
  if (soc){
    soc.forEach(function(b){
      const element: HTMLElement | null = b as HTMLElement | null
      if (element){
        element.style.backgroundColor = 'purple'
      }

    })
  }

  //Notas registradas
  const [results, setResults] = useState<ResultProps[]>([])
  const [results2, setResults2] = useState<ResultProps[]>([])
  const [results3, setResults3] = useState<ResultProps[]>([])
  const [results4, setResults4] = useState<ResultProps[]>([])

  //Controle de modals
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modal2IsOpen, set2IsOpen] = useState(false)
  const [modal3IsOpen, set3IsOpen] = useState(false)
  const [modal4IsOpen, set4IsOpen] = useState(false)

  //Dados das notas
  const bimester1Ref = useRef<HTMLInputElement | null>(null)
  const bimester2Ref = useRef<HTMLInputElement | null>(null)
  const bimester3Ref = useRef<HTMLInputElement | null>(null)
  const bimester4Ref = useRef<HTMLInputElement | null>(null)
  let bimRef: string | undefined
  let subjectRef: string | undefined
  const biologyRef = useRef<HTMLButtonElement | null>(null)
  const artRef = useRef<HTMLButtonElement | null>(null)
  const geoRef = useRef<HTMLButtonElement | null>(null)
  const socioRef = useRef<HTMLButtonElement | null>(null)
  const gradeRef = useRef<HTMLInputElement | null>(null)


  useEffect(() =>{
    loadResults(Bimester.PRIMEIRO),
    loadResults2(Bimester.SEGUNDO),
    loadResults3(Bimester.TERCEIRO),
    loadResults4(Bimester.QUARTO)
  }, [])
  
  function openModal(){
    setIsOpen(true)
  }

  function closeModal(){
    setIsOpen(false)
  }

  function openModal2(){
    set2IsOpen(true)
  }

  function closeModal2(){
    set2IsOpen(false)
  }

  function openModal3(){
    set3IsOpen(true)
  }

  function closeModal3(){
    set3IsOpen(false)
  }

  function openModal4(){
    set4IsOpen(true)
  }

  function closeModal4(){
    set4IsOpen(false)
  }

  async function loadResults(bimester: string | undefined){
    const response = await api.get("/list",{
      params:{
        bimester: bimester
      }
    })
    setResults(response.data)
  }

  async function loadResults2(bimester: string | undefined){
    const response = await api.get("/list",{
      params:{
        bimester: bimester
      }
    })
    setResults2(response.data)
  }

  async function loadResults3(bimester: string | undefined){
    const response = await api.get("/list",{
      params:{
        bimester: bimester
      }
    })
    setResults3(response.data)
  }

  async function loadResults4(bimester: string | undefined){
    const response = await api.get("/list",{
      params:{
        bimester: bimester
      }
    })
    setResults4(response.data)
  }

  
  async function handleSubmit(event: FormEvent){
    event.preventDefault();
    
    if(!bimRef || !subjectRef || !gradeRef.current?.value) return
    

    
    
    
    try{
      const response = await api.post("/result", {
        bimester: bimRef,
        subject: subjectRef,
        grade: parseFloat(gradeRef.current?.value)
        
      })
  
      if (bimRef == Bimester.PRIMEIRO){
        setResults(allResults => [...allResults, response.data])
      }
      else if (bimRef == Bimester.SEGUNDO){
        setResults2(allResults => [...allResults, response.data])
      }
      else if (bimRef == Bimester.TERCEIRO){
        setResults3(allResults => [...allResults, response.data])
      }
      else if (bimRef == Bimester.QUARTO){
        setResults4(allResults => [...allResults, response.data])
      }
  
      
      alert("Nota registrada com sucesso!")
    }catch(err){
      alert("Disciplina ja registrada nesse bimestre!")
    }



  }

  async function handleDelete(id: string){
    try{

      await api.delete("/result",{
        params:{
          id: id
        }
      })

      const allResults = results.filter( (result) => result.id !== id)
      const allResults2 = results2.filter( (result) => result.id !== id)
      const allResults3 = results3.filter( (result) => result.id !== id)
      const allResults4 = results4.filter( (result) => result.id !== id)
      setResults(allResults)
      setResults2(allResults2)
      setResults3(allResults3)
      setResults4(allResults4)

    }catch(err){
      console.log(err)
    }
  }

  async function applyValue(ref : React.MutableRefObject<HTMLButtonElement | null>){
    subjectRef = ref.current?.id
  }



  async function handleClick (ref: React.MutableRefObject<HTMLInputElement | null>) {

      bimRef = ref.current?.id

  }

  return(

      <div className="w- min-h-screen bg-gray-900 flex">
      <main className="my-10 w-50 md:max-2xl:">

      {
      //Bimestre 1 Modal
      }
      <div className='flex gap-10'>
      <h1 className="text-4xl font-medium text-white">Bimestre 1</h1>
      <button className=' bg-yellow-200' onClick={openModal}>Lançar nota</button>
      <Modal 
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel='Example Modal'
      className='h-20'
      >     
      <button className=' bg-red-500' onClick={closeModal}>Fechar</button>
            <form className='flex flex-col my-6  justify-center bg-black' onSubmit={handleSubmit}>

            <h1 className="text-4xl font-medium text-white">Bimestre 1</h1>

     

<div className='flex gap-4 max'>
<button id="Biologia" type='button' className='bg-pink-300 box-border'   onClick={() => applyValue(biologyRef)} ref={biologyRef} >
<h1 className="text-4xl font-medium text-white">Biologia</h1>
</button>
<button id="Artes" type='button' className='bg-blue-600 box-border'  onClick={() => applyValue(artRef)} ref={artRef} >
<h1 className="text-4xl font-medium text-white">Artes</h1>
</button>
<button id="Geografia" type='button' className='bg-orange-400 box-border'  onClick={() => applyValue(geoRef)} ref={geoRef} >
<h1 className="text-4xl font-medium text-white">Geografia</h1>
</button>
<button id="Sociologia" type='button' className='bg-purple-800 box-border'  onClick={() => applyValue(socioRef)} ref={socioRef} >
<h1 className="text-4xl font-medium text-white">Sociologia</h1>
</button>
</div>




<h1 className="text-4xl font-medium text-white">Nota</h1>
<input type='number'
className="w-20 mb-5 p-2 rounded"
defaultValue="0"
step="0.1"
min="0"
max="10"
onKeyDown={(e) => {
  e.preventDefault();
}}
ref={gradeRef}
/>

<div>
<input type="submit"
value = "Confirmar"
id='PRIMEIRO'
className="cursor-pointer w-20 h-10  bg-yellow-200 rounded font-medium"
onClick={() => handleClick(bimester1Ref)}
ref={bimester1Ref}
/>
</div>

      </form>  
      </Modal>
      </div>

      {
      //Bimestre 1 Notas
      }
      <section className='flex gap-4'>
      {results.map((result) =>(
                <article
                key={result.id}
                
                className={'w-50 sub  rounded p-2 relative '+ (result.subject)}>
                  <p>{result.subject}</p>
                  <p><span className='font-medium'>Data: </span>{result.createdAt}</p>
                  <p><span className='font-medium'>Nota: </span>{result.grade}</p>
      
                  <button className='bg-red 500 w-7 h-7 flex items-center justify-center rounded-1g' onClick={ () => handleDelete(result.id)}>
                    <FiTrash size={18} color="red"/>
                  </button>
                </article>
      ))}
      </section>

      {
      //Bimestre 2 Modal
      }  
      <div className='flex gap-10'>
      <h1 className="text-4xl font-medium text-white">Bimestre 2</h1>
      <button className=' bg-yellow-200' onClick={openModal2}>Lançar nota</button>
      <Modal 
      isOpen={modal2IsOpen}
      onRequestClose={closeModal2}
      contentLabel='Example Modal'
      className='h-20'
      
      >     
      <button className=' bg-red-500' onClick={closeModal2}>Fechar</button>
            <form className='flex flex-col my-6 justify-center bg-black' onSubmit={handleSubmit}>
            <h1 className="text-4xl font-medium text-white">Bimestre 2</h1>



     

<div className='flex gap-4 max'>
<button id="Biologia" type='button' className='bg-pink-300 box-border'   onClick={() => applyValue(biologyRef)} ref={biologyRef} >
<h1 className="text-4xl font-medium text-white">Biologia</h1>
</button>
<button id="Artes" type='button' className='bg-blue-600 box-border'  onClick={() => applyValue(artRef)} ref={artRef} >
<h1 className="text-4xl font-medium text-white">Artes</h1>
</button>
<button id="Geografia" type='button' className='bg-orange-400 box-border'  onClick={() => applyValue(geoRef)} ref={geoRef} >
<h1 className="text-4xl font-medium text-white">Geografia</h1>
</button>
<button id="Sociologia" type='button' className='bg-purple-800 box-border'  onClick={() => applyValue(socioRef)} ref={socioRef} >
<h1 className="text-4xl font-medium text-white">Sociologia</h1>
</button>
</div>




<h1 className="text-4xl font-medium text-white">Nota</h1>
<input type='number'
className="w-20 mb-5 p-2 rounded"
defaultValue="0"
step="0.1"
min="0"
max="10"
onKeyDown={(e) => {
  e.preventDefault();
}}
ref={gradeRef}
/>

<input type="submit"
value = "Confirmar"
id='SEGUNDO'
className="cursor-pointer w-20 h-10  bg-yellow-200 rounded font-medium"
onClick={() => handleClick(bimester2Ref)}
ref={bimester2Ref}
/>
      </form>  
      </Modal>
      </div>

      {
      //Bimestre 2 Notas
      }
      <section className='flex gap-4'>
      {results2.map((result) =>(
                <article
                key={result.id}
                className={'w-50 sub  rounded p-2 relative '+ (result.subject)}>
                  <p>{result.subject}</p>
                  <p><span className='font-medium'>Data: </span>{result.createdAt}</p>
                  <p><span className='font-medium'>Nota: </span>{result.grade}</p>
      
                  <button className='bg-red 500 w-7 h-7 flex items-center justify-center rounded-1g' onClick={ () => handleDelete(result.id)}>
                    <FiTrash size={18} color="red"/>
                  </button>
                </article>
      ))}
      </section>

      {
      //Bimestre 3 Modal
      }   
      <div className='flex gap-10'>
      <h1 className="text-4xl font-medium text-white">Bimestre 3</h1>
      <button className=' bg-yellow-200' onClick={openModal3}>Lançar nota</button>
      <Modal 
      isOpen={modal3IsOpen}
      onRequestClose={closeModal3}
      contentLabel='Example Modal'
      className='h-20'
      
      > <button className=' bg-red-500' onClick={closeModal3}>Fechar</button>
            <form className='flex flex-col my-6 justify-center bg-black' onSubmit={handleSubmit}>
              
            <h1 className="text-4xl font-medium text-white">Bimestre 3</h1>



     

<div className='flex gap-4 max'>
<button id="Biologia" type='button' className='bg-pink-300 box-border'   onClick={() => applyValue(biologyRef)} ref={biologyRef} >
<h1 className="text-4xl font-medium text-white">Biologia</h1>
</button>
<button id="Artes" type='button'  className='bg-blue-600 box-border'  onClick={() => applyValue(artRef)} ref={artRef} >
<h1 className="text-4xl font-medium text-white">Artes</h1>
</button>
<button id="Geografia" type='button' className='bg-orange-400 box-border'  onClick={() => applyValue(geoRef)} ref={geoRef} >
<h1 className="text-4xl font-medium text-white">Geografia</h1>
</button>
<button id="Sociologia" type='button' className='bg-purple-800 box-border'  onClick={() => applyValue(socioRef)} ref={socioRef} >
<h1 className="text-4xl font-medium text-white">Sociologia</h1>
</button>
</div>




<h1 className="text-4xl font-medium text-white">Nota</h1>
<input type='number'
className="w-20 mb-5 p-2 rounded"
defaultValue="0"
step="0.1"
min="0"
max="10"
onKeyDown={(e) => {
  e.preventDefault();
}}
ref={gradeRef}
/>

<input type="submit"
value = "Confirmar"
id='TERCEIRO'
className="cursor-pointer w-20 h-10  bg-yellow-200 rounded font-medium"
onClick={() => handleClick(bimester3Ref)}
ref={bimester3Ref}/>
      </form>  
      </Modal>
      </div>

      {
      //Bimestre 3 Notas
      }
      <section className='flex gap-4'>
      {results3.map((result) =>(
                <article
                key={result.id}
                className={'w-50 sub  rounded p-2 relative '+ (result.subject)}>
                  <p>{result.subject}</p>
                  <p><span className='font-medium'>Data: </span>{result.createdAt}</p>
                  <p><span className='font-medium'>Nota: </span>{result.grade}</p>
      
                  <button className='bg-red 500 w-7 h-7 flex items-center justify-center rounded-1g' onClick={ () => handleDelete(result.id)}>
                    <FiTrash size={18} color="red"/>
                  </button>
                </article>
      ))}
      </section>

      {
      //Bimestre 4 Modal
      }  
      <div className='flex gap-10'>
      <h1 className="text-4xl font-medium text-white">Bimestre 4</h1>
      <button className=' bg-yellow-200' onClick={openModal4}>Lançar nota</button>
      <Modal 
      isOpen={modal4IsOpen}
      onRequestClose={closeModal4}
      contentLabel='Example Modal'
      className='h-20'
      
      > <button className=' bg-red-500' onClick={closeModal4}>Fechar</button>
            <form className='flex flex-col my-6 justify-center bg-black' onSubmit={handleSubmit}>
            <h1 className="text-4xl font-medium text-white">Bimestre 4</h1>


            

     

<div className='flex gap-4 max'>
<button id="Biologia" type='button' className='bg-pink-300 box-border'   onClick={() => applyValue(biologyRef)} ref={biologyRef} >
<h1 className="text-4xl font-medium text-white">Biologia</h1>
</button>
<button id="Artes" type='button' className='bg-blue-600 box-border'  onClick={() => applyValue(artRef)} ref={artRef} >
<h1 className="text-4xl font-medium text-white">Artes</h1>
</button>
<button id="Geografia" type='button' className='bg-orange-400 box-border'  onClick={() => applyValue(geoRef)} ref={geoRef} >
<h1 className="text-4xl font-medium text-white">Geografia</h1>
</button>
<button id="Sociologia" type='button' className='bg-purple-800 box-border'  onClick={() => applyValue(socioRef)} ref={socioRef} >
<h1 className="text-4xl font-medium text-white">Sociologia</h1>
</button>
</div>




<h1 className="text-4xl font-medium text-white">Nota</h1>
<input type='number'
className="w-20 mb-5 p-2 rounded"
defaultValue="0"
step="0.1"
min="0"
max="10"
onKeyDown={(e) => {
  e.preventDefault();
}}
ref={gradeRef}
/>

<input type="submit"
value = "Confirmar"
id='QUARTO'
className="cursor-pointer w-20 h-10  bg-yellow-200 rounded font-medium"
onClick={() => handleClick(bimester4Ref)}
ref={bimester4Ref}/>
      </form>  
      </Modal>
      </div>

      {
      //Bimestre 4 Notas
      }
      <section className='flex gap-4'>
      {results4.map((result) =>(
                <article
                key={result.id}
                className={'w-50 sub  rounded p-2 relative '+ (result.subject)}>
                  <p>{result.subject}</p>
                  <p><span className='font-medium'>Data: </span>{result.createdAt}</p>
                  <p><span className='font-medium'>Nota: </span>{result.grade}</p>
      
                  <button className='bg-red 500 w-7 h-7 flex items-center justify-center rounded-1g' onClick={ () => handleDelete(result.id)}>
                    <FiTrash size={18} color="red"/>
                  </button>
                </article>
      ))}
      </section>  


    
        </main>
        



    </div>
    

    
  )
}