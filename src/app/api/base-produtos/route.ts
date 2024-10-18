import { TipoProduto } from "@/types";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET() {

    const file = await fs.readFile(process.cwd() + '/src/data/base.json', 'utf-8');
    const produtos = JSON.parse(file);

    return NextResponse.json(produtos);

}

export async function POST(request: Request) {

    const file = await fs.readFile(process.cwd() + '/src/data/base.json', 'utf-8')
    const data = JSON.parse(file)
    const { nome, preco, estoque } = await request.json()
    const produto = { nome, preco, estoque } as TipoProduto
    produto.id = Number(Date.now())
    data.push(produto)
    const json = JSON.stringify(data)
    await fs.writeFile(process.cwd() + '/src/data/base.json', json)
    return NextResponse.json(produto)
}

