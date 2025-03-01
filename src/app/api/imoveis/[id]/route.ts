import { NextResponse } from "next/server";

const fakeDatabase = [
  {
    id: "1",
    titulo: "Apartamento Luxuoso no Centro",
    descricao: "Apartamento espaçoso, ótima localização e vista incrível.",
    imagem: "/images/api-fake-image1.jpeg",
    localizacao: "São Paulo Capital",
    titleSite:
      "Apartamento Luxuoso no Centro - São Paulo Capital - R$ 10.120,00",
    preco: 101200,
  },
  {
    id: "2",
    titulo: "Casa Moderna com Piscina",
    descricao: "Casa aconchegante, ideal para famílias.",
    imagem: "/images/api-fake-image2.jpeg",
    titleSite: "Casa Moderna com Piscina - Morumbi - R$ 13.200,00",

    localizacao: "Morumbi",
    preco: 132000,
  },
  {
    id: "3",
    titulo: "Cobertura Exclusiva",
    descricao: "Cobertura sofisticada com vista para a cidade.",
    imagem: "/images/api-fake-image3.jpeg",
    titleSite: "Cobertura Exclusiva - Mauá - R$ 10.320,00",

    localizacao: "Mauá",
    preco: 103200,
  },
];

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const property = fakeDatabase.find((item) => item.id === id);

  if (!property) {
    return NextResponse.json(
      { error: "Imóvel não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(property);
}
