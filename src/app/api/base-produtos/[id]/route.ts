import { TipoProduto } from "@/types";
import { promises as fs} from "fs";
import { NextResponse } from "next/server";

export async function GET(request:Request, {params}:{params:{id:number}}){

    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const produtos:TipoProduto[] = JSON.parse(file);

    const produto = produtos.find(p => p.id == params.id);
    return NextResponse.json(produto);
}

export async function PUT(request:Request, {params}:{params:{id:number}}){

    try{
        const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8')
        const produtos:TipoProduto[] = JSON.parse(file)
        const index = produtos.findIndex(p => p.id == params.id)
        if(index != -1){
            const body = await request.json()
            produtos.splice(index, 1, body)
            await fs.writeFile(process.cwd() + '/src/data/base.json', JSON.stringify(produtos))
            return NextResponse.json(produtos[index])
        }
    }catch(error){
        return NextResponse.json({msg:'Erro ao atualizar produto'+error},{status:500})
    }
}

export async function DELETE(request:Request, {params}:{params:{id:number}}){
    try{
        const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8')
        const produtos:TipoProduto[] = JSON.parse(file)
        const index = produtos.findIndex(p => p.id == params.id)
        if(index != -1){
            produtos.splice(index,1)
            await fs.writeFile(process.cwd() + '/src/data/base.json', JSON.stringify(produtos))
            return NextResponse.json({mgs:"Produto apagado com sucesso!"})
        }
    }catch(error){
            return NextResponse.json({msg:"Erro ao apagar o produto"+error},{status:500})
    }
}