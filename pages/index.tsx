
import type { GetServerSideProps, NextPage } from 'next'
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useState } from 'react'
import { prisma } from "../lib/prisma"
import Head from 'next/head'
import { useRouter } from 'next/router'
import Person from '../src/20.svg'
import { Navbar } from '../components/Navbar'

interface FormData {
  email: string,
  firstname: string,
  lastname: string,
  instance: string,
  id: string
}

interface contacts {
  contact: {
    id: string
    email: string
    firstname: string
    lastname: string
    instance: string
  }[]
}


const Home = ({contact}: contacts) => {
  const [form, setForm] = useState<FormData>({ email: '', firstname: '', lastname: '', instance: '', id: '' })
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function create(data: FormData) {
    try {
      fetch('http://localhost:3000/api/create', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(() => {
        setForm(
          { email: '', firstname: '', lastname: '', instance: '', id: '' })
        refreshData()
      })


    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (data: FormData) => {
    try {
      create(data)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
    <div>
      <Head>
        <title>Guest Book – Rumah IVAA</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    
    <Navbar/>
    </div>
    <div className='flex justify-between'>
          <section className='w-[25%] bg-purple-100'>
            <div className='flex justify-start items-center bg-purple-600 py-4 px-4'>
                <span className='px-2'><Person /></span>
                <h6 className='text-white text-md'>Pengunjung</h6>
            </div>
              <div className='bg-purple-100 h-screen'>
                <ul className='p-4 ml-2 mr-2 divide-y-[1px] divide-purple-400 '>
                  {contact.map((contacts: { id: Key | null | undefined; firstname: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; lastname: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; instance: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined} ) => (
                    <li key={contacts.id}>
                      <div className='flex'>
                        <div className='p-1 pb-2 pt-2'>
                          <h3 className='font-semibold'>{contacts.firstname} {contacts.lastname}</h3>
                          <p className='text-gray-800 text-sm'>{contacts.instance}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
          </section>
          <section className='w-2/3 m-10'>
          <div className='w-full px-10'>
                  <h2 className='text-3xl font-bold mb-10 text-left'>Selamat Datang</h2>
                    <form onSubmit={e => {
                      e.preventDefault()
                      handleSubmit(form)
                      } } className= ''>
                     
                        <label className="block mb-2 text-sm font-medium text-gray-800">Email</label>
                        <input type="text"
                            placeholder="Email" 
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value, })}
                            className="appearance-none border-b mb-6 md:w-1/2 border--500 p-4 text-sm py-2 " />
                       
                      
                      <label className="flex mb-2 text-sm font-medium text-gray-800">Name Depan</label>
                      <input type="text"
                        placeholder="Nama Depan"
                        value={form.firstname}
                        onChange={e => setForm({ ...form, firstname: e.target.value })}
                        className="flex-wrap border-b mb-6 w-1/2 border-gray-500 p-4 text-sm  py-2 " />
                      
                      <label className="block mb-2 text-sm font-medium text-gray-800">Name Belakang</label>
                      <input type="text"
                        placeholder="Nama Belakang"
                        value={form.lastname}
                        onChange={e => setForm({ ...form, lastname: e.target.value })}
                        className="tracking-wide block border-b mb-6 w-1/2 border-gray-500 p-4 text-sm  py-2 " />
                      
                      <label className="block mb-2 text-sm font-medium text-gray-800">Instansi</label>
                      <input type="text"
                        placeholder="Instansi"
                        value={form.instance}
                        onChange={e => setForm({ ...form, instance: e.target.value })}
                        className="appearance-none border-b mb-6 md:w-1/2 border-gray-500 p-4 text-sm py-2" />
                      
                      <button type='submit' className='flex flex-col mt-6 first-letter bg-purple-600 text-white p-2 pb-6 w-40 hover:bg-lime-400 hover:text-purple-600'>Submit</button>
                    
                    </form>
                    
          </div>
          </section>
      </div>
</>
  )
}



export default Home

export const getServerSideProps: GetServerSideProps = async () =>{
  const contacts = await prisma.contact.findMany({
    select:{
      email: false,
      firstname: true,
      lastname:true,
      instance: true,
      id: true,
    }
  })

  return {
    props:{
      contacts
    }
  }
}
