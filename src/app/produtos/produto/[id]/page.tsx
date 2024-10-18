"use client"
import { TipoProduto } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Produto({ params }: { params: { id: number } }) {


    const navigate = useRouter()

    const [produto, setProduto] = useState<TipoProduto>({
        id:0,
        nome:"",
        preco:0,
        estoque:0
    })

    const id = params.id

    useEffect(
        () => {
            const chamadaApi = async () => {
                const response = await fetch(`http://localhost:3000/api/base-produtos/${id}`)
                const data = await response.json()
                setProduto(data)
                console.log(data);
            }
            chamadaApi()
        }, [id])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        setProduto({...produto,[name]:value})
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        try{
            const cabecalho = {
                method: 'PUT',
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(produto)
            }

            const response = await fetch(`http://localhost:3000/api/base-produtos/${id}`,cabecalho)
            if(response.ok){
                alert("Produto atualizado com sucesso!")
                setProduto({id:0,nome:"",preco:0,estoque:0})
                navigate.push('/produtos')
            }else{
                alert("Erro ao atualizar produto!")
            }
        }catch(error){
            console.log("Erro ao atualizar o produto",error);
            
        }
    }

    return (
        <main className="grow p-5">
            <h2 className="text-3xl text-center text-indigo-600 mb-4 font-bold">Produto</h2>
            <form className="w-1/3 m-auto p-2 border border-indigo-950 rounded-md" onSubmit={handleSubmit}>
                <div className="flex flex-col p-2">
                    <label className="text-gray-700" htmlFor="idnome">Nome</label>
                    <input className="border border-gray-700 p-1 rounded-md" type="text" name="nome" id="idnome" value={produto.nome}
                    onChange={handleChange} />
                </div>
                <div className="flex flex-col p-2">
                    <label className="text-gray-700" htmlFor="idpreco">Preço</label>
                    <input className="border border-gray-700 p-1 rounded-md" step={'0.01'} type="number" name="preco" id="idpreco" value={produto.preco} 
                    onChange={handleChange} />
                </div>
                <div className="flex flex-col p-2">
                    <label className="text-gray-700" htmlFor="idestoque">Estoque</label>
                    <input className="border border-gray-700 p-1 rounded-md" type="number" name="estoque" id="idestoque" value={produto.estoque} 
                    onChange={handleChange} />
                </div>
                <button className="bg-green-700 hover:bg-green-500 text-white text-xl p-2 rounded-md block ms-auto me-2" type="submit">Editar Produtos</button>
            </form>
        </main>
    )
}